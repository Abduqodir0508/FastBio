import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oojosbgogjlltxtgkeuw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_bUHKm7CZTl_WFMHIz5e69A_yM3fTQdx';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-url') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
