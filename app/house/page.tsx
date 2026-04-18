import { HousePanel } from "@/components/HousePanel";

export default function HousePage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">The House</h1>
        <p className="text-stone-500 text-sm">Sunriver, OR — group stay</p>
      </header>
      <HousePanel />
    </div>
  );
}
