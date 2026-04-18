"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bend-trip-pin-ok";

export function PinGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const expected = process.env.NEXT_PUBLIC_TRIP_PIN ?? "";

  useEffect(() => {
    if (!expected) {
      setUnlocked(true);
      return;
    }
    setUnlocked(sessionStorage.getItem(STORAGE_KEY) === "1" || localStorage.getItem(STORAGE_KEY) === "1");
  }, [expected]);

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        className="w-full max-w-sm space-y-4 bg-white rounded-2xl shadow-md p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (pin === expected) {
            localStorage.setItem(STORAGE_KEY, "1");
            setUnlocked(true);
          } else {
            setError(true);
          }
        }}
      >
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Bend Trip 2026</h1>
          <p className="text-sm text-stone-500 mt-1">Enter the group PIN to continue.</p>
        </div>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError(false);
          }}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="PIN"
        />
        {error && <p className="text-sm text-rose-600">Nope — try again.</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-700 text-white font-semibold py-3 active:bg-emerald-800"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
