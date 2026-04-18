"use client";
import { useEffect, useState } from "react";
import { supabase, TrashTalk, isSupabaseConfigured } from "@/lib/supabase";
import { PLAYER_ORDER, PLAYERS, PlayerId } from "@/lib/data";

const PLAYER_KEY = "bend-trip-player-id";

export function TrashTalkFeed() {
  const [messages, setMessages] = useState<TrashTalk[]>([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<PlayerId | "">("");
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(PLAYER_KEY) as PlayerId | null;
    if (saved && saved in PLAYERS) setMe(saved);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let alive = true;
    async function load() {
      const { data } = await supabase
        .from("trash_talk")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (!alive) return;
      setMessages((data ?? []) as TrashTalk[]);
      setLoading(false);
    }
    load();
    const interval = setInterval(load, 15000);
    const onVisible = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      alive = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!me || !text.trim() || posting) return;
    setPosting(true);
    localStorage.setItem(PLAYER_KEY, me);
    const { data } = await supabase
      .from("trash_talk")
      .insert({ player_id: me, message: text.trim() })
      .select()
      .single();
    if (data) setMessages((prev) => [data as TrashTalk, ...prev]);
    setText("");
    setPosting(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await supabase.from("trash_talk").delete().eq("id", id);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={post} className="rounded-2xl bg-white border border-stone-200 p-4 space-y-3 shadow-sm">
        <div>
          <label className="text-xs uppercase tracking-wider text-stone-500">Posting as</label>
          <select
            value={me}
            onChange={(e) => setMe(e.target.value as PlayerId | "")}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 bg-white"
          >
            <option value="">— pick yourself —</option>
            {PLAYER_ORDER.map((p) => (
              <option key={p} value={p}>{PLAYERS[p].name}</option>
            ))}
          </select>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          maxLength={500}
          placeholder="Cook someone…"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 bg-white"
        />
        <button
          type="submit"
          disabled={!me || !text.trim() || posting}
          className="w-full rounded-xl bg-emerald-700 text-white font-semibold py-3 disabled:opacity-50"
        >
          {posting ? "Posting…" : "Post"}
        </button>
      </form>

      {loading ? (
        <div className="text-sm text-stone-400 text-center py-6">Loading…</div>
      ) : messages.length === 0 ? (
        <div className="text-sm text-stone-400 text-center py-6">Nothing yet. Start the shit-talk.</div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => {
            const player = PLAYERS[m.player_id as PlayerId];
            const when = new Date(m.created_at);
            const timeStr = when.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            });
            return (
              <li key={m.id} className="rounded-2xl bg-white border border-stone-200 p-4 shadow-sm">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-semibold text-sm">{player?.name ?? m.player_id}</div>
                  <div className="text-xs text-stone-400">{timeStr}</div>
                </div>
                <div className="text-sm text-stone-900 mt-1 whitespace-pre-wrap">{m.message}</div>
                {me && m.player_id === me && (
                  <button
                    onClick={() => remove(m.id)}
                    className="mt-2 text-xs text-rose-600 font-semibold"
                  >
                    Delete
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
