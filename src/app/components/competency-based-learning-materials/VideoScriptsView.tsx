import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowPathIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

import { cn } from "./CblmFrontendPrimitives";
import {
  buildGateRuleMessage,
  videoScriptEditorHref,
  videoScriptSummary,
  type VideoScriptGenerationMode,
} from "./mock-video-scripts-utils";
import {
  videoScriptRows as initialVideoScriptRows,
  ucMeta,
  type VideoScriptRow,
} from "@/app/data/cblmData";
import { cblmModulePath } from "@/app/utils/cblmRoutes";

function VideoScriptsCard({
  title,
  rightSlot,
  children,
}: {
  title: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 sm:px-5">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {rightSlot}
      </div>
      {children}
    </div>
  );
}

function SheetTypeBadge({
  sheetType,
}: {
  sheetType: VideoScriptRow["sheetType"];
}) {
  return (
    <span className="inline-flex shrink-0 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
      {sheetType === "task-sheet" ? "TS" : "JS"}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    finalized: "bg-green-50 text-green-700",
    draft: "bg-yellow-100 text-yellow-800",
    not_started: "bg-gray-100 text-gray-600",
    locked: "bg-gray-100 text-gray-500",
  };

  const labels: Record<string, string> = {
    finalized: "Finalized",
    draft: "Draft",
    not_started: "Not Started",
    locked: "Locked",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        styles[status] ?? styles.not_started,
      )}
    >
      {labels[status] ?? status}
    </span>
  );
}

function VideoScriptTableRow({
  row,
  isSelected,
  onToggleSelected,
  onGenerate,
}: {
  row: VideoScriptRow;
  isSelected: boolean;
  onToggleSelected: (checked: boolean) => void;
  onGenerate: () => void;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="px-5 py-4 align-middle sm:px-6">
        <input
          checked={isSelected}
          className="h-4 w-4 cursor-pointer rounded border border-gray-300 bg-white accent-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ colorScheme: "light" }}
          type="checkbox"
          onChange={(event) => onToggleSelected(event.target.checked)}
        />
      </td>
      <td className="px-5 py-4 align-middle sm:px-6">
        <span className="flex min-w-0 items-center gap-2.5">
          <SheetTypeBadge sheetType={row.sheetType} />
          <span className="truncate font-medium text-gray-800">
            {row.code} — {row.title}
          </span>
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-4 align-middle sm:px-6">
        <StatusPill status={row.scriptStatus} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 align-middle text-sm text-gray-600 sm:px-6">
        {row.durationMinutes != null ? `${row.durationMinutes} min` : "—"}
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-right align-middle sm:px-6">
        <div className="flex items-center justify-end gap-2">
          {row.scriptStatus === "draft" ? (
            <Link
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 no-underline"
              to={videoScriptEditorHref(row.code)}
            >
              <EyeIcon className="h-3.5 w-3.5" />
              View / Edit
            </Link>
          ) : row.eligible && row.scriptStatus === "not_started" ? (
            <button
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-800"
              type="button"
              onClick={onGenerate}
            >
              <ArrowPathIcon className="h-3.5 w-3.5" />
              Generate
            </button>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs text-gray-400">
              <LockClosedIcon className="h-3.5 w-3.5 shrink-0" />
              Finalize CBLM first
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

export function VideoScriptsView({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const [rows, setRows] = useState(initialVideoScriptRows);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    return new Set(
      initialVideoScriptRows
        .filter((row) => row.eligible && row.scriptStatus !== "draft")
        .map((row) => row.id),
    );
  });
  const [minDuration, setMinDuration] = useState(3);
  const [maxDuration, setMaxDuration] = useState(5);
  const [generationMode, setGenerationMode] =
    useState<VideoScriptGenerationMode>("selected");

  const summary = useMemo(() => videoScriptSummary(rows), [rows]);
  const gateRule = useMemo(() => buildGateRuleMessage(rows), [rows]);

  const toggleSelected = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const generateRows = (ids: string[]) => {
    const targetIds = new Set(ids);

    setRows((prev) =>
      prev.map((row) =>
        targetIds.has(row.id) && row.eligible
          ? { ...row, scriptStatus: "draft" as const }
          : row,
      ),
    );
    showToast(
      ids.length === 1
        ? "Video script generation started"
        : `Generating ${ids.length} video scripts`,
      "#1565C0",
    );
  };

  const handleGenerateSelected = () => {
    const targets =
      generationMode === "all_eligible"
        ? rows
            .filter(
              (row) =>
                row.eligible &&
                row.scriptStatus !== "draft" &&
                row.scriptStatus !== "finalized",
            )
            .map((row) => row.id)
        : [...selectedIds].filter((id) => {
            const row = rows.find((entry) => entry.id === id);

            return (
              row?.eligible &&
              row.scriptStatus !== "draft" &&
              row.scriptStatus !== "finalized"
            );
          });

    if (targets.length === 0) {
      showToast("Select at least one eligible sheet to generate", "#C62828");
      return;
    }

    generateRows(targets);
  };

  const handleGenerateOne = (row: VideoScriptRow) => {
    generateRows([row.id]);
  };

  return (
    <div className="mb-12 space-y-5">
      <div className="mb-2">
        <Link
          className="text-sm font-medium text-blue-700 hover:underline"
          to={cblmModulePath()}
        >
          ← Back to CBLM Module
        </Link>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Video Scripts — {ucMeta.unitCode}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {ucMeta.unitCode} · {ucMeta.titleLower}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            One script per Task Sheet or Job Sheet · Two-column AUDIO | VIDEO
            format · 3–5 min target
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
            type="button"
            onClick={handleGenerateSelected}
          >
            <ArrowPathIcon className="h-4 w-4" />
            Generate Selected
          </button>
        </div>
      </div>

      <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <span className="font-semibold">Gate rule:</span>{" "}
        {gateRule.replace(/^Gate rule:\s*/, "")}
      </div>

      <VideoScriptsCard title="Generation Settings">
        <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold text-gray-600">
              Minimum Duration (min)
            </span>
            <input
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              min={1}
              type="number"
              value={minDuration}
              onChange={(event) =>
                setMinDuration(Number(event.target.value) || 1)
              }
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold text-gray-600">
              Maximum Duration (min)
            </span>
            <input
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
              min={1}
              type="number"
              value={maxDuration}
              onChange={(event) =>
                setMaxDuration(Number(event.target.value) || 1)
              }
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold text-gray-600">
              Generation Mode
            </span>
            <select
              className={cn(
                "w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500",
                "appearance-none bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9",
              )}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              }}
              value={generationMode}
              onChange={(event) =>
                setGenerationMode(
                  event.target.value as VideoScriptGenerationMode,
                )
              }
            >
              <option value="selected">Selected only</option>
              <option value="all_eligible">All eligible sheets</option>
            </select>
          </label>
        </div>
      </VideoScriptsCard>

      <VideoScriptsCard
        rightSlot={
          <span className="text-xs text-gray-500">{summary.label}</span>
        }
        title="Task & Job Sheets — Script Status"
      >
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="w-12 px-5 py-3 font-semibold text-gray-600 sm:px-6">
                  Select
                </th>
                <th className="px-5 py-3 font-semibold text-gray-600 sm:px-6">
                  Sheet
                </th>
                <th className="w-36 whitespace-nowrap px-5 py-3 font-semibold text-gray-600 sm:px-6">
                  Status
                </th>
                <th className="w-24 px-5 py-3 font-semibold text-gray-600 sm:px-6">
                  Duration
                </th>
                <th className="w-48 px-5 py-3 text-right font-semibold text-gray-600 sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <VideoScriptTableRow
                  key={row.id}
                  isSelected={selectedIds.has(row.id)}
                  row={row}
                  onGenerate={() => handleGenerateOne(row)}
                  onToggleSelected={(checked) =>
                    toggleSelected(row.id, checked)
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-[11px] text-gray-500 sm:px-5">
          Basic competency scripts are fetched from the K-Galing repository —
          not generated per project.
        </div>
      </VideoScriptsCard>

      <VideoScriptsCard title="Video Script Format">
        <div className="grid gap-6 p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Document Structure
            </h4>
            <div className="space-y-2">
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-600">
                OBB – Opening Billboard (read-only)
              </div>
              <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs text-blue-800">
                Generated rows — one per procedure step
              </div>
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-600">
                CBB – Closing Billboard (read-only)
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Generation Rules
            </h4>
            <ul className="list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-gray-600">
              <li>Second-person &quot;You&quot; point of view</li>
              <li>Short sentences — conversational but formal</li>
              <li>PCC quality standards integrated into steps</li>
              <li>Source: Finalized Task Sheet + paired PCC</li>
            </ul>
          </div>
        </div>
      </VideoScriptsCard>
    </div>
  );
}
