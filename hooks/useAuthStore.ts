import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Session } from "@supabase/supabase-js";

interface ProfileData {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  uploadAvatar: (uri: string, previousUrl: string | null) => Promise<string | null>;
  updateProfile: (username: string, fullName: string) => Promise<void>;
  upsertProfile: (userId: string, updates: Partial<{ username: string; full_name: string; avatar_url: string }>) => Promise<void>;
  getProfile: () => Promise<ProfileData | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({

  session: null,
  isLoading: false,
  error: null,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, isLoading: false });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, isLoading: false });
      });

    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ session: null, isLoading: false, error: 'Failed to initialize authentication' });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message);
      }
      set({ session: data.session, isLoading: false });
    } catch (error) {
      console.error('Error signing in:', error);
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw new Error(error.message);
      }
      set({ isLoading: false, error: null });
    } catch (error) {
      console.error('Error signing up:', error);
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      set({ session: null, isLoading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  getProfile: async () => {
    try {
      const session = get().session;
      if (!session?.user) throw new Error('No active session or user!');

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

  uploadAvatar: async (uri: string, previousUrl: string | null) => {
    try {
      set({ isLoading: true, error: null });

      const session = get().session;
      if (!session?.user) throw new Error('No active session or user!');

      const userId = session.user.id;
      const fileName = `avatar-${userId}-${Date.now()}.jpg`;
      const filePath = `avatars/${fileName}`;

      const photo = await fetch(uri);
      const photoBlob = await photo.blob();

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, photoBlob, { contentType: 'image/jpeg' });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Failed to retrieve public URL for the uploaded avatar.');
      }

      if (previousUrl) {
        const filePathToDelete = previousUrl.split('/avatars/')[1];
        console.log('filePathToDelete', filePathToDelete);
        if (filePathToDelete) {
          const { error: deleteError } = await supabase.storage
            .from('avatars')
            .remove([`${filePathToDelete}`]);
          if (deleteError) {
            console.warn('Error deleting previous avatar:', deleteError.message);
          }
        }
      }

      await get().upsertProfile(session.user.id, { avatar_url: data.publicUrl });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      set({ error: (error as Error).message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (username: string, fullName: string) => {
    try {
      set({ isLoading: true, error: null });

      const session = get().session;
      if (!session?.user) throw new Error('No active session or user!');

      await get().upsertProfile(session.user.id, { username, full_name: fullName });
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  upsertProfile: async (userId: string, updates: Partial<{ username: string; full_name: string; avatar_url: string }>) => {
    try {
      const updateData = {
        id: userId,
        updated_at: new Date().toISOString(),
        ...updates,
      };

      const { error } = await supabase.from('profiles').upsert(updateData);
      if (error) throw error;

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error upserting profile:', error);
      set({ error: (error as Error).message });
    }
  },
}));
