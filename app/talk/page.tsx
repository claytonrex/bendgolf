import { TrashTalkFeed } from "@/components/TrashTalkFeed";

export default function TalkPage() {
  return (
    <div className="p-4 space-y-5">
      <header className="pt-4">
        <h1 className="text-3xl font-black tracking-tight">Trash Talk</h1>
        <p className="text-stone-500 text-sm">No filters. No rules. Keep it funny.</p>
      </header>
      <TrashTalkFeed />
    </div>
  );
}
