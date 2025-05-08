import { createClient } from "@supabase/supabase-js";

const isUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const supabaseUrl = isUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  ? process.env.NEXT_PUBLIC_SUPABASE_URL!
  : "https://placeholder.supabase.co";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const isPlaceholder = supabaseUrl.includes("placeholder") || supabaseAnonKey === "placeholder";

// Only create the client if we have the required values, or use placeholders to avoid build errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
