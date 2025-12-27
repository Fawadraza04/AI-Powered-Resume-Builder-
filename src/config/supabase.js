import { createClient } from "@supabase/supabase-js";

// Your Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug - check if env variables are loaded
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key exists:", !!supabaseAnonKey);
console.log("Supabase Key length:", supabaseAnonKey?.length);

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client initialized:", !!supabase);
