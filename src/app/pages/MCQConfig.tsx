import { useState } from "react";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";
import { Breadcrumbs } from "./Dashboard";

export function MCQConfig() {
  const { navigateToPage } = usePageNavigation();
  const [itemCount, setItemCount] = useState(50);
  const [factualPct, setFactualPct] = useState(40);
  const [scenarioPct, setScenarioPct] = useState(30);
  const [applicationPct, setApplicationPct] = useState(30);

  const totalPct = factualPct + scenarioPct + applicationPct;
  const isValid = totalPct === 100;

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
              label: "MCQ Configuration Panel",
              href: `/mcq-config`,
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#C8E6C9] text-[#1B5E20] mr-2">
            PHASE 2
          </span>
          MCQ Configuration Panel
        </h1>
        <p className="text-sm text-[#666]">
          Configure item count and category distribution for Written Test pool
        </p>
      </div>

      {/* Item Count */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Total Item Count
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4">
            <label
              className="text-sm font-medium text-[#333]"
              htmlFor="itemCountInput"
            >
              Number of MCQ items in master pool:
            </label>
            <input
              className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm font-bold text-[#1976D2]"
              id="itemCountInput"
              max={100}
              min={30}
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(parseInt(e.target.value))}
            />
            <span className="text-sm text-[#666]">items (default: 50)</span>
          </div>
          <div className="mt-3 text-xs text-[#666]">
            The master pool will contain {itemCount} items. During Phase 3
            distribution, each of the 5 packages will receive a subset
            (typically 20 items per package).
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">
              Category Distribution
            </div>
            {!isValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#FFEBEE] text-[#C62828]">
                Must total 100%
              </span>
            )}
            {isValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                Valid
              </span>
            )}
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4 mb-6">
            {/* Factual */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="factualPctInput"
                >
                  Factual / Recall
                </label>
                <div className="text-xs text-[#666]">
                  Basic knowledge, definitions, facts
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="factualPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={factualPct}
                  onChange={(e) => setFactualPct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="factualPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={factualPct}
                  onChange={(e) => setFactualPct(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>

            {/* Scenario */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="scenarioPctInput"
                >
                  Scenario / Comprehension
                </label>
                <div className="text-xs text-[#666]">
                  Situation-based, interpretation, analysis
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="scenarioPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={scenarioPct}
                  onChange={(e) => setScenarioPct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="scenarioPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={scenarioPct}
                  onChange={(e) => setScenarioPct(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>

            {/* Application */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="applicationPctInput"
                >
                  Application / Problem-Solving
                </label>
                <div className="text-xs text-[#666]">
                  Applying knowledge, troubleshooting
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="applicationPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={applicationPct}
                  onChange={(e) => setApplicationPct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="applicationPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={applicationPct}
                  onChange={(e) => setApplicationPct(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>
          </div>

          {/* Visual Distribution */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-[#666] uppercase mb-2">
              Distribution Preview
            </div>
            <div className="flex h-8 rounded overflow-hidden">
              <div
                className="bg-[#1976D2] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${factualPct}%` }}
              >
                {factualPct > 10 && `${factualPct}%`}
              </div>
              <div
                className="bg-[#F57C00] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${scenarioPct}%` }}
              >
                {scenarioPct > 10 && `${scenarioPct}%`}
              </div>
              <div
                className="bg-[#7B1FA2] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${applicationPct}%` }}
              >
                {applicationPct > 10 && `${applicationPct}%`}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#1976D2] rounded" />
                <span className="text-[#666]">
                  Factual: {Math.round((itemCount * factualPct) / 100)} items
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#F57C00] rounded" />
                <span className="text-[#666]">
                  Scenario: {Math.round((itemCount * scenarioPct) / 100)} items
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#7B1FA2] rounded" />
                <span className="text-[#666]">
                  Application: {Math.round((itemCount * applicationPct) / 100)}{" "}
                  items
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div
            className={`p-4 rounded border-2 ${isValid ? "border-[#2E7D32] bg-[#F1F8F4]" : "border-[#C62828] bg-[#FFEBEE]"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Percentage:</span>
              <span
                className={`text-2xl font-bold ${isValid ? "text-[#2E7D32]" : "text-[#C62828]"}`}
              >
                {totalPct}%
              </span>
            </div>
            {!isValid && (
              <div className="text-xs text-[#C62828] mt-2">
                Adjust percentages to total exactly 100%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Quick Presets
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setFactualPct(40);
                setScenarioPct(30);
                setApplicationPct(30);
              }}
            >
              <div className="font-semibold text-sm mb-1">Balanced</div>
              <div className="text-xs text-[#666]">40% / 30% / 30%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setFactualPct(50);
                setScenarioPct(30);
                setApplicationPct(20);
              }}
            >
              <div className="font-semibold text-sm mb-1">Factual-Heavy</div>
              <div className="text-xs text-[#666]">50% / 30% / 20%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setFactualPct(30);
                setScenarioPct(35);
                setApplicationPct(35);
              }}
            >
              <div className="font-semibold text-sm mb-1">
                Application-Heavy
              </div>
              <div className="text-xs text-[#666]">30% / 35% / 35%</div>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("")}
        >
          ← Back to Dashboard
        </button>
        <button
          className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
            isValid
              ? "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
              : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
          }`}
          disabled={!isValid}
          onClick={() => navigateToPage("mcq")}
        >
          Save & Continue to MCQ Editor →
        </button>
      </div>
    </div>
  );
}
