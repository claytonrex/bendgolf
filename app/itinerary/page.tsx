import Link from "next/link";
import { DAYS, ROUNDS } from "@/lib/data";
import { DayCard } from "@/components/DayCard";
import { RoundWeather } from "@/components/RoundWeather";

export default function ItineraryPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Itinerary</h1>
        <p className="text-stone-500 text-sm">Day-by-day plan</p>
      </header>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>

      <section className="pt-2">
        <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Rounds</h2>
        <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
          {ROUNDS.map((r) => (
            <li key={r.id} className="px-4 py-3">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{r.course}</div>
                <div className="text-xs text-stone-500">{r.day} {r.slot}</div>
              </div>
              <div className="text-sm text-stone-700 mt-0.5">{r.formatLabel}</div>
              <div className="text-xs text-stone-500 mt-0.5">
                {r.teeTime} · {r.cost}
                {r.isChampionship && <span className="ml-2 text-emerald-700 font-semibold">FINALS</span>}
              </div>
              {r.notes && <div className="text-xs text-stone-400 mt-1">{r.notes}</div>}
              <div className="mt-2">
                <RoundWeather round={r} />
              </div>
              <div className="flex gap-3 mt-1">
                <Link
                  href={`/courses/${r.courseId}`}
                  className="text-xs text-emerald-700 font-semibold"
                >
                  Hole guide →
                </Link>
                {r.website && (
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-700 font-semibold"
                  >
                    Course site →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
