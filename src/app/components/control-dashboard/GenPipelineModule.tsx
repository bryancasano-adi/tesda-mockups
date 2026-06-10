import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Play, CheckCircle2, XCircle, Target, FileDown } from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  DataTable,
  ActionButton,
  exportToExcel,
} from "./PagePrimitives";
import { genPipelineData, genStatusTotals, genBySector } from "./sharedData";

const LEGEND = [
  { c: "#2196f3", l: "Generated" },
  { c: "#16a34a", l: "Finalized" },
  { c: "#f44336", l: "Failed" },
];

export function GenPipelineModule() {
  const totalGenerated = genPipelineData.reduce((s, d) => s + d.generated, 0);
  const totalFinalized = genPipelineData.reduce((s, d) => s + d.finalized, 0);
  const totalFailed = genPipelineData.reduce((s, d) => s + d.failed, 0);
  const grandTotal = genStatusTotals.reduce((s, d) => s + d.value, 0);

  function handleExport() {
    exportToExcel(
      ["Date", "Generated", "Finalized", "Failed", "Success %"],
      genPipelineData.map((r) => [
        r.date,
        r.generated,
        r.finalized,
        r.failed,
        r.generated > 0
          ? `${((r.finalized / r.generated) * 100).toFixed(0)}%`
          : "—",
      ]),
      "generation_pipeline_report",
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ── Pipeline Section ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Document Generation Pipeline"
          subtitle="Daily job counts — generated, finalized, and failed"
        />
        <div className="flex gap-4">
          <StatCard
            label="Jobs Generated"
            value={totalGenerated}
            sub="Total generation requests"
            color="#2196f3"
            Icon={Play}
          />
          <StatCard
            label="Finalized"
            value={totalFinalized}
            sub="Successfully finalized"
            color="#16a34a"
            Icon={CheckCircle2}
          />
          <StatCard
            label="Failed"
            value={totalFailed}
            sub="Failed generation jobs"
            color="#f44336"
            Icon={XCircle}
          />
          <StatCard
            label="Success Rate"
            value={`${((totalFinalized / totalGenerated) * 100).toFixed(1)}%`}
            sub="Finalization rate"
            color="#9c27b0"
            Icon={Target}
          />
        </div>

        <ChartCard
          title="Generation Pipeline Per Day"
          subtitle="Generated vs Finalized vs Failed"
          action={
            <div className="flex gap-4">
              {LEGEND.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "#64748b" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ background: d.c }}
                  />
                  {d.l}
                </div>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genPipelineData} barCategoryGap="30%" barGap={3}>
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
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="generated"
                fill="#2196f3"
                radius={[3, 3, 0, 0]}
                name="Generated"
              />
              <Bar
                dataKey="finalized"
                fill="#16a34a"
                radius={[3, 3, 0, 0]}
                name="Finalized"
              />
              <Bar
                dataKey="failed"
                fill="#f44336"
                radius={[3, 3, 0, 0]}
                name="Failed"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Pipeline Detail by Day"
          subtitle="Per-day breakdown with success rate"
          action={
            <ActionButton onClick={handleExport} variant="outline" size="sm">
              <FileDown size={13} /> Export Excel
            </ActionButton>
          }
        >
          <DataTable
            columns={[
              {
                key: "date",
                header: "Date",
                render: (row) => (
                  <span className="font-medium" style={{ color: "#0f172a" }}>
                    {row.date}
                  </span>
                ),
              },
              {
                key: "generated",
                header: "Generated",
                align: "right",
                render: (row) => (
                  <span className="font-semibold" style={{ color: "#2196f3" }}>
                    {row.generated}
                  </span>
                ),
              },
              {
                key: "finalized",
                header: "Finalized",
                align: "right",
                render: (row) => (
                  <span className="font-semibold" style={{ color: "#16a34a" }}>
                    {row.finalized}
                  </span>
                ),
              },
              {
                key: "failed",
                header: "Failed",
                align: "right",
                render: (row) => (
                  <span className="font-semibold" style={{ color: "#f44336" }}>
                    {row.failed}
                  </span>
                ),
              },
              {
                key: "rate",
                header: "Success %",
                align: "right",
                render: (row) => (
                  <span style={{ color: "#64748b" }}>
                    {row.generated > 0
                      ? `${((row.finalized / row.generated) * 100).toFixed(0)}%`
                      : "—"}
                  </span>
                ),
              },
            ]}
            rows={genPipelineData}
            keyExtractor={(_, i) => i}
          />
        </ChartCard>
      </div>

      {/* ── Status Analytics Section ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Generation Status Analytics"
          subtitle="Aggregate job totals by KGALING status"
        />
        <div className="flex gap-4">
          {genStatusTotals.map((s, i) => (
            <StatCard
              key={i}
              label={s.name}
              value={s.value}
              sub={`${s.pct} of total`}
              color={s.color}
            />
          ))}
          <StatCard
            label="Grand Total"
            value={grandTotal}
            sub="All generation jobs"
            color="#475569"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ChartCard
            title="Generation Totals"
            subtitle="Generated vs Finalized vs Failed"
          >
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={genStatusTotals}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  dataKey="value"
                  label={({ name, pct }) => `${name} ${pct}`}
                  labelLine
                >
                  {genStatusTotals.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`${v} jobs`, ""]}
                  contentStyle={{
                    borderRadius: 10,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Status Breakdown"
            subtitle="Jobs and share per KGALING status"
          >
            <DataTable
              columns={[
                {
                  key: "name",
                  header: "Status",
                  render: (row) => (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ background: row.color }}
                      />
                      <span
                        className="font-medium"
                        style={{ color: "#334155" }}
                      >
                        {row.name}
                      </span>
                    </div>
                  ),
                },
                {
                  key: "value",
                  header: "Jobs",
                  align: "right",
                  render: (row) => (
                    <span className="font-bold" style={{ color: row.color }}>
                      {row.value.toLocaleString()}
                    </span>
                  ),
                },
                {
                  key: "pct",
                  header: "%",
                  align: "right",
                  render: (row) => (
                    <span style={{ color: "#64748b" }}>{row.pct}</span>
                  ),
                },
              ]}
              rows={genStatusTotals}
              keyExtractor={(_, i) => i}
              footer={
                <>
                  <td
                    className="py-3 px-3 font-semibold"
                    style={{ color: "#0f172a" }}
                  >
                    Grand Total
                  </td>
                  <td
                    className="py-3 px-3 text-right font-bold"
                    style={{ color: "#0f172a" }}
                  >
                    {grandTotal.toLocaleString()}
                  </td>
                  <td
                    className="py-3 px-3 text-right font-semibold"
                    style={{ color: "#0f172a" }}
                  >
                    100%
                  </td>
                </>
              }
            />
          </ChartCard>
        </div>
      </div>

      {/* ── Per Sector Generation ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Generation Per Sector"
          subtitle="Generated, finalized, and failed counts by sector"
        />
        <ChartCard
          title="Generation Pipeline by Sector"
          subtitle="KGALING status breakdown across sectors"
          action={
            <div className="flex gap-4">
              {LEGEND.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "#64748b" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ background: d.c }}
                  />
                  {d.l}
                </div>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genBySector} barCategoryGap="25%" barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="sector"
                tick={{ fontSize: 9, fill: "#94a3b8" }}
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
                dataKey="generated"
                fill="#2196f3"
                radius={[3, 3, 0, 0]}
                name="Generated"
              />
              <Bar
                dataKey="finalized"
                fill="#16a34a"
                radius={[3, 3, 0, 0]}
                name="Finalized"
              />
              <Bar
                dataKey="failed"
                fill="#f44336"
                radius={[3, 3, 0, 0]}
                name="Failed"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
