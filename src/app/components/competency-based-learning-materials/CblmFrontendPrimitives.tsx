import type { ReactNode } from "react";

export function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function CblmPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="-m-6 mt-4 px-4 md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl pb-12">{children}</div>
    </div>
  );
}

export function SectionCard({
  title,
  rightSlot,
  children,
  bodyClassName,
  className,
}: {
  title: ReactNode;
  rightSlot?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {rightSlot}
      </div>
      <div className={cn("min-w-0", bodyClassName)}>{children}</div>
    </div>
  );
}

export function CBLMStatusBadge({
  status,
}: {
  status: "not_started" | "draft" | "finalized" | "fetched";
}) {
  const styles: Record<string, string> = {
    not_started: "bg-gray-100 text-gray-600",
    draft: "bg-yellow-100 text-yellow-800",
    finalized: "bg-green-50 text-green-700",
    fetched: "border border-dashed border-gray-300 bg-gray-50 text-gray-600",
  };
  const labels: Record<string, string> = {
    not_started: "Not Started",
    draft: "Draft",
    finalized: "Finalized",
    fetched: "Fetched from DB",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}

export function competencySectionCardClass(type: "basic" | "common" | "core") {
  return type === "core" ? "border-2 border-blue-200" : "border border-gray-200";
}

export function consolidationPillClassName(
  pageStatus: "draft" | "finalized",
): string {
  if (pageStatus === "finalized") {
    return "inline-flex items-center rounded-full border border-green-700 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100";
  }

  return "inline-flex items-center rounded-full border border-yellow-600 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-800 hover:bg-yellow-100";
}

export function StatTile({
  label,
  value,
  compact,
}: {
  label: string;
  value: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex h-full flex-col rounded-md border border-gray-200 bg-gray-50 p-4 text-center">
      <div className="flex min-h-4 flex-1 items-center justify-center px-1">
        <div
          className={cn(
            "font-bold text-gray-800",
            compact ? "text-sm leading-snug" : "text-xl leading-none",
          )}
        >
          {value}
        </div>
      </div>
      <div className="shrink-0 pt-2 text-xs text-gray-500">{label}</div>
    </div>
  );
}
