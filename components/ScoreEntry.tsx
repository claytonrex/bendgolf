"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Round, PLAYER_ORDER, PLAYERS, TEAMS, PlayerId } from "@/lib/data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export function ScoreEntry({ round }: { round: Round }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [winner, setWinner] = useState<"team1" | "team2" | "tie" | "">("");
  const [first, setFirst] = useState<PlayerId | "">("");
  const [second, setSecond] = useState<PlayerId | "">("");
  const [third, setThird] = useState<PlayerId | "">("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        if (round.isCupMatch) {
          const { data } = await supabase.from("cup_results").select("*").eq("round_id", round.id).maybeSingle();
          if (data) {
            setWinner(data.winner);
            setNotes(data.notes ?? "");
          }
        } else {
          const { data } = await supabase.from("solo_results").select("*").eq("round_id", round.id).maybeSingle();
          if (data) {
            setFirst((data.first as PlayerId) ?? "");
            setSecond((data.second as PlayerId) ?? "");
            setThird((data.third as PlayerId) ?? "");
            setNotes(data.notes ?? "");
          }
        }
      } catch {
        // ignore — show blank form
      } finally {
        setLoading(false);
      }
    })();
  }, [round.id, round.isCupMatch]);

  async function save() {
    setSaving(true);
    if (round.isCupMatch) {
      if (!winner) {
        setSaving(false);
        return;
      }
      await supabase
        .from("cup_results")
        .upsert({ round_id: round.id, winner, notes: notes || null, updated_at: new Date().toISOString() });
    } else {
      await supabase.from("solo_results").upsert({
        round_id: round.id,
        first: first || null,
        second: second || null,
        third: third || null,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      });
    }
    setSaving(false);
    router.push(round.isCupMatch ? "/cup" : "/solo");
  }

  async function clear() {
    if (!confirm("Clear this result?")) return;
    setSaving(true);
    const table = round.isCupMatch ? "cup_results" : "solo_results";
    await supabase.from(table).delete().eq("round_id", round.id);
    setSaving(false);
    router.push(round.isCupMatch ? "/cup" : "/solo");
  }

  if (loading) return <div className="p-6 text-sm text-stone-400">Loading…</div>;

  return (
    <div className="p-4 space-y-5">
      <Link href={round.isCupMatch ? "/cup" : "/solo"} className="text-sm text-emerald-700 font-semibold">
        ← Back
      </Link>

      <header>
        <h1 className="text-2xl font-black">{round.course}</h1>
        <p className="text-stone-500 text-sm">{round.day} {round.slot} · {round.formatLabel}</p>
        {round.isChampionship && (
          <p className="text-xs text-emerald-700 font-semibold mt-1">CHAMPIONSHIP FINALS</p>
        )}
      </header>

      {round.isCupMatch ? (
        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider text-stone-500">Match Winner</h2>
          <div className="grid grid-cols-1 gap-2">
            {(["team1", "team2", "tie"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setWinner(opt)}
                className={`rounded-xl border-2 px-4 py-4 text-left transition ${
                  winner === opt
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="font-semibold">
                  {opt === "tie" ? "Tie" : TEAMS[opt].name}
                </div>
                <div className="text-xs text-stone-500">
                  {opt === "tie"
                    ? "No hole awarded"
                    : `+1 hole · ${TEAMS[opt].members.map((m) => PLAYERS[m].name.split(" ")[0]).join(" & ")}`}
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider text-stone-500">Podium</h2>
          {(
            [
              { label: "🥇 1st (5 pts)", value: first, set: setFirst },
              { label: "🥈 2nd (3 pts)", value: second, set: setSecond },
              { label: "🥉 3rd (1 pt)", value: third, set: setThird },
            ] as const
          ).map((row, i) => (
            <div key={i}>
              <label className="text-xs text-stone-500">{row.label}</label>
              <select
                value={row.value}
                onChange={(e) => row.set(e.target.value as PlayerId | "")}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-3 bg-white"
              >
                <option value="">—</option>
                {PLAYER_ORDER.map((p) => (
                  <option key={p} value={p}>{PLAYERS[p].name}</option>
                ))}
              </select>
            </div>
          ))}
        </section>
      )}

      <section>
        <label className="text-sm uppercase tracking-wider text-stone-500">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 bg-white"
          placeholder="Anything memorable? Hero shots, meltdowns…"
        />
      </section>

      <div className="flex gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="flex-1 rounded-xl bg-emerald-700 text-white font-semibold py-3 active:bg-emerald-800 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={clear}
          disabled={saving}
          className="rounded-xl border border-stone-300 text-stone-700 font-semibold px-4 py-3"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
