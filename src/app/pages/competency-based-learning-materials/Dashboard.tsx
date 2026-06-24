import { Link } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ClockIcon,
  PlayIcon,
  SparklesIcon,
  EllipsisHorizontalIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  TrashIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

import { Breadcrumbs } from "../pageUtils";
import { modules } from "@/app/data/cblmData";

export type Status =
  | "validated"
  | "review"
  | "generated"
  | "generating"
  | "locked"
  | "fetched"
  | "not-started";

export type SheetKind =
  | "information-sheet"
  | "self-check"
  | "answer-key"
  | "task-sheet"
  | "performance-criterion"
  | "outcome-statement"
  | "job-sheet"
  | "learning-experiences-table";

export type FrontMatterKind = "cover" | "howto" | "list";

export const sheetMeta: Record<
  SheetKind,
  {
    label: string;
    code: string;
    title: string;
    color: string;
    bg: string;
  }
> = {
  "information-sheet": {
    label: "Information Sheet",
    code: "1.1-1",
    title: "Customer Complaint Handling Procedures",
    color: "text-blue-700",
    bg: "bg-blue-600",
  },
  "self-check": {
    label: "Self-Check",
    code: "1.1-1",
    title: "Multiple Choice · Customer Complaints",
    color: "text-violet-700",
    bg: "bg-violet-600",
  },
  "answer-key": {
    label: "Answer Key",
    code: "1.1-1",
    title: "Answers and Rationales",
    color: "text-green-700",
    bg: "bg-green-700",
  },
  "task-sheet": {
    label: "Task Sheet",
    code: "1.1-3",
    title: "Complaint Resolution Role-Play",
    color: "text-orange-700",
    bg: "bg-orange-500",
  },
  "performance-criterion": {
    label: "Performance Criteria Checklist",
    code: "1.1-3",
    title: "Complaint Handling Performance Criteria",
    color: "text-red-700",
    bg: "bg-red-600",
  },
  "outcome-statement": {
    label: "Outcome Statement",
    code: "OS 5.2.1",
    title: "Learning Outcome Statement",
    color: "text-blue-700",
    bg: "bg-blue-500",
  },
  "job-sheet": {
    label: "Job Sheet",
    code: "1.1-3",
    title: "Integrated EV Fleet Inspection Job Sheet",
    color: "text-slate-800",
    bg: "bg-slate-800",
  },
  "learning-experiences-table": {
    label: "Learning Experiences Table",
    code: "LET 5",
    title: "Learning Experiences by Learning Outcome",
    color: "text-cyan-700",
    bg: "bg-cyan-700",
  },
};

export const frontMatterMeta: Record<
  FrontMatterKind,
  {
    label: string;
    title: string;
  }
> = {
  cover: {
    label: "Front Cover",
    title: "Competency-Based Learning Material Cover",
  },
  howto: {
    label: "How to Use This Module",
    title: "Learner Guide and Instructions",
  },
  list: {
    label: "List of Competencies",
    title: "Qualification Competency Structure",
  },
};

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "green" | "navy" | "orange";
  className?: string;
}) {
  const classes = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    green: "bg-green-700 text-white hover:bg-green-800",
    navy: "bg-[#1B3A5C] text-white hover:bg-[#11263c]",
    orange: "bg-orange-500 text-white hover:bg-orange-600",
  };

  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors",
        classes[variant],
        className,
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    fetched: "border border-dashed border-gray-300 bg-gray-50 text-gray-600",
    validated: "bg-green-50 text-green-700",
    review: "bg-orange-50 text-orange-700",
    generated: "bg-blue-50 text-blue-700",
    generating: "bg-blue-50 text-blue-700",
    locked: "bg-gray-100 text-gray-500",
    "not-started": "bg-gray-100 text-gray-500",
  };

  const labels: Record<Status, string> = {
    fetched: "Fetched from DB",
    validated: "Validated",
    review: "Awaiting Review",
    generated: "Generated",
    generating: "Generating",
    locked: "Locked",
    "not-started": "Not Started",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold",
        styles[status],
      )}
    >
      {status === "generating" && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-700" />
      )}
      {status === "validated" && <CheckCircleIcon className="h-3.5 w-3.5" />}
      {status === "review" && (
        <ExclamationTriangleIcon className="h-3.5 w-3.5" />
      )}
      {labels[status]}
    </span>
  );
}

export function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-md border border-gray-200 bg-white",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function StepCard({
  step,
  title,
  details,
  status,
  percent,
}: {
  step: string;
  title: string;
  details: string;
  status: "done" | "active" | "next";
  percent: number;
}) {
  const colors = {
    done: {
      text: "text-green-700",
      bar: "bg-green-700",
    },
    active: {
      text: "text-orange-700",
      bar: "bg-orange-500",
    },
    next: {
      text: "text-gray-500",
      bar: "bg-gray-400",
    },
  };

  return (
    <div className="rounded border border-gray-200 bg-gray-50">
      <div className="border-b border-gray-200 px-4 py-2">
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-wide",
            colors[status].text,
          )}
        >
          {step}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-2 text-sm font-semibold text-gray-800">{title}</div>

        <div className="mb-2 h-1 overflow-hidden rounded bg-gray-200">
          <div
            className={cn("h-full", colors[status].bar)}
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className={cn("text-[11px] leading-5", colors[status].text)}>
          {details}
        </p>
      </div>
    </div>
  );
}

function ProgressModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(27);
  const [complete, setComplete] = useState(3);

  const rows = useMemo(
    () => [
      {
        mod: "Mod 4",
        title: "Implement and Monitor Infection Control Policies",
        status: "done",
      },
      {
        mod: "Mod 5",
        title: "Provide Effective Customer Service",
        status: "done",
      },
      {
        mod: "Mod 6",
        title: "Maintain an Effective Relationship with Clients",
        status: "generating",
      },
      {
        mod: "Mod 7",
        title: "Manage Own Performance",
        status: "queued",
      },
      {
        mod: "Mod 8",
        title: "Develop and Update Industry Knowledge",
        status: "queued",
      },
      {
        mod: "Mod 9",
        title: "Prepare the Bar/Counter Area",
        status: "queued",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setComplete((v) => {
        if (v >= 11) return v;
        return v + 1;
      });

      setProgress((v) => {
        if (v >= 100) return v;
        return Math.min(v + 9, 100);
      });
    }, 1400);

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-[#1B3A5C] px-5 py-4 text-white">
          <div>
            <div className="text-sm font-bold">Generating All Modules</div>
            <div className="text-xs text-blue-100">
              Food and Beverage Services NC II
            </div>
          </div>

          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-gray-200 p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>

            <span className="text-sm font-bold text-blue-700">{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded bg-gray-200">
            <div
              className="h-full rounded bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 text-xs text-gray-500">
            {complete} of 11 complete
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {rows.map((row) => (
            <div
              key={row.mod}
              className="flex items-center gap-4 border-b border-gray-100 px-5 py-4"
            >
              <span className="w-14 text-xs font-semibold text-gray-400">
                {row.mod}
              </span>

              <div className="flex-1 text-sm text-gray-700">{row.title}</div>

              {row.status === "done" && <StatusBadge status="validated" />}

              {row.status === "generating" && (
                <StatusBadge status="generating" />
              )}

              {row.status === "queued" && <StatusBadge status="not-started" />}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 p-4">
          <button className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100">
            Cancel Generation
          </button>

          <button
            onClick={onClose}
            className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");

  if (!open) return null;

  const enabled = value.toLowerCase() === "module 5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b border-red-100 bg-red-50 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-700">
              <TrashIcon className="h-5 w-5" />
              <span className="font-semibold">Reset Module?</span>
            </div>

            <button onClick={onClose}>
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="text-sm text-gray-600">
            This will permanently delete all generated sheets for this module.
          </p>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
            <div className="mb-2 font-semibold text-gray-800">
              Will be deleted:
            </div>

            <ul className="ml-5 list-disc space-y-1">
              <li>Generated sheets</li>
              <li>Validation records</li>
              <li>Export history</li>
            </ul>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-600">
              Type “Module 5” to confirm
            </label>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            disabled={!enabled}
            className={cn(
              "rounded-md px-4 py-2 text-xs font-semibold text-white",
              enabled
                ? "bg-red-600 hover:bg-red-700"
                : "cursor-not-allowed bg-gray-300",
            )}
          >
            Reset Module
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionMenu({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded border border-gray-300 bg-white p-1.5 hover:bg-gray-50"
      >
        <EllipsisHorizontalIcon className="h-4 w-4 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-gray-50">
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export .docx
          </button>

          <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs hover:bg-gray-50">
            <ArrowPathIcon className="h-4 w-4" />
            Regenerate
          </button>

          <button
            onClick={onDelete}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
            Reset Module
          </button>
        </div>
      )}
    </div>
  );
}

export function CBLMDashboard() {
  const [showProgress, setShowProgress] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <ProgressModal
        open={showProgress}
        onClose={() => setShowProgress(false)}
      />

      <DeleteModal open={showDelete} onClose={() => setShowDelete(false)} />

      <div className="mx-auto max-w-[1600px] p-6 text-gray-800">
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
          ]}
        />

        {/* Header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-1 text-[24px] font-bold text-gray-800">
              Competency-Based Learning Material (CBLM)
            </h1>

            <p className="text-sm text-gray-600">
              Food and Beverage Services NC II · Sector: Tourism · Qualification
              Code: TRS322201
            </p>
          </div>

          <button
            onClick={() => setShowProgress(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <PlayIcon className="h-4 w-4" />
            Generate All (11)
          </button>
        </div>

        {/* Alert */}
        <div className="mb-5 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4">
          <ClockIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />

          <div>
            <div className="text-sm font-semibold text-orange-700">
              Phase 1 Active — Restricted Inputs Only
            </div>

            <p className="mt-1 text-xs leading-6 text-amber-900">
              Information Sheet body content uses LLM knowledge plus CS, CBC,
              and CLM documents only. Phase 2, user-provided URLs, is gated
              behind TESDA quality validation.
            </p>
          </div>
        </div>

        {/* Progress */}
        <SectionCard className="mb-5">
          <div className="border-b border-gray-200 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">
                Overall Generation Progress
              </span>

              <span className="text-xs text-gray-600">
                14 modules total · 11 to generate · 3 fetched from DB
              </span>
            </div>

            <div className="mb-2 h-2 overflow-hidden rounded bg-gray-200">
              <div
                className="h-full rounded bg-orange-500"
                style={{ width: "27%" }}
              />
            </div>

            <div className="text-xs text-gray-600">
              27% — 3 of 11 modules complete · Phase 1 active
            </div>
          </div>

          <div className="grid gap-3 p-5 lg:grid-cols-3">
            <StepCard
              details="Front Cover · How to Use · List of Competencies · Module Content"
              percent={100}
              status="done"
              step="Step 1"
              title="Auto-Initialization"
            />

            <StepCard
              details="LO Summary · IS to SC to AK · Conditional TS to PCC · OS per LO"
              percent={27}
              status="active"
              step="Step 2"
              title="Sheet Generation per LO"
            />

            <StepCard
              details="Job Sheet · Learning Experiences Table · References"
              percent={9}
              status="next"
              step="Step 3"
              title="Consolidation"
            />
          </div>
        </SectionCard>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-5 rounded-md border border-gray-200 bg-white px-4 py-3 text-xs">
          <span className="font-semibold text-gray-800">Status Legend</span>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-green-700" />
            Validated
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Awaiting Review
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Generating
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            Not Started
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-5">
          {modules.map((group) => (
            <SectionCard key={group.group}>
              <div
                className={cn(
                  "px-4 py-3 text-xs font-bold uppercase tracking-wide text-white",
                  group.color,
                )}
              >
                {group.group}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                      <th className="w-24 px-4 py-3">Module</th>

                      <th className="px-4 py-3">Unit of Competency</th>

                      <th className="w-40 px-4 py-3">Unit Code</th>

                      <th className="w-40 px-4 py-3">LOs / Sheets</th>

                      <th className="w-48 px-4 py-3 text-center">Status</th>

                      <th className="w-44 px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {group.items.map((item) => (
                      <tr
                        key={item.no}
                        className={cn(
                          "border-b border-gray-100 transition-colors hover:bg-gray-50",
                          item.current && "bg-blue-50/60",
                        )}
                      >
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {item.no}
                        </td>

                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-800">
                            {item.title}
                          </div>
                        </td>

                        <td className="px-4 py-4 font-mono text-xs text-gray-600">
                          {item.code}
                        </td>

                        <td className="px-4 py-4 text-xs text-gray-600">
                          {item.los}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <StatusBadge status={item.status as Status} />

                            {item.status === "generating" && (
                              <>
                                <div className="h-1 w-28 overflow-hidden rounded bg-gray-200">
                                  <div
                                    className="h-full bg-blue-600"
                                    style={{
                                      width: "58%",
                                    }}
                                  />
                                </div>

                                <span className="text-[10px] text-gray-500">
                                  Step 2 · LO 2/3
                                </span>
                              </>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {item.current || item.status === "validated" ? (
                              <ButtonLink to="/cblm/demo" variant="outline">
                                Open
                              </ButtonLink>
                            ) : item.status === "review" ? (
                              <ButtonLink to="/cblm/demo" variant="orange">
                                Review
                              </ButtonLink>
                            ) : item.status === "generating" ? (
                              <button className="inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-700" />
                                Working
                              </button>
                            ) : item.status === "fetched" ? (
                              <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-200">
                                View Only
                              </button>
                            ) : (
                              <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                                <PlayIcon className="h-4 w-4" />
                                Generate
                              </button>
                            )}

                            {item.status !== "fetched" && (
                              <ActionMenu
                                onDelete={() => setShowDelete(true)}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          ))}
        </div>

        {/* Export Note */}
        <SectionCard className="mt-5 p-5">
          <div className="mb-1 text-sm font-semibold text-blue-700">
            CBLM Export — Word Document (.docx)
          </div>

          <p className="text-xs leading-6 text-gray-600">
            The exported file follows the TESDA CBLM template structure: front
            cover, how-to guide, competency list, module content, LO summaries,
            learning experiences tables, information sheets, self-checks, answer
            keys, task sheets, performance criteria checklists, job sheet,
            references, and the standard TESDA footer.
          </p>
        </SectionCard>

        {/* Open Items */}
        <SectionCard className="mt-5 border-amber-200">
          <div className="border-b border-amber-200 bg-amber-50 px-5 py-4">
            <div className="text-sm font-semibold text-orange-700">
              Open Items — Design/Build Blocked Until Resolved
            </div>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-2">
            <div className="text-xs text-gray-600">
              Operation Sheet criteria — Formal written criteria pending
            </div>

            <div className="text-xs text-gray-600">
              Learning Materials Validation — Workflow and rules pending FGD
            </div>

            <div className="text-xs text-gray-600">
              Video Scripts — Generation rules not finalized
            </div>

            <div className="text-xs text-green-700">
              CBLM Requirements — Signed off by CTAD QSO
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
type SourcePanelProps = {
  isFrontMatter?: boolean;
};

export function SourcePanel({ isFrontMatter = false }: SourcePanelProps) {
  return (
    <aside className="w-65 min-w-65 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white">
      {isFrontMatter ? (
        <>
          {/* FRONT MATTER VERSION */}
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">📋</span>
              <span className="text-sm font-semibold text-gray-800">
                Metadata Source
              </span>
            </div>
          </div>

          <div className="space-y-3 p-3">
            <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                <span className="text-[10px] font-bold tracking-wide text-gray-600">
                  Qualification Source
                </span>

                <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                  CBC
                </span>
              </div>

              <div className="p-3 text-[11px] leading-5 text-gray-700">
                <strong>Qualification:</strong> Food and Beverage Services NC II
                <br />
                <strong>Code:</strong> TRS322201
                <br />
                <strong>Sector:</strong> Tourism
                <br />
                <strong>NC Level:</strong> II
              </div>
            </div>

            <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                <span className="text-[10px] font-bold tracking-wide text-gray-600">
                  Module Source
                </span>

                <span className="rounded bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-700">
                  CS
                </span>
              </div>

              <div className="p-3 text-[11px] leading-5 text-gray-700">
                <strong>Module 5:</strong> Provide Effective Customer Service
                <br />
                <strong>Unit Code:</strong> TRS141202
              </div>
            </div>

            <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] leading-5 text-gray-500">
              No AI Regenerate on front matter — all fields are structured
              metadata from the qualification.
            </div>
          </div>
        </>
      ) : (
        <>
          {/* STANDARD SOURCE PANEL */}
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">🧠</span>

              <span className="text-sm font-semibold text-gray-800">
                Generation Context
              </span>
            </div>
          </div>

          <div className="space-y-3 p-3">
            {/* WARNING */}
            <div className="rounded border border-yellow-300 bg-yellow-50 px-3 py-2 text-[11px] text-amber-800">
              ⚠️ <strong>Phase 1</strong> — No web URLs or e-library. Sources:
              LLM + CS / CBC / CLM only.
            </div>

            {/* CBC */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                Content Item (CBC)
              </div>

              <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                  <span className="text-[10px] font-semibold text-gray-700">
                    CBC — LO 2, Item 1
                  </span>

                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                    CBC
                  </span>
                </div>

                <div className="p-3 text-[11px] leading-5 text-gray-700">
                  <strong>Item:</strong> Customer Complaint Handling Procedures
                  <br />
                  <strong>Nominal duration:</strong> 6 hours
                </div>
              </div>
            </div>

            {/* CS */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                Performance Criteria (CS)
              </div>

              <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                  <span className="text-[10px] font-semibold text-gray-700">
                    Competency Standards
                  </span>

                  <span className="rounded bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-700">
                    CS
                  </span>
                </div>

                <div className="p-3 text-[11px] leading-5 text-gray-700">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Complaints resolved per establishment standards</li>
                    <li>De-escalation applied per TESDA standards</li>
                    <li>Complaint documented per SOP</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CLM */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                Assessment Methods (CLM)
              </div>

              <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                  <span className="text-[10px] font-semibold text-gray-700">
                    CLM — LO 2
                  </span>

                  <span className="rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold text-indigo-700">
                    CLM
                  </span>
                </div>

                <div className="p-3 text-[11px] leading-5 text-gray-700">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Written examination</li>
                    <li>Practical demonstration</li>
                    <li>Direct observation</li>
                  </ul>

                  <div className="mt-2 text-[10px] italic text-gray-400">
                    Formative — not CATS summative.
                  </div>
                </div>
              </div>
            </div>

            {/* PROMPT */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                Generation Prompt
              </div>

              <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
                  <span className="text-[10px] font-semibold text-gray-700">
                    Mom Reds&apos; IS Prompt
                  </span>

                  <span className="rounded bg-purple-50 px-2 py-0.5 text-[9px] font-bold text-purple-700">
                    Prompt Pack
                  </span>
                </div>

                <div className="p-3 text-[11px] leading-5 text-gray-700">
                  <span className="italic text-gray-400">[Proprietary]</span>
                  <br />✓ Received Apr 8, 2026 · Under review by Alejandro Perez
                </div>
              </div>
            </div>

            {/* AI REGEN */}
            <div>
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                AI Regeneration
              </div>

              <div className="rounded border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] leading-5 text-gray-700">
                <strong className="text-violet-700">
                  ✨ AI-Assisted Editing
                </strong>
                <br />

                <span className="text-[10px] text-gray-500">
                  Click any ✨ Regenerate button to rewrite an individual field.
                  Optionally provide instructions. Same Phase 1 inputs apply —
                  no web access until Phase 2 is enabled.
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}

export function AiPrompt({
  label = "AI Regenerate",
  tag = "intro",
}: {
  label?: string;
  tag?: string;
}) {
  return (
    <div
      id={tag}
      className="mt-2 rounded-md border border-violet-200 bg-violet-50"
    >
      <div className="flex items-center gap-2 border-b border-violet-200 bg-violet-100 px-3 py-2">
        <SparklesIcon className="h-4 w-4 text-violet-700" />

        <span className="text-xs font-semibold text-violet-800">{label}</span>
      </div>

      <div className="p-3">
        <textarea
          className="min-h-16 w-full resize-none rounded border border-violet-200 bg-white px-3 py-2 text-xs outline-none focus:border-violet-500"
          placeholder="Optional: give the AI specific instructions before regenerating this section."
        />

        <button className="mt-2 inline-flex items-center gap-2 rounded bg-violet-700 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-800">
          <SparklesIcon className="h-4 w-4" />
          Regenerate Now
        </button>
      </div>
    </div>
  );
}

export const sheetKinds = Object.keys(sheetMeta) as SheetKind[];

export const frontMatterKinds = Object.keys(
  frontMatterMeta,
) as FrontMatterKind[];
