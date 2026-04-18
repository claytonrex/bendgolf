"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Course } from "@/lib/courses";
import { supabase, CourseNote, isSupabaseConfigured } from "@/lib/supabase";

export function CourseGuide({ course }: { course: Course }) {
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let alive = true;
    async function load() {
      const { data } = await supabase
        .from("course_notes")
        .select("*")
        .eq("course_id", course.id);
      if (!alive) return;
      const map: Record<number, string> = {};
      for (const n of (data ?? []) as CourseNote[]) {
        if (n.strategy) map[n.hole_number] = n.strategy;
      }
      setNotes(map);
      setLoading(false);
    }
    load();
    const interval = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [course.id]);

  async function save(holeNumber: number) {
    setSaving(true);
    const next = draft.trim();
    if (next) {
      await supabase.from("course_notes").upsert({
        course_id: course.id,
        hole_number: holeNumber,
        strategy: next,
        updated_at: new Date().toISOString(),
      });
      setNotes((prev) => ({ ...prev, [holeNumber]: next }));
    } else {
      await supabase
        .from("course_notes")
        .delete()
        .eq("course_id", course.id)
        .eq("hole_number", holeNumber);
      setNotes((prev) => {
        const { [holeNumber]: _removed, ...rest } = prev;
        return rest;
      });
    }
    setSaving(false);
    setEditing(null);
    setDraft("");
  }

  const totalPar = course.holes.reduce((a, h) => a + h.par, 0);
  const totalYards = course.holes.reduce((a, h) => a + (h.yardage ?? 0), 0);
  const front = course.holes.filter((h) => h.number <= 9);
  const back = course.holes.filter((h) => h.number > 9);
  const frontPar = front.reduce((a, h) => a + h.par, 0);
  const backPar = back.reduce((a, h) => a + h.par, 0);

  return (
    <div className="p-4 space-y-5">
      <Link href="/courses" className="text-sm text-emerald-700 font-semibold">← Courses</Link>

      <header>
        <h1 className="text-2xl font-black">{course.name}</h1>
        <p className="text-stone-500 text-sm">{course.location}</p>
        {course.holes.length > 0 && (
          <p className="text-xs text-stone-500 mt-1">
            {course.holes.length} holes · Par {totalPar}
            {totalYards ? ` · ${totalYards.toLocaleString()} yds from ${course.tee} tees` : ""}
            {back.length > 0 && (
              <> · Out {frontPar} / In {backPar}</>
            )}
          </p>
        )}
        {course.website && (
          <a href={course.website} target="_blank" rel="noreferrer" className="text-xs text-emerald-700 font-semibold mt-1 inline-block">
            Course website →
          </a>
        )}
      </header>

      {course.holes.length === 0 ? (
        <div className="rounded-2xl bg-white border border-stone-200 p-5 text-sm text-stone-500">
          Hole data coming soon. Strategy notes will be editable once hole data is loaded.
        </div>
      ) : (
        <ul className="space-y-2">
          {course.holes.map((h) => {
            const note = notes[h.number];
            const isEditing = editing === h.number;
            return (
              <li key={h.number} className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black text-lg shrink-0">
                    {h.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 text-sm">
                      <span className="font-bold">Par {h.par}</span>
                      {h.yardage != null && (
                        <span className="text-stone-600 tabular-nums">{h.yardage} yds</span>
                      )}
                      {h.handicap && (
                        <span className="text-xs text-stone-400">Hdcp {h.handicap}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={3}
                        autoFocus
                        placeholder="How to play it — club off tee, hazards, where to miss…"
                        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => save(h.number)}
                          disabled={saving}
                          className="flex-1 rounded-lg bg-emerald-700 text-white font-semibold py-2 text-sm disabled:opacity-50"
                        >
                          {saving ? "Saving…" : "Save"}
                        </button>
                        <button
                          onClick={() => {
                            setEditing(null);
                            setDraft("");
                          }}
                          className="rounded-lg border border-stone-300 font-semibold px-3 py-2 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : note ? (
                    <>
                      <div className="text-sm text-stone-800 whitespace-pre-wrap">{note}</div>
                      <button
                        onClick={() => {
                          setEditing(h.number);
                          setDraft(note);
                        }}
                        className="mt-2 text-xs text-emerald-700 font-semibold"
                      >
                        Edit
                      </button>
                    </>
                  ) : h.defaultStrategy ? (
                    <>
                      <div className="text-sm text-stone-700 italic">{h.defaultStrategy}</div>
                      <button
                        onClick={() => {
                          setEditing(h.number);
                          setDraft("");
                        }}
                        className="mt-2 text-xs text-emerald-700 font-semibold"
                      >
                        Add your strategy
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditing(h.number);
                        setDraft("");
                      }}
                      className="text-xs text-emerald-700 font-semibold"
                    >
                      + Add strategy notes
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {loading && <div className="text-xs text-stone-400 text-center">Loading notes…</div>}
    </div>
  );
}
