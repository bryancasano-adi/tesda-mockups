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
import { StatCard, ChartCard, DataTable, ActionButton } from "./PagePrimitives";
import { tokenUsageData, tokenTrendData } from "./sharedData";

export function TokenUsageModule() {
  const totalTokens = tokenUsageData.reduce((s, d) => s + d.tokens, 0);
  const avgTokens = Math.round(totalTokens / tokenUsageData.length);

  function handleExport() {
    const rows = [
      ["Document", "Tokens Used", "Est. Cost"],
      ...tokenUsageData.map((d) => [d.doc, d.tokens, d.cost]),
      ["TOTAL", totalTokens, "~$1.30"],
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "token_usage_report.csv";
    a.click();
    URL.revokeObjectURL(url);
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
        subtitle="Horizontal comparison of tokens consumed per doc type"
        action={
          <ActionButton onClick={handleExport} variant="outline" size="sm">
            <FileDown size={13} /> Export CSV
          </ActionButton>
        }
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={tokenUsageData} layout="vertical" barSize={18}>
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
        subtitle="Detailed per-document token counts and estimated costs"
        action={
          <ActionButton onClick={handleExport} variant="primary" size="sm">
            <FileDown size={13} /> Export Full Report
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
              key: "share",
              header: "% of Total",
              align: "right",
              render: (row) => (
                <span style={{ color: "#64748b" }}>
                  {((row.tokens / totalTokens) * 100).toFixed(1)}%
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
          rows={tokenUsageData}
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
                className="py-3 px-3 text-right font-semibold"
                style={{ color: "#0f172a" }}
              >
                100%
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
    </div>
  );
}
