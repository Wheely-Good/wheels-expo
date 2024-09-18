import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<string | undefined>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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
        console.log("Signin error:", error.message)
        let errorMessage = 'Failed to sign in';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.';
        }
        throw new Error(errorMessage);
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
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      set({ isLoading: false, error: null });
      return 'Please check your email to verify your account.';
    } catch (error) {
      console.error('Error signing up:', error);
      set({ isLoading: false, error: 'Failed to sign up' });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, isLoading: false });
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false, error: 'Failed to sign out' });
    }
  },
}));
