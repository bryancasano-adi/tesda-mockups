import type { LucideIcon } from "lucide-react";

// ─── exportToExcel ────────────────────────────────────────────────────────────

export function exportToExcel(
  headers: string[],
  rows: (string | number)[][],
  filename: string,
) {
  const table = `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  const blob = new Blob([table], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.xls`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  bgColor?: string;
  Icon?: LucideIcon;
};

export function StatCard({
  label,
  value,
  sub,
  color = "#1976d2",
  bgColor,
  Icon,
}: StatCardProps) {
  const bg = bgColor ?? color + "14";
  return (
    <div
      className="flex-1 min-w-[130px] p-5 flex flex-col justify-between gap-3"
      style={{
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <p
          className="text-[11px] font-bold uppercase tracking-widest leading-tight"
          style={{ color: "#64748b" }}
        >
          {label}
        </p>
        {Icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: bg }}
          >
            <Icon size={15} style={{ color }} strokeWidth={2} />
          </div>
        )}
      </div>

      <div>
        <p
          className="text-[30px] font-bold leading-none tracking-tight"
          style={{ color: "#0f172a" }}
        >
          {value}
        </p>
        {sub && (
          <p className="text-[12px] mt-1.5" style={{ color: "#94a3b8" }}>
            {sub}
          </p>
        )}
      </div>

      {/* Colored accent bar */}
      <div
        className="h-[3px] w-10 rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

// ─── ChartCard ────────────────────────────────────────────────────────────────

type ChartCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function ChartCard({
  title,
  subtitle,
  children,
  action,
}: ChartCardProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-[#f1f5f9]">
        <div>
          <p className="text-[14px] font-semibold text-[#0f172a] leading-snug">
            {title}
          </p>
          {subtitle && (
            <p className="text-[12px] text-[#94a3b8] mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="px-5 pt-4 pb-5">{children}</div>
    </div>
  );
}

// ─── SectionDivider ───────────────────────────────────────────────────────────

export function SectionDivider({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="text-[16px] font-bold text-[#0f172a] leading-snug">
          {title}
        </p>
        {subtitle && (
          <p className="text-[12px] text-[#94a3b8] mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="flex-1 h-px bg-[#e2e8f0]" />
    </div>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

type Column<T> = {
  key: keyof T | string;
  header: string;
  align?: "left" | "right" | "center";
  render?: (row: T, i: number) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  keyExtractor: (row: T, i: number) => string | number;
  footer?: React.ReactNode;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  rows,
  keyExtractor,
  footer,
  emptyMessage = "No data available for the selected filters.",
}: DataTableProps<T>) {
  const alignClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`py-2.5 px-3 text-[10px] font-bold uppercase tracking-wider border-b border-[#f1f5f9] ${alignClass[col.align ?? "left"]}`}
                style={{ color: "#94a3b8" }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 px-3 text-center"
                style={{ color: "#94a3b8" }}
              >
                <div className="mx-auto flex max-w-sm flex-col items-center gap-1">
                  <p className="text-[13px] font-semibold text-[#64748b]">
                    No data to display
                  </p>
                  <p className="text-[12px]">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={keyExtractor(row, i)}
                className="group border-b border-[#f8fafc] hover:bg-[#f8fafc] transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`py-3 px-3 ${alignClass[col.align ?? "left"]}`}
                    style={{ color: "#334155" }}
                  >
                    {col.render
                      ? col.render(row, i)
                      : String(
                          (row as Record<string, unknown>)[
                            col.key as string
                          ] ?? "",
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
        {footer && rows.length > 0 && (
          <tfoot>
            <tr className="border-t-2 border-[#e2e8f0] bg-[#f8fafc]">
              {footer}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

// ─── EmptyChartState ─────────────────────────────────────────────────────────

export function EmptyChartState({
  message = "No chart data available for the selected filters.",
  height = 200,
}: {
  message?: string;
  height?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border border-dashed border-[#e2e8f0] bg-[#f8fafc]"
      style={{ height }}
    >
      <div className="max-w-sm text-center">
        <p className="text-[13px] font-semibold text-[#64748b]">
          No data to display
        </p>
        <p className="mt-1 text-[12px] text-[#94a3b8]">{message}</p>
      </div>
    </div>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, string> = {
  High: "bg-[#dcfce7] text-[#16a34a]",
  Medium: "bg-[#fef9c3] text-[#a16207]",
  Low: "bg-[#fee2e2] text-[#dc2626]",
  Online: "bg-[#dcfce7] text-[#16a34a]",
  "For Review": "bg-[#fef3c7] text-[#d97706]",
  Draft: "bg-[#f3e8ff] text-[#7c3aed]",
  Deprecated: "bg-[#fee2e2] text-[#dc2626]",
  Finalized: "bg-[#dcfce7] text-[#16a34a]",
  Configured: "bg-[#dcfce7] text-[#16a34a]",
};

export function StatusBadge({ label }: { label: string }) {
  const style = BADGE_STYLES[label] ?? "bg-[#f1f5f9] text-[#64748b]";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

export function ActionButton({
  onClick,
  children,
  variant = "outline",
  size = "sm",
  className = "",
}: ActionButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 font-semibold rounded-xl cursor-pointer transition-all duration-150";
  const sizes = { sm: "px-3 py-1.5 text-[12px]", md: "px-4 py-2 text-[13px]" };
  const variants = {
    primary: "bg-[#1976d2] text-white hover:bg-[#1565c0] shadow-sm",
    outline:
      "border border-[#e2e8f0] text-[#475569] bg-white hover:bg-[#f8fafc] hover:border-[#cbd5e1]",
    ghost: "text-[#1976d2] hover:bg-[#eff6ff]",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
