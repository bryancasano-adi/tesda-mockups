import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { UserActivityModule } from "../../components/control-dashboard/UserActivityModule";
import { DocExportModule } from "../../components/control-dashboard/DocExportModule";
import { GenPipelineModule } from "../../components/control-dashboard/GenPipelineModule";
import { TokenUsageModule } from "../../components/control-dashboard/TokenUsageModule";
import { SectorAnalyticsModule } from "../../components/control-dashboard/SectorAnalyticsModule";
import { ActionButton } from "../../components/control-dashboard/PagePrimitives";
import {
  ROLE_ACCESS,
  ROLE_OPTIONS,
  SECTOR_LOOKUP,
  applyReportFilters,
  getRoleRecords,
  type DashboardRole,
} from "../../components/control-dashboard/reportData";

type Tab = { id: string; label: string; description: string };

const TABS: Tab[] = [
  {
    id: "user-activity",
    label: "User Activity",
    description: "Logins, active users & per-user engagement",
  },
  {
    id: "upload-export",
    label: "Upload & Export",
    description: "Document uploads and DOCX export monitoring",
  },
  {
    id: "gen-pipeline",
    label: "Generation Pipeline",
    description: "AI generation jobs — generated, finalized, failed",
  },
  {
    id: "token-usage",
    label: "Token Usage",
    description: "AI token consumption and cost tracking",
  },
  {
    id: "sector-analytics",
    label: "Sector-Based Analytics",
    description: "TRs, CSs per sector, regional data & search",
  },
  {
    id: "regional",
    label: "Regional",
    description: "ABDD/regional dashboard scoped to assigned regional data",
  },
  {
    id: "provincial",
    label: "Provincial",
    description: "Provincial dashboard scaffold pending final client metrics",
  },
];

export function ControlDashboard() {
  const [activeTab, setActiveTab] = useState("user-activity");
  const [dateFrom, setDateFrom] = useState("2025-05-04");
  const [dateTo, setDateTo] = useState("2025-05-15");
  const [selectedRole, setSelectedRole] = useState<DashboardRole>("Admin");
  const [sector, setSector] = useState("All Sectors");
  const [subSectors, setSubSectors] = useState<string[]>([]);
  const [showSubSectorMenu, setShowSubSectorMenu] = useState(false);
  const [docType, setDocType] = useState("All Document Types");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const roleScope = ROLE_ACCESS[selectedRole];
  const isAdminRole = selectedRole === "Super Admin" || selectedRole === "Admin";
  const isManagerRole = selectedRole === "Manager";
  const hasDocumentTypeAccess = (type: string) =>
    roleScope.allowedDocumentTypes === "all" ||
    roleScope.allowedDocumentTypes.includes(type);
  const roleRecords = getRoleRecords(selectedRole);
  const filteredRecords = applyReportFilters(roleRecords, {
    dateFrom,
    dateTo,
    sector,
    subSectors,
    documentType: docType,
  });
  const visibleTabs = TABS.filter((tab) =>
    roleScope.allowedTabs.includes(tab.id),
  );
  const safeActiveTab = visibleTabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : visibleTabs[0].id;
  const active = visibleTabs.find((t) => t.id === safeActiveTab)!;
  const roleSectors = Array.from(
    new Set(roleRecords.map((record) => record.sector)),
  ).sort();
  const sectorOptions =
    selectedRole === "Super Admin" || selectedRole === "Admin"
      ? Object.keys(SECTOR_LOOKUP)
      : ["All Sectors", ...roleSectors];
  const subSectorOptions = Array.from(
    new Set(
      roleRecords
        .filter(
          (record) => sector === "All Sectors" || record.sector === sector,
        )
        .map((record) => record.subSector),
    ),
  ).sort();
  const docTypeOptions = Array.from(
    new Set(roleRecords.map((record) => record.documentType)),
  ).sort();
  const sectorAnalyticsSections = {
    trCsBySector:
      roleScope.allowedDocumentTypes === "all" ||
      hasDocumentTypeAccess("TR") ||
      hasDocumentTypeAccess("CS"),
    statusDocuments: true,
    topPriority: isAdminRole && safeActiveTab === "sector-analytics",
    regionalImplementation:
      (isAdminRole || isManagerRole) && safeActiveTab === "regional",
    developmentStatus: true,
    sectorSummary: true,
  };

  function toggleSubSector(value: string) {
    setSubSectors((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function toggleAllSubSectors() {
    setSubSectors((current) =>
      current.length === subSectorOptions.length ? [] : subSectorOptions,
    );
  }

  function clearFilters() {
    setDateFrom("2025-05-04");
    setDateTo("2025-05-15");
    setSector("All Sectors");
    setSubSectors([]);
    setDocType("All Document Types");
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-full mx-auto pt-2 pb-12">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#0f172a] leading-tight tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-[13px] text-[#64748b] mt-1">
            {active.description}. Usage/reporting view only — no management or
            edit actions.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-4 mb-4">
          <div className="px-4 py-3 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={15} className="text-[#1976d2]" />
              <p className="text-[13px] font-semibold text-[#0f172a]">
                RBAC Access Tier: {roleScope.tier}
              </p>
            </div>
            <p className="text-[12px] text-[#64748b]">
              {roleScope.dataScope}. {roleScope.notes}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {roleScope.modules.map((module) => (
                <span
                  key={module}
                  className="rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#1976d2]"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>
          <label className="px-4 py-3 bg-white border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
              Role-Based Report View
            </span>
            <select
              value={selectedRole}
              onChange={(event) => {
                setSelectedRole(event.target.value as DashboardRole);
                setActiveTab(
                  ROLE_ACCESS[event.target.value as DashboardRole]
                    .allowedTabs[0],
                );
                setSector("All Sectors");
                setSubSectors([]);
                setDocType("All Document Types");
              }}
              className="mt-1 w-full border border-[#e2e8f0] rounded-lg px-2.5 py-2 text-[12px] text-[#334155] bg-white"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 p-1 mb-4 border border-slate-200 bg-white shadow-sm">
          {visibleTabs.map((tab) => {
            const isActive = tab.id === safeActiveTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Shared report filters */}
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-white border border-slate-200 shadow-sm flex-wrap">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#64748b]">
            <CalendarDays size={14} className="text-[#1976d2]" />
            Report Filters
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-[#94a3b8]">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-[#e2e8f0] rounded-lg px-2.5 py-1 text-[12px] text-[#334155] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-[#94a3b8]">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-[#e2e8f0] rounded-lg px-2.5 py-1 text-[12px] text-[#334155] focus:outline-none focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2] transition-colors bg-white"
            />
          </div>
          {safeActiveTab !== "user-activity" && (
            <>
              <label className="flex items-center gap-2">
                <span className="text-[11px] text-[#94a3b8]">Sector</span>
                <select
                  value={sector}
                  onChange={(event) => {
                    setSector(event.target.value);
                    setSubSectors([]);
                    setShowSubSectorMenu(false);
                  }}
                  className="border border-[#e2e8f0] rounded-lg px-2.5 py-1 text-[12px] text-[#334155] bg-white"
                >
                  {sectorOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <div className="relative flex items-center gap-2">
                <span className="text-[11px] text-[#94a3b8]">Sub-sector</span>
                <button
                  type="button"
                  onClick={() => setShowSubSectorMenu((value) => !value)}
                  className="inline-flex min-w-[180px] items-center justify-between gap-2 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-[12px] text-[#334155] disabled:opacity-50"
                  disabled={sector === "All Sectors"}
                >
                  <span className="truncate">
                    {subSectors.length === 0
                      ? "All Sub-sectors"
                      : subSectors.length === 1
                        ? subSectors[0]
                        : `${subSectors.length} selected`}
                  </span>
                  <ChevronDown size={13} className="text-[#94a3b8]" />
                </button>
                {showSubSectorMenu && (
                  <div className="absolute left-[72px] top-8 z-30 w-72 rounded-lg border border-[#e2e8f0] bg-white p-2 shadow-xl">
                    <button
                      type="button"
                      onClick={toggleAllSubSectors}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] text-[#334155] hover:bg-[#f8fafc]"
                    >
                      <input
                        type="checkbox"
                        checked={
                          subSectorOptions.length > 0 &&
                          subSectors.length === subSectorOptions.length
                        }
                        readOnly
                        className="h-3.5 w-3.5"
                      />
                      Select All
                    </button>
                    <div className="my-1 h-px bg-[#f1f5f9]" />
                    <div className="max-h-56 overflow-y-auto">
                      {subSectorOptions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleSubSector(item)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] text-[#334155] hover:bg-[#f8fafc]"
                        >
                          <input
                            type="checkbox"
                            checked={subSectors.includes(item)}
                            readOnly
                            className="h-3.5 w-3.5"
                          />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <label className="flex items-center gap-2">
                <span className="text-[11px] text-[#94a3b8]">
                  Document Type
                </span>
                <select
                  value={docType}
                  onChange={(event) => setDocType(event.target.value)}
                  className="border border-[#e2e8f0] rounded-lg px-2.5 py-1 text-[12px] text-[#334155] bg-white"
                >
                  {["All Document Types", ...docTypeOptions].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </>
          )}
          <button
            onClick={clearFilters}
            className="text-[12px] font-semibold text-[#1976d2] hover:underline"
          >
            Clear Filters
          </button>
          <div className="flex-1" />
          {safeActiveTab === "sector-analytics" && (
            <ActionButton
              onClick={() => setShowAdvancedSearch(true)}
              variant="primary"
              size="sm"
            >
              <SlidersHorizontal size={13} /> Advanced Search & Filtering
            </ActionButton>
          )}
        </div>

        {/* Module content */}
        <div>
          {safeActiveTab === "user-activity" && (
            <UserActivityModule dateFrom={dateFrom} dateTo={dateTo} />
          )}
          {safeActiveTab === "upload-export" && (
            <DocExportModule records={filteredRecords} />
          )}
          {safeActiveTab === "gen-pipeline" && (
            <GenPipelineModule records={filteredRecords} />
          )}
          {safeActiveTab === "token-usage" && (
            <TokenUsageModule records={filteredRecords} />
          )}
          {safeActiveTab === "sector-analytics" && (
            <SectorAnalyticsModule
              showAdvancedSearch={showAdvancedSearch}
              onCloseAdvancedSearch={() => setShowAdvancedSearch(false)}
              records={filteredRecords}
              sectionVisibility={sectorAnalyticsSections}
            />
          )}
          {safeActiveTab === "regional" && (
            <SectorAnalyticsModule
              showAdvancedSearch={false}
              onCloseAdvancedSearch={() => setShowAdvancedSearch(false)}
              variant="regional"
              records={filteredRecords}
              sectionVisibility={sectorAnalyticsSections}
            />
          )}
          {safeActiveTab === "provincial" && (
            <SectorAnalyticsModule
              showAdvancedSearch={false}
              onCloseAdvancedSearch={() => setShowAdvancedSearch(false)}
              variant="provincial"
              records={filteredRecords}
              sectionVisibility={sectorAnalyticsSections}
            />
          )}
        </div>
      </div>
    </div>
  );
}
