import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bXFoY293andoZGFtY2ZxY25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNTE0MjYsImV4cCI6MjAyODkyNzQyNn0.CuQ7B81B7joEhludJ7ny17ijIcVV2acCeWnQMbN_tTU";

export const supabaseUrl = "https://fwmqhcowjwhdamcfqcne.supabase.co";
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
