import { useState, Fragment } from "react";
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  LockClosedIcon,
  ExclamationTriangleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { EvidencePlanPreviewModal } from "../components/EvidencePlanPreviewModal";
import { Breadcrumbs } from "./Dashboard";

interface CustomColumn {
  id: string;
  name: string;
}

interface PerformanceCriteria {
  id: string;
  text: string;
  critical: boolean;
  mcq: boolean;
  demo: boolean;
  qt: boolean;
  [key: string]: boolean | string; // For dynamic columns
}

interface Unit {
  id: string;
  name: string;
  elements: Element[];
}

interface Element {
  id: string;
  name: string;
  pcs: PerformanceCriteria[];
}

export function EvidencePlanEditor() {
  const { navigateToPage } = usePageNavigation();
  const [showValidation, setShowValidation] = useState(false);
  const [validationRun, setValidationRun] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showEditPCModal, setShowEditPCModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [editingPC, setEditingPC] = useState<{
    unitId: string;
    elementId: string;
    pcId: string;
  } | null>(null);
  const [editingPCText, setEditingPCText] = useState("");
  const [deletingPC, setDeletingPC] = useState<{
    unitId: string;
    elementId: string;
    pcId: string;
  } | null>(null);

  const [expandedUnits, setExpandedUnits] = useState<{
    [key: string]: boolean;
  }>({
    unit1: true,
    unit2: false,
    unit3: false,
  });

  const [customColumns, setCustomColumns] = useState<CustomColumn[]>([
    { id: "portfolio", name: "Portfolio" },
  ]);

  const [units, setUnits] = useState<Unit[]>([
    {
      id: "unit1",
      name: "CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint",
      elements: [
        {
          id: "elem1_1",
          name: "Element 1: Prepare materials and welding equipment",
          pcs: [
            {
              id: "pc1",
              text: "Identify type and size of electrode to be used in accordance with Welding Procedure Specification (WPS)",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc2",
              text: "Set up welding machine and accessories as per WPS requirements",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc3",
              text: "Clean base metals in accordance with standard operating procedures",
              critical: false,
              mcq: false,
              demo: true,
              qt: false,
              portfolio: false,
            },
            {
              id: "pc4",
              text: "Prepare work area and ensure compliance with Occupational Safety and Health Standards (OSHS)",
              critical: false,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
        {
          id: "elem1_2",
          name: "Element 2: Perform root pass on plate to plate joint",
          pcs: [
            {
              id: "pc5",
              text: "Perform root pass in accordance with WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc6",
              text: "Clean and inspect root pass using visual and mechanical methods",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc7",
              text: "Repair root pass defects as required",
              critical: false,
              mcq: false,
              demo: true,
              qt: false,
              portfolio: false,
            },
          ],
        },
      ],
    },
    {
      id: "unit2",
      name: "CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint",
      elements: [
        {
          id: "elem2_1",
          name: "Element 1: Prepare pipe materials and welding equipment",
          pcs: [
            {
              id: "pc8",
              text: "Select appropriate electrodes for pipe welding as per WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc9",
              text: "Set up welding machine for pipe welding operations",
              critical: false,
              mcq: true,
              demo: true,
              qt: false,
              portfolio: false,
            },
            {
              id: "pc10",
              text: "Prepare pipe surfaces according to welding requirements",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
        {
          id: "elem2_2",
          name: "Element 2: Perform pipe welding operations",
          pcs: [
            {
              id: "pc11",
              text: "Execute root pass on pipe joints following WPS",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc12",
              text: "Perform fill passes maintaining proper bead sequence",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc13",
              text: "Complete cap pass with proper profile and appearance",
              critical: false,
              mcq: false,
              demo: true,
              qt: false,
              portfolio: false,
            },
          ],
        },
        {
          id: "elem2_3",
          name: "Element 3: Inspect and document pipe welds",
          pcs: [
            {
              id: "pc14",
              text: "Conduct visual inspection of completed pipe welds",
              critical: false,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc15",
              text: "Identify and document weld defects",
              critical: false,
              mcq: true,
              demo: false,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc16",
              text: "Prepare weld inspection reports",
              critical: false,
              mcq: false,
              demo: false,
              qt: true,
              portfolio: true,
            },
          ],
        },
      ],
    },
    {
      id: "unit3",
      name: "CORE 3: Repair Welds",
      elements: [
        {
          id: "elem3_1",
          name: "Element 1: Identify weld defects and repair requirements",
          pcs: [
            {
              id: "pc17",
              text: "Identify types of weld defects requiring repair",
              critical: true,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc18",
              text: "Determine appropriate repair procedures",
              critical: false,
              mcq: true,
              demo: false,
              qt: true,
              portfolio: false,
            },
            {
              id: "pc19",
              text: "Prepare defective areas for repair welding",
              critical: false,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
        {
          id: "elem3_2",
          name: "Element 2: Execute weld repairs",
          pcs: [
            {
              id: "pc20",
              text: "Perform repair welding operations following approved procedures",
              critical: true,
              mcq: false,
              demo: true,
              qt: true,
              portfolio: true,
            },
            {
              id: "pc21",
              text: "Verify quality of repaired welds through inspection",
              critical: false,
              mcq: true,
              demo: true,
              qt: true,
              portfolio: false,
            },
          ],
        },
      ],
    },
  ]);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const handleCheckboxChange = (
    unitId: string,
    elementId: string,
    pcId: string,
    field: string,
  ) => {
    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              elements: unit.elements.map((element) =>
                element.id === elementId
                  ? {
                      ...element,
                      pcs: element.pcs.map((pc) =>
                        pc.id === pcId
                          ? { ...pc, [field]: !(pc[field] as boolean) }
                          : pc,
                      ),
                    }
                  : element,
              ),
            }
          : unit,
      ),
    );
  };

  const handleStarToggle = (
    unitId: string,
    elementId: string,
    pcId: string,
  ) => {
    handleCheckboxChange(unitId, elementId, pcId, "critical");
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: CustomColumn = {
        id: newColumnName.toLowerCase().replace(/\s+/g, "_"),
        name: newColumnName,
      };

      setCustomColumns([...customColumns, newColumn]);

      // Add the new column to all PCs with default false value
      setUnits((prevUnits) =>
        prevUnits.map((unit) => ({
          ...unit,
          elements: unit.elements.map((element) => ({
            ...element,
            pcs: element.pcs.map((pc) => ({
              ...pc,
              [newColumn.id]: false,
            })),
          })),
        })),
      );

      setNewColumnName("");
      setShowAddColumnModal(false);
    }
  };

  const handleRemoveColumn = (columnId: string) => {
    setCustomColumns(customColumns.filter((col) => col.id !== columnId));

    // Remove the column from all PCs
    setUnits((prevUnits) =>
      prevUnits.map((unit) => ({
        ...unit,
        elements: unit.elements.map((element) => ({
          ...element,
          pcs: element.pcs.map((pc) => {
            const { [columnId]: _, ...rest } = pc;

            return rest as PerformanceCriteria;
          }),
        })),
      })),
    );
  };

  const handleEditPC = (unitId: string, elementId: string, pcId: string) => {
    const unit = units.find((u) => u.id === unitId);
    const element = unit?.elements.find((e) => e.id === elementId);
    const pc = element?.pcs.find((p) => p.id === pcId);

    if (pc) {
      setEditingPC({ unitId, elementId, pcId });
      setEditingPCText(pc.text);
      setShowEditPCModal(true);
    }
  };

  const handleSaveEditPC = () => {
    if (editingPC) {
      setUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === editingPC.unitId
            ? {
                ...unit,
                elements: unit.elements.map((element) =>
                  element.id === editingPC.elementId
                    ? {
                        ...element,
                        pcs: element.pcs.map((pc) =>
                          pc.id === editingPC.pcId
                            ? { ...pc, text: editingPCText }
                            : pc,
                        ),
                      }
                    : element,
                ),
              }
            : unit,
        ),
      );
      setShowEditPCModal(false);
      setEditingPC(null);
      setEditingPCText("");
    }
  };

  const handleDeletePC = (unitId: string, elementId: string, pcId: string) => {
    setDeletingPC({ unitId, elementId, pcId });
    setShowDeleteConfirm(true);
  };

  const confirmDeletePC = () => {
    if (deletingPC) {
      setUnits((prevUnits) =>
        prevUnits.map((unit) =>
          unit.id === deletingPC.unitId
            ? {
                ...unit,
                elements: unit.elements.map((element) =>
                  element.id === deletingPC.elementId
                    ? {
                        ...element,
                        pcs: element.pcs.filter(
                          (pc) => pc.id !== deletingPC.pcId,
                        ),
                      }
                    : element,
                ),
              }
            : unit,
        ),
      );
      setShowDeleteConfirm(false);
      setDeletingPC(null);
    }
  };

  const handleAddRow = (unitId: string, elementId: string) => {
    const newPC: PerformanceCriteria = {
      id: `pc_${Date.now()}`,
      text: "New Performance Criteria",
      critical: false,
      mcq: false,
      demo: false,
      qt: false,
    };

    // Add custom column values
    customColumns.forEach((col) => {
      newPC[col.id] = false;
    });

    setUnits((prevUnits) =>
      prevUnits.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              elements: unit.elements.map((element) =>
                element.id === elementId
                  ? {
                      ...element,
                      pcs: [...element.pcs, newPC],
                    }
                  : element,
              ),
            }
          : unit,
      ),
    );
  };

  const runValidation = () => {
    setValidationRun(true);
    setShowValidation(true);
  };

  const getTotalPCs = () => {
    return units.reduce((total, unit) => {
      return (
        total +
        unit.elements.reduce((elemTotal, element) => {
          return elemTotal + element.pcs.length;
        }, 0)
      );
    }, 0);
  };

  const getMethodCounts = () => {
    let mcqCount = 0;
    let demoCount = 0;
    let qtCount = 0;
    let portfolioCount = 0;

    units.forEach((unit) => {
      unit.elements.forEach((element) => {
        element.pcs.forEach((pc) => {
          if (pc.mcq) mcqCount++;
          if (pc.demo) demoCount++;
          if (pc.qt) qtCount++;
          if (pc.portfolio) portfolioCount++;
        });
      });
    });

    return { mcqCount, demoCount, qtCount, portfolioCount };
  };

  const { mcqCount, demoCount, qtCount, portfolioCount } = getMethodCounts();

  return (
    <div className="p-6 max-w-[1400px] mx-auto text-gray-800">
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
          {
            label: "Evidence Plan",
            href: `/evidence-plan`,
          },
        ]}
      />

      {/* Page Title */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E3F2FD] text-[#1565C0] mr-2">
              PHASE 1
            </span>
            Evidence Plan
          </h1>
          <p className="text-sm text-[#666]">
            4-Column Assessment Tool Mapping Table
          </p>
        </div>
        <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
          Draft
        </span>
      </div>

      {/* Locked Info */}
      <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded p-5 mb-5">
        <div className="flex gap-10 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-1">
              <span className="mr-1.5">
                <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />
              </span>{" "}
              Qualification Title
            </div>
            <div className="text-sm text-[#333] font-medium">
              Shielded Metal Arc Welding (SMAW) NC II
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-1">
              <span className="mr-1.5">
                <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />
              </span>{" "}
              Units of Competency Covered
            </div>
            <div className="text-sm text-[#333] font-medium">3 Core Units</div>
          </div>
        </div>
      </div>

      {/* Evidence Plan Table */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-4">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            Assessment Tool Mapping
            <span className="ml-2 text-xs text-[#999] font-normal">
              3 units ● 8 elements ● {getTotalPCs()} PCs
            </span>
          </span>
          <button
            className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={() => setShowAddColumnModal(true)}
          >
            + Add Column
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr>
                <th className="text-left px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] min-w-[320px]">
                  Performance Criteria
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Multiple Choice
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">
                    <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />{" "}
                    default
                  </div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Demonstration
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">
                    <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />{" "}
                    default
                  </div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Questioning Tool
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">
                    <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />{" "}
                    default
                  </div>
                </th>
                {customColumns.map((col) => (
                  <th
                    key={col.id}
                    className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#6B21A8] bg-[#F3E8FF] border border-[#E0E0E0] w-[100px] relative"
                  >
                    <button
                      className="absolute top-1 right-1.5 text-[#BDBDBD] hover:text-[#C62828] hover:bg-[#FFEBEE] text-xs p-0.5 rounded transition-colors"
                      onClick={() => handleRemoveColumn(col.id)}
                    >
                      <XMarkIcon className="w-5 h-5 inline" />
                    </button>
                    <div className="font-semibold">{col.name}</div>
                    <div className="text-[9px] font-normal text-[#9575CD] mt-0.5">
                      user-added
                    </div>
                  </th>
                ))}
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[80px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <Fragment key={unit.id}>
                  {/* Unit Header */}
                  <tr>
                    <td
                      className="px-3.5 py-2.5 text-sm font-semibold text-white bg-[#1E3A5F] border border-[#E0E0E0] cursor-pointer hover:bg-[#2C4E6F] transition-colors"
                      colSpan={5 + customColumns.length}
                      onClick={() => toggleUnit(unit.id)}
                    >
                      <div className="flex items-center gap-2">
                        {expandedUnits[unit.id] ? (
                          <ChevronDownIcon className="w-5 h-5 inline" />
                        ) : (
                          <ChevronRightIcon className="w-5 h-5 inline" />
                        )}
                        <span className="mr-1.5">
                          <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />
                        </span>
                        <span className="flex-1">{unit.name}</span>
                        <span className="text-xs font-normal opacity-70">
                          {unit.elements.length} elements ●{" "}
                          {unit.elements.reduce(
                            (sum, el) => sum + el.pcs.length,
                            0,
                          )}{" "}
                          PCs
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Unit Content */}
                  {expandedUnits[unit.id] &&
                    unit.elements.map((element) => (
                      <Fragment key={element.id}>
                        {/* Element Header */}
                        <tr>
                          <td
                            className="px-3.5 py-2 text-sm font-semibold text-[#333] bg-[#E8EDF2] border border-[#E0E0E0]"
                            colSpan={5 + customColumns.length}
                          >
                            <span className="mr-1 text-xs text-[#BDBDBD]">
                              <LockClosedIcon className="w-4 h-4 inline text-yellow-500 mt-[-5px]" />
                            </span>
                            {element.name}
                          </td>
                        </tr>

                        {/* PCs */}
                        {element.pcs.map((pc) => {
                          const methodCount = [pc.mcq, pc.demo, pc.qt].filter(
                            Boolean,
                          ).length;
                          const hasWarning = methodCount === 1;

                          return (
                            <tr
                              key={pc.id}
                              className={`${
                                pc.critical
                                  ? "bg-[#FFFDE7] hover:bg-[#FFF9C4]"
                                  : "bg-white hover:bg-[#F8FBFF]"
                              } ${hasWarning ? "border-l-[3px] border-l-[#F57C00]" : ""} transition-colors`}
                            >
                              <td className="px-3.5 py-3 border border-[#E0E0E0]">
                                <div className="flex items-start gap-2">
                                  <button
                                    className="text-sm text-[#BDBDBD] cursor-pointer hover:text-[#1976D2] flex-shrink-0 mt-0.5"
                                    title="Edit"
                                    onClick={() =>
                                      handleEditPC(unit.id, element.id, pc.id)
                                    }
                                  >
                                    <PencilSquareIcon className="w-4 h-4 inline text-blue-500 mt-[-3px]" />
                                  </button>
                                  <div
                                    className={`flex-1 text-sm leading-relaxed ${hasWarning ? "text-[#E65100]" : ""}`}
                                  >
                                    {pc.text}
                                    {pc.critical && (
                                      <span className="text-[#F57C00] font-bold text-base ml-1">
                                        *
                                      </span>
                                    )}
                                    {hasWarning && (
                                      <span className="text-xs text-[#F57C00] ml-2">
                                        <ExclamationTriangleIcon className="w-5 h-5 inline text-[#F57C00] mt-[-2px]" />{" "}
                                        Only 1 method selected
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                                <input
                                  checked={pc.mcq}
                                  className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(
                                      unit.id,
                                      element.id,
                                      pc.id,
                                      "mcq",
                                    )
                                  }
                                />
                              </td>
                              <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                                <input
                                  checked={pc.demo}
                                  className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(
                                      unit.id,
                                      element.id,
                                      pc.id,
                                      "demo",
                                    )
                                  }
                                />
                              </td>
                              <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                                <input
                                  checked={pc.qt}
                                  className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(
                                      unit.id,
                                      element.id,
                                      pc.id,
                                      "qt",
                                    )
                                  }
                                />
                              </td>
                              {customColumns.map((col) => (
                                <td
                                  key={col.id}
                                  className="px-3.5 py-3 border border-[#E0E0E0] text-center bg-[#FAFAFE]"
                                >
                                  <input
                                    checked={pc[col.id] as boolean}
                                    className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        unit.id,
                                        element.id,
                                        pc.id,
                                        col.id,
                                      )
                                    }
                                  />
                                </td>
                              ))}
                              <td className="px-3.5 py-3 border border-[#E0E0E0] text-center whitespace-nowrap">
                                <button
                                  className="text-base text-[#BDBDBD] hover:text-[#C62828] transition-colors p-1"
                                  title="Delete"
                                  onClick={() =>
                                    handleDeletePC(unit.id, element.id, pc.id)
                                  }
                                >
                                  <TrashIcon className="w-4 h-4 inline text-red-500" />
                                </button>
                                <button
                                  className={`text-lg transition-colors p-1 ${
                                    pc.critical
                                      ? "text-[#F9A825]"
                                      : "text-[#E0E0E0] hover:text-[#F57C00]"
                                  }`}
                                  title="Critical Aspect"
                                  onClick={() =>
                                    handleStarToggle(unit.id, element.id, pc.id)
                                  }
                                >
                                  <StarIcon
                                    className={`w-4 h-4 inline ${pc.critical ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        })}

                        {/* Add Row */}
                        <tr>
                          <td
                            className="px-3.5 py-2 bg-[#FAFAFA] border border-[#E0E0E0]"
                            colSpan={5 + customColumns.length}
                          >
                            <button
                              className="text-sm text-[#1976D2] font-medium hover:underline"
                              onClick={() => handleAddRow(unit.id, element.id)}
                            >
                              + Add Row Below
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Panel */}
      {validationRun && (
        <div className="bg-white border border-[#E0E0E0] rounded mb-4">
          <div
            className="px-4 py-3 bg-[#FFF3E0] border-b border-[#FFE0B2] flex justify-between items-center cursor-pointer select-none"
            role="button"
            tabIndex={0}
            onClick={() => setShowValidation(!showValidation)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                return;
              }
            }}
          >
            <span className="text-sm font-semibold text-[#E65100]">
              <ExclamationTriangleIcon className="w-5 h-5 inline" /> Validation
              Issues (3)
            </span>
            <span className="text-xs text-[#999]">
              {showValidation ? "Click to collapse ▲" : "Click to expand ▼"}
            </span>
          </div>
          {showValidation && (
            <div className="p-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                  <ExclamationTriangleIcon className="w-5 h-5 inline text-red-500" />
                  <span className="text-sm text-[#C62828]">
                    <strong>Row 7 (Element 2, Performance Criteria 3):</strong>{" "}
                    Only 1 assessment method selected — minimum 2 recommended
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                  <ExclamationTriangleIcon className="w-5 h-5 inline text-orange-500" />
                  <span className="text-sm text-[#E65100]">
                    <strong>Unit 2:</strong> Not yet expanded — 9 Performance
                    Criterias need method assignment
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                  <ExclamationTriangleIcon className="w-5 h-5 inline text-orange-500" />
                  <span className="text-sm text-[#E65100]">
                    <strong>Unit 3:</strong> Not yet expanded — 5 Performance
                    Criterias need method assignment
                  </span>
                </div>

                <div className="border-t border-[#F0F0F0] my-2 pt-2">
                  <div className="flex items-center gap-2 p-2 rounded">
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                    <span className="text-sm text-[#2E7D32]">
                      All critical aspect Performance Criterias (*) have all 3
                      methods checked
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded">
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                    <span className="text-sm text-[#2E7D32]">
                      No empty Performance Criteria text fields in Unit 1
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded">
                    <CheckIcon className="w-5 h-5 inline text-green-500" />
                    <span className="text-sm text-[#2E7D32]">
                      At least 1 Performance Criteria marked for each assessment
                      method type (MCQ: {mcqCount}, Demo: {demoCount}, QT:{" "}
                      {qtCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#E0E0E0] px-5 py-3 flex justify-between items-center gap-3">
        <div className="text-sm text-[#666] flex items-center gap-3">
          <span>
            Total: <strong className="text-[#333]">{getTotalPCs()} PCs</strong>{" "}
            mapped
          </span>
          <span className="text-[#E0E0E0]">|</span>
          <span>
            MCQ: <strong className="text-[#333]">{mcqCount}</strong>
          </span>
          <span className="text-[#E0E0E0]">●</span>
          <span>
            Demo: <strong className="text-[#333]">{demoCount}</strong>
          </span>
          <span className="text-[#E0E0E0]">●</span>
          <span>
            QT: <strong className="text-[#333]">{qtCount}</strong>
          </span>
          <span className="text-[#E0E0E0]">●</span>
          <span className="text-[#6B21A8]">
            Portfolio: <strong>{portfolioCount}</strong>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
            onClick={() => navigateToPage("/")}
          >
            ← Back to Dashboard
          </button>
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button
            className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
            onClick={runValidation}
          >
            <CheckBadgeIcon className="w-5 h-5 inline" />
            Validate
          </button>
          <button
            className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
            onClick={() => setShowPreview(true)}
          >
            <EyeIcon className="w-5 h-5 inline" />
            Preview
          </button>
          <button className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors">
            Finalize
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <EvidencePlanPreviewModal onClose={() => setShowPreview(false)} />
      )}

      {/* Add Column Modal */}
      {showAddColumnModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h2 className="text-lg font-semibold text-[#333]">
                Add Custom Column
              </h2>
            </div>
            <div className="p-6">
              <label
                className="block text-sm font-medium text-[#666] mb-2"
                htmlFor="columnNameInput"
              >
                Column Name
              </label>
              <input
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:border-[#1976D2]"
                id="columnNameInput"
                placeholder="e.g., Portfolio, Interview, etc."
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
              />
            </div>
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                onClick={() => {
                  setShowAddColumnModal(false);
                  setNewColumnName("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors"
                onClick={handleAddColumn}
              >
                Add Column
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Performance Criteria Modal */}
      {showEditPCModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h2 className="text-lg font-semibold text-[#333]">
                Edit Performance Criteria
              </h2>
            </div>
            <div className="p-6">
              <label
                className="block text-sm font-medium text-[#666] mb-2"
                htmlFor="pcText"
              >
                Performance Criteria Text
              </label>
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm focus:outline-none focus:border-[#1976D2]"
                id="pcText"
                rows={4}
                value={editingPCText}
                onChange={(e) => setEditingPCText(e.target.value)}
              />
            </div>
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                onClick={() => {
                  setShowEditPCModal(false);
                  setEditingPC(null);
                  setEditingPCText("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors"
                onClick={handleSaveEditPC}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E0E0E0]">
              <h2 className="text-lg font-semibold text-[#333]">
                Delete Performance Criteria
              </h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-[#666]">
                Are you sure you want to delete this Performance Criteria? This
                action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#E0E0E0] flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeletingPC(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#C62828] text-white rounded text-sm font-medium hover:bg-[#B71C1C] transition-colors"
                onClick={confirmDeletePC}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
