import { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { cn } from "./CblmFrontendPrimitives";
import { FieldEditableInput } from "./CblmFieldPrimitives";
import {
  estimateScriptDurationMinutes,
  type VideoScriptDocument,
  type VideoScriptLine,
} from "./mock-video-scripts-utils";

function MetaField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <div
        className={cn("mt-1 text-sm font-medium text-gray-800", valueClassName)}
      >
        {value}
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold text-gray-800">{label}</div>
      <div className="mt-1.5 text-sm text-gray-700">{value}</div>
    </div>
  );
}

function ScriptStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "bg-yellow-100 text-yellow-800",
    finalized: "bg-green-50 text-green-700",
    not_started: "bg-gray-100 text-gray-600",
  };

  const labels: Record<string, string> = {
    draft: "Draft",
    finalized: "Finalized",
    not_started: "Not Started",
  };

  return (
    <span
      className={cn(
        "inline-flex shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        styles[status] ?? styles.draft,
      )}
    >
      {labels[status] ?? status}
    </span>
  );
}

function ScriptTableRow({
  line,
  editing,
  onUpdate,
  onRemove,
}: {
  line: VideoScriptLine;
  editing: boolean;
  onUpdate: (patch: Partial<VideoScriptLine>) => void;
  onRemove: () => void;
}) {
  const isTemplate = line.kind === "obb" || line.kind === "cbb";
  const textareaClassName =
    "min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 text-xs leading-relaxed text-gray-800 outline-none focus:border-blue-500";

  return (
    <tr
      className={cn(
        "border-b border-gray-100",
        isTemplate ? "bg-gray-50" : "bg-white",
      )}
    >
      <td className="px-4 py-3 align-top">
        {isTemplate || !editing ? (
          <p className="text-xs leading-relaxed text-gray-600">{line.audio}</p>
        ) : (
          <textarea
            className={textareaClassName}
            rows={3}
            value={line.audio}
            onChange={(event) => onUpdate({ audio: event.target.value })}
          />
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {isTemplate || !editing ? (
          <p className="text-xs leading-relaxed text-gray-600">{line.video}</p>
        ) : (
          <textarea
            className={textareaClassName}
            rows={3}
            value={line.video}
            onChange={(event) => onUpdate({ video: event.target.value })}
          />
        )}
      </td>
      <td className="px-4 py-3 align-top">
        {isTemplate ? (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {line.kind === "obb" ? "OBB" : "CBB"}
          </span>
        ) : editing ? (
          <button
            aria-label="Remove row"
            className="rounded border border-gray-200 p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
            type="button"
            onClick={onRemove}
          >
            <XMarkIcon className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            AI-generated
          </span>
        )}
      </td>
    </tr>
  );
}

export function VideoScriptEditorContent({
  document,
}: {
  document: VideoScriptDocument;
}) {
  const [videoTitle, setVideoTitle] = useState(document.videoTitle);
  const [lines, setLines] = useState(document.lines);

  useEffect(() => {
    setVideoTitle(document.videoTitle);
    setLines(document.lines);
  }, [document.scriptCode, document.videoTitle, document.lines]);

  const generatedCount = lines.filter((line) => line.kind === "generated").length;
  const durationEstimate = estimateScriptDurationMinutes(lines);

  const updateLine = (id: string, patch: Partial<VideoScriptLine>) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  };

  const removeLine = (id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  };

  const addRow = () => {
    const nextIndex = generatedCount + 1;
    const newLine: VideoScriptLine = {
      id: `generated-custom-${Date.now()}`,
      kind: "generated",
      audio: "You perform the next procedure step as directed.",
      video: `Demonstrate step ${nextIndex} with close-up camera angle.`,
    };
    const cbbIndex = lines.findIndex((line) => line.kind === "cbb");
    const insertAt = cbbIndex >= 0 ? cbbIndex : lines.length;

    setLines((current) => [
      ...current.slice(0, insertAt),
      newLine,
      ...current.slice(insertAt),
    ]);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-900">
        Video Script derived from Finalized{" "}
        {document.sourceSheetCode.split(" + ")[0]}. Template rows (OBB / CBB)
        are read-only. AI-Generated rows are editable.
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start gap-x-10 gap-y-4 lg:justify-between lg:gap-x-6">
          <MetaField
            label="Script Code"
            value={document.scriptCode}
            valueClassName="font-semibold text-blue-800"
          />
          <MetaField label="Source Sheet" value={document.sourceSheetCode} />
          <MetaField
            label="Duration Target"
            value={`${document.minDuration} – ${document.maxDuration} minutes`}
          />
          <MetaField
            label="Script Status"
            value={<ScriptStatusBadge status={document.scriptStatus} />}
          />
        </div>

        <div className="mt-5 rounded-md border border-gray-200 px-4 py-4 sm:px-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <DetailField
              label="Qualification"
              value={document.qualificationTitle}
            />
            <DetailField label="Module Title" value={document.moduleTitle} />
            <div className="min-w-0 [&>div]:mb-0">
              <FieldEditableInput
                label="Video Title"
                value={videoTitle}
                onChange={setVideoTitle}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 sm:px-5">
          <h3 className="text-sm font-semibold text-gray-800">Script Table</h3>
          <div className="flex gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-gray-100 ring-1 ring-gray-200" />
              Template row
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-white ring-1 ring-gray-200" />
              Editable row
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="w-[38%] px-4 py-2.5 font-semibold text-gray-600">
                  Audio — Voice Over &amp; Sound
                </th>
                <th className="w-[38%] px-4 py-2.5 font-semibold text-gray-600">
                  Video — Camera / Screen / Animation
                </th>
                <th className="px-4 py-2.5 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <ScriptTableRow
                  key={line.id}
                  editing
                  line={line}
                  onRemove={() => removeLine(line.id)}
                  onUpdate={(patch) => updateLine(line.id, patch)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-4 py-3 sm:px-5">
          <button
            className="w-full rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs font-semibold text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
            type="button"
            onClick={addRow}
          >
            + Add Row
          </button>
        </div>
      </div>

      {document.pccCriteria.length > 0 && (
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3 sm:px-5">
            <h3 className="text-sm font-semibold text-gray-800">
              Quality Reference — {document.sourcePccCode}
            </h3>
          </div>
          <div className="space-y-4 p-4 sm:p-5">
            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
              PCC criteria are integrated into generated script rows via AI
              prompts. Use this checklist as a quality benchmark when reviewing
              or validating the script.
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {document.pccCriteria.map((criterion) => (
                <li
                  key={criterion}
                  className="flex items-start gap-2 text-xs text-gray-700"
                >
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-500 2xl:hidden">
        {durationEstimate}. Within 3–5 min target.
      </p>
    </div>
  );
}
