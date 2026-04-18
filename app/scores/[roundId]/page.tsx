import { notFound } from "next/navigation";
import { ROUNDS } from "@/lib/data";
import { ScoreEntry } from "@/components/ScoreEntry";

export default async function RoundScorePage({
  params,
}: {
  params: Promise<{ roundId: string }>;
}) {
  const { roundId } = await params;
  const round = ROUNDS.find((r) => r.id === roundId);
  if (!round) notFound();
  return <ScoreEntry round={round} />;
}
