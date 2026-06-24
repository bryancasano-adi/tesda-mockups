import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Upload, Activity, Download, BarChart2, FileDown } from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  ActionButton,
  DataTable,
  EmptyChartState,
  exportToExcel,
} from "./PagePrimitives";
import { docUploadsPerDay, docxExportsPerDay } from "./sharedData";
import type { ReportRecord } from "./reportData";

type BreakdownPayload = {
  date: string;
  uploads: number;
  breakdown?: Record<string, number>;
};

function UploadBreakdownTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload: BreakdownPayload }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="rounded-xl text-[12px] p-3 min-w-[150px]"
      style={{
        background: "#fff",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "#0f172a" }}>
        {label}
      </p>
      <p className="mb-2" style={{ color: "#64748b" }}>
        Total:{" "}
        <span className="font-bold" style={{ color: "#2196f3" }}>
          {d.uploads}
        </span>
      </p>
      {d.breakdown && Object.keys(d.breakdown).length > 0 && (
        <div
          className="border-t pt-2 mt-1 flex flex-col gap-1"
          style={{ borderColor: "#f1f5f9" }}
        >
          <p
            className="text-[10px] uppercase tracking-wider mb-0.5"
            style={{ color: "#94a3b8" }}
          >
            By Doc Type
          </p>
          {Object.entries(d.breakdown).map(([key, val]) => (
            <div key={key} className="flex justify-between gap-6">
              <span style={{ color: "#475569" }}>{key}</span>
              <span className="font-bold" style={{ color: "#0f172a" }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocExportModule({ records }: { records?: ReportRecord[] }) {
  const visibleRecords = records ?? [];
  const useFilteredRecords = records !== undefined;
  const uploadChartData = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<Record<string, { date: string; uploads: number; breakdown: Record<string, number> }>>(
          (acc, record) => {
            acc[record.displayDate] = acc[record.displayDate] ?? {
              date: record.displayDate,
              uploads: 0,
              breakdown: {},
            };
            acc[record.displayDate].uploads += record.uploads;
            acc[record.displayDate].breakdown[record.documentType] =
              (acc[record.displayDate].breakdown[record.documentType] ?? 0) + record.uploads;
            return acc;
          },
          {},
        ),
      )
    : docUploadsPerDay;
  const exportChartData = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<Record<string, { date: string; exports: number }>>(
          (acc, record) => {
            acc[record.displayDate] = acc[record.displayDate] ?? {
              date: record.displayDate,
              exports: 0,
            };
            acc[record.displayDate].exports += record.exports;
            return acc;
          },
          {},
        ),
      )
    : docxExportsPerDay;
  const totalUploads = uploadChartData.reduce((s, d) => s + d.uploads, 0);
  const totalExports = exportChartData.reduce((s, d) => s + d.exports, 0);
  const hasUploadChartData = uploadChartData.some((row) => row.uploads > 0);
  const hasExportChartData = exportChartData.some((row) => row.exports > 0);
  const visibleDocTypes = Array.from(new Set(visibleRecords.map((record) => record.documentType))).slice(0, 8);
  const personRows = Object.values(
    visibleRecords.reduce<Record<string, Record<string, string | number>>>((acc, record) => {
      acc[record.person] = acc[record.person] ?? {
        person: record.person,
        kbUploads: 0,
        kbExports: 0,
        total: 0,
      };
      acc[record.person][record.documentType] =
        Number(acc[record.person][record.documentType] ?? 0) + record.uploads + record.exports;
      acc[record.person].kbUploads = Number(acc[record.person].kbUploads) + record.kbUploads;
      acc[record.person].kbExports = Number(acc[record.person].kbExports) + record.kbExports;
      acc[record.person].total =
        Number(acc[record.person].total) +
        record.uploads +
        record.exports +
        record.kbUploads +
        record.kbExports;
      return acc;
    }, {}),
  ).sort((a, b) => Number(b.total) - Number(a.total));

  return (
    <div className="flex flex-col gap-6">
      {/* ── Upload Section ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Document Upload Monitoring"
          subtitle="Track uploaded documents by day and volume"
        />
        <div className="flex gap-4">
          <StatCard
            label="Total Uploads"
            value={totalUploads}
            sub="All document types"
            color="#1976d2"
            Icon={Upload}
          />
          <StatCard
            label="Avg Uploads/Day"
            value={(totalUploads / docUploadsPerDay.length).toFixed(1)}
            sub="Rolling average"
            color="#9c27b0"
            Icon={Activity}
          />
        </div>
        <ChartCard
          title="Documents Uploaded Per Day"
          subtitle="Upload volume across monitored dates — hover for doc type breakdown"
          action={
            <ActionButton
              onClick={() =>
                exportToExcel(
                  ["Date", "Uploads"],
                  uploadChartData.map((r) => [r.date, r.uploads]),
                  "documents_uploaded_per_day",
                )
              }
              variant="outline"
              size="sm"
            >
              <FileDown size={13} /> Export Excel
            </ActionButton>
          }
        >
          {hasUploadChartData ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={uploadChartData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<UploadBreakdownTooltip />} />
                <Bar
                  dataKey="uploads"
                  fill="#2196f3"
                  radius={[4, 4, 0, 0]}
                  name="Uploads"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState message="No uploads match the selected role and filters." />
          )}
        </ChartCard>
      </div>

      {/* ── Export Section ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Export Monitoring"
          subtitle="DOCX export frequency and volume"
        />
        <div className="flex gap-4">
          <StatCard
            label="Total DOCX Exports"
            value={totalExports}
            sub="All export events"
            color="#9c27b0"
            Icon={Download}
          />
          <StatCard
            label="Avg Exports/Day"
            value={(totalExports / docxExportsPerDay.length).toFixed(1)}
            sub="Rolling average"
            color="#1976d2"
            Icon={BarChart2}
          />
        </div>
        <ChartCard
          title="DOCX Exports Per Day"
          subtitle="Export activity across monitored dates"
          action={
            <ActionButton
              onClick={() =>
                exportToExcel(
                  ["Date", "Exports"],
                  exportChartData.map((r) => [r.date, r.exports]),
                  "docx_exports_per_day",
                )
              }
              variant="outline"
              size="sm"
            >
              <FileDown size={13} /> Export Excel
            </ActionButton>
          }
        >
          {hasExportChartData ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={exportChartData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="exports"
                  fill="#9c27b0"
                  radius={[4, 4, 0, 0]}
                  name="Exports"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState message="No exports match the selected role and filters." />
          )}
        </ChartCard>
      </div>

      <ChartCard
        title="Uploads & Exports by Person"
        subtitle="Quantity by document type, including Knowledge Base folder activity"
        action={
          <ActionButton
            onClick={() =>
              exportToExcel(
                [
                  "Person",
                  ...visibleDocTypes,
                  "KB Folder Uploads",
                  "KB Folder Exports",
                  "Total",
                ],
                personRows.map((r) => [
                  r.person,
                  ...visibleDocTypes.map((doc) => Number(r[doc] ?? 0)),
                  r.kbUploads,
                  r.kbExports,
                  r.total,
                ]),
                "uploads_exports_by_person",
              )
            }
            variant="outline"
            size="sm"
          >
            <FileDown size={13} /> Export Excel
          </ActionButton>
        }
      >
        <DataTable
          columns={[
            { key: "person", header: "Person" },
            ...visibleDocTypes.map((doc) => ({
              key: doc,
              header: doc,
              align: "right" as const,
              render: (row: Record<string, string | number>) => Number(row[doc] ?? 0),
            })),
            { key: "kbUploads", header: "KB Uploads", align: "right" },
            { key: "kbExports", header: "KB Exports", align: "right" },
            {
              key: "total",
              header: "Total",
              align: "right",
              render: (row) => (
                <span className="font-bold" style={{ color: "#1976d2" }}>
                  {row.total}
                </span>
              ),
            },
          ]}
          rows={personRows}
          keyExtractor={(row) => row.person}
        />
      </ChartCard>
    </div>
  );
}
