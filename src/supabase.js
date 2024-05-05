import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ecfgauihpxgebzwxpvjq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZmdhdWlocHhnZWJ6d3hwdmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMjQ0NTksImV4cCI6MjAwODkwMDQ1OX0.i-aXY0sJ0UYaWvVIvgGRAYN0Z6YIptZmZ66Il_KYK0o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
