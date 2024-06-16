import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ssymesdzewruhrteglkk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzeW1lc2R6ZXdydWhydGVnbGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2MjAxODcsImV4cCI6MjAzMzE5NjE4N30.JnuLyjXeO-oEGtAHkfOxRYvrJ5cBQExSBm6wamko0Q8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
