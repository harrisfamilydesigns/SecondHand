import { supabase } from '@/lib/supabase'

export const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);

  const { session } = data || {};
  return session;
}
