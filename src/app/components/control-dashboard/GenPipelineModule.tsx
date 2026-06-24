import { useState } from "react";
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
import { Play, CheckCircle2, XCircle, Target, FileDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  DataTable,
  EmptyChartState,
  ActionButton,
  exportToExcel,
} from "./PagePrimitives";
import { genPipelineData, genStatusTotals, genBySector } from "./sharedData";
import type { ReportRecord } from "./reportData";

const LEGEND = [
  { c: "#2196f3", l: "Generated" },
  { c: "#16a34a", l: "Finalized" },
  { c: "#f44336", l: "Failed" },
];

const PIPELINE_PER_PAGE = 5;
const failedGenerationRows = [
  {
    document: "Automotive Servicing NC II JAT",
    sector: "Automotive",
    model: "gpt-4.1",
    error: "Validation failed: missing performance criteria coverage",
    timestamp: "2025-05-11 10:42",
  },
  {
    document: "Green Building Maintenance CS",
    sector: "Construction",
    model: "claude-sonnet-4-6",
    error: "Timeout: AI generation exceeded 120s",
    timestamp: "2025-05-11 14:18",
  },
  {
    document: "Computer Systems Servicing FM",
    sector: "ICT & Animation",
    model: "gemini-2.5-pro",
    error: "Template mismatch: section 3 schema error",
    timestamp: "2025-05-12 09:07",
  },
];

export function GenPipelineModule({ records }: { records?: ReportRecord[] }) {
  const visibleRecords = records ?? [];
  const useFilteredRecords = records !== undefined;
  const dailyData = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<Record<string, { date: string; generated: number; finalized: number; failed: number }>>(
          (acc, record) => {
            acc[record.displayDate] = acc[record.displayDate] ?? {
              date: record.displayDate,
              generated: 0,
              finalized: 0,
              failed: 0,
            };
            acc[record.displayDate].generated += record.generated;
            acc[record.displayDate].finalized += record.finalized;
            acc[record.displayDate].failed += record.failed;
            return acc;
          },
          {},
        ),
      )
    : genPipelineData;
  const statusTotals = useFilteredRecords
    ? [
        { name: "Generated", value: dailyData.reduce((s, d) => s + d.generated, 0), color: "#2196f3", pct: "" },
        { name: "Finalized", value: dailyData.reduce((s, d) => s + d.finalized, 0), color: "#16a34a", pct: "" },
        { name: "Failed", value: dailyData.reduce((s, d) => s + d.failed, 0), color: "#f44336", pct: "" },
      ].map((row, _, all) => ({
        ...row,
        pct: `${((row.value / Math.max(1, all.reduce((s, d) => s + d.value, 0))) * 100).toFixed(0)}%`,
      }))
    : genStatusTotals;
  const sectorData = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<Record<string, { sector: string; generated: number; finalized: number; failed: number }>>(
          (acc, record) => {
            acc[record.sector] = acc[record.sector] ?? {
              sector: record.sector,
              generated: 0,
              finalized: 0,
              failed: 0,
            };
            acc[record.sector].generated += record.generated;
            acc[record.sector].finalized += record.finalized;
            acc[record.sector].failed += record.failed;
            return acc;
          },
          {},
        ),
      )
    : genBySector;
  const failedRows = useFilteredRecords
    ? visibleRecords
        .filter((record) => record.failed > 0)
        .slice(0, 12)
        .map((record) => ({
          document: record.documentTitle,
          sector: record.sector,
          model: record.model,
          error: record.errorMessage ?? "Generation failed",
          timestamp: `${record.date} 09:${String(record.generated + 10).padStart(2, "0")}`,
        }))
    : failedGenerationRows;
  const totalGenerated = dailyData.reduce((s, d) => s + d.generated, 0);
  const totalFinalized = dailyData.reduce((s, d) => s + d.finalized, 0);
  const totalFailed = dailyData.reduce((s, d) => s + d.failed, 0);
  const grandTotal = statusTotals.reduce((s, d) => s + d.value, 0);
  const hasDailyChartData = dailyData.some((row) => row.generated > 0);
  const hasStatusChartData = statusTotals.some((row) => row.value > 0);
  const hasSectorChartData = sectorData.some((row) => row.generated > 0);

  const [pipelineSearch, setPipelineSearch] = useState("");
  const [pipelinePage, setPipelinePage] = useState(1);

  const filteredPipeline = dailyData.filter((r) =>
    r.date.toLowerCase().includes(pipelineSearch.toLowerCase()),
  );
  const pipelinePageCount = Math.max(
    1,
    Math.ceil(filteredPipeline.length / PIPELINE_PER_PAGE),
  );
  const pagedPipeline = filteredPipeline.slice(
    (pipelinePage - 1) * PIPELINE_PER_PAGE,
    pipelinePage * PIPELINE_PER_PAGE,
  );

  function handleExport() {
    exportToExcel(
      ["Date", "Generated", "Finalized", "Failed", "Success %"],
      dailyData.map((r) => [
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
            value={
              totalGenerated > 0
                ? `${((totalFinalized / totalGenerated) * 100).toFixed(1)}%`
                : "0.0%"
            }
            sub="Finalization rate"
            color="#9c27b0"
            Icon={Target}
          />
        </div>

        <ChartCard
          title="Generation Pipeline Per Day"
          subtitle="Generated vs Finalized vs Failed"
          action={
            <div className="flex items-center gap-4">
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
              <ActionButton onClick={handleExport} variant="outline" size="sm">
                <FileDown size={13} /> Export Excel
              </ActionButton>
            </div>
          }
        >
          {hasDailyChartData ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyData} barCategoryGap="30%" barGap={3}>
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
          ) : (
            <EmptyChartState
              height={220}
              message="No generation jobs match the selected role and filters."
            />
          )}
        </ChartCard>

        <ChartCard
          title="Pipeline Detail by Day"
          subtitle="Per-day breakdown with success rate"
          action={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#94a3b8" }}
                />
                <input
                  type="text"
                  value={pipelineSearch}
                  onChange={(e) => {
                    setPipelineSearch(e.target.value);
                    setPipelinePage(1);
                  }}
                  placeholder="Search by date..."
                  className="pl-8 pr-3 py-1.5 border border-[#e2e8f0] rounded-xl text-[12px] w-44 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
                  style={{ color: "#334155" }}
                />
              </div>
              <ActionButton onClick={handleExport} variant="outline" size="sm">
                <FileDown size={13} /> Export Excel
              </ActionButton>
            </div>
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
            rows={pagedPipeline}
            keyExtractor={(row) => row.date}
          />

          {/* Pagination */}
          {pipelinePageCount > 1 && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
              <p className="text-[12px]" style={{ color: "#94a3b8" }}>
                Showing{" "}
                {filteredPipeline.length === 0
                  ? 0
                  : (pipelinePage - 1) * PIPELINE_PER_PAGE + 1}
                –{Math.min(
                  pipelinePage * PIPELINE_PER_PAGE,
                  filteredPipeline.length,
                )}{" "}
                of {filteredPipeline.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPipelinePage((p) => Math.max(1, p - 1))}
                  disabled={pipelinePage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft size={13} style={{ color: "#475569" }} />
                </button>
                <span className="text-[12px] px-2" style={{ color: "#475569" }}>
                  {pipelinePage} / {pipelinePageCount}
                </span>
                <button
                  onClick={() =>
                    setPipelinePage((p) => Math.min(pipelinePageCount, p + 1))
                  }
                  disabled={pipelinePage === pipelinePageCount}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
                >
                  <ChevronRight size={13} style={{ color: "#475569" }} />
                </button>
              </div>
            </div>
          )}
        </ChartCard>
      </div>

      {/* ── Status Analytics Section ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Generation Status Analytics"
          subtitle="Aggregate job totals by KGALING status"
        />
        <div className="flex gap-4">
          {statusTotals.map((s, i) => (
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
            action={
              <ActionButton
                onClick={() =>
                  exportToExcel(
                    ["Status", "Jobs", "Share"],
                    statusTotals.map((r) => [r.name, r.value, r.pct]),
                    "generation_status_totals",
                  )
                }
                variant="outline"
                size="sm"
              >
                <FileDown size={13} /> Export Excel
              </ActionButton>
            }
          >
            {hasStatusChartData ? (
              <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusTotals}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={40}
                  dataKey="value"
                  label={({ name, pct }) => `${name} ${pct}`}
                  labelLine
                >
                  {statusTotals.map((e, i) => (
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
            ) : (
              <EmptyChartState
                height={240}
                message="No generation status data matches the selected filters."
              />
            )}
          </ChartCard>

          <ChartCard
            title="Status Breakdown"
            subtitle="Jobs and share per KGALING status"
            action={
              <ActionButton
                onClick={() =>
                  exportToExcel(
                    ["Status", "Jobs", "Share"],
                    statusTotals.map((r) => [r.name, r.value, r.pct]),
                    "generation_status_breakdown",
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
              rows={statusTotals}
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
            <div className="flex items-center gap-4">
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
              <ActionButton
                onClick={() =>
                  exportToExcel(
                    ["Sector", "Generated", "Finalized", "Failed"],
                    sectorData.map((r) => [
                      r.sector,
                      r.generated,
                      r.finalized,
                      r.failed,
                    ]),
                    "generation_by_sector",
                  )
                }
                variant="outline"
                size="sm"
              >
                <FileDown size={13} /> Export Excel
              </ActionButton>
            </div>
          }
        >
          {hasSectorChartData ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sectorData} barCategoryGap="25%" barGap={3}>
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
          ) : (
            <EmptyChartState
              height={220}
              message="No sector generation data matches the selected filters."
            />
          )}
        </ChartCard>
        <ChartCard
          title="Failed Generation Items"
          subtitle="Clickable/hover detail stand-in for failed status segments"
          action={
            <ActionButton
              onClick={() =>
                exportToExcel(
                  ["Document", "Sector", "Model", "Error Message", "Timestamp"],
                  failedRows.map((r) => [
                    r.document,
                    r.sector,
                    r.model,
                    r.error,
                    r.timestamp,
                  ]),
                  "failed_generation_items",
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
              { key: "document", header: "Document" },
              { key: "sector", header: "Sector" },
              { key: "model", header: "Model" },
              { key: "error", header: "Error Message" },
              { key: "timestamp", header: "Timestamp", align: "right" },
            ]}
            rows={failedRows}
            keyExtractor={(row) => row.document}
          />
        </ChartCard>
      </div>
    </div>
  );
}
