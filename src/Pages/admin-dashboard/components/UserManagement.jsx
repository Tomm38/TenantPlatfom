import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { getAllUsers, updateUserStatus, deleteUser, setUserRole } from '../../../services/adminService';
import { supabase } from '../../../config/supabase';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('tenant');
  const [inviting, setInviting] = useState(false);
  const [inviteUnitId, setInviteUnitId] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      if (result.data) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const result = await updateUserStatus(userId, newStatus);
      if (result.data) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const result = await deleteUser(userId);
      if (result.data) {
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setInviting(true);
    try {
      // Prefer Edge Function invite with optional unit link
      let payload = { email: inviteEmail };
      if (inviteRole === 'tenant' && inviteUnitId) {
        payload.unitId = inviteUnitId;
      }
      const { data, error } = await supabase.functions.invoke('invite-tenant', { body: payload });
      if (!error) {
        setInviteEmail('');
        setInviteUnitId('');
        // Optionally show token or send via email service
      }
    } catch (error) {
      console.error('Error inviting user:', error);
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await setUserRole(userId, newRole);
      if (!error) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
    } catch (error) {
      console.error('Error setting role:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter !== 'all' && user.role !== filter) return false;
    if (searchTerm && !user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
        && !user.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Invite, Filters and Search */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-end">
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-1">Invite email</label>
            <input
              type="email"
              placeholder="user@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="px-3 py-2 border border-border rounded"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {inviteRole === 'tenant' && (
            <div className="flex-1">
              <label className="block text-sm text-muted-foreground mb-1">Unit ID (optional)</label>
              <input
                type="text"
                placeholder="uuid of unit to link"
                value={inviteUnitId}
                onChange={(e) => setInviteUnitId(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded"
              />
            </div>
          )}
          <div>
            <Button onClick={handleInvite} disabled={inviting || !inviteEmail}>
              {inviting ? 'Inviting...' : 'Send Invite'}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'landlord' ? 'default' : 'outline'}
            onClick={() => setFilter('landlord')}
          >
            Landlords
          </Button>
          <Button
            variant={filter === 'tenant' ? 'default' : 'outline'}
            onClick={() => setFilter('tenant')}
          >
            Tenants
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="px-2 py-1 border border-border rounded text-sm"
                    >
                      <option value="tenant">Tenant</option>
                      <option value="landlord">Landlord</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className="px-2 py-1 border border-border rounded text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
