import { useState, useMemo } from "react";
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
import {
  Cpu,
  Building2,
  Leaf,
  Globe,
  Zap,
  Search,
  SlidersHorizontal,
  X,
  BookOpen,
  FileCheck,
  Award,
  FileDown,
  ChevronRight,
} from "lucide-react";
import {
  StatCard,
  ChartCard,
  SectionDivider,
  DataTable,
  StatusBadge,
  ActionButton,
  exportToExcel,
} from "./PagePrimitives";
import {
  sectorData,
  statusOfDocsData,
  regionalData,
  ALL_RESULTS,
  SECTORS,
  SUBSECTORS,
  DOC_TYPES,
  STATUSES,
  QUAL_LEVELS,
  ACTIVITY_LEVELS,
  REGIONAL_LEVEL_COLOR,
} from "./sharedData";

const SECTOR_ICON_MAP: Record<
  string,
  { Icon: React.ElementType; color: string; bg: string }
> = {
  "ICT & Animation": { Icon: Cpu,      color: "#1976d2", bg: "#e3f2fd" },
  Construction:      { Icon: Building2, color: "#f57c00", bg: "#fff3e0" },
  Agriculture:       { Icon: Leaf,      color: "#2e7d32", bg: "#e8f5e9" },
  Tourism:           { Icon: Globe,     color: "#9c27b0", bg: "#f3e5f5" },
  Energy:            { Icon: Zap,       color: "#f44336", bg: "#fce4ec" },
  Welding:           { Icon: Zap,       color: "#e65100", bg: "#fbe9e7" },
  Electronics:       { Icon: Cpu,       color: "#0288d1", bg: "#e1f5fe" },
  Automotive:        { Icon: Building2, color: "#455a64", bg: "#eceff1" },
  "Health Care":     { Icon: Award,     color: "#c62828", bg: "#fce4ec" },
};

type SectorBreakdownPayload = {
  sector: string;
  tbs: number;
  cs: number;
  breakdown?: Record<string, number>;
};

function SectorBreakdownTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload: SectorBreakdownPayload }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div
      className="rounded-xl text-[12px] p-3 min-w-[160px]"
      style={{
        background: "#fff",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "#0f172a" }}>
        {label}
      </p>
      <div className="flex gap-4 mb-2">
        <span style={{ color: "#64748b" }}>
          TBs:{" "}
          <span className="font-bold" style={{ color: "#1976d2" }}>
            {d.tbs}
          </span>
        </span>
        <span style={{ color: "#64748b" }}>
          CS:{" "}
          <span className="font-bold" style={{ color: "#f57c00" }}>
            {d.cs}
          </span>
        </span>
      </div>
      {d.breakdown && Object.keys(d.breakdown).length > 0 && (
        <div
          className="border-t pt-2 mt-1 flex flex-col gap-1"
          style={{ borderColor: "#f1f5f9" }}
        >
          <p
            className="text-[10px] uppercase tracking-wider mb-0.5"
            style={{ color: "#94a3b8" }}
          >
            Doc Breakdown
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

export function SectorAnalyticsModule() {
  const totalTBs = sectorData.reduce((s, d) => s + d.tbs, 0);
  const totalCS = sectorData.reduce((s, d) => s + d.cs, 0);
  const totalApproved = sectorData.reduce((s, d) => s + d.approved, 0);
  const totalDocs = statusOfDocsData.reduce((s, d) => s + d.value, 0);

  const [activeSector, setActiveSector] = useState("All");
  const [showAllSectors, setShowAllSectors] = useState(false);
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All Sectors");
  const [subsector, setSubsector] = useState("All Sub-Sectors");
  const [docType, setDocType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [qualLevel, setQualLevel] = useState("All Levels");
  const [submitted, setSubmitted] = useState(false);

  const sectorNames = useMemo(
    () => ["All", ...sectorData.map((d) => d.sector)],
    [],
  );

  const filteredSectorData = useMemo(() => {
    if (activeSector === "All") return sectorData;
    return sectorData.filter((d) => d.sector === activeSector);
  }, [activeSector]);

  // Top 5 sectors ranked by finalized count (descending)
  const topPrioritySectors = useMemo(
    () => [...sectorData].sort((a, b) => b.finalized - a.finalized).slice(0, 5),
    [],
  );
  const allSectorsByFinalized = useMemo(
    () => [...sectorData].sort((a, b) => b.finalized - a.finalized),
    [],
  );

  const activeFilterCount =
    [sector, subsector, docType, status, qualLevel].filter(
      (v, i) =>
        v !==
        [
          "All Sectors",
          "All Sub-Sectors",
          "All Types",
          "All Status",
          "All Levels",
        ][i],
    ).length + (query.trim() !== "" ? 1 : 0);

  const filtered = useMemo(() => {
    let results = [...ALL_RESULTS];
    if (sector !== "All Sectors")
      results = results.filter((r) => r.sector === sector);
    if (subsector !== "All Sub-Sectors")
      results = results.filter((r) => r.subsector === subsector);
    if (docType !== "All Types")
      results = results.filter((r) => r.docType === docType);
    if (status !== "All Status")
      results = results.filter((r) => r.status === status);
    if (qualLevel !== "All Levels")
      results = results.filter((r) => r.nc === qualLevel);
    const q = query.trim().toLowerCase();
    if (q) {
      results = results.filter(
        (r) =>
          r.keyword.some((k) => k.includes(q)) ||
          r.title.toLowerCase().includes(q) ||
          r.sector.toLowerCase().includes(q),
      );
      results = results.sort((a, b) => b.match - a.match);
    }
    return results;
  }, [query, sector, subsector, docType, status, qualLevel]);

  const showResults = submitted || activeFilterCount > 0;

  function resetAll() {
    setQuery("");
    setSector("All Sectors");
    setSubsector("All Sub-Sectors");
    setDocType("All Types");
    setStatus("All Status");
    setQualLevel("All Levels");
    setSubmitted(false);
  }

  function handleExportSectorSummary() {
    exportToExcel(
      ["Sector", "TBs", "CS", "In Dev", "For Review", "Approved", "Finalized", "Activity"],
      sectorData.map((r) => [
        r.sector, r.tbs, r.cs, r.inDev, r.forReview, r.approved, r.finalized, r.activity,
      ]),
      "sector_summary",
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── Sector Filter (main tab) ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "#94a3b8" }}
        >
          Sector
        </span>
        <div className="w-px h-4 bg-slate-200" />
        {sectorNames.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSector(s)}
            className={`px-3 py-1 rounded-full text-[12px] font-medium border transition-colors cursor-pointer ${
              activeSector === s
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── KPI Cards ── */}
      <div className="flex gap-4">
        <StatCard
          label="Total Active TB"
          value={totalTBs}
          sub="Training bodies"
          color="#1976d2"
          Icon={BookOpen}
        />
        <StatCard
          label="Total SCs"
          value={totalCS}
          sub="Competency Standards"
          color="#16a34a"
          Icon={FileCheck}
        />
        <StatCard
          label="Total Approved"
          value={totalApproved}
          sub="Approved documents"
          color="#f57c00"
          Icon={Award}
        />
      </div>

      {/* ── TBs/CSs per Sector + Status of Docs ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ChartCard
            title="TBs and CSs per Sector"
            subtitle="Training Bodies vs Competency Standards — hover for doc type breakdown"
            action={
              <div className="flex gap-4">
                {[
                  { c: "#1976d2", l: "TBs" },
                  { c: "#f57c00", l: "CS" },
                ].map((d, i) => (
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
              <BarChart
                data={filteredSectorData}
                barCategoryGap="25%"
                barGap={4}
              >
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
                <Tooltip content={<SectorBreakdownTooltip />} />
                <Bar
                  dataKey="tbs"
                  fill="#1976d2"
                  radius={[3, 3, 0, 0]}
                  name="TBs"
                />
                <Bar
                  dataKey="cs"
                  fill="#f57c00"
                  radius={[3, 3, 0, 0]}
                  name="CS"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard
          title="Status of Documents"
          subtitle={`${totalDocs} total documents`}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={statusOfDocsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={45}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {statusOfDocsData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p
                  className="text-[22px] font-bold"
                  style={{ color: "#0f172a" }}
                >
                  {totalDocs}
                </p>
                <p className="text-[10px]" style={{ color: "#94a3b8" }}>
                  Total
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {statusOfDocsData.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[12px]"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ background: d.color }}
                  />
                  <span style={{ color: "#475569" }}>{d.name}</span>
                </div>
                <span className="font-bold" style={{ color: "#0f172a" }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ── Top Priority Sectors (ranked by finalized) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[14px] font-semibold"
            style={{ color: "#0f172a" }}
          >
            Top Priority Sectors{" "}
            <span
              className="text-[11px] font-normal ml-1"
              style={{ color: "#94a3b8" }}
            >
              ranked by docs finalized
            </span>
          </p>
          <button
            onClick={() => setShowAllSectors((v) => !v)}
            className="flex items-center gap-1 text-[12px] font-medium hover:underline cursor-pointer"
            style={{ color: "#1976d2" }}
          >
            {showAllSectors ? "Show Top 5" : "View All"}
            <ChevronRight
              size={13}
              style={{
                transform: showAllSectors ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </div>

        {showAllSectors ? (
          /* Expanded: show all sectors as a table */
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <DataTable
              columns={[
                {
                  key: "rank",
                  header: "#",
                  render: (_, i) => (
                    <span className="font-bold" style={{ color: "#94a3b8" }}>
                      {i + 1}
                    </span>
                  ),
                },
                {
                  key: "sector",
                  header: "Sector",
                  render: (row) => {
                    const meta = SECTOR_ICON_MAP[row.sector];
                    const Icon = meta?.Icon ?? BookOpen;
                    return (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: meta?.bg ?? "#f1f5f9" }}
                        >
                          <Icon
                            size={13}
                            style={{ color: meta?.color ?? "#64748b" }}
                          />
                        </div>
                        <span
                          className="font-semibold"
                          style={{ color: "#0f172a" }}
                        >
                          {row.sector}
                        </span>
                      </div>
                    );
                  },
                },
                {
                  key: "finalized",
                  header: "Docs Finalized",
                  align: "right",
                  render: (row) => (
                    <span className="font-bold" style={{ color: "#16a34a" }}>
                      {row.finalized}
                    </span>
                  ),
                },
                {
                  key: "tbs",
                  header: "TBs",
                  align: "right",
                  render: (row) => (
                    <span className="font-semibold" style={{ color: "#1976d2" }}>
                      {row.tbs}
                    </span>
                  ),
                },
                {
                  key: "cs",
                  header: "CS",
                  align: "right",
                  render: (row) => (
                    <span className="font-semibold" style={{ color: "#f57c00" }}>
                      {row.cs}
                    </span>
                  ),
                },
                {
                  key: "activity",
                  header: "Activity",
                  align: "center",
                  render: (row) => (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${ACTIVITY_LEVELS[row.activity]}`}
                    >
                      {row.activity}
                    </span>
                  ),
                },
              ]}
              rows={allSectorsByFinalized}
              keyExtractor={(_, i) => i}
            />
          </div>
        ) : (
          /* Collapsed: show top 5 cards */
          <div className="grid grid-cols-5 gap-3">
            {topPrioritySectors.map((row, i) => {
              const meta = SECTOR_ICON_MAP[row.sector];
              const Icon = meta?.Icon ?? BookOpen;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-4 flex flex-col items-center text-center gap-2"
                  style={{
                    background: "#ffffff",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: meta?.bg ?? "#f1f5f9" }}
                  >
                    <Icon
                      size={20}
                      style={{ color: meta?.color ?? "#64748b" }}
                    />
                  </div>
                  <p
                    className="text-[12px] font-semibold leading-tight"
                    style={{ color: "#0f172a" }}
                  >
                    {row.sector}
                  </p>
                  <div className="flex gap-3 text-[11px]">
                    <span>
                      <span
                        className="font-bold"
                        style={{ color: meta?.color ?? "#64748b" }}
                      >
                        {row.tbs}
                      </span>{" "}
                      <span style={{ color: "#94a3b8" }}>TB</span>
                    </span>
                    <span>
                      <span className="font-bold" style={{ color: "#f57c00" }}>
                        {row.cs}
                      </span>{" "}
                      <span style={{ color: "#94a3b8" }}>CS</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="font-bold" style={{ color: "#16a34a" }}>
                      {row.finalized}
                    </span>{" "}
                    <span style={{ color: "#94a3b8" }}>finalized</span>
                  </div>
                  <div
                    className="h-[2px] w-8 rounded-full"
                    style={{ background: meta?.color ?? "#64748b" }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Regional Implementation ── */}
      <ChartCard
        title="Regional Implementation"
        subtitle="TBs per region with activity level"
        action={
          <div className="flex gap-4">
            {["High", "Medium", "Low"].map((lvl) => {
              const c = REGIONAL_LEVEL_COLOR[lvl];
              return (
                <div
                  key={lvl}
                  className="flex items-center gap-1.5 text-[11px]"
                  style={{ color: "#64748b" }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: c.dot }}
                  />
                  {lvl}
                </div>
              );
            })}
          </div>
        }
      >
        <div className="grid grid-cols-3 gap-2 mt-1">
          {regionalData.map((r, i) => {
            const c = REGIONAL_LEVEL_COLOR[r.level];
            return (
              <div
                key={i}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${c.badge}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: c.dot }}
                  />
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "#334155" }}
                  >
                    {r.region}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-bold ${c.text}`}>
                    {r.tbs} TBs
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${c.badge} ${c.text}`}
                  >
                    {r.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      {/* ── Development Status per Sector ── */}
      <ChartCard
        title="Development Status Per Sector"
        subtitle="In-development, review, and approved counts by sector — hover for doc type breakdown"
        action={
          <div className="flex gap-4">
            {[
              { c: "#9c27b0", l: "In Development" },
              { c: "#f57c00", l: "For Review" },
              { c: "#16a34a", l: "Approved" },
            ].map((d, i) => (
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
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={filteredSectorData}
            barCategoryGap="25%"
            barGap={3}
          >
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
            <Tooltip content={<SectorBreakdownTooltip />} />
            <Bar
              dataKey="inDev"
              fill="#9c27b0"
              radius={[3, 3, 0, 0]}
              name="In Development"
            />
            <Bar
              dataKey="forReview"
              fill="#f57c00"
              radius={[3, 3, 0, 0]}
              name="For Review"
            />
            <Bar
              dataKey="approved"
              fill="#16a34a"
              radius={[3, 3, 0, 0]}
              name="Approved"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Sector Summary Table ── */}
      <ChartCard
        title="Sector Summary"
        subtitle="All sectors with TBs, CS, finalized count, and development status"
        action={
          <ActionButton
            onClick={handleExportSectorSummary}
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
              key: "sector",
              header: "Sector",
              render: (row) => (
                <span className="font-semibold" style={{ color: "#0f172a" }}>
                  {row.sector}
                </span>
              ),
            },
            {
              key: "tbs",
              header: "TBs",
              align: "center",
              render: (row) => (
                <span className="font-bold" style={{ color: "#1976d2" }}>
                  {row.tbs}
                </span>
              ),
            },
            {
              key: "cs",
              header: "CS",
              align: "center",
              render: (row) => (
                <span className="font-bold" style={{ color: "#f57c00" }}>
                  {row.cs}
                </span>
              ),
            },
            {
              key: "inDev",
              header: "In Dev",
              align: "center",
              render: (row) => (
                <span className="font-semibold" style={{ color: "#9c27b0" }}>
                  {row.inDev}
                </span>
              ),
            },
            {
              key: "forReview",
              header: "For Review",
              align: "center",
              render: (row) => (
                <span className="font-semibold" style={{ color: "#f57c00" }}>
                  {row.forReview}
                </span>
              ),
            },
            {
              key: "approved",
              header: "Approved",
              align: "center",
              render: (row) => (
                <span className="font-semibold" style={{ color: "#16a34a" }}>
                  {row.approved}
                </span>
              ),
            },
            {
              key: "finalized",
              header: "Finalized",
              align: "center",
              render: (row) => (
                <span className="font-bold" style={{ color: "#2196f3" }}>
                  {row.finalized}
                </span>
              ),
            },
            {
              key: "activity",
              header: "Activity",
              align: "center",
              render: (row) => (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${ACTIVITY_LEVELS[row.activity]}`}
                >
                  {row.activity}
                </span>
              ),
            },
          ]}
          rows={sectorData}
          keyExtractor={(_, i) => i}
        />
      </ChartCard>

      {/* ════════════════════════════════════════════════════════════════════════
          Search & Filter Section
      ══════════════════════════════════════════════════════════════════════════ */}

      <div className="mt-2">
        <SectionDivider
          title="Intelligent Search & Advanced Filtering"
          subtitle="Find qualifications by concept, theme, or structured criteria"
        />
      </div>

      {/* ── Advanced Filtering ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-[#eff6ff] flex items-center justify-center">
            <SlidersHorizontal size={14} className="text-[#1976d2]" />
          </div>
          <h3
            className="text-[14px] font-semibold"
            style={{ color: "#0f172a" }}
          >
            Advanced Filtering Options
          </h3>
          {activeFilterCount > 0 && (
            <span className="ml-auto bg-[#1976d2] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: "Sector", val: sector, set: setSector, opts: SECTORS },
            {
              label: "Sub-Sector",
              val: subsector,
              set: setSubsector,
              opts: SUBSECTORS,
            },
            {
              label: "Document Type",
              val: docType,
              set: setDocType,
              opts: DOC_TYPES,
            },
            { label: "Status", val: status, set: setStatus, opts: STATUSES },
            {
              label: "Qualification Level",
              val: qualLevel,
              set: setQualLevel,
              opts: QUAL_LEVELS,
            },
          ].map((f, i) => (
            <div key={i}>
              <label
                className="text-[11px] font-semibold block mb-1.5"
                style={{ color: "#64748b" }}
              >
                {f.label}
              </label>
              <select
                value={f.val}
                onChange={(e) => {
                  f.set(e.target.value);
                  setSubmitted(true);
                }}
                className="w-full border border-[#e2e8f0] rounded-xl px-3 py-2 text-[12px] bg-white focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
                style={{ color: "#334155" }}
              >
                {f.opts.map((o, j) => (
                  <option key={j}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <div>
            <label
              className="text-[11px] font-semibold block mb-1.5"
              style={{ color: "#64748b" }}
            >
              Keyword / Theme
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSubmitted(true)}
              placeholder="e.g. greening, sustainability..."
              className="w-full border border-[#e2e8f0] rounded-xl px-3 py-2 text-[12px] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
              style={{ color: "#334155" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ActionButton
            onClick={() => setSubmitted(true)}
            variant="primary"
            size="md"
          >
            <SlidersHorizontal size={14} /> Apply Filters
          </ActionButton>
          <ActionButton onClick={resetAll} variant="outline" size="md">
            Reset
          </ActionButton>
          {activeFilterCount > 0 && (
            <span className="text-[12px] ml-1" style={{ color: "#64748b" }}>
              <span className="font-semibold" style={{ color: "#334155" }}>
                Active:{" "}
              </span>
              {[
                sector !== "All Sectors" && sector,
                subsector !== "All Sub-Sectors" && subsector,
                docType !== "All Types" && docType,
                status !== "All Status" && status,
                qualLevel !== "All Levels" && qualLevel,
                query && `"${query}"`,
              ]
                .filter(Boolean)
                .join(" · ")}
              <button
                onClick={resetAll}
                className="ml-2 inline-flex items-center gap-0.5 hover:underline"
                style={{ color: "#1976d2" }}
              >
                <X size={11} /> Clear all
              </button>
            </span>
          )}
        </div>
      </div>

      {/* ── Intelligent Search ── */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "#ffffff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#eff6ff] flex items-center justify-center">
            <Search size={14} className="text-[#1976d2]" />
          </div>
          <h3
            className="text-[14px] font-semibold"
            style={{ color: "#0f172a" }}
          >
            Intelligent Search Function
          </h3>
        </div>
        <p className="text-[12px] mb-4 mt-0.5" style={{ color: "#94a3b8" }}>
          AI-powered semantic search retrieves related TESDA qualifications even
          if exact keywords don't match the title.
        </p>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSubmitted(true)}
            placeholder="Search by keyword, theme, or concept..."
            className="flex-1 border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors"
            style={{ color: "#334155" }}
          />
          <ActionButton
            onClick={() => setSubmitted(true)}
            variant="primary"
            size="md"
          >
            <Search size={14} /> Search
          </ActionButton>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="text-[12px] self-center"
            style={{ color: "#94a3b8" }}
          >
            Try:
          </span>
          {[
            "greening",
            "renewable energy",
            "sustainable",
            "eco-friendly",
            "organic",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                setSubmitted(true);
              }}
              className={`px-2.5 py-0.5 rounded-full text-[12px] border transition-colors cursor-pointer ${query === tag ? "border-[#90caf9] text-[#1976d2]" : "border-[#e2e8f0] hover:border-[#1976d2] hover:text-[#1976d2]"}`}
              style={{
                background: query === tag ? "#eff6ff" : "#f8fafc",
                color: query === tag ? "#1976d2" : "#64748b",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {showResults ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-[12px] font-medium"
                style={{ color: "#475569" }}
              >
                {filtered.length > 0
                  ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} found`
                  : "No results found"}
                {query && (
                  <span style={{ color: "#94a3b8" }}>
                    {" "}
                    for <em>"{query}"</em>
                  </span>
                )}
              </p>
              {filtered.length > 0 && query && (
                <p className="text-[11px]" style={{ color: "#94a3b8" }}>
                  Sorted by semantic match score
                </p>
              )}
            </div>

            {filtered.length > 0 ? (
              <div className="rounded-xl overflow-hidden border border-[#f1f5f9]">
                <div
                  className="border-b border-[#f1f5f9] grid gap-2 px-4 py-2.5"
                  style={{
                    gridTemplateColumns: "1fr 70px 130px 70px 70px 90px",
                    background: "#f8fafc",
                  }}
                >
                  {[
                    "Qualification Title",
                    "Level",
                    "Sector",
                    "Type",
                    "Match",
                    "Status",
                  ].map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        color: "#94a3b8",
                        textAlign: i >= 3 ? "right" : "left",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {filtered.map((row, i) => (
                  <div
                    key={i}
                    className="grid px-4 py-3 border-b border-[#f8fafc] hover:bg-[#f8fafc] cursor-pointer text-[12px] items-center gap-2 transition-colors"
                    style={{
                      gridTemplateColumns: "1fr 70px 130px 70px 70px 90px",
                    }}
                  >
                    <span className="font-medium" style={{ color: "#0f172a" }}>
                      {row.title}
                    </span>
                    <span style={{ color: "#64748b" }}>{row.nc}</span>
                    <span style={{ color: "#64748b" }}>{row.sector}</span>
                    <span>
                      <span
                        className="px-1.5 py-0.5 rounded-lg text-[10px] font-semibold"
                        style={{ background: "#eff6ff", color: "#1976d2" }}
                      >
                        {row.docType}
                      </span>
                    </span>
                    <span className="text-right">
                      {query ? (
                        <span
                          className="font-bold"
                          style={{ color: "#1976d2" }}
                        >
                          {row.match}%
                        </span>
                      ) : (
                        <span style={{ color: "#cbd5e1" }}>—</span>
                      )}
                    </span>
                    <span className="text-right">
                      <StatusBadge label={row.status} />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#e2e8f0] p-8 text-center">
                <p className="text-[14px]" style={{ color: "#94a3b8" }}>
                  No qualifications match your current filters.
                </p>
                <button
                  onClick={resetAll}
                  className="mt-2 text-[13px] hover:underline"
                  style={{ color: "#1976d2" }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-[#e2e8f0] p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mx-auto mb-3">
              <Search size={22} style={{ color: "#cbd5e1" }} />
            </div>
            <p className="text-[13px]" style={{ color: "#94a3b8" }}>
              Enter a search term or apply filters above to see results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
