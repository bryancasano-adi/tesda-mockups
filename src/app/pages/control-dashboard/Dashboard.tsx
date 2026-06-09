import { useState } from "react";
import { UserActivityModule } from "../../components/control-dashboard/UserActivityModule";
import { DocExportModule } from "../../components/control-dashboard/DocExportModule";
import { GenPipelineModule } from "../../components/control-dashboard/GenPipelineModule";
import { TokenUsageModule } from "../../components/control-dashboard/TokenUsageModule";
import { SectorAnalyticsModule } from "../../components/control-dashboard/SectorAnalyticsModule";

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
    description: "AI generation jobs — started, completed, failed",
  },
  {
    id: "token-usage",
    label: "Token Usage",
    description: "AI token consumption and cost tracking",
  },
  {
    id: "sector-analytics",
    label: "Sector-Based Analytics",
    description: "TBs, CSs per sector, regional data & search",
  },
];

export function ControlDashboard() {
  const [activeTab, setActiveTab] = useState("user-activity");
  const active = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-full mx-auto pt-2 pb-12">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-[24px] font-bold text-[#0f172a] leading-tight tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-[13px] text-[#64748b] mt-1">
            {active.description}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 p-1 mb-7 border border-slate-200 bg-white p-1 shadow-sm">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
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

        {/* Module content */}
        <div>
          {activeTab === "user-activity" && <UserActivityModule />}
          {activeTab === "upload-export" && <DocExportModule />}
          {activeTab === "gen-pipeline" && <GenPipelineModule />}
          {activeTab === "token-usage" && <TokenUsageModule />}
          {activeTab === "sector-analytics" && <SectorAnalyticsModule />}
        </div>
      </div>
    </div>
  );
}
