import { supabase } from "@/lib/supabase"
import { GlutenFreeProduct } from "@/types"

export const fetchGlutenFreeProducts = async ({
  limit = 10,
  offset = 0,
  search = ''
}: {
  limit: number
  offset: number
  search?: string
}): Promise<GlutenFreeProduct[]> => {
  const searchTerms = search.split(' ').filter(Boolean);

  let query = supabase
    .from("gf_products")
    .select("*")
    .range(offset, offset + limit - 1);

  // Dynamically apply the OR filter if search terms exist
  if (searchTerms.length > 0) {
    const orFilters = searchTerms
      .map(
        (term) =>
          `name.ilike.%${term}%,brand_name.ilike.%${term}%` // OR conditions for each term
      )
      .join(",");

    query = query.or(orFilters); // Apply the OR filter
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return data;
}
