"use client";
import { useEffect, useState } from "react";
import { supabase, CupMatchResult, SoloResult, isSupabaseConfigured } from "./supabase";

export function useResults() {
  const [cup, setCup] = useState<CupMatchResult[]>([]);
  const [solo, setSolo] = useState<SoloResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let alive = true;
    async function load() {
      try {
        const [cupR, soloR] = await Promise.all([
          supabase.from("cup_results").select("*"),
          supabase.from("solo_results").select("*"),
        ]);
        if (!alive) return;
        setCup((cupR.data ?? []) as CupMatchResult[]);
        setSolo((soloR.data ?? []) as SoloResult[]);
      } catch {
        // Supabase not configured or unreachable — show empty boards.
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();

    const channel = supabase
      .channel("results")
      .on("postgres_changes", { event: "*", schema: "public", table: "cup_results" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "solo_results" }, load)
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { cup, solo, loading };
}
