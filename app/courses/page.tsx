import Link from "next/link";
import { COURSES, COURSE_ORDER } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Courses</h1>
        <p className="text-stone-500 text-sm">Hole-by-hole guide for each track.</p>
      </header>

      <ul className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
        {COURSE_ORDER.map((id) => {
          const c = COURSES[id];
          const total = c.holes.reduce((a, h) => a + h.par, 0);
          const yards = c.holes.reduce((a, h) => a + (h.yardage ?? 0), 0);
          return (
            <li key={id}>
              <Link href={`/courses/${id}`} className="flex items-center justify-between px-4 py-3 active:bg-stone-50">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-stone-500">
                    {c.location}
                    {c.holes.length > 0 && (
                      <> · {c.holes.length} holes · Par {total}{yards ? ` · ${yards.toLocaleString()} yds` : ""}</>
                    )}
                  </div>
                </div>
                <span className="text-stone-400">›</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
