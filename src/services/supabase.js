import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hcqcjfsrsxanpxwigzmk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcWNqZnNyc3hhbnB4d2lnem1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzQ2MzAsImV4cCI6MjA0Mjg1MDYzMH0.6hNboHf64bmatNUcI-4VeaRfEzx6xnMD_SyGSDEx3jE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
