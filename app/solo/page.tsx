import { SoloBoard } from "@/components/SoloBoard";

export default function SoloPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Solo Championship</h1>
        <p className="text-stone-500 text-sm">Team wins = 5 pts each. Solo: 5 / 3 / 1.</p>
      </header>
      <SoloBoard />
    </div>
  );
}
