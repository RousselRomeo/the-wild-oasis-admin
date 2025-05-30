import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ggiqpgjnudnpsxwxrxle.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaXFwZ2pudWRucHN4d3hyeGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDEyNDMsImV4cCI6MjA2MzUxNzI0M30.ViasjLQ6X6kcgOR7_ILHjX0dL2DRvGI1qG2MCuIk_LA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
