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
import { Cpu, Activity, DollarSign, FileText, FileDown } from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  DataTable,
  ActionButton,
  exportToExcel,
} from "./PagePrimitives";
import { tokenUsageData, tokenTrendData, tokenBySector } from "./sharedData";

const sortedTokenData = [...tokenUsageData].sort((a, b) => b.tokens - a.tokens);

export function TokenUsageModule() {
  const totalTokens = tokenUsageData.reduce((s, d) => s + d.tokens, 0);
  const avgTokens = Math.round(totalTokens / tokenUsageData.length);

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
          value="$1.30"
          sub="Approximate USD"
          color="#f57c00"
          Icon={DollarSign}
        />
        <StatCard
          label="Docs Tracked"
          value={tokenUsageData.length}
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
      </ChartCard>

      <ChartCard
        title="Token Usage Trend Over Time"
        subtitle="Cumulative daily token consumption"
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={tokenTrendData}>
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
      </ChartCard>

      <ChartCard
        title="Token Usage Report — Per Document"
        subtitle="Ranked by tokens used — highest first"
        action={
          <ActionButton onClick={handleExport} variant="primary" size="sm">
            <FileDown size={13} /> Export Excel
          </ActionButton>
        }
      >
        <DataTable
          columns={[
            {
              key: "#",
              header: "#",
              render: (_, i) => (
                <span style={{ color: "#94a3b8" }}>{i + 1}</span>
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
          rows={sortedTokenData}
          keyExtractor={(_, i) => i}
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
                ~$1.30
              </td>
            </>
          }
        />
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
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tokenBySector} layout="vertical" barSize={18}>
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
        </ChartCard>

        <ChartCard
          title="Sector Token Report"
          subtitle="Token usage and estimated cost per sector"
        >
          <DataTable
            columns={[
              {
                key: "#",
                header: "#",
                render: (_, i) => (
                  <span style={{ color: "#94a3b8" }}>{i + 1}</span>
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
            rows={tokenBySector}
            keyExtractor={(_, i) => i}
          />
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
        <div className="grid grid-cols-3 gap-4 text-[12px]" style={{ color: "#64748b" }}>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[11px] uppercase tracking-wider" style={{ color: "#94a3b8" }}>
              What is a Token?
            </p>
            <p>
              A token is roughly 4 characters or ¾ of a word. The AI model
              reads your document as a sequence of tokens to understand context
              and generate content.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[11px] uppercase tracking-wider" style={{ color: "#94a3b8" }}>
              How is Cost Estimated?
            </p>
            <p>
              Estimated cost uses the model's per-token pricing (input +
              output tokens combined). Longer documents with more context
              naturally consume more tokens and cost more.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[11px] uppercase tracking-wider" style={{ color: "#94a3b8" }}>
              Tips for Optimization
            </p>
            <p>
              Shorter prompts, fewer uploaded reference pages, and targeted
              templates reduce token consumption. Reusing finalized documents
              avoids redundant generation costs.
            </p>
          </div>
        </div>
        <p
          className="text-[11px] mt-4 pt-3 border-t border-[#e2e8f0]"
          style={{ color: "#94a3b8" }}
        >
          Costs shown are approximations based on current model pricing and may
          vary. Actual billing is determined by Anthropic's usage logs.
        </p>
      </div>
    </div>
  );
}
