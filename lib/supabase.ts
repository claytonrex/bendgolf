import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  !!url && !!anon && !url.includes("placeholder") && anon !== "placeholder";

export const supabase = createClient(
  isSupabaseConfigured ? url : "https://placeholder.supabase.co",
  isSupabaseConfigured ? anon : "placeholder",
  { auth: { persistSession: false } },
);

export type CupMatchResult = {
  round_id: string;
  winner: "team1" | "team2" | "tie";
  notes: string | null;
  updated_at: string;
};

export type SoloResult = {
  round_id: string;
  first: string | null;
  second: string | null;
  third: string | null;
  notes: string | null;
  updated_at: string;
};

export type Handicap = {
  player_id: string;
  handicap: number | null;
};

export type HouseInfo = {
  id: string;
  address: string | null;
  wifi_ssid: string | null;
  wifi_password: string | null;
  check_in: string | null;
  check_out: string | null;
  door_code: string | null;
  room_assignments: string | null;
  notes: string | null;
};

export type TrashTalk = {
  id: string;
  player_id: string;
  message: string;
  created_at: string;
};
