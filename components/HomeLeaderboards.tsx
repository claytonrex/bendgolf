"use client";
import Link from "next/link";
import { useResults } from "@/lib/useResults";
import { computeCupHoles, computeSoloTotals, sortedSoloLeaderboard } from "@/lib/scoring";
import { PLAYERS, TEAMS } from "@/lib/data";

export function HomeLeaderboards() {
  const { cup, solo, loading } = useResults();
  const holes = computeCupHoles(cup);
  const totals = computeSoloTotals(cup, solo);
  const sorted = sortedSoloLeaderboard(totals);

  if (loading) {
    return <div className="text-sm text-stone-400 text-center py-6">Loading leaderboards…</div>;
  }

  return (
    <section className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm uppercase tracking-wider text-stone-500">The Cup</h2>
          <Link href="/cup" className="text-xs text-emerald-700 font-semibold">View →</Link>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-stone-200 p-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-xs text-stone-500">{TEAMS.team1.name}</div>
            <div className="text-4xl font-black text-emerald-700">{holes.team1}</div>
            <div className="text-[10px] uppercase text-stone-400">holes</div>
          </div>
          <div>
            <div className="text-xs text-stone-500">{TEAMS.team2.name}</div>
            <div className="text-4xl font-black text-emerald-700">{holes.team2}</div>
            <div className="text-[10px] uppercase text-stone-400">holes</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm uppercase tracking-wider text-stone-500">Solo Points</h2>
          <Link href="/solo" className="text-xs text-emerald-700 font-semibold">View →</Link>
        </div>
        <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {sorted.map((row, i) => (
            <li key={row.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-sm font-bold text-stone-400">{i + 1}</span>
                <span className="text-sm font-semibold">{PLAYERS[row.id].name}</span>
              </div>
              <span className="text-lg font-black text-emerald-700">{row.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
