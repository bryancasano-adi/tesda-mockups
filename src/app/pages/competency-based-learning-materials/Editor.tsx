// Editor.tsx
import { CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SheetKind, sheetMeta, Status, SourcePanel } from "./Dashboard";
import { useState, useRef, useEffect } from "react";
import { Breadcrumbs } from "../pageUtils";
import { useSearchParams } from "react-router-dom";
import { EditorContent } from "@/app/components/competency-based-learning-materials/EditorContent";

function EditorNav({ active }: { active: SheetKind }) {
  const items: Array<[SheetKind, string, Status]> = [
    ["information-sheet", "IS 5.2.1", "review"],
    ["self-check", "SC 5.2.1", "review"],
    ["answer-key", "AK 5.2.1", "generated"],
    ["task-sheet", "TS 5.2.1", "generated"],
    ["performance-criterion", "PCC 5.2.1", "generated"],
    ["outcome-statement", "OS 5.3.1", "validated"],
    ["job-sheet", "JS 5", "locked"],
    ["learning-experiences-table", "LET 5", "locked"],
  ];

  return (
    <aside className="w-56 min-w-56 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 bg-white p-4">
        <Link
          className="mb-1 block text-xs font-semibold text-blue-700 hover:underline"
          to="/cblm/module"
        >
          ← Module 5
        </Link>
        <div className="text-xs font-semibold text-gray-800">
          Provide Effective Customer Service
        </div>
        <div className="mt-1 text-[10px] text-gray-500">4 LOs · 18 sheets</div>
      </div>
      <div className="p-2">
        <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          LO 2 — Complaints
        </div>
        {items.map(([kind, code, status]) => (
          <Link
            className={`mb-1 flex gap-2 rounded px-2 py-2 text-xs hover:bg-gray-100 ${
              active === kind ? "bg-blue-50 text-blue-700" : "text-gray-600"
            } ${status === "locked" ? "opacity-60" : ""}`}
            key={kind}
            to={`/cblm/editor?page=${kind}`}
          >
            <span
              className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                status === "review"
                  ? "bg-orange-500"
                  : status === "locked"
                    ? "bg-gray-400"
                    : "bg-green-700"
              }`}
            />
            <span>
              <span className="block font-mono text-[10px] text-gray-500">
                {code}
              </span>
              <span className="block leading-4">{sheetMeta[kind].label}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function SheetTabs({
  kind,
  sheetMeta,
}: {
  kind: SheetKind;
  sheetMeta: Record<SheetKind, { label: string; bg: string }>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);

    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-4 rounded-md border border-gray-200 bg-white p-2">
      <div className="relative flex items-center">
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 flex h-full items-center bg-gradient-to-r from-white pr-2"
          >
            ←
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex flex-1 gap-2 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {(Object.keys(sheetMeta) as SheetKind[]).map((item) => (
            <Link
              key={item}
              to={`/cblm/editor?page=${item}`}
              className={`shrink-0 rounded border px-3 py-1.5 text-xs font-semibold ${
                item === kind
                  ? `${sheetMeta[item].bg} border-transparent text-white`
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              {sheetMeta[item].label}
            </Link>
          ))}
        </div>

        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 flex h-full items-center bg-gradient-to-l from-white pl-2"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}

export function CBLMEditor() {
  const [searchParams] = useSearchParams();
  const [noticeValidated, setNoticeValidated] = useState(false);
  const page = searchParams.get("page") as SheetKind | null;

  const validKinds: SheetKind[] = [
    "information-sheet",
    "self-check",
    "answer-key",
    "task-sheet",
    "performance-criterion",
    "outcome-statement",
    "job-sheet",
    "learning-experiences-table",
  ];

  const kind: SheetKind =
    page && validKinds.includes(page) ? page : "information-sheet";

  const meta = sheetMeta[kind];

  return (
    <div className="w-full max-w-none">
      <div className="-m-6 flex h-[calc(100vh-3rem)] flex-col overflow-hidden bg-white text-gray-800">
        <div className="flex h-12 flex-shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-5 mt-8">
          <Breadcrumbs
            items={[
              {
                label: "Sector Details",
                href: `#`,
              },
              {
                label: "Sector Projects",
                href: `/`,
              },
              {
                label: "Competency Based Learning Materials (CBLM)",
                href: `/cblm`,
              },
              {
                label: "Module",
                href: `/cblm/module`,
              },
              {
                label: `${meta.code} — ${meta.label}`,
                href: `/cblm/editor?page=${kind}`,
              },
            ]}
          />
        </div>

        <div
          className={`flex items-center gap-2 border-b px-4 py-2 text-xs font-medium ${
            noticeValidated
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-orange-200 bg-orange-50 text-orange-700"
          }`}
        >
          {noticeValidated ? (
            <>
              <CheckCircleIcon className="h-4 w-4 text-green-600" />
              <strong>Sheet validated by trainer</strong> — Validation recorded.
              Proceed to SC 5.2.1.
            </>
          ) : (
            <>
              <span>⚑</span>
              <strong>Trainer review required</strong> — Review all editable
              fields below. Click "Validate Sheet" when satisfied.
              <button
                className="ml-auto inline-flex items-center gap-1 rounded bg-green-700 px-3 py-1 text-[11px] font-semibold text-white hover:bg-green-800"
                onClick={() => setNoticeValidated(true)}
              >
                <CheckCircleIcon className="h-3.5 w-3.5" />
                Validate Sheet
              </button>
            </>
          )}
        </div>
        <div className="flex min-h-0 flex-1 bg-gray-50">
          <EditorNav active={kind} />

          <main className="min-w-0 flex-1 overflow-y-auto p-6">
            <SheetTabs kind={kind} sheetMeta={sheetMeta} />
            <EditorContent kind={kind} />
          </main>

          <SourcePanel />
        </div>
      </div>
    </div>
  );
}
