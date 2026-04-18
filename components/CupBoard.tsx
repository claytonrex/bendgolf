"use client";
import Link from "next/link";
import { ROUNDS, TEAMS, PLAYERS } from "@/lib/data";
import { useResults } from "@/lib/useResults";
import { computeCupHoles } from "@/lib/scoring";

export function CupBoard() {
  const { cup, loading } = useResults();
  const holes = computeCupHoles(cup);
  const byRound = new Map(cup.map((c) => [c.round_id, c]));

  if (loading) return <div className="text-sm text-stone-400 text-center py-6">Loading…</div>;

  const leader =
    holes.team1 > holes.team2 ? "team1" : holes.team2 > holes.team1 ? "team2" : null;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-white shadow-sm border border-stone-200 p-5">
        <div className="grid grid-cols-2 gap-4 text-center">
          {(["team1", "team2"] as const).map((t) => (
            <div key={t} className={leader === t ? "text-emerald-700" : "text-stone-700"}>
              <div className="text-xs font-semibold uppercase">{TEAMS[t].name}</div>
              <div className="text-xs text-stone-500 mb-1">
                {TEAMS[t].members.map((m) => PLAYERS[m].name.split(" ")[0]).join(" & ")}
              </div>
              <div className="text-6xl font-black">{holes[t]}</div>
              <div className="text-[10px] uppercase text-stone-400 tracking-wider">holes</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Matches</h2>
        <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {ROUNDS.filter((r) => r.isCupMatch).map((r) => {
            const result = byRound.get(r.id);
            return (
              <li key={r.id} className="px-4 py-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-semibold">{r.course}</div>
                    <div className="text-xs text-stone-500">{r.day} {r.slot} · {r.formatLabel}</div>
                  </div>
                  <Link
                    href={`/scores/${r.id}`}
                    className="text-xs text-emerald-700 font-semibold"
                  >
                    {result ? "Edit" : "Enter"} →
                  </Link>
                </div>
                <div className="mt-2">
                  {result ? (
                    <div
                      className={`inline-block text-xs font-bold px-2 py-1 rounded ${
                        result.winner === "tie"
                          ? "bg-stone-200 text-stone-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {result.winner === "tie"
                        ? "Tie — no hole awarded"
                        : `${TEAMS[result.winner].name} +1 hole`}
                      {r.isChampionship && " · Champion"}
                    </div>
                  ) : (
                    <div className="text-xs text-stone-400">Not played yet</div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
