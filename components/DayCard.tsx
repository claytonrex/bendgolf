import { DayPlan } from "@/lib/data";

const KIND_STYLES: Record<string, string> = {
  golf: "bg-emerald-100 text-emerald-800",
  meal: "bg-amber-100 text-amber-800",
  travel: "bg-sky-100 text-sky-800",
  activity: "bg-stone-100 text-stone-700",
};

const KIND_LABEL: Record<string, string> = {
  golf: "GOLF",
  meal: "FOOD",
  travel: "GO",
  activity: "DO",
};

export function DayCard({ day }: { day: DayPlan }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm border border-stone-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-100 flex items-baseline justify-between">
        <div>
          <div className="font-semibold">{day.day}</div>
          <div className="text-xs text-stone-500">{day.title}</div>
        </div>
        <div className="text-xs text-stone-400">{day.date}</div>
      </div>
      <ul className="divide-y divide-stone-100">
        {day.items.map((item, i) => {
          const kind = item.kind ?? "activity";
          return (
            <li key={i} className="px-4 py-3 flex gap-3">
              <span
                className={`shrink-0 text-[10px] font-bold rounded px-1.5 py-0.5 self-start mt-0.5 ${KIND_STYLES[kind]}`}
              >
                {KIND_LABEL[kind]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  {item.time && <span className="text-sm font-semibold text-stone-700">{item.time}</span>}
                  <span className="text-sm text-stone-900">{item.label}</span>
                </div>
                {item.detail && <div className="text-xs text-stone-500 mt-0.5">{item.detail}</div>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
