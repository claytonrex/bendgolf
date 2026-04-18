import { CupBoard } from "@/components/CupBoard";

export default function CupPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">The Cup</h1>
        <p className="text-stone-500 text-sm">Holes accumulated set Saturday starting position.</p>
      </header>
      <CupBoard />
    </div>
  );
}
