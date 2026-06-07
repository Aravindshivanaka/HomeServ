/*
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_users" ON users FOR ALL USING (true);
*/

import { supabase } from "./supabase";

export async function getUserByPhone(phone: string) {
  const { data } = await supabase
    .from("users")
    .select("phone, display_name")
    .eq("phone", phone)
    .maybeSingle(); // Use maybeSingle to prevent PGRST116 (no rows returned) error
  return data;
}

export async function saveUserName(phone: string, name: string) {
  const { error } = await supabase
    .from("users")
    .upsert({ phone, display_name: name }, { onConflict: "phone" });
  return !error;
}
