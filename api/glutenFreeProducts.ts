import { supabase } from "@/lib/supabase"
import { GlutenFreeProduct } from "@/types"

export const fetchGlutenFreeProducts = async ({
  limit = 10,
  offset = 0
}: {
  limit: number
  offset: number
}): Promise<GlutenFreeProduct[]> => {
  const { data, error } = await supabase.from('gf_products').select('*').range(offset, offset + limit - 1);
  if (error) throw new Error(error.message);

  return data;
}
