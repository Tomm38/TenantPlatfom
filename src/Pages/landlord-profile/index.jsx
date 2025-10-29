import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const LandlordProfile = () => {
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data } = await supabase.from('users').select('name, phone').eq('id', user.id).single();
        setProfile({ name: data?.name || '', phone: data?.phone || '' });
      }
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id) {
      await supabase.from('users').update({ name: profile.name, phone: profile.phone }).eq('id', user.id);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} color="white" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">My Profile</h1>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-4">
          <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <Input label="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <Button onClick={save} loading={saving}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default LandlordProfile;



