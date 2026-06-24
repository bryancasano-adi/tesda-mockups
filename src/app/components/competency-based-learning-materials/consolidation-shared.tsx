import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { cn } from "./CblmFrontendPrimitives";
import { formatSheetDisplayLabel } from "./sheet-code-utils";
import {
  fieldLabelClass,
  fieldLabelRowClass,
  fieldTextareaClass,
  fieldTextareaHeight,
} from "./CblmFieldPrimitives";

export function ConsolidationMetaHeader({
  code,
  type,
  extra,
}: {
  code: string;
  type: string;
  extra?: { label: string; value: string }[];
}) {
  return (
    <div className="mb-5 grid gap-3 rounded-md border border-gray-200 bg-gray-50 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="text-gray-500">Sheet Code</div>
        <div className="font-mono font-semibold text-blue-700">
          {formatSheetDisplayLabel(type, code)}
        </div>
      </div>
      <div>
        <div className="text-gray-500">Type</div>
        <div className="font-semibold text-gray-800">{type}</div>
      </div>
      {extra?.map((field) => (
        <div key={field.label}>
          <div className="text-gray-500">{field.label}</div>
          <div className="font-semibold text-gray-800">{field.value}</div>
        </div>
      ))}
    </div>
  );
}

export function LetTableHeader({ children }: { children: ReactNode }) {
  return (
    <th className="bg-blue-700 px-3.5 py-2 text-left text-xs font-semibold text-white">
      {children}
    </th>
  );
}

export function LetTableCell({
  children,
  className,
  colSpan,
  rowSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}) {
  return (
    <td
      className={cn(
        "border border-gray-200 px-3.5 py-2 align-top text-sm text-gray-800",
        className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
}

function formatLoBadge(loNumber: number) {
  return `LO ${loNumber}`;
}

export function LetLoAccordion({
  loNumber,
  title,
  activityCount,
  defaultOpen,
  children,
}: {
  loNumber: number;
  title: string;
  activityCount: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 transition-colors">
      <button
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 transition-colors ${
          open
            ? "border-b border-gray-100 bg-blue-50 hover:bg-blue-100/60"
            : "bg-blue-50 hover:bg-blue-100/60"
        }`}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="inline-flex shrink-0 items-center rounded-full bg-blue-700 px-2 py-0.5 text-xs font-bold text-white">
            {formatLoBadge(loNumber)}
          </span>
          <span className="truncate text-left text-sm font-semibold text-gray-900">
            {title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="inline-flex shrink-0 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600">
            {activityCount} {activityCount === 1 ? "activity" : "activities"}
          </span>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 shrink-0 text-gray-500 transition-transform",
              open && "rotate-180",
            )}
          />
        </div>
      </button>
      {open ? (
        <div className="space-y-4 bg-white px-4 py-4">{children}</div>
      ) : null}
    </div>
  );
}

export function ReferenceTypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    CS: "bg-green-50 text-green-700 border-green-200",
    CBC: "bg-blue-50 text-blue-700 border-blue-200",
    CLM: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
        styles[type] ?? "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {type}
    </span>
  );
}

export function LetSpecialInstructionsField({
  value,
  onChange,
  rows,
}: {
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  const textareaHeight = fieldTextareaHeight(rows);

  return (
    <div>
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>Special Instructions</span>
        <span className="rounded bg-blue-50 px-1.5 py-px text-[10px] font-semibold text-blue-700">
          Editable
        </span>
      </div>
      <textarea
        className={fieldTextareaClass}
        rows={rows}
        style={{ height: textareaHeight }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export const exportCheckboxClass =
  "h-4 w-4 shrink-0 rounded border border-gray-300 bg-white accent-blue-700";
