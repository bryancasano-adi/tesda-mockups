import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";
import { Breadcrumbs } from "./Dashboard";

export function DistributionSettings() {
  const { navigateToPage } = usePageNavigation();
  const [mcqItemsPerSet, setMcqItemsPerSet] = useState(20);
  const [minQTperPC, setMinQTperPC] = useState(5);
  const [minQTperPackage, setMinQTperPackage] = useState(25);
  const [includeSafetyQs, setIncludeSafetyQs] = useState(true);

  return (
    <div className="p-6 text-gray-800">
      <div className="text-sm text-[#666] mb-4">
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
            {
              label: "Distribution Settings",
              href: `/distribution-settings`,
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3
          </span>
          Distribution Settings
        </h1>
        <p className="text-sm text-[#666]">
          Configure how Phase 2 pools are distributed into 5 CATS packages
        </p>
      </div>

      {/* Prerequisites Panel */}
      <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded p-5 mb-6">
        <div className="font-semibold text-sm text-[#2E7D32] mb-3">
          Prerequisites Met
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs text-[#1B5E20]">
          <div>
            <div className="font-medium mb-1">Phase 1</div>
            <div>- Evidence Plan finalized</div>
            <div>- Outline generated</div>
          </div>
          <div>
            <div className="font-medium mb-1">Phase 2 - Pools</div>
            <div>- Demonstration Test (5 variations)</div>
            <div>- Questioning Tool (25 questions)</div>
            <div>- Written Test (50 MCQ items + TOS)</div>
          </div>
          <div>
            <div className="font-medium mb-1">Ready for</div>
            <div>→ 5 Assessors Guides (Sets A-E)</div>
            <div>→ Distribution across packages</div>
          </div>
        </div>
      </div>

      {/* Distribution Settings */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            MCQ Distribution Settings
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-[#333] mb-2"
                htmlFor="mcqItemsPerSetInput"
              >
                MCQ Items per Set (Package)
              </label>
              <div className="flex items-center gap-3">
                <input
                  className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="mcqItemsPerSetInput"
                  max={50}
                  min={10}
                  type="number"
                  value={mcqItemsPerSet}
                  onChange={(e) => setMcqItemsPerSet(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666]">
                  items per set (from pool of 50)
                </span>
              </div>
              <div className="text-xs text-[#999] mt-2">
                Each of the 5 packages will contain {mcqItemsPerSet} MCQ items
                drawn from the master pool.
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-[#333] mb-2">
                Calculated: Total Items Distributed
              </div>
              <div className="px-4 py-2 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <div className="text-2xl font-bold text-[#1976D2]">
                  {mcqItemsPerSet * 5}
                </div>
                <div className="text-xs text-[#666]">
                  items across 5 packages (some items may repeat)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questioning Tool Distribution */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Questioning Tool Distribution Settings
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-sm font-medium text-[#333] mb-2"
                htmlFor="minQTperPCInput"
              >
                Minimum Questions per Performance Criteria
              </label>
              <div className="flex items-center gap-3">
                <input
                  className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="minQTperPCInput"
                  max={10}
                  min={3}
                  type="number"
                  value={minQTperPC}
                  onChange={(e) => setMinQTperPC(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666]">questions / PC</span>
              </div>
              <div className="text-xs text-[#999] mt-2">
                TESDA default: 5 questions per PC to ensure adequate coverage.
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#333] mb-2"
                htmlFor="minQTperPackageInput"
              >
                Minimum Questions per Package
              </label>
              <div className="flex items-center gap-3">
                <input
                  className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="minQTperPackageInput"
                  max={30}
                  min={15}
                  type="number"
                  value={minQTperPackage}
                  onChange={(e) => setMinQTperPackage(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666]">questions minimum</span>
              </div>
              <div className="text-xs text-[#999] mt-2">
                Each package must contain at least this many questions.
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded">
            <div className="flex items-start gap-3">
              <span className="text-sm">
                <InformationCircleIcon className="w-8 h-8 inline text-blue-500" />
              </span>
              <div className="flex-1 text-sm text-[#1565C0]">
                <strong>Distribution Strategy:</strong> Questions from the
                25-question pool will be distributed across 5 packages ensuring
                each PC is covered and 4-Dimensions requirements are met in each
                package.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Questions Toggle */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Safety Questions Requirements
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative inline-block w-12 h-6">
              <input
                checked={includeSafetyQs}
                className="sr-only peer"
                type="checkbox"
                onChange={() => setIncludeSafetyQs(!includeSafetyQs)}
              />
              <div className="w-12 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]" />
            </div>
            <div>
              <div className="font-medium text-sm text-[#333]">
                Require at least 1 safety question per package
              </div>
              <div className="text-xs text-[#666]">
                When enabled, each of the 5 packages will include at least one
                safety-focused question.
              </div>
            </div>
          </div>

          {includeSafetyQs && (
            <div className="mt-4 p-3 bg-[#FFFDE7] border border-[#FFE082] rounded text-xs text-[#F57C00]">
              ⚠️ <strong>Validation:</strong> The system will verify that enough
              safety questions exist in the pool before distribution.
            </div>
          )}
        </div>
      </div>

      {/* Demonstration Variations */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Demonstration Test Mapping
          </div>
        </div>
        <div className="p-5">
          <div className="text-sm text-[#666] mb-4">
            The 5 demonstration test variations (Sets A-E) from Phase 2 will be
            mapped 1:1 to the 5 CATS packages:
          </div>
          <div className="overflow-x-auto border border-[#E0E0E0] rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                    Package
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                    Demonstration Variation
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                    Shared Rubric
                  </th>
                </tr>
              </thead>
              <tbody>
                {(["A", "B", "C", "D", "E"] as const).map((set) => (
                  <tr key={set} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                      <span className="font-semibold">Package {set}</span>
                    </td>
                    <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                      Set {set}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#666] border-b border-[#F0F0F0]">
                      100-point rubric (shared)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Distribution Summary */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Distribution Summary
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
              <div className="text-xs text-[#666] mb-1">Total Packages</div>
              <div className="text-2xl font-bold text-[#1976D2]">5</div>
              <div className="text-xs text-[#666]">Sets A, B, C, D, E</div>
            </div>
            <div className="p-4 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
              <div className="text-xs text-[#666] mb-1">
                Documents per Package
              </div>
              <div className="text-2xl font-bold text-[#1976D2]">6</div>
              <div className="text-xs text-[#666]">
                AG, SIC, Written, Rating, SAG, CARS
              </div>
            </div>
            <div className="p-4 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
              <div className="text-xs text-[#666] mb-1">Total Deliverables</div>
              <div className="text-2xl font-bold text-[#1976D2]">30</div>
              <div className="text-xs text-[#666]">
                5 packages × 6 documents
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm">
            <div className="text-[#1565C0] mb-2">
              <strong>Note on Shared Documents:</strong>
            </div>
            <ul className="text-xs text-[#1565C0] space-y-1 ml-5 list-disc">
              <li>
                <strong>Per-Package (unique):</strong> Assessors Guide, SIC,
                Written Test + TOS, Rating Sheet
              </li>
              <li>
                <strong>Shared (identical):</strong> SAG, CARS (same across all
                5 packages)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("/")}
        >
          ← Back to Dashboard
        </button>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={() => alert("Settings saved!")}
          >
            Save Settings
          </button>
          <button
            className="px-6 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
            onClick={() => navigateToPage("ag-assembly")}
          >
            Proceed to Assessors Guide Assembly →
          </button>
        </div>
      </div>
    </div>
  );
}
