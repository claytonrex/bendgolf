"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/itinerary", label: "Plan", icon: "📅" },
  { href: "/cup", label: "Cup", icon: "🏆" },
  { href: "/solo", label: "Solo", icon: "⛳" },
  { href: "/scores", label: "Scores", icon: "✏️" },
  { href: "/house", label: "House", icon: "🏡" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 z-10">
      <div className="max-w-xl mx-auto grid grid-cols-6">
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 text-xs ${
                active ? "text-emerald-700" : "text-stone-500"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
