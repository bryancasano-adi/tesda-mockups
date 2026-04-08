"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { DemoTestPreviewModal } from "../components/DemoTestPreviewModal";

import { RichTextEditor } from "@/utils/rich-text-editor";
import { Breadcrumbs } from "./Dashboard";

interface RubricCriterion {
  id: string;
  text: string;
  points: number;
  critical: boolean;
}

interface SupplyItem {
  id: string;
  name: string;
  specs: string;
  qty: number;
  unit: string;
}

interface ToolItem {
  id: string;
  name: string;
  specs: string;
  qty: number;
  unit: string;
}

export function DemonstrationTestEditor() {
  const { navigateToPage } = usePageNavigation();
  const [selectedSet, setSelectedSet] = useState<"A" | "B" | "C" | "D" | "E">(
    "A",
  );
  const [selectedTab, setSelectedTab] = useState<"tasks" | "rubric" | "tools">(
    "tasks",
  );
  const [showPreview, setShowPreview] = useState(false);

  // Modal states
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showAddCriterionModal, setShowAddCriterionModal] = useState(false);
  const [showEditCriterionModal, setShowEditCriterionModal] = useState(false);
  const [showDeleteCriterionConfirm, setShowDeleteCriterionConfirm] =
    useState(false);
  const [showAddSupplyModal, setShowAddSupplyModal] = useState(false);
  const [showEditSupplyModal, setShowEditSupplyModal] = useState(false);
  const [showDeleteSupplyConfirm, setShowDeleteSupplyConfirm] = useState(false);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [showEditToolModal, setShowEditToolModal] = useState(false);
  const [showDeleteToolConfirm, setShowDeleteToolConfirm] = useState(false);

  const [editingCriterionId, setEditingCriterionId] = useState<string | null>(
    null,
  );
  const [deletingCriterionId, setDeletingCriterionId] = useState<string | null>(
    null,
  );
  const [editingSupplyId, setEditingSupplyId] = useState<string | null>(null);
  const [deletingSupplyId, setDeletingSupplyId] = useState<string | null>(null);
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [deletingToolId, setDeletingToolId] = useState<string | null>(null);

  // Form states
  const [criterionText, setCriterionText] = useState("");
  const [criterionPoints, setCriterionPoints] = useState(10);
  const [criterionCritical, setCriterionCritical] = useState(false);

  const [supplyName, setSupplyName] = useState("");
  const [supplySpecs, setSupplySpecs] = useState("");
  const [supplyQty, setSupplyQty] = useState(1);
  const [supplyUnit, setSupplyUnit] = useState("");

  const [toolName, setToolName] = useState("");
  const [toolSpecs, setToolSpecs] = useState("");
  const [toolQty, setToolQty] = useState(1);
  const [toolUnit, setToolUnit] = useState("");

  // Demo of 5 variations status
  const [setStatuses, setSetStatuses] = useState<{
    [key in "A" | "B" | "C" | "D" | "E"]: "complete" | "draft";
  }>({
    A: "complete",
    B: "complete",
    C: "complete",
    D: "draft",
    E: "draft",
  });

  const [rubricCriteria, setRubricCriteria] = useState<RubricCriterion[]>([
    {
      id: "1",
      text: "Electrode identification and selection according to WPS",
      points: 15,
      critical: false,
    },
    {
      id: "2",
      text: "Root pass execution according to WPS",
      points: 25,
      critical: true,
    },
    {
      id: "3",
      text: "Fill and cover pass quality",
      points: 20,
      critical: false,
    },
    {
      id: "4",
      text: "Visual inspection and acceptance criteria",
      points: 20,
      critical: true,
    },
    {
      id: "5",
      text: "Safety compliance and work area management",
      points: 20,
      critical: false,
    },
  ]);

  const [supplies, setSupplies] = useState<SupplyItem[]>([
    {
      id: "1",
      name: "Steel Plates",
      specs: "A36, 6mm x 150mm x 200mm",
      qty: 2,
      unit: "pieces",
    },
    {
      id: "2",
      name: "Welding Electrode",
      specs: "E6013, 3.2mm diameter",
      qty: 1,
      unit: "kg",
    },
  ]);

  const [tools, setTools] = useState<ToolItem[]>([
    {
      id: "1",
      name: "SMAW Machine",
      specs: "AC/DC, 200A minimum",
      qty: 1,
      unit: "unit",
    },
    { id: "2", name: "Angle Grinder", specs: "4.5 inch", qty: 1, unit: "unit" },
  ]);

  // Task Instructions state for each set
  const [taskInstructions, setTaskInstructions] = useState<{
    [key in "A" | "B" | "C" | "D" | "E"]: {
      title: string;
      timeHours: number;
      timeMinutes: number;
      instructions: string;
      expectedOutput: string;
      assessmentConditions: string;
    };
  }>({
    A: {
      title: "Perform Plate-to-Plate Welding",
      timeHours: 4,
      timeMinutes: 0,
      instructions:
        "<p><strong>You are required to perform plate-to-plate welding using SMAW process.</strong></p><ol><li>Prepare the work area and ensure compliance with safety standards using the provided A36 steel plates</li><li>Select and set up the appropriate electrode (E6013, 3.2mm diameter)</li><li>Clean and prepare the base metals according to WPS requirements</li><li>Perform the root pass according to WPS specifications</li><li>Complete the fill and cover passes ensuring proper penetration</li><li>Conduct visual inspection and clean the work area</li></ol>",
      expectedOutput:
        "A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible defects, proper bead appearance, and complete penetration.",
      assessmentConditions:
        "<ul><li>Duration: 4 hours (including setup, execution, and cleanup)</li><li>Setting: Welding workshop with adequate ventilation</li><li>Safety: Full PPE required throughout assessment</li><li>Observation: Assessor will observe entire process without interference</li></ul>",
    },
    B: {
      title: "Perform Plate-to-Plate Welding",
      timeHours: 4,
      timeMinutes: 0,
      instructions:
        "<p><strong>You are required to perform plate-to-plate welding using SMAW process.</strong></p><ol><li>Prepare the work area and ensure compliance with safety standards using the provided mild steel plates</li><li>Select and set up the appropriate electrode (E6013, 2.5mm diameter)</li><li>Clean and prepare the base metals according to WPS requirements</li><li>Perform the root pass according to WPS specifications</li><li>Complete the fill and cover passes ensuring proper penetration</li><li>Conduct visual inspection and clean the work area</li></ol>",
      expectedOutput:
        "A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible defects, proper bead appearance, and complete penetration.",
      assessmentConditions:
        "<ul><li>Duration: 4 hours (including setup, execution, and cleanup)</li><li>Setting: Welding workshop with adequate ventilation</li><li>Safety: Full PPE required throughout assessment</li><li>Observation: Assessor will observe entire process without interference</li></ul>",
    },
    C: {
      title: "Perform Plate-to-Plate Welding",
      timeHours: 4,
      timeMinutes: 0,
      instructions:
        "<p><strong>You are required to perform plate-to-plate welding using SMAW process.</strong></p><ol><li>Prepare the work area and ensure compliance with safety standards with stainless steel base materials</li><li>Select and set up the appropriate electrode (E308L-16 for stainless)</li><li>Clean and prepare the base metals according to WPS requirements</li><li>Perform the root pass according to WPS specifications</li><li>Complete the fill and cover passes ensuring proper penetration</li><li>Conduct visual inspection and clean the work area</li></ol>",
      expectedOutput:
        "A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible defects, proper bead appearance, and complete penetration.",
      assessmentConditions:
        "<ul><li>Duration: 4 hours (including setup, execution, and cleanup)</li><li>Setting: Welding workshop with adequate ventilation</li><li>Safety: Full PPE required throughout assessment</li><li>Observation: Assessor will observe entire process without interference</li></ul>",
    },
    D: {
      title: "Perform Plate-to-Plate Welding",
      timeHours: 4,
      timeMinutes: 0,
      instructions:
        "<p><strong>You are required to perform plate-to-plate welding using SMAW process.</strong></p><ol><li>Prepare the work area and ensure compliance with safety standards using carbon steel workpieces</li><li>Select and set up the appropriate electrode (E7018, 3.2mm diameter)</li><li>Clean and prepare the base metals according to WPS requirements</li><li>Perform the root pass according to WPS specifications</li><li>Complete the fill and cover passes ensuring proper penetration</li><li>Conduct visual inspection and clean the work area</li></ol>",
      expectedOutput:
        "A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible defects, proper bead appearance, and complete penetration.",
      assessmentConditions:
        "<ul><li>Duration: 4 hours (including setup, execution, and cleanup)</li><li>Setting: Welding workshop with adequate ventilation</li><li>Safety: Full PPE required throughout assessment</li><li>Observation: Assessor will observe entire process without interference</li></ul>",
    },
    E: {
      title: "Perform Plate-to-Plate Welding",
      timeHours: 4,
      timeMinutes: 0,
      instructions:
        "<p><strong>You are required to perform plate-to-plate welding using SMAW process.</strong></p><ol><li>Prepare the work area and ensure compliance with safety standards with low-alloy steel plates</li><li>Select and set up the appropriate electrode (E6013, 4.0mm diameter)</li><li>Clean and prepare the base metals according to WPS requirements</li><li>Perform the root pass according to WPS specifications</li><li>Complete the fill and cover passes ensuring proper penetration</li><li>Conduct visual inspection and clean the work area</li></ol>",
      expectedOutput:
        "A properly welded plate-to-plate joint meeting WPS acceptance criteria with no visible defects, proper bead appearance, and complete penetration.",
      assessmentConditions:
        "<ul><li>Duration: 4 hours (including setup, execution, and cleanup)</li><li>Setting: Welding workshop with adequate ventilation</li><li>Safety: Full PPE required throughout assessment</li><li>Observation: Assessor will observe entire process without interference</li></ul>",
    },
  });

  // Editing task instruction state
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [editingTaskTimeHours, setEditingTaskTimeHours] = useState(4);
  const [editingTaskTimeMinutes, setEditingTaskTimeMinutes] = useState(0);
  const [editingTaskInstructions, setEditingTaskInstructions] = useState("");
  const [editingTaskExpectedOutput, setEditingTaskExpectedOutput] =
    useState("");
  const [editingTaskConditions, setEditingTaskConditions] = useState("");

  const toggleSetCompletion = (set: "A" | "B" | "C" | "D" | "E") => {
    setSetStatuses((prev) => ({
      ...prev,
      [set]: prev[set] === "complete" ? "draft" : "complete",
    }));
  };

  // Criterion handlers
  const handleAddCriterion = () => {
    const newId = (
      Math.max(...rubricCriteria.map((c) => parseInt(c.id)), 0) + 1
    ).toString();

    setRubricCriteria([
      ...rubricCriteria,
      {
        id: newId,
        text: criterionText,
        points: criterionPoints,
        critical: criterionCritical,
      },
    ]);
    setCriterionText("");
    setCriterionPoints(10);
    setCriterionCritical(false);
    setShowAddCriterionModal(false);
  };

  const handleEditCriterion = () => {
    setRubricCriteria(
      rubricCriteria.map((c) =>
        c.id === editingCriterionId
          ? {
              ...c,
              text: criterionText,
              points: criterionPoints,
              critical: criterionCritical,
            }
          : c,
      ),
    );
    setCriterionText("");
    setCriterionPoints(10);
    setCriterionCritical(false);
    setEditingCriterionId(null);
    setShowEditCriterionModal(false);
  };

  const handleDeleteCriterion = () => {
    setRubricCriteria(
      rubricCriteria.filter((c) => c.id !== deletingCriterionId),
    );
    setDeletingCriterionId(null);
    setShowDeleteCriterionConfirm(false);
  };

  const openEditCriterionModal = (criterion: RubricCriterion) => {
    setEditingCriterionId(criterion.id);
    setCriterionText(criterion.text);
    setCriterionPoints(criterion.points);
    setCriterionCritical(criterion.critical);
    setShowEditCriterionModal(true);
  };

  const openDeleteCriterionConfirm = (id: string) => {
    setDeletingCriterionId(id);
    setShowDeleteCriterionConfirm(true);
  };

  // Supply handlers
  const handleAddSupply = () => {
    const newId = (
      Math.max(...supplies.map((s) => parseInt(s.id)), 0) + 1
    ).toString();

    setSupplies([
      ...supplies,
      {
        id: newId,
        name: supplyName,
        specs: supplySpecs,
        qty: supplyQty,
        unit: supplyUnit,
      },
    ]);
    setSupplyName("");
    setSupplySpecs("");
    setSupplyQty(1);
    setSupplyUnit("");
    setShowAddSupplyModal(false);
  };

  const handleEditSupply = () => {
    setSupplies(
      supplies.map((s) =>
        s.id === editingSupplyId
          ? {
              ...s,
              name: supplyName,
              specs: supplySpecs,
              qty: supplyQty,
              unit: supplyUnit,
            }
          : s,
      ),
    );
    setSupplyName("");
    setSupplySpecs("");
    setSupplyQty(1);
    setSupplyUnit("");
    setEditingSupplyId(null);
    setShowEditSupplyModal(false);
  };

  const handleDeleteSupply = () => {
    setSupplies(supplies.filter((s) => s.id !== deletingSupplyId));
    setDeletingSupplyId(null);
    setShowDeleteSupplyConfirm(false);
  };

  const openEditSupplyModal = (supply: SupplyItem) => {
    setEditingSupplyId(supply.id);
    setSupplyName(supply.name);
    setSupplySpecs(supply.specs);
    setSupplyQty(supply.qty);
    setSupplyUnit(supply.unit);
    setShowEditSupplyModal(true);
  };

  const openDeleteSupplyConfirm = (id: string) => {
    setDeletingSupplyId(id);
    setShowDeleteSupplyConfirm(true);
  };

  // Tool handlers
  const handleAddTool = () => {
    const newId = (
      Math.max(...tools.map((t) => parseInt(t.id)), 0) + 1
    ).toString();

    setTools([
      ...tools,
      {
        id: newId,
        name: toolName,
        specs: toolSpecs,
        qty: toolQty,
        unit: toolUnit,
      },
    ]);
    setToolName("");
    setToolSpecs("");
    setToolQty(1);
    setToolUnit("");
    setShowAddToolModal(false);
  };

  const handleEditTool = () => {
    setTools(
      tools.map((t) =>
        t.id === editingToolId
          ? {
              ...t,
              name: toolName,
              specs: toolSpecs,
              qty: toolQty,
              unit: toolUnit,
            }
          : t,
      ),
    );
    setToolName("");
    setToolSpecs("");
    setToolQty(1);
    setToolUnit("");
    setEditingToolId(null);
    setShowEditToolModal(false);
  };

  const handleDeleteTool = () => {
    setTools(tools.filter((t) => t.id !== deletingToolId));
    setDeletingToolId(null);
    setShowDeleteToolConfirm(false);
  };

  const openEditToolModal = (tool: ToolItem) => {
    setEditingToolId(tool.id);
    setToolName(tool.name);
    setToolSpecs(tool.specs);
    setToolQty(tool.qty);
    setToolUnit(tool.unit);
    setShowEditToolModal(true);
  };

  const openDeleteToolConfirm = (id: string) => {
    setDeletingToolId(id);
    setShowDeleteToolConfirm(true);
  };

  // Task instruction handlers
  const openEditTaskModal = () => {
    const currentTask = taskInstructions[selectedSet];

    setEditingTaskTitle(currentTask.title);
    setEditingTaskTimeHours(currentTask.timeHours);
    setEditingTaskTimeMinutes(currentTask.timeMinutes);
    setEditingTaskInstructions(currentTask.instructions);
    setEditingTaskExpectedOutput(currentTask.expectedOutput);
    setEditingTaskConditions(currentTask.assessmentConditions);
    setShowEditTaskModal(true);
  };

  const handleSaveTaskInstructions = () => {
    setTaskInstructions({
      ...taskInstructions,
      [selectedSet]: {
        title: editingTaskTitle,
        timeHours: editingTaskTimeHours,
        timeMinutes: editingTaskTimeMinutes,
        instructions: editingTaskInstructions,
        expectedOutput: editingTaskExpectedOutput,
        assessmentConditions: editingTaskConditions,
      },
    });
    setShowEditTaskModal(false);
  };

  const getTotalPoints = () => {
    return rubricCriteria.reduce((sum, c) => sum + c.points, 0);
  };

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
              label: "Demonstration Test",
              href: `/demonstration-test`,
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            Demonstration Test (5 Variations)
          </h1>
          <p className="text-sm text-[#666]">
            Qualification: Shielded Metal Arc Welding (SMAW) NC II
          </p>
        </div>
        <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Finalized
        </span>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">
            <InformationCircleIcon className="w-8 h-8 inline text-blue-500" />
          </span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>5 Task Variations Required (Sets A-E)</strong>
            <div className="mt-1 text-xs">
              All 5 variations assess the SAME Performance Criteria and use a
              single 100-point rubric. Variations differ only in materials,
              tools, methods, scenarios, or conditions - NOT in difficulty or
              PCs covered. Packaged as Sets A-E for different assessment
              centers.
            </div>
          </div>
        </div>
      </div>

      {/* Set Selector */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 p-5">
        <div className="text-sm font-semibold text-[#333] mb-3">
          Select Variation Set:
        </div>
        <div className="flex gap-3">
          {(["A", "B", "C", "D", "E"] as const).map((set) => (
            <button
              key={set}
              className={`flex-1 px-4 py-3 rounded border-2 transition-all ${
                selectedSet === set
                  ? "border-[#1976D2] bg-[#E3F2FD] text-[#1976D2]"
                  : "border-[#E0E0E0] bg-white text-[#666] hover:border-[#90CAF9]"
              }`}
              onClick={() => setSelectedSet(set)}
            >
              <div className="font-bold text-lg">Set {set}</div>
              <div className="text-xs mt-1">
                {setStatuses[set] === "complete" ? (
                  <span className="text-[#2E7D32]">
                    <CheckIcon className="w-5 h-5 inline text-green-500" />{" "}
                    Complete
                  </span>
                ) : (
                  <span className="text-[#F57C00]">
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />{" "}
                    Draft
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === "tasks"
                ? "text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]"
                : "text-[#666] border-transparent hover:bg-[#FAFAFA]"
            }`}
            onClick={() => setSelectedTab("tasks")}
          >
            Task Instructions (Set {selectedSet})
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === "rubric"
                ? "text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]"
                : "text-[#666] border-transparent hover:bg-[#FAFAFA]"
            }`}
            onClick={() => setSelectedTab("rubric")}
          >
            Performance Rubric (Single - All Sets)
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === "tools"
                ? "text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]"
                : "text-[#666] border-transparent hover:bg-[#FAFAFA]"
            }`}
            onClick={() => setSelectedTab("tools")}
          >
            Tools & Equipment (Set {selectedSet})
          </button>
        </div>

        <div className="p-6">
          {/* TAB: TASK INSTRUCTIONS */}
          {selectedTab === "tasks" && (
            <div className="space-y-6">
              <div className="border-2 border-[#1976D2] rounded-lg p-5 bg-[#F5FAFF]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-base text-[#333] mb-1">
                      Set {selectedSet}: {taskInstructions[selectedSet].title}
                    </h3>
                    <div className="text-xs text-[#666]">
                      Time Allotted: {taskInstructions[selectedSet].timeHours}{" "}
                      hours {taskInstructions[selectedSet].timeMinutes} minutes
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 text-xs text-white bg-[#1976D2] rounded hover:bg-[#1565C0] transition-colors flex items-center gap-1"
                      onClick={openEditTaskModal}
                    >
                      <PencilSquareIcon className="w-5 h-5 inline" />
                      Edit
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">
                    Task Instructions:
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: taskInstructions[selectedSet].instructions,
                    }}
                    className="p-4 bg-white rounded border border-[#E0E0E0] text-sm text-[#666] leading-relaxed prose prose-sm max-w-none"
                  />
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">
                    Expected Output:
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0] text-sm text-[#666]">
                    {taskInstructions[selectedSet].expectedOutput}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-semibold text-[#666] uppercase mb-2">
                    Assessment Conditions:
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        taskInstructions[selectedSet].assessmentConditions,
                    }}
                    className="p-3 bg-white rounded border border-[#E0E0E0] text-sm text-[#666] prose prose-sm max-w-none"
                  />
                </div>
              </div>

              <div className="text-xs text-[#999] italic p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <InformationCircleIcon className="w-5 h-5 inline text-blue-500" />{" "}
                Note: This is Set {selectedSet} out of 5 variations. Each
                variation uses different materials or equipment but assesses the
                same Performance Criteria using the shared 100-point rubric.
              </div>
            </div>
          )}

          {/* TAB: PERFORMANCE RUBRIC (Single for all sets) */}
          {selectedTab === "rubric" && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FFFDE7] border border-[#FFE082] rounded">
                <div className="flex items-start gap-2">
                  <span className="text-lg">
                    <ExclamationTriangleIcon className="w-5 h-5 inline text-yellow-500" />
                  </span>
                  <div className="flex-1 text-sm text-[#F57C00]">
                    <strong>Single Rubric for All 5 Variations</strong>
                    <div className="text-xs mt-1">
                      This 100-point rubric is used for ALL Sets (A-E). The
                      criteria map directly to Performance Criteria from the
                      Evidence Plan and remain consistent across all variations.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <div className="text-sm font-medium text-[#333] mb-1">
                    Performance Standards - {getTotalPoints()} Point Rubric
                  </div>
                  <div className="text-xs text-[#666]">
                    Used for scoring all 5 task variations (Sets A, B, C, D, E)
                  </div>
                </div>

                <div className="overflow-x-auto border border-[#E0E0E0] rounded">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Performance Criteria / Clustered PC
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Max Points
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rubricCriteria.map((criterion, index) => (
                        <tr
                          key={criterion.id}
                          className={
                            criterion.critical
                              ? "bg-[#FFFDE7] hover:bg-[#FFF9C4]"
                              : "hover:bg-[#FAFAFA]"
                          }
                        >
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {criterion.text}{" "}
                            {criterion.critical && (
                              <span className="text-[#F57C00] font-bold">
                                *
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                            {criterion.points}
                          </td>
                          <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                            <button
                              className="text-[#1976D2] hover:underline mx-1"
                              onClick={() => openEditCriterionModal(criterion)}
                            >
                              <PencilSquareIcon className="w-5 h-5 inline" />
                            </button>
                            <button
                              className="text-[#C62828] hover:underline mx-1"
                              onClick={() =>
                                openDeleteCriterionConfirm(criterion.id)
                              }
                            >
                              <TrashIcon className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-[#E8F5E9]">
                        <td
                          className="px-4 py-3 text-sm font-bold text-right"
                          colSpan={2}
                        >
                          TOTAL POINTS
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-center">
                          {getTotalPoints()}
                        </td>
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors"
                  onClick={() => setShowAddCriterionModal(true)}
                >
                  + Add Criterion
                </button>

                <div className="mt-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
                  <div className="font-semibold text-sm text-[#2E7D32] mb-2">
                    Competency Decision Rules:
                  </div>
                  <ul className="text-sm text-[#1B5E20] space-y-1 ml-5 list-disc">
                    <li>
                      <strong>Competent (C)</strong>: Total score ≥ 75/
                      {getTotalPoints()} AND all critical PCs (*) demonstrated
                      AND no unsafe practice observed
                    </li>
                    <li>
                      <strong>Not Yet Competent (NYC)</strong>: Score {"<"} 75
                      OR failure to demonstrate a critical PC OR unsafe practice
                      observed
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TOOLS & EQUIPMENT */}
          {selectedTab === "tools" && (
            <div className="space-y-6">
              <div className="p-3 bg-[#E3F2FD] border border-[#90CAF9] rounded text-sm text-[#1565C0]">
                <InformationCircleIcon className="w-5 h-5 inline text-blue-500" />{" "}
                Tools and equipment list for <strong>Set {selectedSet}</strong>.
                Each variation may have different materials or tools while
                maintaining equivalent complexity.
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">
                  A. SUPPLIES AND MATERIALS
                </h3>
                <div className="overflow-x-auto border border-[#E0E0E0] rounded mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Item
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Specs
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Qty
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Unit
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplies.map((supply, index) => (
                        <tr key={supply.id} className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {supply.name}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {supply.specs}
                          </td>
                          <td className="px-4 py-3 text-sm text-center border-b border-[#F0F0F0]">
                            {supply.qty}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {supply.unit}
                          </td>
                          <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                            <button
                              className="text-[#1976D2] hover:underline mx-1"
                              onClick={() => openEditSupplyModal(supply)}
                            >
                              <PencilSquareIcon className="w-5 h-5 inline" />
                            </button>
                            <button
                              className="text-[#C62828] hover:underline"
                              onClick={() => openDeleteSupplyConfirm(supply.id)}
                            >
                              <TrashIcon className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors"
                  onClick={() => setShowAddSupplyModal(true)}
                >
                  + Add Supply/Material
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">
                  B. TOOLS AND EQUIPMENT
                </h3>
                <div className="overflow-x-auto border border-[#E0E0E0] rounded mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAFA]">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-12">
                          No.
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Item
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                          Specs
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Qty
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-20">
                          Unit
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border-b border-[#E0E0E0] w-24">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tools.map((tool, index) => (
                        <tr key={tool.id} className="hover:bg-[#FAFAFA]">
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {tool.name}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {tool.specs}
                          </td>
                          <td className="px-4 py-3 text-sm text-center border-b border-[#F0F0F0]">
                            {tool.qty}
                          </td>
                          <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                            {tool.unit}
                          </td>
                          <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                            <button
                              className="text-[#1976D2] hover:underline mx-1"
                              onClick={() => openEditToolModal(tool)}
                            >
                              <PencilSquareIcon className="w-5 h-5 inline" />
                            </button>
                            <button
                              className="text-[#C62828] hover:underline"
                              onClick={() => openDeleteToolConfirm(tool.id)}
                            >
                              <TrashIcon className="w-5 h-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors"
                  onClick={() => setShowAddToolModal(true)}
                >
                  + Add Tool/Equipment
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#333] mb-3">
                  C. FACILITIES
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                  <div>
                    <label
                      className="block text-xs font-medium text-[#666] mb-2"
                      htmlFor="assessmentAreaInput"
                    >
                      Assessment Area (sqm)
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                      defaultValue={25}
                      id="assessmentAreaInput"
                      type="number"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-medium text-[#666] mb-2"
                      htmlFor="officeAreaInput"
                    >
                      Office Area (sqm)
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                      defaultValue={10}
                      id="officeAreaInput"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("/")}
        >
          ← Back to Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
            setStatuses[selectedSet] === "complete"
              ? "bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]"
              : "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
          }`}
          onClick={() => toggleSetCompletion(selectedSet)}
        >
          <CheckCircleIcon className="w-5 h-5 inline" />
          {setStatuses[selectedSet] === "complete"
            ? `Unmark Set ${selectedSet}`
            : `Mark Set ${selectedSet} as Complete`}
        </button>
        <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Save Draft
        </button>
        <button
          className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
          onClick={() => setShowPreview(true)}
        >
          <EyeIcon className="w-5 h-5 inline" />
          Preview
        </button>
      </div>

      {/* Edit Task Instructions Modal */}
      {showEditTaskModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
              <h3 className="font-semibold text-[#333]">
                Edit Task Instructions - Set {selectedSet}
              </h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowEditTaskModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="taskTitleInput"
                >
                  Task Title
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="taskTitleInput"
                  placeholder="e.g., Perform Plate-to-Plate Welding"
                  type="text"
                  value={editingTaskTitle}
                  onChange={(e) => setEditingTaskTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="timeAllottedInput"
                  >
                    Time Allotted (Hours)
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="timeAllottedInput"
                    min={0}
                    type="number"
                    value={editingTaskTimeHours}
                    onChange={(e) =>
                      setEditingTaskTimeHours(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="timeAllottedMinutesInput"
                  >
                    Time Allotted (Minutes)
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="timeAllottedMinutesInput"
                    max={59}
                    min={0}
                    type="number"
                    value={editingTaskTimeMinutes}
                    onChange={(e) =>
                      setEditingTaskTimeMinutes(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="taskInstructionsEditor"
                >
                  Task Instructions
                </label>
                <div className="border border-[#E0E0E0] rounded">
                  <RichTextEditor
                    value={editingTaskInstructions}
                    onChange={setEditingTaskInstructions}
                  />
                </div>
                <p className="text-xs text-[#999] mt-1">
                  Use the rich text editor to format your task instructions with
                  lists, bold text, etc.
                </p>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="expectedOutputInput"
                >
                  Expected Output
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="expectedOutputInput"
                  placeholder="Describe what the candidate should produce..."
                  rows={3}
                  value={editingTaskExpectedOutput}
                  onChange={(e) => setEditingTaskExpectedOutput(e.target.value)}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="assessmentConditionsEditor"
                >
                  Assessment Conditions
                </label>
                <div className="border border-[#E0E0E0] rounded">
                  <RichTextEditor
                    value={editingTaskConditions}
                    onChange={setEditingTaskConditions}
                  />
                </div>
                <p className="text-xs text-[#999] mt-1">
                  Specify duration, setting, safety requirements, observation
                  notes, etc.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2 flex-shrink-0">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowEditTaskModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                onClick={handleSaveTaskInstructions}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Criterion Modal */}
      {showAddCriterionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">Add New Criterion</h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowAddCriterionModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="criterionText"
                >
                  Performance Criteria Text
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="criterionText"
                  placeholder="Enter the performance criteria description..."
                  rows={3}
                  value={criterionText}
                  onChange={(e) => setCriterionText(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="maxPointsInput"
                  >
                    Max Points
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="maxPointsInput"
                    min={1}
                    type="number"
                    value={criterionPoints}
                    onChange={(e) =>
                      setCriterionPoints(parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="critialAspectInput"
                  >
                    Critical Aspect?
                  </label>
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      checked={criterionCritical}
                      className="w-4 h-4"
                      id="critialAspectInput"
                      type="checkbox"
                      onChange={(e) => setCriterionCritical(e.target.checked)}
                    />
                    <span className="text-sm text-[#666]">
                      Mark as critical aspect (*)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowAddCriterionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                disabled={!criterionText.trim()}
                onClick={handleAddCriterion}
              >
                Add Criterion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Criterion Modal */}
      {showEditCriterionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">Edit Criterion</h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowEditCriterionModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editCriterionText"
                >
                  Performance Criteria Text
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editCriterionText"
                  rows={3}
                  value={criterionText}
                  onChange={(e) => setCriterionText(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editMaxPointsInput"
                  >
                    Max Points
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="editMaxPointsInput"
                    min={1}
                    type="number"
                    value={criterionPoints}
                    onChange={(e) =>
                      setCriterionPoints(parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editCriticalAspect"
                  >
                    Critical Aspect?
                  </label>
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      checked={criterionCritical}
                      className="w-4 h-4"
                      id="editCriticalAspect"
                      type="checkbox"
                      onChange={(e) => setCriterionCritical(e.target.checked)}
                    />
                    <span className="text-sm text-[#666]">
                      Mark as critical aspect (*)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowEditCriterionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                onClick={handleEditCriterion}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Criterion Confirm Modal */}
      {showDeleteCriterionConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h3 className="font-semibold text-[#333]">Delete Criterion</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#666]">
                Are you sure you want to delete this criterion? This action
                cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowDeleteCriterionConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C]"
                onClick={handleDeleteCriterion}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Supply Modal */}
      {showAddSupplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">Add Supply/Material</h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowAddSupplyModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="supplyNameInput"
                >
                  Item Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="supplyNameInput"
                  placeholder="e.g., Steel Plates"
                  type="text"
                  value={supplyName}
                  onChange={(e) => setSupplyName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="supplySpecsInput"
                >
                  Specifications
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="supplySpecsInput"
                  placeholder="e.g., A36, 6mm x 150mm x 200mm"
                  type="text"
                  value={supplySpecs}
                  onChange={(e) => setSupplySpecs(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="supplyQtyInput"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="supplyQtyInput"
                    min={1}
                    type="number"
                    value={supplyQty}
                    onChange={(e) => setSupplyQty(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="supplyUnitInput"
                  >
                    Unit
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="supplyUnitInput"
                    placeholder="e.g., pieces, kg, liters"
                    type="text"
                    value={supplyUnit}
                    onChange={(e) => setSupplyUnit(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowAddSupplyModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                disabled={!supplyName.trim() || !supplyUnit.trim()}
                onClick={handleAddSupply}
              >
                Add Supply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Supply Modal */}
      {showEditSupplyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">
                Edit Supply/Material
              </h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowEditSupplyModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editSupplyNameInput"
                >
                  Item Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editSupplyNameInput"
                  type="text"
                  value={supplyName}
                  onChange={(e) => setSupplyName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editSupplySpecsInput"
                >
                  Specifications
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editSupplySpecsInput"
                  type="text"
                  value={supplySpecs}
                  onChange={(e) => setSupplySpecs(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editSupplyQtyInput"
                >
                  Quantity
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editSupplyQtyInput"
                  min={1}
                  type="number"
                  value={supplyQty}
                  onChange={(e) => setSupplyQty(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editSupplyUnitInput"
                >
                  Unit
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editSupplyUnitInput"
                  type="text"
                  value={supplyUnit}
                  onChange={(e) => setSupplyUnit(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editSupplyQtyInput"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="editSupplyQtyInput"
                    min={1}
                    type="number"
                    value={supplyQty}
                    onChange={(e) => setSupplyQty(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editSupplyUnitInput"
                  >
                    Unit
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="editSupplyUnitInput"
                    type="text"
                    value={supplyUnit}
                    onChange={(e) => setSupplyUnit(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowEditSupplyModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                onClick={handleEditSupply}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Supply Confirm Modal */}
      {showDeleteSupplyConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h3 className="font-semibold text-[#333]">
                Delete Supply/Material
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#666]">
                Are you sure you want to delete this supply/material? This
                action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowDeleteSupplyConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C]"
                onClick={handleDeleteSupply}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tool Modal */}
      {showAddToolModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">Add Tool/Equipment</h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowAddToolModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="toolNameInput"
                >
                  Item Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="toolNameInput"
                  placeholder="e.g., SMAW Machine"
                  type="text"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="toolSpecsInput"
                >
                  Specifications
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="toolSpecsInput"
                  placeholder="e.g., AC/DC, 200A minimum"
                  type="text"
                  value={toolSpecs}
                  onChange={(e) => setToolSpecs(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="toolQtyInput"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="toolQtyInput"
                    min={1}
                    type="number"
                    value={toolQty}
                    onChange={(e) => setToolQty(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="toolUnitInput"
                  >
                    Unit
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="toolUnitInput"
                    placeholder="e.g., unit, set"
                    type="text"
                    value={toolUnit}
                    onChange={(e) => setToolUnit(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowAddToolModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                disabled={!toolName.trim() || !toolUnit.trim()}
                onClick={handleAddTool}
              >
                Add Tool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tool Modal */}
      {showEditToolModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
              <h3 className="font-semibold text-[#333]">Edit Tool/Equipment</h3>
              <button
                className="text-[#666] hover:text-[#333]"
                onClick={() => setShowEditToolModal(false)}
              >
                <XMarkIcon className="w-5 h-5 inline" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editToolNameInput"
                >
                  Item Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editToolNameInput"
                  type="text"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-[#333] mb-2"
                  htmlFor="editToolSpecsInput"
                >
                  Specifications
                </label>
                <input
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                  id="editToolSpecsInput"
                  type="text"
                  value={toolSpecs}
                  onChange={(e) => setToolSpecs(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editToolQtyInput"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="editToolQtyInput"
                    min={1}
                    type="number"
                    value={toolQty}
                    onChange={(e) => setToolQty(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-[#333] mb-2"
                    htmlFor="editToolUnitInput"
                  >
                    Unit
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                    id="editToolUnitInput"
                    type="text"
                    value={toolUnit}
                    onChange={(e) => setToolUnit(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowEditToolModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0]"
                onClick={handleEditTool}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tool Confirm Modal */}
      {showDeleteToolConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h3 className="font-semibold text-[#333]">
                Delete Tool/Equipment
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#666]">
                Are you sure you want to delete this tool/equipment? This action
                cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
                onClick={() => setShowDeleteToolConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C]"
                onClick={handleDeleteTool}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <DemoTestPreviewModal
          selectedSet={selectedSet}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
