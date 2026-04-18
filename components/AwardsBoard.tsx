"use client";
import { useResults } from "@/lib/useResults";
import { computeCupHoles, computeSoloTotals, sortedSoloLeaderboard } from "@/lib/scoring";
import { PLAYER_ORDER, PLAYERS, PlayerId, ROUNDS, TEAMS, TeamId } from "@/lib/data";

type Award = {
  emoji: string;
  title: string;
  recipient: string;
  detail: string;
  tone?: "gold" | "silver" | "bronze" | "shame" | "info";
};

function countPodium(soloResults: { first: string | null; second: string | null; third: string | null }[]) {
  const counts: Record<PlayerId, { first: number; second: number; third: number; none: number }> = {
    clifton: { first: 0, second: 0, third: 0, none: 0 },
    clayton: { first: 0, second: 0, third: 0, none: 0 },
    matt: { first: 0, second: 0, third: 0, none: 0 },
    joey: { first: 0, second: 0, third: 0, none: 0 },
  };
  const soloRoundsPlayed = soloResults.filter((r) => r.first || r.second || r.third).length;
  for (const r of soloResults) {
    if (r.first) counts[r.first as PlayerId].first += 1;
    if (r.second) counts[r.second as PlayerId].second += 1;
    if (r.third) counts[r.third as PlayerId].third += 1;
  }
  for (const p of PLAYER_ORDER) {
    const c = counts[p];
    c.none = Math.max(0, soloRoundsPlayed - c.first - c.second - c.third);
  }
  return { counts, soloRoundsPlayed };
}

function teamMatchRecord(cup: { round_id: string; winner: string }[]) {
  const cupIds = new Set(ROUNDS.filter((r) => r.isCupMatch).map((r) => r.id));
  const record: Record<TeamId, { w: number; l: number; t: number }> = {
    team1: { w: 0, l: 0, t: 0 },
    team2: { w: 0, l: 0, t: 0 },
  };
  for (const c of cup) {
    if (!cupIds.has(c.round_id as (typeof ROUNDS)[number]["id"])) continue;
    if (c.winner === "tie") {
      record.team1.t++;
      record.team2.t++;
    } else if (c.winner === "team1") {
      record.team1.w++;
      record.team2.l++;
    } else if (c.winner === "team2") {
      record.team2.w++;
      record.team1.l++;
    }
  }
  return record;
}

const TONE_STYLES: Record<NonNullable<Award["tone"]>, string> = {
  gold: "bg-amber-50 border-amber-300",
  silver: "bg-stone-100 border-stone-300",
  bronze: "bg-orange-50 border-orange-300",
  shame: "bg-rose-50 border-rose-200",
  info: "bg-white border-stone-200",
};

export function AwardsBoard() {
  const { cup, solo, loading } = useResults();

  if (loading) return <div className="text-sm text-stone-400 text-center py-6">Loading…</div>;

  const totals = computeSoloTotals(cup, solo);
  const sorted = sortedSoloLeaderboard(totals);
  const holes = computeCupHoles(cup);
  const { counts, soloRoundsPlayed } = countPodium(solo);
  const record = teamMatchRecord(cup);

  const awards: Award[] = [];

  // Solo leader / champion
  const top = sorted[0];
  const anyPoints = top.points > 0;
  const allSoloPlayed = solo.filter((r) => r.first).length >= 2;
  if (anyPoints) {
    awards.push({
      emoji: allSoloPlayed ? "👑" : "🥇",
      title: allSoloPlayed ? "Solo Champion" : "Current Solo Leader",
      recipient: PLAYERS[top.id].name,
      detail: `${top.points} pts`,
      tone: "gold",
    });
  }

  // Team cup leader / champion
  const champMatch = cup.find((c) => c.round_id === "sat_pm");
  if (champMatch && champMatch.winner !== "tie") {
    const champ = champMatch.winner as TeamId;
    awards.push({
      emoji: "🏆",
      title: "Team Cup Champion",
      recipient: TEAMS[champ].name,
      detail: `${record[champ].w}-${record[champ].l}${record[champ].t ? `-${record[champ].t}` : ""} in cup matches`,
      tone: "gold",
    });
  } else if (holes.team1 > holes.team2) {
    awards.push({
      emoji: "🏆",
      title: "Cup Standing Leader",
      recipient: TEAMS.team1.name,
      detail: `${holes.team1} hole${holes.team1 === 1 ? "" : "s"} to ${holes.team2}`,
      tone: "info",
    });
  } else if (holes.team2 > holes.team1) {
    awards.push({
      emoji: "🏆",
      title: "Cup Standing Leader",
      recipient: TEAMS.team2.name,
      detail: `${holes.team2} hole${holes.team2 === 1 ? "" : "s"} to ${holes.team1}`,
      tone: "info",
    });
  }

  // Most 1st place finishes
  const firstLeader = PLAYER_ORDER.map((p) => ({ p, n: counts[p].first })).sort((a, b) => b.n - a.n)[0];
  if (firstLeader.n > 0) {
    awards.push({
      emoji: "🎯",
      title: "Solo Stud",
      recipient: PLAYERS[firstLeader.p].name,
      detail: `${firstLeader.n} first-place solo finish${firstLeader.n === 1 ? "" : "es"}`,
      tone: "gold",
    });
  }

  // Consistency — always on the podium
  if (soloRoundsPlayed >= 2) {
    const consistent = PLAYER_ORDER.filter(
      (p) => counts[p].first + counts[p].second + counts[p].third >= soloRoundsPlayed,
    );
    if (consistent.length > 0) {
      awards.push({
        emoji: "🎖️",
        title: "Mr. Consistent",
        recipient: consistent.map((p) => PLAYERS[p].name).join(", "),
        detail: "Podiumed in every solo game played",
        tone: "silver",
      });
    }
  }

  // Goose egg — worst solo finishers
  if (soloRoundsPlayed >= 1) {
    const geese = PLAYER_ORDER.filter(
      (p) => counts[p].none > 0 && counts[p].first + counts[p].second + counts[p].third === 0,
    );
    if (geese.length > 0) {
      awards.push({
        emoji: "🥚",
        title: "Goose Egg Watch",
        recipient: geese.map((p) => PLAYERS[p].name).join(", "),
        detail: "No solo podium finishes yet",
        tone: "shame",
      });
    }
  }

  // Team sweep / whitewash
  const cupMatchesPlayed = cup.filter((c) =>
    ROUNDS.find((r) => r.id === c.round_id)?.isCupMatch,
  ).length;
  if (cupMatchesPlayed >= 3) {
    if (record.team1.w === cupMatchesPlayed) {
      awards.push({
        emoji: "🧹",
        title: "Clean Sweep",
        recipient: TEAMS.team1.name,
        detail: "Unbeaten in cup matches",
        tone: "gold",
      });
    } else if (record.team2.w === cupMatchesPlayed) {
      awards.push({
        emoji: "🧹",
        title: "Clean Sweep",
        recipient: TEAMS.team2.name,
        detail: "Unbeaten in cup matches",
        tone: "gold",
      });
    }
  }

  // Medal counts
  const medalRows = PLAYER_ORDER.map((p) => ({
    id: p,
    name: PLAYERS[p].name,
    ...counts[p],
    total: totals[p],
  })).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-5">
      {awards.length === 0 ? (
        <div className="rounded-2xl bg-white border border-stone-200 p-6 text-sm text-stone-500 text-center">
          Awards unlock as scores roll in. Play a round to crown your first champion.
        </div>
      ) : (
        <ul className="space-y-3">
          {awards.map((a, i) => (
            <li
              key={i}
              className={`rounded-2xl border p-4 shadow-sm ${TONE_STYLES[a.tone ?? "info"]}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{a.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">{a.title}</div>
                  <div className="font-bold text-lg leading-tight">{a.recipient}</div>
                  <div className="text-xs text-stone-600 mt-0.5">{a.detail}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Medal Count</h2>
        <ul className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden divide-y divide-stone-100">
          {medalRows.map((row) => (
            <li key={row.id} className="px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">{row.name}</div>
              <div className="text-sm text-stone-700 tabular-nums">
                🥇 {row.first} · 🥈 {row.second} · 🥉 {row.third}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
