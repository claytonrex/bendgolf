import { PlayerId, PLAYER_ORDER, ROUNDS, TEAMS, TeamId } from "./data";
import type { CupMatchResult, SoloResult } from "./supabase";

export type SoloTotals = Record<PlayerId, number>;
export type CupHoles = Record<TeamId, number>;

export function computeCupHoles(cupResults: CupMatchResult[]): CupHoles {
  const holes: CupHoles = { team1: 0, team2: 0 };
  const cupRounds = new Set(
    ROUNDS.filter((r) => r.isCupMatch && !r.isChampionship).map((r) => r.id),
  );
  for (const r of cupResults) {
    if (!cupRounds.has(r.round_id as (typeof ROUNDS)[number]["id"])) continue;
    if (r.winner === "team1") holes.team1 += 1;
    else if (r.winner === "team2") holes.team2 += 1;
  }
  return holes;
}

export function computeSoloTotals(
  cupResults: CupMatchResult[],
  soloResults: SoloResult[],
): SoloTotals {
  const totals: SoloTotals = { clifton: 0, clayton: 0, matt: 0, joey: 0 };

  for (const r of cupResults) {
    if (r.winner === "team1") {
      TEAMS.team1.members.forEach((p) => (totals[p] += 5));
    } else if (r.winner === "team2") {
      TEAMS.team2.members.forEach((p) => (totals[p] += 5));
    }
  }

  for (const r of soloResults) {
    if (r.first) totals[r.first as PlayerId] = (totals[r.first as PlayerId] ?? 0) + 5;
    if (r.second) totals[r.second as PlayerId] = (totals[r.second as PlayerId] ?? 0) + 3;
    if (r.third) totals[r.third as PlayerId] = (totals[r.third as PlayerId] ?? 0) + 1;
  }

  return totals;
}

export function sortedSoloLeaderboard(totals: SoloTotals) {
  return PLAYER_ORDER.map((id) => ({ id, points: totals[id] })).sort(
    (a, b) => b.points - a.points,
  );
}
