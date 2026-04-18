import Link from "next/link";
import { DAYS, TRIP_START, TRIP_END } from "@/lib/data";
import { todayPacific, daysUntil } from "@/lib/date";
import { HomeLeaderboards } from "@/components/HomeLeaderboards";
import { DayCard } from "@/components/DayCard";

export default function HomePage() {
  const today = todayPacific();
  const until = daysUntil(TRIP_START);
  const todaysPlan = DAYS.find((d) => d.date === today);
  const preTrip = today < TRIP_START;
  const postTrip = today > TRIP_END;

  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Bend 2026</h1>
        <p className="text-stone-500 text-sm">Sunriver, OR · June 8–14</p>
      </header>

      <section className="rounded-2xl bg-emerald-700 text-white p-5 shadow-sm">
        {preTrip && (
          <>
            <div className="text-xs uppercase tracking-wider opacity-80">Countdown</div>
            <div className="text-5xl font-black mt-1">{until}</div>
            <div className="text-sm opacity-90">
              day{until === 1 ? "" : "s"} until we leave
            </div>
          </>
        )}
        {!preTrip && !postTrip && (
          <>
            <div className="text-xs uppercase tracking-wider opacity-80">We&apos;re here</div>
            <div className="text-3xl font-black mt-1">{todaysPlan?.title ?? "Enjoy the day"}</div>
            <div className="text-sm opacity-90">
              {todaysPlan?.day}, {today}
            </div>
          </>
        )}
        {postTrip && (
          <>
            <div className="text-xs uppercase tracking-wider opacity-80">Trip complete</div>
            <div className="text-3xl font-black mt-1">Until next year 🍻</div>
          </>
        )}
      </section>

      {todaysPlan && !preTrip && !postTrip && (
        <section>
          <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Today</h2>
          <DayCard day={todaysPlan} />
        </section>
      )}

      <HomeLeaderboards />

      <section>
        <h2 className="text-sm uppercase tracking-wider text-stone-500 mb-2">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/house"
            className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4 active:bg-stone-50"
          >
            <div className="text-2xl">🏡</div>
            <div className="font-semibold mt-1">House</div>
            <div className="text-xs text-stone-500">Address, Wi-Fi, door code</div>
          </Link>
          <Link
            href="/courses"
            className="rounded-2xl bg-white border border-stone-200 shadow-sm p-4 active:bg-stone-50"
          >
            <div className="text-2xl">⛳</div>
            <div className="font-semibold mt-1">Course Guides</div>
            <div className="text-xs text-stone-500">Hole-by-hole yardages</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
