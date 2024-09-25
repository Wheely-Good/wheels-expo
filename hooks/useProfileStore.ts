import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/useAuthStore';

interface ProfileData {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface ProfileState {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  getProfile: () => Promise<ProfileData | null>;
  updateProfile: (updates: Partial<ProfileData>) => Promise<void>;
  uploadAvatar: (uri: string, previousUrl: string | null) => Promise<string | null>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  getProfile: async () => {
    const { session } = useAuthStore.getState();
    if (!session) {
      console.error('No user session found');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      return {
        username: data.username || '',
        full_name: data.full_name || '',
        avatar_url: data.avatar_url,
      };
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ error: (error as Error).message });
      return null;
    }
  },


  updateProfile: async (updates: Partial<ProfileData>) => {
    set({ isLoading: true, error: null });
    try {
      const { session } = useAuthStore.getState();
      if (!session?.user) throw new Error('No active session or user!');

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: session.user.id, ...updates });

      if (error) throw error;
      console.log('Profile updated successfully!');

      set({ isLoading: false });
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },


  uploadAvatar: async (uri: string, previousUrl: string | null) => {
    try {
      const { session } = useAuthStore.getState();
    if (!session) {
      console.error('No user session found');
      return null;
    }

      const userId = session.user.id;
      const fileName = `avatar-${userId}-${Date.now()}.jpg`;
      const filePath = `avatars/${fileName}`;

      const photo = await fetch(uri);
      const photoBlob = await photo.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, photoBlob, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;
      console.log('Avatar uploaded successfully!');

      const { data } = await supabase.storage.from('avatars').getPublicUrl(filePath);

      if (!data?.publicUrl) throw new Error('Failed to get public URL');

      if (previousUrl) {
        const filePathToDelete = previousUrl.split('/avatars/')[1];
        if (filePathToDelete) {
          const { error: deleteError } = await supabase.storage
            .from('avatars')
            .remove([filePathToDelete]);
          if (deleteError) {
            console.warn('Error deleting previous avatar:', deleteError.message);
          }
        }
      }

      const { error: updateError } = await supabase.from('profiles').upsert({
        id: userId,
        avatar_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      });

      if (updateError) throw updateError;

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      set({ error: (error as Error).message });
      return null;
    }
  }

}));