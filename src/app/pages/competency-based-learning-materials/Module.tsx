// Module.tsx
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ChevronDown,
  ChevronUp,
  Lock,
  FileText,
  Table2,
  Flag,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  ButtonLink,
  SectionCard,
  SheetKind,
  sheetMeta,
  Status,
  StatusBadge,
} from "./Dashboard";
import { Breadcrumbs } from "../pageUtils";
import { learningOutcomes } from "@/app/data/cblmData";
import { Link } from "react-router-dom";

type LearningOutcome = (typeof learningOutcomes)[number];

const references = [
  {
    name: "FBS-CBC-NC2-2023-v1.pdf",
    type: "CBC",
    usedIn: "IS 5.1.1, IS 5.1.2, IS 5.2.1",
    flagged: false,
  },
  {
    name: "TRS-CS-NC2-Food-Beverage-2022.pdf",
    type: "CS",
    usedIn: "IS 5.1.1, IS 5.2.2",
    flagged: false,
  },
  {
    name: "CLM-Food-Beverage-NC2-v2.pdf",
    type: "CLM",
    usedIn: "IS 5.2.1",
    flagged: true,
  },
];

function StepCard({
  title,
  detail,
  status,
  index,
}: {
  title: string;
  detail: string;
  status: "done" | "active";
  index: number;
}) {
  return (
    <div
      className={`flex gap-3 border-b border-gray-200 p-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 ${
        status === "done" ? "bg-green-50" : "bg-blue-50"
      }`}
    >
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          status === "done" ? "bg-green-700" : "bg-blue-600"
        }`}
      >
        {status === "done" ? "✓" : index + 1}
      </span>

      <div>
        <div
          className={`text-xs font-semibold ${
            status === "done" ? "text-green-700" : "text-blue-700"
          }`}
        >
          {title}
        </div>

        <div className="mt-0.5 text-[11px] text-gray-600">{detail}</div>
      </div>
    </div>
  );
}

function SheetCard({
  kind,
  code,
  title,
  status,
}: {
  kind: SheetKind;
  code: string;
  title: string;
  status: Status;
}) {
  const meta = sheetMeta[kind];

  if (!meta) {
    console.error("Missing sheetMeta for kind:", kind);

    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Unknown sheet type: {kind}
      </div>
    );
  }

  const href =
    kind === "information-sheet" && code === "IS 5.2.1"
      ? "/cblm/editor"
      : `/cblm/editor?page=${kind}`;

  const isReview = status === "review";

  return (
    <div
      className={`flex gap-3 rounded-md border bg-white p-3 transition hover:shadow-sm ${
        isReview ? "border-orange-300" : "border-gray-200"
      }`}
    >
      <div className={`w-1 rounded ${meta.bg}`} />

      <div className="min-w-0 flex-1">
        <div
          className={`mb-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.color}`}
        >
          {meta.label}
        </div>

        <div className="mb-1 font-mono text-[11px] text-gray-500">{code}</div>

        {kind === "task-sheet" && (
          <div className="mb-2 inline-flex rounded border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
            ⚡ Conditional — LLM decided
          </div>
        )}

        {kind === "outcome-statement" && (
          <div className="mb-2 inline-flex rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
            ⚙ Observation Sheet
          </div>
        )}

        <div className="mb-2 text-xs font-medium leading-5 text-gray-800">
          {title}
        </div>

        <StatusBadge status={status} />

        <Link
          className={`mt-2 flex w-full items-center justify-center rounded border px-2 py-1.5 text-[11px] font-semibold transition ${
            isReview
              ? "border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100"
              : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
          }`}
          to={href}
        >
          {isReview ? "Review Required" : "View / Edit"}
        </Link>
      </div>
    </div>
  );
}

function LearningOutcomeCard({ lo }: { lo: LearningOutcome }) {
  const [open, setOpen] = useState(lo.no <= 2);

  return (
    <SectionCard className="overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-4 border-b px-5 py-4 text-left transition hover:bg-gray-50 ${
          open ? "border-gray-200" : "border-transparent"
        }`}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white ${
            lo.status === "review" ? "bg-orange-500" : "bg-gray-800"
          }`}
        >
          {lo.no}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Learning Outcome {lo.no}
          </div>

          <div className="mt-0.5 text-sm font-semibold text-gray-800">
            {lo.title}
          </div>

          <div className="mt-0.5 text-[11px] text-gray-500">{lo.meta}</div>
        </div>

        <StatusBadge status={lo.status} />

        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {open && (
        <>
          {lo.no <= 2 && (
            <div className="grid gap-3 bg-gray-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
              {lo.sheets.map(([kind, code, title, status]) => (
                <SheetCard
                  code={code}
                  key={`${code}-${title}`}
                  kind={kind as SheetKind}
                  status={status as Status}
                  title={title}
                />
              ))}
            </div>
          )}

          {lo.no === 3 && (
            <div className="space-y-4 bg-gray-50 p-4">
              <div className="text-sm text-gray-600">{lo.summary}</div>

              {lo.observationSheet && (
                <div className="flex gap-3 rounded-md border border-gray-200 bg-white p-4">
                  <div className="w-1 rounded bg-amber-700" />

                  <div>
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                      Operation Sheet
                    </div>

                    <div className="mb-1 font-mono text-[11px] text-gray-500">
                      {lo.observationSheet.code}
                      <span className="ml-1 italic text-gray-400">
                        — complex equipment detected by LLM
                      </span>
                    </div>

                    <div className="mb-2 text-sm font-semibold text-gray-800">
                      {lo.observationSheet.title}
                    </div>

                    <StatusBadge status={lo.observationSheet.status} />

                    <div className="mt-3 text-xs leading-5 text-gray-500">
                      {lo.observationSheet.description}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {lo.no === 4 && (
            <div className="bg-gray-50 p-4">
              <p className="text-sm text-gray-600">{lo.summary}</p>
            </div>
          )}
        </>
      )}
    </SectionCard>
  );
}

export function CBLMModule() {
  const stats = useMemo(() => {
    let validated = 0;
    let review = 0;
    let generated = 0;

    learningOutcomes.forEach((lo) => {
      lo.sheets.forEach((sheet) => {
        const status = sheet[3];

        if (status === "validated") validated++;
        if (status === "review") review++;
        if (status === "generated") generated++;
      });
    });

    return {
      validated,
      review,
      generated,
      total: validated + review + generated,
    };
  }, []);

  return (
    <div className="mx-auto max-w-8xl p-6 text-gray-800">
      <Breadcrumbs
        items={[
          {
            label: "Sector Details",
            href: "#",
          },
          {
            label: "Sector Projects",
            href: "/",
          },
          {
            label: "Competency Based Learning Materials (CBLM)",
            href: "/cblm",
          },
          {
            label: "Module",
            href: "/cblm/module",
          },
        ]}
      />

      {/* HEADER */}
      <SectionCard className="mb-5 p-5">
        <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-blue-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
                Common
              </span>

              <StatusBadge status="review" />
            </div>

            <h1 className="mb-1 text-xl font-bold text-gray-800">
              Provide Effective Customer Service
            </h1>

            <p className="text-sm text-gray-600">
              Unit Code: TRS141202 · Module 5 of 14 · 4 Learning Outcomes · 18
              sheets
            </p>
          </div>

          <div className="flex gap-2">
            <ButtonLink to="/cblm" variant="outline">
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </ButtonLink>

            <ButtonLink to="/cblm/export" variant="navy">
              <ArrowDownTrayIcon className="h-4 w-4" />
              Export (.docx)
            </ButtonLink>
          </div>
        </div>

        {/* STEP TRACKER */}
        <div className="grid overflow-hidden rounded-md border border-gray-200 lg:grid-cols-3">
          <StepCard
            title="Step 1 — Initialization"
            detail="Front Cover · How to Use · List of Competencies"
            status="done"
            index={0}
          />

          <StepCard
            title="Step 2 — Sheet Generation"
            detail="LO Summary · IS to SC to AK · conditional TS to PCC"
            status="done"
            index={1}
          />

          <StepCard
            title="Step 3 — Consolidation"
            detail="Job Sheet · Learning Experiences Table · References"
            status="active"
            index={2}
          />
        </div>

        {/* SUMMARY BAR */}
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-orange-200 bg-orange-50 px-4 py-3">
          <span className="text-xs font-semibold text-orange-700">
            2 sheets need trainer review before Step 3 can unlock
          </span>

          <span className="ml-auto text-xs font-semibold text-green-700">
            {stats.validated} validated
          </span>

          <span className="text-xs font-semibold text-orange-700">
            {stats.review} pending review
          </span>

          <span className="text-xs text-gray-500">
            {stats.generated} generated
          </span>

          <button className="inline-flex items-center gap-2 rounded bg-green-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-800">
            <CheckCircleIcon className="h-4 w-4" />
            Validate Module
          </button>
        </div>
      </SectionCard>

      {/* LEARNING OUTCOMES */}
      <div className="space-y-3">
        {learningOutcomes.map((lo) => (
          <LearningOutcomeCard key={lo.no} lo={lo} />
        ))}
      </div>

      {/* STEP 3 */}
      <div className="mt-8">
        <div className="mb-3 text-sm font-semibold text-gray-800">
          Step 3 — Consolidation
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <Lock className="h-4 w-4 text-amber-700" />

          <span className="text-sm text-amber-800">
            Unlocks when all Step 2 sheets are validated.
            <strong> 2 sheets still need review.</strong>
          </span>
        </div>

        {/* JOB SHEET + LE TABLE */}
        <div className="grid gap-4 xl:grid-cols-2">
          {/* JOB SHEET */}
          <SectionCard className="overflow-hidden">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-3 text-white">
              <FileText className="h-4 w-4" />

              <div className="text-sm font-semibold">Job Sheet — JS 5</div>

              <span className="ml-auto rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-slate-200">
                ⏳ Locked
              </span>
            </div>

            <div className="p-4">
              <p className="mb-3 text-xs text-gray-600">
                Integrates all Task Sheets for Module 5 into a single capstone
                performance activity.
              </p>

              <div className="rounded border border-gray-200 bg-gray-50 p-3 text-[11px] text-gray-600">
                <strong>Fields:</strong> Title · Performance Objective · Nominal
                Time · Safety Precaution · Equipment · Procedure · Assessment
                Methods · PCC
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500">
                <Lock className="h-3.5 w-3.5" />
                Awaiting Step 2 completion
              </button>
            </div>
          </SectionCard>

          {/* LEARNING EXPERIENCES TABLE */}
          <SectionCard className="overflow-hidden">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-3 text-white">
              <Table2 className="h-4 w-4" />

              <div className="text-sm font-semibold">
                Learning Experiences Table
              </div>

              <span className="ml-auto rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-slate-200">
                ⏳ Locked
              </span>
            </div>

            <div className="p-4">
              <p className="mb-3 text-xs text-gray-600">
                Auto-generated TESDA 2-column format after all sheets are
                validated.
              </p>

              <div className="overflow-hidden rounded border border-gray-300">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="border border-blue-700 bg-blue-600 px-3 py-2 text-left font-semibold text-white">
                        Learning Activities
                      </th>

                      <th className="border border-blue-700 bg-blue-600 px-3 py-2 text-left font-semibold text-white">
                        Special Instructions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-3 py-2 align-top">
                        • Read Information Sheet 5.1.1
                        <br />
                        • Answer Self-Check 5.1.1
                        <br />• Compare with Answer Key 5.1.1
                      </td>

                      <td
                        rowSpan={3}
                        className="border border-gray-200 bg-blue-50 px-3 py-2 align-top text-blue-800"
                      >
                        Be honest with your learning. Retake assessments below
                        80%.
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-gray-200 px-3 py-2 align-top">
                        • Read Information Sheet 5.1.2
                        <br />• Answer Self-Check 5.1.2
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-gray-200 px-3 py-2 align-top">
                        • Perform Task Sheet 5.1.1
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500">
                <Lock className="h-3.5 w-3.5" />
                Awaiting Step 2 completion
              </button>
            </div>
          </SectionCard>
        </div>

        {/* REFERENCES */}
        <SectionCard className="mt-4 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
            <div className="text-sm font-semibold text-gray-800">
              📚 References — Consolidated
            </div>

            <span className="ml-auto text-xs text-gray-500">
              Auto-compiled · Trainer may edit or flag
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Document / URL
                  </th>

                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Used In
                  </th>

                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {references.map((ref) => (
                  <tr
                    key={ref.name}
                    className={`border-b border-gray-100 text-sm hover:bg-gray-50 ${
                      ref.flagged ? "bg-red-50" : ""
                    }`}
                  >
                    <td
                      className={`px-4 py-3 font-mono text-xs ${
                        ref.flagged ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      {ref.name}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-bold ${
                          ref.type === "CBC"
                            ? "bg-blue-100 text-blue-700"
                            : ref.type === "CS"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {ref.type}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-600">
                      {ref.usedIn}
                    </td>

                    <td className="px-4 py-3 w-45 text-left">
                      <div className="flex items-center justify-left gap-2">
                        <button className="rounded border border-gray-200 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100">
                          Edit
                        </button>

                        <button
                          className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[11px] ${
                            ref.flagged
                              ? "border-red-200 bg-red-100 text-red-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Flag className="h-3 w-3" />
                          {ref.flagged ? "Flagged" : "Flag"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-[11px] text-gray-500">
            📌 References display filenames or URLs only — no clickable links.
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
