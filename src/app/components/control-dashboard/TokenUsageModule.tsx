import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Cpu,
  Activity,
  DollarSign,
  FileText,
  FileDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  DataTable,
  EmptyChartState,
  ActionButton,
  exportToExcel,
} from "./PagePrimitives";
import { tokenUsageData, tokenTrendData, tokenBySector } from "./sharedData";
import type { ReportRecord } from "./reportData";

type TrendPeriod = "quarterly" | "monthly" | "weekly" | "daily";

const TREND_PERIOD_LABELS: Record<TrendPeriod, string> = {
  quarterly: "Quarterly",
  monthly: "Monthly",
  weekly: "Weekly",
  daily: "Daily (last 24hrs)",
};

const DOC_PER_PAGE = 5;
const SECTOR_PER_PAGE = 5;

export function TokenUsageModule({ records }: { records?: ReportRecord[] }) {
  const visibleRecords = records ?? [];
  const useFilteredRecords = records !== undefined;
  const tokenRows = useFilteredRecords
    ? visibleRecords.map((record) => ({
        doc: record.documentTitle,
        tokens: record.tokens,
        cost: `$${record.cost.toFixed(2)}`,
        sector: record.sector,
        date: record.date,
      }))
    : tokenUsageData;
  const sortedTokenData = [...tokenRows].sort((a, b) => b.tokens - a.tokens);
  const trendRows = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<Record<string, { date: string; tokens: number }>>(
          (acc, record) => {
            acc[record.displayDate] = acc[record.displayDate] ?? {
              date: record.displayDate,
              tokens: 0,
            };
            acc[record.displayDate].tokens += record.tokens;
            return acc;
          },
          {},
        ),
      )
    : tokenTrendData;
  const sectorRows = useFilteredRecords
    ? Object.values(
        visibleRecords.reduce<
          Record<string, { sector: string; tokens: number; cost: string }>
        >((acc, record) => {
          acc[record.sector] = acc[record.sector] ?? {
            sector: record.sector,
            tokens: 0,
            cost: "$0.00",
          };
          acc[record.sector].tokens += record.tokens;
          acc[record.sector].cost =
            `$${((acc[record.sector].tokens / 1000) * 0.003).toFixed(2)}`;
          return acc;
        }, {}),
      )
    : tokenBySector;
  const totalTokens = tokenRows.reduce((s, d) => s + d.tokens, 0);
  const avgTokens = Math.round(totalTokens / Math.max(1, tokenRows.length));
  const hasDocumentChartData = sortedTokenData.some((row) => row.tokens > 0);
  const hasSectorChartData = sectorRows.some((row) => row.tokens > 0);

  const [trendPeriod, setTrendPeriod] = useState<TrendPeriod>("monthly");
  const [docSearch, setDocSearch] = useState("");
  const [docPage, setDocPage] = useState(1);
  const [sectorSearch, setSectorSearch] = useState("");
  const [sectorPage, setSectorPage] = useState(1);

  const filteredTrendData = useMemo(() => {
    if (trendPeriod === "daily") return trendRows.slice(-1);
    if (trendPeriod === "weekly") return trendRows.slice(-7);
    return trendRows;
  }, [trendPeriod, trendRows]);
  const hasTrendChartData = filteredTrendData.some((row) => row.tokens > 0);

  const filteredDocs = sortedTokenData.filter((r) =>
    r.doc.toLowerCase().includes(docSearch.toLowerCase()),
  );
  const docPageCount = Math.max(
    1,
    Math.ceil(filteredDocs.length / DOC_PER_PAGE),
  );
  const pagedDocs = filteredDocs.slice(
    (docPage - 1) * DOC_PER_PAGE,
    docPage * DOC_PER_PAGE,
  );

  const filteredSectors = sectorRows.filter((r) =>
    r.sector.toLowerCase().includes(sectorSearch.toLowerCase()),
  );
  const sectorPageCount = Math.max(
    1,
    Math.ceil(filteredSectors.length / SECTOR_PER_PAGE),
  );
  const pagedSectors = filteredSectors.slice(
    (sectorPage - 1) * SECTOR_PER_PAGE,
    sectorPage * SECTOR_PER_PAGE,
  );

  function handleExport() {
    exportToExcel(
      ["#", "Document", "Tokens Used", "Est. Cost"],
      sortedTokenData.map((d, i) => [i + 1, d.doc, d.tokens, d.cost]),
      "token_usage_report",
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <StatCard
          label="Total Tokens Used"
          value={totalTokens.toLocaleString()}
          sub="All documents"
          color="#7b1fa2"
          Icon={Cpu}
        />
        <StatCard
          label="Avg Tokens / Doc"
          value={avgTokens.toLocaleString()}
          sub="Per generation"
          color="#1976d2"
          Icon={Activity}
        />
        <StatCard
          label="Est. Total Cost"
          value={`$${((totalTokens / 1000) * 0.003).toFixed(2)}`}
          sub="Approximate USD"
          color="#f57c00"
          Icon={DollarSign}
        />
        <StatCard
          label="Docs Tracked"
          value={tokenRows.length}
          sub="With token records"
          color="#16a34a"
          Icon={FileText}
        />
      </div>

      <ChartCard
        title="Token Usage Per Generated Document"
        subtitle="Ranked by tokens consumed — highest first"
        action={
          <ActionButton onClick={handleExport} variant="outline" size="sm">
            <FileDown size={13} /> Export Excel
          </ActionButton>
        }
      >
        {hasDocumentChartData ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sortedTokenData} layout="vertical" barSize={18}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f1f5f9"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="doc"
                type="category"
                tick={{ fontSize: 10, fill: "#64748b" }}
                width={160}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v: number) => [
                  `${v.toLocaleString()} tokens`,
                  "Tokens",
                ]}
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="tokens"
                fill="#7b1fa2"
                radius={[0, 4, 4, 0]}
                name="Tokens Used"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartState
            height={220}
            message="No token records match the selected role and filters."
          />
        )}
      </ChartCard>

      <ChartCard
        title="Token Usage Trend Over Time"
        subtitle={`Cumulative token consumption — ${TREND_PERIOD_LABELS[trendPeriod].toLowerCase()} view`}
        action={
          <select
            value={trendPeriod}
            onChange={(e) => setTrendPeriod(e.target.value as TrendPeriod)}
            className="border border-[#e2e8f0] rounded-lg px-2.5 py-1 text-[12px] bg-white focus:outline-none focus:border-[#7b1fa2] focus:ring-1 focus:ring-[#7b1fa2] transition-colors cursor-pointer"
            style={{ color: "#334155" }}
          >
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily (last 24hrs)</option>
          </select>
        }
      >
        {hasTrendChartData ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={filteredTrendData}>
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
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: number) => [`${v.toLocaleString()} tokens`, ""]}
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="tokens"
                stroke="#7b1fa2"
                strokeWidth={2}
                dot={{ fill: "#7b1fa2", r: 4 }}
                name="Tokens"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartState message="No token trend data matches the selected filters." />
        )}
      </ChartCard>

      <ChartCard
        title="Token Usage Report — Per Document"
        subtitle="Ranked by tokens used — highest first"
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
                value={docSearch}
                onChange={(e) => {
                  setDocSearch(e.target.value);
                  setDocPage(1);
                }}
                placeholder="Search by document..."
                className="pl-8 pr-3 py-1.5 border border-[#e2e8f0] rounded-xl text-[12px] w-48 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
                style={{ color: "#334155" }}
              />
            </div>
            <ActionButton onClick={handleExport} variant="primary" size="sm">
              <FileDown size={13} /> Export Excel
            </ActionButton>
          </div>
        }
      >
        <DataTable
          columns={[
            {
              key: "#",
              header: "#",
              render: (_, i) => (
                <span style={{ color: "#94a3b8" }}>
                  {(docPage - 1) * DOC_PER_PAGE + i + 1}
                </span>
              ),
            },
            {
              key: "doc",
              header: "Document",
              render: (row) => (
                <span className="font-medium" style={{ color: "#0f172a" }}>
                  {row.doc}
                </span>
              ),
            },
            {
              key: "tokens",
              header: "Tokens Used",
              align: "right",
              render: (row) => (
                <span className="font-bold" style={{ color: "#7b1fa2" }}>
                  {row.tokens.toLocaleString()}
                </span>
              ),
            },
            {
              key: "cost",
              header: "Est. Cost",
              align: "right",
              render: (row) => (
                <span style={{ color: "#334155" }}>{row.cost}</span>
              ),
            },
          ]}
          rows={pagedDocs}
          keyExtractor={(row) => row.doc}
          footer={
            <>
              <td
                colSpan={2}
                className="py-3 px-3 font-semibold"
                style={{ color: "#0f172a" }}
              >
                TOTAL
              </td>
              <td
                className="py-3 px-3 text-right font-bold"
                style={{ color: "#7b1fa2" }}
              >
                {totalTokens.toLocaleString()}
              </td>
              <td
                className="py-3 px-3 text-right font-bold"
                style={{ color: "#0f172a" }}
              >
                {`$${((totalTokens / 1000) * 0.003).toFixed(2)}`}
              </td>
            </>
          }
        />

        {/* Pagination */}
        {docPageCount > 1 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
            <p className="text-[12px]" style={{ color: "#94a3b8" }}>
              Showing{" "}
              {filteredDocs.length === 0 ? 0 : (docPage - 1) * DOC_PER_PAGE + 1}
              –{Math.min(docPage * DOC_PER_PAGE, filteredDocs.length)} of{" "}
              {filteredDocs.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDocPage((p) => Math.max(1, p - 1))}
                disabled={docPage === 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft size={13} style={{ color: "#475569" }} />
              </button>
              <span className="text-[12px] px-2" style={{ color: "#475569" }}>
                {docPage} / {docPageCount}
              </span>
              <button
                onClick={() => setDocPage((p) => Math.min(docPageCount, p + 1))}
                disabled={docPage === docPageCount}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
              >
                <ChevronRight size={13} style={{ color: "#475569" }} />
              </button>
            </div>
          </div>
        )}
      </ChartCard>

      {/* ── Per Sector Token Usage ── */}
      <div className="flex flex-col gap-4">
        <SectionDivider
          title="Token Usage Per Sector"
          subtitle="AI token consumption broken down by sector"
        />
        <ChartCard
          title="Token Consumption by Sector"
          subtitle="Horizontal comparison of tokens consumed per sector"
        >
          {hasSectorChartData ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sectorRows} layout="vertical" barSize={18}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  dataKey="sector"
                  type="category"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  width={120}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v: number) => [
                    `${v.toLocaleString()} tokens`,
                    "Tokens",
                  ]}
                  contentStyle={{
                    borderRadius: 10,
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="tokens"
                  fill="#7b1fa2"
                  radius={[0, 4, 4, 0]}
                  name="Tokens Used"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartState message="No sector token data matches the selected filters." />
          )}
        </ChartCard>

        <ChartCard
          title="Sector Token Report"
          subtitle="Token usage and estimated cost per sector"
          action={
            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#94a3b8" }}
              />
              <input
                type="text"
                value={sectorSearch}
                onChange={(e) => {
                  setSectorSearch(e.target.value);
                  setSectorPage(1);
                }}
                placeholder="Search by sector..."
                className="pl-8 pr-3 py-1.5 border border-[#e2e8f0] rounded-xl text-[12px] w-48 focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
                style={{ color: "#334155" }}
              />
            </div>
          }
        >
          <DataTable
            columns={[
              {
                key: "#",
                header: "#",
                render: (_, i) => (
                  <span style={{ color: "#94a3b8" }}>
                    {(sectorPage - 1) * SECTOR_PER_PAGE + i + 1}
                  </span>
                ),
              },
              {
                key: "sector",
                header: "Sector",
                render: (row) => (
                  <span className="font-medium" style={{ color: "#0f172a" }}>
                    {row.sector}
                  </span>
                ),
              },
              {
                key: "tokens",
                header: "Tokens Used",
                align: "right",
                render: (row) => (
                  <span className="font-bold" style={{ color: "#7b1fa2" }}>
                    {row.tokens.toLocaleString()}
                  </span>
                ),
              },
              {
                key: "cost",
                header: "Est. Cost",
                align: "right",
                render: (row) => (
                  <span style={{ color: "#334155" }}>{row.cost}</span>
                ),
              },
            ]}
            rows={pagedSectors}
            keyExtractor={(row) => row.sector}
          />

          {/* Pagination */}
          {sectorPageCount > 1 && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f1f5f9]">
              <p className="text-[12px]" style={{ color: "#94a3b8" }}>
                Showing{" "}
                {filteredSectors.length === 0
                  ? 0
                  : (sectorPage - 1) * SECTOR_PER_PAGE + 1}
                –
                {Math.min(sectorPage * SECTOR_PER_PAGE, filteredSectors.length)}{" "}
                of {filteredSectors.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSectorPage((p) => Math.max(1, p - 1))}
                  disabled={sectorPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
                >
                  <ChevronLeft size={13} style={{ color: "#475569" }} />
                </button>
                <span className="text-[12px] px-2" style={{ color: "#475569" }}>
                  {sectorPage} / {sectorPageCount}
                </span>
                <button
                  onClick={() =>
                    setSectorPage((p) => Math.min(sectorPageCount, p + 1))
                  }
                  disabled={sectorPage === sectorPageCount}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e2e8f0] bg-white disabled:opacity-40 hover:bg-[#f8fafc] transition-colors cursor-pointer disabled:cursor-default"
                >
                  <ChevronRight size={13} style={{ color: "#475569" }} />
                </button>
              </div>
            </div>
          )}
        </ChartCard>
      </div>

      {/* ── Token Interpretation Footer ── */}
      <div
        className="rounded-2xl p-5 border border-[#e2e8f0]"
        style={{ background: "#f8fafc" }}
      >
        <p
          className="text-[13px] font-semibold mb-3"
          style={{ color: "#334155" }}
        >
          How to Interpret Token Usage vs. Estimated Cost
        </p>
        <div
          className="grid grid-cols-3 gap-4 text-[12px]"
          style={{ color: "#64748b" }}
        >
          <div className="flex flex-col gap-1.5">
            <p
              className="font-semibold text-[11px] uppercase tracking-wider"
              style={{ color: "#94a3b8" }}
            >
              What is a Token?
            </p>
            <p>
              A token is roughly 4 characters or ¾ of a word. The AI model reads
              your document as a sequence of tokens to understand context and
              generate content.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p
              className="font-semibold text-[11px] uppercase tracking-wider"
              style={{ color: "#94a3b8" }}
            >
              How is Cost Estimated?
            </p>
            <p>
              Estimated cost uses the model's per-token pricing (input + output
              tokens combined). Longer documents with more context naturally
              consume more tokens and cost more.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p
              className="font-semibold text-[11px] uppercase tracking-wider"
              style={{ color: "#94a3b8" }}
            >
              Tips for Optimization
            </p>
            <p>
              Shorter prompts, fewer uploaded reference pages, and targeted
              templates reduce token consumption. Reusing finalized documents
              avoids redundant generation costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
