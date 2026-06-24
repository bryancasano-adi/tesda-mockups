import { Link } from "react-router-dom";
import { useMemo, useState, type ReactNode } from "react";

import { cn } from "./CblmFrontendPrimitives";
import {
  buildDefaultExportFileName,
  exportReadinessSummary,
  exportStatusLabel,
} from "./mock-export-utils";
import { cblmFrontMatterPath } from "@/app/utils/cblmRoutes";
import { mockLoGroups, moduleReferences, ucMeta } from "@/app/data/cblmData";

type IncludeSectionKey =
  | "frontCover"
  | "howToUse"
  | "competencyList"
  | "moduleContent"
  | "prerequisites"
  | "loSummary"
  | "learningExperiences"
  | "informationSheets"
  | "selfChecks"
  | "taskSheets"
  | "pccSheets"
  | "operationSheets"
  | "jobSheet";

type ExportSettingKey =
  | "markDraft"
  | "trainerSignature"
  | "includePcc"
  | "tesdaCover"
  | "tableOfContents";

const INCLUDE_SECTIONS: { key: IncludeSectionKey; label: string }[] = [
  { key: "frontCover", label: "Front Cover & Revision History" },
  { key: "howToUse", label: "How to Use This Module" },
  { key: "competencyList", label: "List of Competencies" },
  { key: "moduleContent", label: "Module Content" },
  { key: "prerequisites", label: "Prerequisites" },
  { key: "loSummary", label: "LO Summary Table" },
  { key: "learningExperiences", label: "Learning Experiences Table (LET)" },
  { key: "informationSheets", label: "All Information Sheets" },
  { key: "selfChecks", label: "All Self-Check & Answer Keys" },
  { key: "taskSheets", label: "All Task Sheets" },
  { key: "pccSheets", label: "All PCC Sheets" },
  { key: "operationSheets", label: "All Operation Sheets" },
  { key: "jobSheet", label: "Job Sheet (1.1-3)" },
];

const EXPORT_SETTINGS: { key: ExportSettingKey; label: string }[] = [
  { key: "markDraft", label: "Mark unvalidated sheets [DRAFT]" },
  {
    key: "trainerSignature",
    label: "Include trainer signature block (validated sheets only)",
  },
  { key: "includePcc", label: "Include PCC in export" },
  { key: "tesdaCover", label: "Apply TESDA cover page template" },
  { key: "tableOfContents", label: "Generate Table of Contents" },
];

const DEFAULT_INCLUDE: Record<IncludeSectionKey, boolean> = {
  frontCover: true,
  howToUse: true,
  competencyList: true,
  moduleContent: true,
  prerequisites: true,
  loSummary: true,
  learningExperiences: true,
  informationSheets: true,
  selfChecks: true,
  taskSheets: true,
  pccSheets: true,
  operationSheets: true,
  jobSheet: true,
};

const DEFAULT_SETTINGS: Record<ExportSettingKey, boolean> = {
  markDraft: true,
  trainerSignature: true,
  includePcc: true,
  tesdaCover: true,
  tableOfContents: false,
};

function ExportCard({
  title,
  rightSlot,
  children,
}: {
  title: string;
  rightSlot?: ReactNode;
  children: ReactNode;
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

function MetadataCell({
  label,
  value,
  readOnly,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div className="border-b border-r border-gray-100 px-4 py-3 sm:px-5">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
        {readOnly && (
          <span className="rounded border border-gray-200 bg-gray-50 px-1.5 py-px text-[9px] font-bold text-gray-400">
            Read-only
          </span>
        )}
      </div>
      <div className="font-mono text-sm font-medium text-gray-800">{value}</div>
    </div>
  );
}

function ReadinessBar({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct));

  return (
    <div className="flex min-w-[120px] flex-1 items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            "h-full transition-all duration-300",
            clamped >= 100
              ? "bg-green-500"
              : clamped > 0
                ? "bg-blue-600"
                : "bg-gray-300",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right text-xs text-gray-500">
        {clamped}%
      </span>
    </div>
  );
}

function ExportCheckbox({
  checked,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-2.5 py-1.5 text-sm",
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer text-gray-700",
      )}
    >
      <input
        checked={checked}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-gray-300 bg-white accent-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={disabled}
        style={{ colorScheme: "light" }}
        type="checkbox"
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function ExportConfirmModal({
  open,
  fileName,
  flaggedCount,
  unvalidated,
  markDraft,
  isExporting,
  onClose,
  onConfirm,
}: {
  open: boolean;
  fileName: string;
  flaggedCount: number;
  unvalidated: number;
  markDraft: boolean;
  isExporting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900">
          Export CBLM as .docx
        </h2>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p>
            Generates a Word document following the TESDA CBLM template: front
            matter, module content, sheets, job sheet, learning experiences
            table, and references.
          </p>
          <p className="font-mono text-xs text-gray-800">{fileName}</p>
          {markDraft && unvalidated > 0 && (
            <p className="text-xs text-amber-700">
              {unvalidated} sheet{unvalidated === 1 ? "" : "s"} will be marked
              [DRAFT].
            </p>
          )}
          {flaggedCount > 0 && (
            <p className="text-xs text-red-700">
              {flaggedCount} reference{flaggedCount === 1 ? "" : "s"} will be
              marked ⚑ FLAGGED in the references table.
            </p>
          )}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            disabled={isExporting}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-70"
            disabled={isExporting}
            type="button"
            onClick={onConfirm}
          >
            {isExporting ? "Processing..." : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsolidationExportContent({
  showToast,
}: {
  showToast: (msg: string, color?: string) => void;
}) {
  const { validated, total, unvalidated, rows: readinessRows } = useMemo(
    () => exportReadinessSummary(mockLoGroups),
    [],
  );
  const flaggedReferenceCount = useMemo(
    () => moduleReferences.filter((ref) => ref.flagged).length,
    [],
  );

  const [includeSections, setIncludeSections] =
    useState(DEFAULT_INCLUDE);
  const [exportSettings, setExportSettings] = useState(DEFAULT_SETTINGS);
  const [fileName, setFileName] = useState(buildDefaultExportFileName);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const toggleInclude = (key: IncludeSectionKey, checked: boolean) => {
    setIncludeSections((prev) => ({ ...prev, [key]: checked }));
  };

  const toggleSetting = (key: ExportSettingKey, checked: boolean) => {
    setExportSettings((prev) => ({ ...prev, [key]: checked }));
  };

  const handleExport = () => {
    setIsExporting(true);
    window.setTimeout(() => {
      setIsExporting(false);
      setShowExportModal(false);
      showToast(`Export complete — ${fileName}`, "#1565C0");
    }, 600);
  };

  return (
    <div className="space-y-5">
      {flaggedReferenceCount > 0 && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-semibold text-red-800">
            {flaggedReferenceCount} flagged reference
            {flaggedReferenceCount === 1 ? "" : "s"} will appear with a visible
            ⚑ FLAGGED indicator in the exported document.
          </p>
        </div>
      )}

      {unvalidated > 0 && (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-amber-900">
            {unvalidated} of {total} content sheets are not yet validated
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            Unvalidated sheets will be included in the export but marked{" "}
            <strong>[DRAFT]</strong> at the top of each sheet. They will not
            carry a trainer signature block. Finalize all sheets before
            distributing the document externally.
          </p>
        </div>
      )}

      <ExportCard
        rightSlot={
          <Link
            className="text-xs font-medium text-blue-700 no-underline hover:underline"
            to={cblmFrontMatterPath()}
          >
            Edit in Front Matter →
          </Link>
        }
        title="Document Control — Export Metadata"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <MetadataCell label="Document No." readOnly value={ucMeta.documentNo} />
          <MetadataCell
            label="Revision No."
            readOnly
            value={ucMeta.revision.padStart(2, "0")}
          />
          <MetadataCell label="Issued By" readOnly value="TESDA" />
          <MetadataCell label="Developed By" value="Joel Fornoles" />
          <MetadataCell
            label="Qualification"
            readOnly
            value={ucMeta.qualificationName}
          />
          <MetadataCell label="Module" readOnly value="Module 1" />
          <MetadataCell label="Date Developed" value="May 2026" />
          <MetadataCell label="Date Revised" value="—" />
        </div>
      </ExportCard>

      <ExportCard
        rightSlot={
          <span className="text-xs text-gray-500">
            {validated} of {total} total sheets validated
          </span>
        }
        title="Sheet Readiness by Section"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Section
                </th>
                <th className="w-28 px-4 py-2.5 text-center font-semibold text-gray-600">
                  Sheets
                </th>
                <th className="w-56 px-4 py-2.5 font-semibold text-gray-600">
                  Readiness
                </th>
                <th className="w-36 px-4 py-2.5 text-center font-semibold text-gray-600">
                  Export Status
                </th>
              </tr>
            </thead>
            <tbody>
              {readinessRows.map((row) => {
                const pct =
                  row.total === 0
                    ? 0
                    : Math.round((row.validated / row.total) * 100);
                const status = exportStatusLabel(row.validated, row.total);
                const hasUnvalidated =
                  row.total > 0 && row.validated < row.total;

                return (
                  <tr key={row.id} className="border-b border-gray-100">
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: row.dotColor }}
                        />
                        <span className="font-medium text-gray-800">
                          {row.section}
                        </span>
                        {hasUnvalidated && (
                          <span className="text-[10px] text-amber-700">
                            ⚠ Unvalidated sheets marked [DRAFT]
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {row.validated} / {row.total}
                    </td>
                    <td className="px-4 py-3">
                      <ReadinessBar pct={pct} />
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3 text-center text-xs font-medium",
                        status.color,
                      )}
                    >
                      {status.text}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ExportCard>

      <ExportCard title="Export Options">
        <div className="grid gap-6 p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Include Sections
            </h4>
            <div className="space-y-0.5">
              {INCLUDE_SECTIONS.map((item) => (
                <ExportCheckbox
                  key={item.key}
                  checked={includeSections[item.key]}
                  label={item.label}
                  onChange={(checked) => toggleInclude(item.key, checked)}
                />
              ))}
              <ExportCheckbox checked={false} disabled label="Video Scripts" />
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Export Settings
              </h4>
              <div className="space-y-0.5 rounded-md border border-gray-200 bg-gray-50 p-3">
                {EXPORT_SETTINGS.map((item) => (
                  <ExportCheckbox
                    key={item.key}
                    checked={exportSettings[item.key]}
                    label={item.label}
                    onChange={(checked) => toggleSetting(item.key, checked)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-1.5 block text-xs font-semibold text-gray-600"
                htmlFor="export-file-name"
              >
                Output File Name
              </label>
              <input
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-800 outline-none focus:border-blue-500"
                id="export-file-name"
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
              />
              <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                Format: Microsoft Word .docx — TESDA CBLM template styles
                applied
              </p>
              <p className="text-[11px] text-gray-500">
                Estimated size: ~2.4 MB including image placeholders
              </p>
            </div>
          </div>
        </div>
      </ExportCard>

      <ExportCard title="Export History">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Export Date
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Exported By
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Revision No.
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Sheets Included
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {unvalidated > 0 ? (
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 text-gray-700">2026-05-10 09:22</td>
                  <td className="px-4 py-3 text-gray-700">Joel Fornoles</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    {ucMeta.revision.padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {validated} validated, {unvalidated} [DRAFT]
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                      Draft Export
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      type="button"
                      onClick={() =>
                        showToast(`Re-download started — ${fileName}`, "#1565C0")
                      }
                    >
                      ↓ Re-download
                    </button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-gray-500"
                    colSpan={6}
                  >
                    No exports yet. Use Export as .docx to generate your first
                    document.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ExportCard>

      <button
        className="hidden"
        id="cblm-export-open"
        type="button"
        onClick={() => setShowExportModal(true)}
      />

      <ExportConfirmModal
        fileName={fileName}
        flaggedCount={flaggedReferenceCount}
        isExporting={isExporting}
        markDraft={exportSettings.markDraft}
        open={showExportModal}
        unvalidated={unvalidated}
        onClose={() => setShowExportModal(false)}
        onConfirm={handleExport}
      />
    </div>
  );
}
