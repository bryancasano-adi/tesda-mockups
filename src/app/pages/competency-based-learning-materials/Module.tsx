import { Link } from "react-router-dom";
import { useState } from "react";

import { CblmSheetGenerationView } from "@/app/components/competency-based-learning-materials/CblmSheetGenerationView";
import {
  CblmPageShell,
  consolidationPillClassName,
  SectionCard,
  StatTile,
} from "@/app/components/competency-based-learning-materials/CblmFrontendPrimitives";
import {
  CONSOLIDATION_NAV,
  type ConsolidationPageId,
} from "@/app/components/competency-based-learning-materials/consolidation-nav";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";
import {
  consolidationPageStatuses,
  consolidationUnlocked,
  mockLoGroups,
  ucMeta,
} from "@/app/data/cblmData";
import {
  cblmDashboardPath,
  cblmFrontMatterPath,
  cblmVideoScriptsPath,
  consolidationNavHref,
} from "@/app/utils/cblmRoutes";

export function CBLMModule() {
  const { toast, showToast } = useCblmToast();
  const [showFinalize, setShowFinalize] = useState(false);
  const unlocked = consolidationUnlocked;

  const consolidationLinks: { page: ConsolidationPageId; label: string }[] = [
    { page: "job-sheet", label: "JS" },
    { page: "learning-experiences", label: "LET" },
    { page: "references", label: "References" },
    { page: "export", label: "Export" },
  ];

  return (
    <CblmPageShell>
      <div className="mb-2">
        <Link
          className="text-sm font-medium text-blue-700 hover:underline"
          to={cblmDashboardPath()}
        >
          ← Back to CBLM Dashboard
        </Link>
      </div>

      <div className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              CBLM — {ucMeta.unitCode}
            </h1>
            <p className="mt-1 text-sm text-gray-600">{ucMeta.titleLower}</p>
            <p className="mt-1 text-xs text-gray-400">
              Module 1 · Document No: {ucMeta.documentNo}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
              to={cblmFrontMatterPath()}
            >
              Front Matter
            </Link>
            <Link
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
              to={cblmVideoScriptsPath()}
            >
              Video Scripts
            </Link>
            <Link
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
              to={consolidationNavHref("export")}
            >
              Export .docx
            </Link>
            <button
              className="rounded-md bg-green-700 px-3 py-2 text-xs font-semibold text-white hover:bg-green-800"
              type="button"
              onClick={() => setShowFinalize(true)}
            >
              Finalize Module
            </button>
          </div>
        </div>

        <SectionCard className="mt-0" title="Module Generation Status">
          <div className="space-y-4 p-5">
            <div className="grid items-stretch gap-4 md:grid-cols-3">
              <StatTile compact label="Current step" value="Step 2 — Sheet Generation" />
              <StatTile label="LOs finalized" value="0 of 3" />
              <StatTile label="Sheets generated" value="6" />
            </div>
            <p className="text-xs text-gray-600">
              6 sheets generated · Step 3 consolidation locked until Step 2 is
              fully finalized
            </p>
          </div>
        </SectionCard>

        <SectionCard
          rightSlot={
            <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
              Finalized
            </span>
          }
          title="Step 1 — Auto-Initialization"
        >
          <div className="flex flex-wrap gap-2 p-5">
            {[
              "Front Cover",
              "How to Use Module",
              "List of Competencies",
              "Module Content",
              "Prerequisites",
              "LO Summary Table",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-green-700 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
              >
                ✓ {label}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-600">
            Step 1 sections are auto-populated from the finalized CLM, CS, and
            CBC. Read-only — no AI generation.{" "}
            <Link
              className="text-blue-700 hover:underline"
              to={cblmFrontMatterPath()}
            >
              View front matter →
            </Link>
          </div>
        </SectionCard>

        <SectionCard
          rightSlot={
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
              In Progress
            </span>
          }
          title="Step 2 — Sheet Generation"
        >
          <div className="p-5">
            <CblmSheetGenerationView loGroups={mockLoGroups} />
          </div>
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-600">
            Sheets are generated per learning outcome: Information Sheet →
            Self-Check → Answer Key, Task Sheet → Performance Criteria Checklist,
            and Operation Sheet where applicable.
          </div>
        </SectionCard>

        <SectionCard
          rightSlot={
            !unlocked ? (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500">
                🔒 Locked — finalize all Step 2 sheets first
              </span>
            ) : (
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">
                In Progress
              </span>
            )
          }
          title="Step 3 — Consolidation"
        >
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {consolidationLinks.map(({ page, label }) => {
                const locked = !unlocked && page !== "export";

                if (locked) {
                  return (
                    <span
                      key={page}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-400"
                    >
                      {label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={page}
                    className={
                      page === "export"
                        ? "inline-flex items-center rounded-full border border-blue-700 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 no-underline"
                        : `${consolidationPillClassName(
                            consolidationPageStatuses[page] ?? "draft",
                          )} no-underline`
                    }
                    to={consolidationNavHref(page)}
                  >
                    {page === "export" ? `${label} →` : label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3 text-xs text-gray-600">
            Job Sheet and LET are generated automatically after all Step 2
            sheets are finalized for all 3 LOs.
          </div>
        </SectionCard>

        <div className="mb-12 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-6 py-4">
            <h2 className="flex items-center gap-2 text-base font-semibold text-green-800">
              <span aria-hidden>📚</span>
              Video Scripts (Media Scripts)
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500">
                🔒 Available after CBLM finalized
              </span>
              <Link
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
                to={cblmVideoScriptsPath()}
              >
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="px-6 py-4 text-xs leading-relaxed text-gray-600">
            One video script per Task Sheet or Job Sheet. Two-column AUDIO -
            VIDEO format. Generated from finalized TS/JS + Performance Criteria
            Checklist. Duration target: 3–5 minutes per script.
          </div>
        </div>
      </div>

      {showFinalize && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-gray-900">
              Finalize CBLM module?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Finalize this CBLM module when all required sheets have been
              reviewed. Finalized modules become read-only.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                type="button"
                onClick={() => setShowFinalize(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
                type="button"
                onClick={() => {
                  setShowFinalize(false);
                  showToast("CBLM module finalized", "#15803D");
                }}
              >
                Finalize
              </button>
            </div>
          </div>
        </div>
      )}

      <CblmToast toast={toast} />
    </CblmPageShell>
  );
}
