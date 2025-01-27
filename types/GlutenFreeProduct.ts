import { Database } from "./supabase";

export type GlutenFreeProduct = Database['public']['Tables']['gf_products']['Row'];
