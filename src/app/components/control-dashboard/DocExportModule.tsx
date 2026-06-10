import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Upload, Activity, Download, BarChart2 } from "lucide-react";
import { StatCard, ChartCard, SectionDivider } from "./PagePrimitives";
import { docUploadsPerDay, docxExportsPerDay } from "./sharedData";

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

export function DocExportModule() {
  const totalUploads = docUploadsPerDay.reduce((s, d) => s + d.uploads, 0);
  const totalExports = docxExportsPerDay.reduce((s, d) => s + d.exports, 0);

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
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={docUploadsPerDay} barSize={28}>
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
        >
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={docxExportsPerDay} barSize={28}>
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
        </ChartCard>
      </div>
    </div>
  );
}
