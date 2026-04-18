"use client";
import Link from "next/link";
import { ROUNDS, PLAYERS, PlayerId } from "@/lib/data";
import { useResults } from "@/lib/useResults";
import { computeSoloTotals, sortedSoloLeaderboard } from "@/lib/scoring";

export function SoloBoard() {
  const { cup, solo, loading } = useResults();
  const totals = computeSoloTotals(cup, solo);
  const sorted = sortedSoloLeaderboard(totals);
  const byRound = new Map(solo.map((s) => [s.round_id, s]));

  if (loading) return <div className="text-sm text-stone-400 text-center py-6">Loading…</div>;

  return (
    <div className="space-y-5">
      <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
        {sorted.map((row, i) => {
          const medal = ["🥇", "🥈", "🥉", "  "][i] ?? "  ";
          return (
            <li key={row.id} className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{medal}</span>
                <div>
                  <div className="font-semibold">{PLAYERS[row.id].name}</div>
                  <div className="text-xs text-stone-500">
                    {PLAYERS[row.id].team === "team1" ? "Curry/Lamb" : "McDonald/Prather"}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-700">{row.points}</div>
            </li>
          );
        })}
      </ul>

      <div>
        <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Solo Games</h2>
        <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {ROUNDS.filter((r) => r.isSolo).map((r) => {
            const result = byRound.get(r.id);
            const podium = (p: string | null | undefined) =>
              p ? PLAYERS[p as PlayerId].name.split(" ")[0] : "—";
            return (
              <li key={r.id} className="px-4 py-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-semibold">{r.course}</div>
                    <div className="text-xs text-stone-500">{r.day} · {r.formatLabel}</div>
                  </div>
                  <Link
                    href={`/scores/${r.id}`}
                    className="text-xs text-emerald-700 font-semibold"
                  >
                    {result ? "Edit" : "Enter"} →
                  </Link>
                </div>
                {result ? (
                  <div className="text-xs text-stone-700 mt-1">
                    🥇 {podium(result.first)} · 🥈 {podium(result.second)} · 🥉 {podium(result.third)}
                  </div>
                ) : (
                  <div className="text-xs text-stone-400 mt-1">Not played yet</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
