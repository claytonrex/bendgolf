"use client";
import { useEffect, useState } from "react";
import { supabase, HouseInfo, isSupabaseConfigured } from "@/lib/supabase";

const BLANK: HouseInfo = {
  id: "main",
  address: "",
  wifi_ssid: "",
  wifi_password: "",
  check_in: "",
  check_out: "",
  door_code: "",
  room_assignments: "",
  notes: "",
};

export function HousePanel() {
  const [info, setInfo] = useState<HouseInfo>(BLANK);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await supabase.from("house_info").select("*").eq("id", "main").maybeSingle();
        if (data) setInfo({ ...BLANK, ...data });
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function save() {
    setSaving(true);
    await supabase.from("house_info").upsert(info);
    setSaving(false);
    setEditing(false);
  }

  if (loading) return <div className="text-sm text-stone-400">Loading…</div>;

  const fields: { key: keyof HouseInfo; label: string; multiline?: boolean }[] = [
    { key: "address", label: "Address" },
    { key: "check_in", label: "Check-in" },
    { key: "check_out", label: "Check-out" },
    { key: "door_code", label: "Door code" },
    { key: "wifi_ssid", label: "Wi-Fi network" },
    { key: "wifi_password", label: "Wi-Fi password" },
    { key: "room_assignments", label: "Rooms", multiline: true },
    { key: "notes", label: "Notes", multiline: true },
  ];

  if (editing) {
    return (
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs uppercase tracking-wider text-stone-500">{f.label}</label>
            {f.multiline ? (
              <textarea
                value={(info[f.key] as string) ?? ""}
                onChange={(e) => setInfo({ ...info, [f.key]: e.target.value })}
                rows={3}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 bg-white"
              />
            ) : (
              <input
                value={(info[f.key] as string) ?? ""}
                onChange={(e) => setInfo({ ...info, [f.key]: e.target.value })}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 bg-white"
              />
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 rounded-xl bg-emerald-700 text-white font-semibold py-3 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded-xl border border-stone-300 font-semibold px-4 py-3"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const hasAny = fields.some((f) => (info[f.key] as string)?.trim());

  return (
    <div className="space-y-4">
      {hasAny ? (
        <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {fields.map((f) => {
            const v = (info[f.key] as string)?.trim();
            if (!v) return null;
            return (
              <li key={f.key} className="px-4 py-3">
                <div className="text-[10px] uppercase tracking-wider text-stone-500">{f.label}</div>
                <div className="text-sm text-stone-900 whitespace-pre-wrap">{v}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-2xl bg-white border border-stone-200 p-4 text-sm text-stone-500">
          Nothing saved yet. Tap Edit to add address, Wi-Fi, and door code.
        </div>
      )}
      <button
        onClick={() => setEditing(true)}
        className="w-full rounded-xl bg-stone-900 text-white font-semibold py-3"
      >
        Edit
      </button>
    </div>
  );
}
