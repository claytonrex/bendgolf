import Link from "next/link";
import { ROUNDS } from "@/lib/data";

export default function ScoresHubPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Score Entry</h1>
        <p className="text-stone-500 text-sm">Log the result after each round.</p>
      </header>
      <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
        {ROUNDS.map((r) => (
          <li key={r.id}>
            <Link href={`/scores/${r.id}`} className="flex items-center justify-between px-4 py-3 active:bg-stone-50">
              <div>
                <div className="font-semibold">{r.course}</div>
                <div className="text-xs text-stone-500">
                  {r.day} {r.slot} · {r.formatLabel}
                </div>
              </div>
              <span className="text-stone-400">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
