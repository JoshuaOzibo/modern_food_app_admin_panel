import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY is not set");
}

const supabaseUrl = "https://jpyeepinaipyhepjvmey.supabase.co";
const supabase = createClient(supabaseUrl, process.env.SUPABASE_KEY);

export default supabase;
