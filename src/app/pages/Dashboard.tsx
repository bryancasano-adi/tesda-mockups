import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import {
  ExclamationTriangleIcon,
  InboxStackIcon,
  LockClosedIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

import { WorkflowGuide } from "../components/WorkflowGuide";
import { DocumentActions } from "../components/DocumentActions";

type Crumb = {
  label: string;
  href?: string;
};

export const SECTOR_PROJECT_ID = "06e4823d-1048-4e0b-afff-eab593d2f6cd";
export const DOCUMENT_ID = "f4dbe6f6-0ded-4b46-a7a0-29097e28ca25";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const navigate = useNavigate();
  return (
    <div className="mb-4 text-sm text-gray-500 flex items-center gap-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {item.href ? (
            <button
              className="hover:text-gray-900 hover:underline text-left"
              onClick={() => navigate(item.href!)}
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}
          {i < items.length - 1 && <span>›</span>}
        </div>
      ))}
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState<"workflow" | "package">("workflow");
  const [showGuide, setShowGuide] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    "A" | "B" | "C" | "D" | "E"
  >("A");

  // Phase statuses
  const phase1Complete = true;
  const phase2Complete = true;

  // 5 Package statuses
  const packageStatuses = {
    A: { completed: 6, total: 6 },
    B: { completed: 4, total: 6 },
    C: { completed: 2, total: 6 },
    D: { completed: 1, total: 6 },
    E: { completed: 0, total: 6 },
  };

  const totalCompleted = Object.values(packageStatuses).reduce(
    (sum, pkg) => sum + pkg.completed,
    0,
  );
  const totalDocs = 30;
  const overallProgress = Math.round((totalCompleted / totalDocs) * 100);
  const packageData = {
    A: {
      ag: "finalized",
      sic: "finalized",
      written: "finalized",
      rating: "finalized",
      sag: "finalized",
      cars: "finalized",
    },
    B: {
      ag: "finalized",
      sic: "finalized",
      written: "draft",
      rating: "draft",
      sag: "finalized",
      cars: "finalized",
    },
    C: {
      ag: "finalized",
      sic: "draft",
      written: "not_started",
      rating: "not_started",
      sag: "finalized",
      cars: "finalized",
    },
    D: {
      ag: "draft",
      sic: "not_started",
      written: "not_started",
      rating: "not_started",
      sag: "finalized",
      cars: "finalized",
    },
    E: {
      ag: "not_started",
      sic: "not_started",
      written: "not_started",
      rating: "not_started",
      sag: "finalized",
      cars: "finalized",
    },
  };

  const current = packageData[selectedPackage];

  const renderStatus = (status: string) => {
    switch (status) {
      case "finalized":
        return <CheckIcon className="w-5 h-5 inline text-green-500" />;
      case "draft":
        return (
          <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
        );
      case "not_started":
        return <MinusCircleIcon className="w-5 h-5 inline text-gray-500" />;
      case "locked":
        return <LockClosedIcon className="w-5 h-5 inline text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-8xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          {
            label: "Sector Details",
            href: `/`,
          },
          {
            label: "Sector Projects",
            href: `/`,
          },
          {
            label: "Competency Assessment Tools (CATs)",
            href: `/`,
          },
        ]}
      />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          Competency Assessment Tools (CATs)
        </h1>
        <p className="text-sm text-[#666]">
          Shielded Metal Arc Welding (SMAW) NC II
        </p>
      </div>

      {/* Overall Progress with Phase Cards Inside */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg mb-6">
        <div className="p-5 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium text-sm text-[#333]">
              Overall Progress
            </div>
            <div className="text-xs text-[#666]">
              5 packages • 6 documents • 30 total
            </div>
          </div>
          <div className="mb-2">
            <div className="w-full h-2 bg-[#E0E0E0] rounded overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#666]">
              {overallProgress}% — {phase1Complete ? "Phase 1 complete, " : ""}
              {phase2Complete
                ? "Phase 2 complete"
                : "Phase 2 in progress (2 of 3 pools finalized)"}
              {totalCompleted > 0 &&
                totalCompleted < 30 &&
                `, ${totalCompleted} of 30 docs`}
            </span>
            {totalCompleted === 30 && (
              <button
                className="text-[#1976D2] hover:underline font-medium flex items-center gap-1"
                onClick={() => navigate("/export")}
              >
                Download CATS <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>

        {/* Phase Cards Inside Overall Progress */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1976D2] uppercase">
                      Phase 1
                    </span>
                    {phase1Complete && <span className="text-sm" />}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">
                  Foundation
                </div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#2E7D32]"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="text-xs text-[#2E7D32] mb-2">
                  Complete — Evidence Plan finalized
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2E7D32] uppercase">
                      Phase 2
                    </span>
                    {phase2Complete && <span className="text-sm" />}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">
                  Pool Generation
                </div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#2E7D32]"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="text-xs text-[#2E7D32] mb-2">
                  Complete — 3 pools finalized
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F57C00] uppercase">
                      Phase 3
                    </span>
                    {totalCompleted === 30 ? (
                      <span className="text-sm" />
                    ) : totalCompleted > 0 ? (
                      <span className="text-sm" />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">
                  Package Assembly
                </div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded overflow-hidden">
                    <div
                      className={`h-full ${totalCompleted === 30 ? "bg-[#2E7D32]" : "bg-[#F57C00]"}`}
                      style={{ width: `${(totalCompleted / 30) * 100}%` }}
                    />
                  </div>
                </div>
                <div
                  className={`text-xs mb-2 ${totalCompleted === 30 ? "text-[#2E7D32]" : "text-[#F57C00]"}`}
                >
                  {totalCompleted === 30
                    ? "Complete — All 30 documents finalized"
                    : `In progress — ${totalCompleted} of 30 docs`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            viewMode === "workflow"
              ? "bg-[#1976D2] text-white"
              : "bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => setViewMode("workflow")}
        >
          Workflow View
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            viewMode === "package"
              ? "bg-[#1976D2] text-white"
              : "bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => setViewMode("package")}
        >
          Package View
        </button>
      </div>

      {viewMode === "workflow" ? (
        <div className="space-y-4">
          {/* Phase 1 Documents */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg">
            <div className="px-5 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#1976D2] text-white text-xs font-bold rounded">
                  PHASE 1
                </span>
                <span className="font-bold text-[#333]">
                  Foundation Documents
                </span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded font-semibold">
                {" "}
                Complete
              </span>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/4">
                      Document
                    </th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/3">
                      Description
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Status
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="font-semibold text-sm text-gray-700 hover:underline"
                          onClick={() => navigate("/evidence-plan")}
                        >
                          Evidence Plan
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      4-column table: MCQ, Demo, QT coverage
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Finalized
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Evidence Plan"
                        showLogs={true}
                        status="finalized"
                        onDownload={() => alert("Download Evidence Plan")}
                        onRefresh={() => alert("Refresh Evidence Plan")}
                        onView={() =>
                          navigate("/evidence-plan")
                        }
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="font-semibold text-sm text-gray-700 hover:underline"
                          onClick={() => navigate("/outline")}
                        >
                          Outline
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      Auto-generated from Evidence Plan
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Generated
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Outline"
                        showGenerate={true}
                        showLogs={true}
                        status="finalized"
                        onDownload={() => alert("Download Outline")}
                        onRefresh={() => alert("Regenerate Outline")}
                        onView={() => navigate("/outline")}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phase 2 Pools */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg">
            <div className="px-5 py-3 bg-[#E8F5E9] border-b border-[#A5D6A7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#2E7D32] text-white text-xs font-bold rounded">
                  PHASE 2
                </span>
                <span className="font-bold text-[#333]">Pool Generation</span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded font-semibold">
                {" "}
                Complete
              </span>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/4">
                      Pool
                    </th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/3">
                      Contents
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Status
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="font-semibold text-sm text-gray-700 hover:underline"
                          onClick={() => navigate("/demonstration-test")}
                        >
                          Demonstration Test
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      5 variations (A-E) + shared 100-pt rubric
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Finalized
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Demonstration Test"
                        showLogs={true}
                        status="finalized"
                        onDownload={() => alert("Download Demonstration Test")}
                        onEdit={() =>
                          navigate("/demonstration-test")
                        }
                        onRefresh={() => alert("Refresh Demonstration Test")}
                        onView={() =>
                          navigate("/demonstration-test")
                        }
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="font-semibold text-sm text-gray-700 hover:underline"
                          onClick={() => navigate("/questioning-tool")}
                        >
                          Questioning Tool
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      25 questions (5 per PC x 4 Dimensions)
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Finalized
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Questioning Tool"
                        showLogs={true}
                        status="finalized"
                        onDownload={() => alert("Download Questioning Tool")}
                        onEdit={() =>
                          navigate("/questioning-tool")
                        }
                        onRefresh={() => alert("Refresh Questioning Tool")}
                        onView={() =>
                          navigate("/questioning-tool")
                        }
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="font-semibold text-sm text-gray-700 hover:underline"
                          onClick={() => navigate("/mcq")}
                        >
                          Written Test (MCQ)
                        </button>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">50 items + TOS</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Finalized
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Written Test (MCQ)"
                        showGenerate={true}
                        showLogs={true}
                        status="finalized"
                        onDownload={() => alert("Download Written Test")}
                        onEdit={() => navigate("/mcq")}
                        onRefresh={() => alert("Refresh Written Test")}
                        onView={() =>
                          navigate("/mcq-config")
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phase 3 - Package Assembly */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#FFF3E0] border-b border-[#FFB74D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#F57C00] text-white text-xs font-bold rounded">
                  PHASE 3
                </span>
                <span className="font-bold text-[#333]">Package Assembly</span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#FFF3E0] text-[#F57C00] rounded font-semibold">
                {totalCompleted}/30 docs
              </span>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/4">
                      Step
                    </th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase w-1/3">
                      Description
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Status
                    </th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase w-1/6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-700">
                          Distribution Settings
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      Configure how pools are distributed to 5 packages
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        Configured
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="px-3 py-1.5 text-xs font-medium text-white bg-[#1976D2] hover:bg-[#1565C0] rounded transition-colors"
                        onClick={() =>
                          navigate("/distribution-settings")
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-700">
                          {`Step 1: Assessor's Guides`}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      {`Create 5 Assessor's Guides (Sets A-E)`}
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded text-xs font-semibold">
                        {" "}
                        5 of 5 done
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="px-3 py-1.5 text-xs font-medium text-white bg-[#1976D2] hover:bg-[#1565C0] rounded transition-colors"
                        onClick={() =>
                          navigate("/ag-assembly")
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-700">
                          Step 2: Package Navigator
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">
                      Complete remaining docs for all 5 packages
                    </td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#FFF3E0] text-[#F57C00] rounded text-xs font-semibold">
                        {totalCompleted}/30 docs
                      </span>
                    </td>
                    <td className="text-center py-3">
                      <button
                        className="px-3 py-1.5 text-xs font-medium bg-[#F57C00] text-white hover:bg-[#E65100] rounded transition-colors"
                        onClick={() =>
                          navigate("/package-navigator")
                        }
                      >
                        Continue
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* PACKAGE VIEW */
        <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#E0E0E0]">
            <div className="text-sm text-[#666] mb-4">
              View all 30 documents organized by package. Each package (A-E)
              contains 6 documents.
            </div>

            {/* Package Progress Cards */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {Object.entries(packageStatuses).map(([pkg, status]) => (
                <button
                  key={pkg}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPackage === pkg
                      ? "border-[#1976D2] bg-[#E3F2FD]"
                      : status.completed === 6
                        ? "border-[#2E7D32] bg-[#F1F8F4]"
                        : "border-orange-500 bg-white hover:border-[#1976D2]"
                  }`}
                  onClick={() => setSelectedPackage(pkg as any)}
                >
                  <div className="text-center mb-2">
                    <div className="text-2xl mb-1">
                      {status.completed === 6 ? (
                        <CheckIcon className="w-7 h-7 inline text-green-500" />
                      ) : (
                        <InboxStackIcon className="w-7 h-7 inline text-orange-500" />
                      )}
                    </div>
                    <div className="font-bold text-sm text-gray-700">
                      Package {pkg}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-[#E0E0E0] rounded overflow-hidden mb-2">
                    <div
                      className={`h-full ${status.completed === 6 ? "bg-[#2E7D32]" : "bg-[#F57C00]"}`}
                      style={{ width: `${(status.completed / 6) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-center text-[#666]">
                    {status.completed}/6
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Document Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAFA] border-b-2 border-[#E0E0E0] text-gray-700">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#666] uppercase">
                    Document
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#666] uppercase">
                    Type
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">
                    A
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">
                    B
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">
                    C
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">
                    D
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">
                    E
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {`Assessor's Guide`}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">
                      Unique per pkg
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.ag)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.ag)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.ag)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.ag)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.ag)}
                  </td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">SIC</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">
                      Unique per pkg
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.sic)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.sic)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.sic)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.sic)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.sic)}
                  </td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Written Test + TOS
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">
                      Unique per pkg
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.written)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.written)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.written)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.written)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.written)}
                  </td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rating Sheet</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">
                      Unique per pkg
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.rating)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.rating)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.rating)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.rating)}
                  </td>
                  <td className="text-center px-4 py-3 text-xl">
                    {renderStatus(current.rating)}
                  </td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">SAG</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">
                      Shared (all 5)
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl" colSpan={5}>
                    {renderStatus(current.sag)}
                  </td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">CARS</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">
                      Shared (all 5)
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl" colSpan={5}>
                    {renderStatus(current.cars)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 bg-[#FAFAFA] border-t border-[#E0E0E0]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <span>
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                  </span>
                  <span className="text-[#666]">Finalized</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  </span>
                  <span className="text-[#666]">Draft</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <MinusCircleIcon className="w-5 h-5 inline text-gray-500" />
                  </span>
                  <span className="text-[#666]">Not Started</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>
                    <LockClosedIcon className="w-5 h-5 inline text-orange-500" />
                  </span>
                  <span className="text-[#666]">Locked (Finalized AG)</span>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-xs font-semibold hover:bg-[#1565C0] transition-colors"
                onClick={() => navigate("/package-navigator")}
              >
                Package Navigator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Guide */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-[#1976D2] text-white rounded-full shadow-lg hover:bg-[#1565C0] transition-colors"
          onClick={() => setShowGuide(true)}
        >
          <QuestionMarkCircleIcon className="w-8 h-8 inline bg-blue-500 rounded-full" />
        </button>
      </div>

      {showGuide && <WorkflowGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}
