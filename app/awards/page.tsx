import { AwardsBoard } from "@/components/AwardsBoard";

export default function AwardsPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Awards</h1>
        <p className="text-stone-500 text-sm">Auto-computed bragging rights and shame.</p>
      </header>
      <AwardsBoard />
    </div>
  );
}
