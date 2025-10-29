import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExistingTenantSearch = ({ onSelectTenant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock existing tenants data
  const existingTenants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+264 81 234 5678",
    avatar: "https://images.unsplash.com/photo-1728694439890-d8ec102e3703",
    avatarAlt: "Professional headshot of young woman with brown hair in white blouse",
    currentUnit: null,
    previousUnits: ["Building A - Unit 2B"],
    joinDate: "2023-08-15",
    status: "available"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+264 81 345 6789",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit",
    currentUnit: "Building B - Unit 1A",
    previousUnits: [],
    joinDate: "2024-01-20",
    status: "occupied"
  },
  {
    id: 3,
    name: "Emma Williams",
    email: "emma.williams@email.com",
    phone: "+264 81 456 7890",
    avatar: "https://images.unsplash.com/photo-1589913213091-22a5c6db840a",
    avatarAlt: "Professional headshot of blonde woman with blue eyes in business attire",
    currentUnit: null,
    previousUnits: ["Building C - Unit 3A", "Building A - Unit 1C"],
    joinDate: "2023-05-10",
    status: "available"
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@email.com",
    phone: "+264 81 567 8901",
    avatar: "https://images.unsplash.com/photo-1627729205753-52d2ddeefce1",
    avatarAlt: "Professional headshot of Hispanic man with beard in gray shirt",
    currentUnit: null,
    previousUnits: [],
    joinDate: "2024-03-05",
    status: "available"
  }];


  const handleSearch = async () => {
    if (!searchQuery?.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API search
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = existingTenants?.filter((tenant) =>
    tenant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    tenant?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    tenant?.phone?.includes(searchQuery)
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectTenant = (tenant) => {
    onSelectTenant({
      id: tenant?.id,
      name: tenant?.name,
      email: tenant?.email,
      phone: tenant?.phone,
      avatar: tenant?.avatar,
      avatarAlt: tenant?.avatarAlt,
      isExisting: true
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'text-success', bg: 'bg-success/10', label: 'Available' },
      occupied: { color: 'text-warning', bg: 'bg-warning/10', label: 'Currently Occupied' }
    };

    const config = statusConfig?.[status] || statusConfig?.available;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color} ${config?.bg}`}>
        {config?.label}
      </span>);

  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Search Existing Tenants</h3>
          <p className="text-sm text-muted-foreground">Find and invite tenants who are already registered on the platform</p>
        </div>
      </div>
      {/* Search Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by name, email, or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="w-full" />

        </div>
        <Button
          onClick={handleSearch}
          loading={isSearching}
          iconName="Search"
          iconPosition="left"
          disabled={!searchQuery?.trim()}>

          Search
        </Button>
      </div>
      {/* Search Results */}
      {hasSearched &&
      <div>
          {isSearching ?
        <div className="text-center py-8">
              <Icon name="Loader2" size={32} className="mx-auto text-muted-foreground animate-spin mb-4" />
              <p className="text-muted-foreground">Searching tenants...</p>
            </div> :
        searchResults?.length > 0 ?
        <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                Found {searchResults?.length} tenant{searchResults?.length !== 1 ? 's' : ''}
              </h4>
              {searchResults?.map((tenant) =>
          <div
            key={tenant?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <img
                    src={tenant?.avatar}
                    alt={tenant?.avatarAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }} />

                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h5 className="font-semibold text-foreground">{tenant?.name}</h5>
                          {getStatusBadge(tenant?.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{tenant?.email}</p>
                        <p className="text-sm text-muted-foreground">{tenant?.phone}</p>
                        
                        {tenant?.currentUnit &&
                  <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Current Unit: </span>
                            <span className="text-xs font-medium text-foreground">{tenant?.currentUnit}</span>
                          </div>
                  }
                        
                        {tenant?.previousUnits?.length > 0 &&
                  <div className="mt-1">
                            <span className="text-xs text-muted-foreground">Previous Units: </span>
                            <span className="text-xs text-muted-foreground">{tenant?.previousUnits?.join(', ')}</span>
                          </div>
                  }
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Button
                  size="sm"
                  onClick={() => handleSelectTenant(tenant)}
                  disabled={tenant?.status === 'occupied'}
                  iconName="UserPlus"
                  iconPosition="left">

                        {tenant?.status === 'occupied' ? 'Occupied' : 'Select'}
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        Joined {new Date(tenant.joinDate)?.toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>
                </div>
          )}
            </div> :

        <div className="text-center py-8">
              <Icon name="UserX" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">No Tenants Found</h4>
              <p className="text-muted-foreground mb-4">
                No existing tenants match your search criteria.
              </p>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords or create a new invitation for this tenant.
              </p>
            </div>
        }
        </div>
      }
      {!hasSearched &&
      <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="text-lg font-semibold text-foreground mb-2">Search Platform Tenants</h4>
          <p className="text-muted-foreground">
            Enter a name, email, or phone number to find existing tenants on the platform.
          </p>
        </div>
      }
    </div>);

};

export default ExistingTenantSearch;