import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Upload,
  Flame,
  Activity,
  Calendar,
  Download,
  Zap,
  BarChart2,
  CalendarCheck,
} from "lucide-react";
import { StatCard, ChartCard, SectionDivider } from "./PagePrimitives";
import { docUploadsPerDay, docxExportsPerDay } from "./sharedData";

export function DocExportModule() {
  const totalUploads = docUploadsPerDay.reduce((s, d) => s + d.uploads, 0);
  const totalExports = docxExportsPerDay.reduce((s, d) => s + d.exports, 0);
  const peakUpload = docUploadsPerDay.reduce((a, b) =>
    a.uploads > b.uploads ? a : b,
  );
  const peakExport = docxExportsPerDay.reduce((a, b) =>
    a.exports > b.exports ? a : b,
  );

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
            label="Peak Upload Day"
            value={peakUpload.date}
            sub={`${peakUpload.uploads} uploads`}
            color="#f57c00"
            Icon={Flame}
          />
          <StatCard
            label="Avg Uploads/Day"
            value={(totalUploads / docUploadsPerDay.length).toFixed(1)}
            sub="Rolling average"
            color="#9c27b0"
            Icon={Activity}
          />
          <StatCard
            label="Active Days"
            value={docUploadsPerDay.filter((d) => d.uploads > 1).length}
            sub="Days with > 1 upload"
            color="#16a34a"
            Icon={Calendar}
          />
        </div>
        <ChartCard
          title="Documents Uploaded Per Day"
          subtitle="Upload volume across monitored dates"
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
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
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
            label="Peak Export Day"
            value={peakExport.date}
            sub={`${peakExport.exports} exports`}
            color="#f57c00"
            Icon={Zap}
          />
          <StatCard
            label="Avg Exports/Day"
            value={(totalExports / docxExportsPerDay.length).toFixed(1)}
            sub="Rolling average"
            color="#1976d2"
            Icon={BarChart2}
          />
          <StatCard
            label="High-Volume Days"
            value={docxExportsPerDay.filter((d) => d.exports >= 10).length}
            sub="Days with ≥ 10 exports"
            color="#16a34a"
            Icon={CalendarCheck}
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
