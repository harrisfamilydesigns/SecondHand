import { supabase } from "@/lib/supabase"

export const fetchGlutenFreeProducts = async () => {
  const { data, error } = await supabase.from('gf_products').select('*')
  if (error) throw new Error(error.message);
  return data
}
