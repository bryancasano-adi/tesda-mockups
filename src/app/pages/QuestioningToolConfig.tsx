import { useState } from "react";

import {
  Breadcrumbs,
  DOCUMENT_ID,
  SECTOR_ID,
  PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

export function QuestioningToolConfig() {
  const { navigateToPage } = usePageNavigation();
  const [itemCount, setItemCount] = useState(25);

  // Question Type Distribution
  const [knowledgePct, setKnowledgePct] = useState(50);
  const [scenarioPct, setScenarioPct] = useState(50);

  // Dimension Distribution
  const [taskSkillsPct, setTaskSkillsPct] = useState(30);
  const [contingencyPct, setContingencyPct] = useState(30);
  const [taskManagementPct, setTaskManagementPct] = useState(20);
  const [jobRolePct, setJobRolePct] = useState(20);

  const totalTypePct = knowledgePct + scenarioPct;
  const totalDimensionPct =
    taskSkillsPct + contingencyPct + taskManagementPct + jobRolePct;

  const isTypeValid = totalTypePct === 100;
  const isDimensionValid = totalDimensionPct === 100;
  const isValid = isTypeValid && isDimensionValid;

  return (
    <div className="p-6 text-gray-800">
      <div className="text-sm text-[#666] mb-4">
        <Breadcrumbs
          items={[
            {
              label: "Sector Details",
              href: `/home/sector-projects/${SECTOR_ID}/`,
            },
            {
              label: "Sector Projects",
              href: `/home/sector-projects/${SECTOR_ID}/${DOCUMENT_ID}`,
            },
            {
              label: "Competency Assessment Tools (CATs)",
              href: `/home/documents/${PROJECT_ID}?documentId=${DOCUMENT_ID}&documentType=competency-assessment-tool`,
            },
            {
              label: "Oral Questioning Tool - Configuration Panel",
              href: `/home/documents/${PROJECT_ID}?documentId=${DOCUMENT_ID}&documentType=competency-assessment-tool&page=questioning-tool-config`,
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
            PHASE 2
          </span>
          Oral Questioning Tool - Configuration Panel
        </h1>
        <p className="text-sm text-[#666]">
          Configure item count, question type distribution, and dimension of
          competency for Oral Test
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
              Number of questions in master pool:
            </label>
            <input
              className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm font-bold text-[#1976D2]"
              id="itemCountInput"
              max={50}
              min={10}
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(parseInt(e.target.value))}
            />
            <span className="text-sm text-[#666]">questions (default: 25)</span>
          </div>
          <div className="mt-3 text-xs text-[#666]">
            The master pool will contain {itemCount} questions. Each question
            will be categorized by test type and dimension of competency.
          </div>
        </div>
      </div>

      {/* Question Type Distribution */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] bg-blue-100">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">
              Question Type Distribution
            </div>
            {!isTypeValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#FFEBEE] text-[#C62828]">
                Must total 100%
              </span>
            )}
            {isTypeValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                Valid
              </span>
            )}
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4 mb-6">
            {/* Knowledge */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="knowledgePctInput"
                >
                  Knowledge-based
                </label>
                <div className="text-xs text-[#666]">
                  Basic knowledge, definitions, facts, recall
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="knowledgePctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={knowledgePct}
                  onChange={(e) => setKnowledgePct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="knowledgePctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={knowledgePct}
                  onChange={(e) => setKnowledgePct(parseInt(e.target.value))}
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
                  Scenario-based
                </label>
                <div className="text-xs text-[#666]">
                  Situation-based, problem-solving, contingency handling
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
          </div>

          {/* Visual Distribution */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-[#666] uppercase mb-2">
              Distribution Preview
            </div>
            <div className="flex h-8 rounded overflow-hidden">
              <div
                className="bg-[#1976D2] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${knowledgePct}%` }}
              >
                {knowledgePct > 10 && `${knowledgePct}%`}
              </div>
              <div
                className="bg-[#F57C00] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${scenarioPct}%` }}
              >
                {scenarioPct > 10 && `${scenarioPct}%`}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#1976D2] rounded" />
                <span className="text-[#666]">
                  Knowledge: {Math.round((itemCount * knowledgePct) / 100)}{" "}
                  questions
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#F57C00] rounded" />
                <span className="text-[#666]">
                  Scenario: {Math.round((itemCount * scenarioPct) / 100)}{" "}
                  questions
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div
            className={`p-4 rounded border-2 ${isTypeValid ? "border-[#2E7D32] bg-[#F1F8F4]" : "border-[#C62828] bg-[#FFEBEE]"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Percentage:</span>
              <span
                className={`text-2xl font-bold ${isTypeValid ? "text-[#2E7D32]" : "text-[#C62828]"}`}
              >
                {totalTypePct}%
              </span>
            </div>
            {!isTypeValid && (
              <div className="text-xs text-[#C62828] mt-2">
                Adjust percentages to total exactly 100%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Presets - Question Type */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] bg-gray-100">
          <div className="font-semibold text-[15px] text-[#333]">
            Quick Presets - Question Type
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setKnowledgePct(50);
                setScenarioPct(50);
              }}
            >
              <div className="font-semibold text-sm mb-1">Balanced</div>
              <div className="text-xs text-[#666]">50% / 50%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setKnowledgePct(60);
                setScenarioPct(40);
              }}
            >
              <div className="font-semibold text-sm mb-1">Knowledge-Heavy</div>
              <div className="text-xs text-[#666]">60% / 40%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setKnowledgePct(40);
                setScenarioPct(60);
              }}
            >
              <div className="font-semibold text-sm mb-1">Scenario-Heavy</div>
              <div className="text-xs text-[#666]">40% / 60%</div>
            </button>
          </div>
        </div>
      </div>

      {/* Dimension Distribution */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] bg-blue-100">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">
              Dimension of Competency Distribution
            </div>
            {!isDimensionValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#FFEBEE] text-[#C62828]">
                Must total 100%
              </span>
            )}
            {isDimensionValid && (
              <span className="px-2 py-1 rounded text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                Valid
              </span>
            )}
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-4 mb-6">
            {/* Task Skills */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="taskSkillsPctInput"
                >
                  Task Skills
                </label>
                <div className="text-xs text-[#666]">
                  Technical skills, procedures, equipment operation
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="taskSkillsPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={taskSkillsPct}
                  onChange={(e) => setTaskSkillsPct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="taskSkillsPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={taskSkillsPct}
                  onChange={(e) => setTaskSkillsPct(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>

            {/* Contingency Management */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="contingencyPctInput"
                >
                  Contingency Management
                </label>
                <div className="text-xs text-[#666]">
                  Problem-solving, handling unexpected situations
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="contingencyPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={contingencyPct}
                  onChange={(e) => setContingencyPct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="contingencyPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={contingencyPct}
                  onChange={(e) => setContingencyPct(parseInt(e.target.value))}
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>

            {/* Task Management */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="taskManagementPctInput"
                >
                  Task Management
                </label>
                <div className="text-xs text-[#666]">
                  Planning, prioritization, time management
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="taskManagementPctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={taskManagementPct}
                  onChange={(e) =>
                    setTaskManagementPct(parseInt(e.target.value))
                  }
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="taskManagementPctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={taskManagementPct}
                  onChange={(e) =>
                    setTaskManagementPct(parseInt(e.target.value))
                  }
                />
                <span className="text-sm text-[#666] w-4">%</span>
              </div>
            </div>

            {/* Job/Role Environment */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="jobRolePctInput"
                >
                  Job/Role Environment
                </label>
                <div className="text-xs text-[#666]">
                  Workplace context, professional standards, communication
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="w-32"
                  id="jobRolePctInput"
                  max="100"
                  min="0"
                  type="range"
                  value={jobRolePct}
                  onChange={(e) => setJobRolePct(parseInt(e.target.value))}
                />
                <input
                  className="w-16 px-2 py-1 border border-[#E0E0E0] rounded text-sm text-right"
                  id="jobRolePctInput"
                  max={100}
                  min={0}
                  type="number"
                  value={jobRolePct}
                  onChange={(e) => setJobRolePct(parseInt(e.target.value))}
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
                className="bg-[#7B1FA2] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${taskSkillsPct}%` }}
              >
                {taskSkillsPct > 10 && `${taskSkillsPct}%`}
              </div>
              <div
                className="bg-[#00897B] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${contingencyPct}%` }}
              >
                {contingencyPct > 10 && `${contingencyPct}%`}
              </div>
              <div
                className="bg-[#FBC02D] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${taskManagementPct}%` }}
              >
                {taskManagementPct > 10 && `${taskManagementPct}%`}
              </div>
              <div
                className="bg-[#5D4037] flex items-center justify-center text-white text-xs font-semibold"
                style={{ width: `${jobRolePct}%` }}
              >
                {jobRolePct > 10 && `${jobRolePct}%`}
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-2 text-xs gap-x-4 gap-y-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#7B1FA2] rounded" />
                <span className="text-[#666]">
                  Task Skills: {Math.round((itemCount * taskSkillsPct) / 100)}{" "}
                  questions
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#00897B] rounded" />
                <span className="text-[#666]">
                  Contingency: {Math.round((itemCount * contingencyPct) / 100)}{" "}
                  questions
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#FBC02D] rounded" />
                <span className="text-[#666]">
                  Task Mgmt: {Math.round((itemCount * taskManagementPct) / 100)}{" "}
                  questions
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#5D4037] rounded" />
                <span className="text-[#666]">
                  Job/Role: {Math.round((itemCount * jobRolePct) / 100)}{" "}
                  questions
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div
            className={`p-4 rounded border-2 ${isDimensionValid ? "border-[#2E7D32] bg-[#F1F8F4]" : "border-[#C62828] bg-[#FFEBEE]"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Total Percentage:</span>
              <span
                className={`text-2xl font-bold ${isDimensionValid ? "text-[#2E7D32]" : "text-[#C62828]"}`}
              >
                {totalDimensionPct}%
              </span>
            </div>
            {!isDimensionValid && (
              <div className="text-xs text-[#C62828] mt-2">
                Adjust percentages to total exactly 100%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Presets - Dimension */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] bg-gray-100">
          <div className="font-semibold text-[15px] text-[#333]">
            Quick Presets - Dimension
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-3">
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setTaskSkillsPct(30);
                setContingencyPct(30);
                setTaskManagementPct(20);
                setJobRolePct(20);
              }}
            >
              <div className="font-semibold text-sm mb-1">Balanced</div>
              <div className="text-xs text-[#666]">30% / 30% / 20% / 20%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setTaskSkillsPct(40);
                setContingencyPct(30);
                setTaskManagementPct(15);
                setJobRolePct(15);
              }}
            >
              <div className="font-semibold text-sm mb-1">
                Task Skills-Heavy
              </div>
              <div className="text-xs text-[#666]">40% / 30% / 15% / 15%</div>
            </button>
            <button
              className="p-3 border border-[#E0E0E0] rounded hover:border-[#1976D2] hover:bg-[#F5FAFF] transition-all"
              onClick={() => {
                setTaskSkillsPct(25);
                setContingencyPct(35);
                setTaskManagementPct(20);
                setJobRolePct(20);
              }}
            >
              <div className="font-semibold text-sm mb-1">
                Contingency-Heavy
              </div>
              <div className="text-xs text-[#666]">25% / 35% / 20% / 20%</div>
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          className={`px-6 py-2 rounded text-sm font-medium transition-colors ${
            isValid
              ? "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
              : "bg-[#E0E0E0] text-[#999] cursor-not-allowed"
          }`}
          disabled={!isValid}
          onClick={() => navigateToPage("questioning-tool")}
        >
          Save & Continue to Oral Test Editor →
        </button>
      </div>
    </div>
  );
}
