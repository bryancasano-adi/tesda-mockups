import type { ReactNode } from "react";

import { cn } from "./CblmFrontendPrimitives";

export const fieldLabelClass = "text-xs font-semibold text-gray-700";
export const fieldLabelRowClass = "mb-1.5 flex min-h-[22px] items-center gap-2";
export const fieldReadOnlyBadgeClass =
  "rounded bg-gray-100 px-1.5 py-px text-[10px] font-semibold text-gray-500";
const fieldControlBase =
  "box-border m-0 appearance-none rounded-md border px-3 text-sm leading-5";
export const fieldValueViewClass = cn(
  fieldControlBase,
  "min-h-[38px] border-transparent py-2 text-gray-800 whitespace-pre-wrap",
);
export const fieldInputClass = cn(
  fieldControlBase,
  "h-[38px] w-full py-0 border-gray-300 bg-white text-gray-800 outline-none focus:border-blue-500",
);
export const fieldInputReadOnlyClass =
  "cursor-default read-only:border-gray-200 read-only:bg-gray-50 read-only:text-gray-600 read-only:placeholder:text-gray-400 read-only:cursor-default read-only:focus:border-gray-200";
export const fieldTextareaClass = cn(
  fieldControlBase,
  "w-full resize-none border-gray-300 bg-white py-2 text-gray-800 outline-none focus:border-blue-500",
);
export const fieldHintClass = "mt-1 text-[11px] text-gray-500";

export function fieldTextareaHeight(rows: number) {
  return rows * 20 + 16;
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export function ReadOnlyList({
  items,
  ordered = true,
}: {
  items: string[];
  ordered?: boolean;
}) {
  if (items.length === 0) {
    return <span className="text-gray-400 italic">—</span>;
  }

  const Tag = ordered ? "ol" : "ul";
  const listClass = ordered
    ? "list-decimal list-outside pl-5 space-y-1"
    : "list-disc list-outside pl-5 space-y-1";

  return (
    <Tag className={listClass}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </Tag>
  );
}

export function FieldReadOnly({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
        <span className={fieldReadOnlyBadgeClass}>Read-only</span>
      </div>
      <div className={fieldValueViewClass}>{value}</div>
      {hint && <p className={fieldHintClass}>{hint}</p>}
    </div>
  );
}

export function FieldEditableInput({
  label,
  value,
  onChange,
  disabled,
  editing = true,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  editing?: boolean;
  hint?: string;
}) {
  const isInteractive = !disabled && editing;

  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
      </div>
      <input
        className={cn(
          fieldInputClass,
          !isInteractive && fieldInputReadOnlyClass,
        )}
        placeholder={!isInteractive && !value.trim() ? "—" : undefined}
        readOnly={!isInteractive}
        tabIndex={isInteractive ? undefined : -1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint && <p className={fieldHintClass}>{hint}</p>}
    </div>
  );
}

export function FieldEditable({
  label,
  value,
  onChange,
  rows = 4,
  disabled,
  editing = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
  editing?: boolean;
}) {
  const isInteractive = !disabled && editing;
  const textareaHeight = fieldTextareaHeight(rows);

  return (
    <div className="mb-4">
      <div className={fieldLabelRowClass}>
        <span className={fieldLabelClass}>{label}</span>
      </div>
      <textarea
        className={cn(
          fieldTextareaClass,
          !isInteractive && fieldInputReadOnlyClass,
        )}
        placeholder={!isInteractive && !value.trim() ? "—" : undefined}
        readOnly={!isInteractive}
        rows={rows}
        style={{ height: textareaHeight }}
        tabIndex={isInteractive ? undefined : -1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
