import { useState } from "react";
import {
  ArrowTrendingUpIcon,
  ChartBarIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import {
  CheckCircleIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { initialMCQItems, MCQItem } from "../data/mcqQuestions";
import { MCQEditorModal } from "../components/MCQEditorModal";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { MCQPreviewModal } from "../components/MCQPreviewModal";
import { TOSPreviewModal } from "../components/TOSPreviewModal";
import { Breadcrumbs } from "./Dashboard";

export function MCQEditor() {
  const { navigateToPage } = usePageNavigation();
  const [selectedTab, setSelectedTab] = useState<"mcq" | "tos">("mcq");
  const [mcqItems, setMcqItems] = useState<MCQItem[]>(initialMCQItems);
  const [editingItem, setEditingItem] = useState<MCQItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTOSPreview, setShowTOSPreview] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const handleSaveItem = (item: MCQItem) => {
    if (item.id === 0) {
      // New item
      const newId = Math.max(...mcqItems.map((i) => i.id)) + 1;

      setMcqItems([...mcqItems, { ...item, id: newId }]);
    } else {
      // Edit existing
      setMcqItems(mcqItems.map((i) => (i.id === item.id ? item : i)));
    }
  };

  const handleDeleteItem = (id: number) => {
    setMcqItems(mcqItems.filter((i) => i.id !== id));
    setDeletingItemId(null);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: 0,
      question: "",
      options: { a: "", b: "", c: "", d: "" },
      correctAnswer: "a",
      type: "Factual",
      cognitiveLevel: "Remember",
      articleNumber: 1,
    });
    setShowAddModal(true);
  };

  // Calculate TOS data
  const calculateTOS = () => {
    const tosData = [
      {
        article: "1. Occupational Safety and Health",
        target: 4,
        percentage: 10,
      },
      { article: "2. Equipment Operation", target: 12, percentage: 30 },
      {
        article: "3. Preventive Maintenance Servicing/Inspection",
        target: 6,
        percentage: 15,
      },
      { article: "4. Job or Role in the Workplace", target: 2, percentage: 5 },
      {
        article: "5. Equipment/Supply Identification and Usage",
        target: 15,
        percentage: 37.5,
      },
      { article: "6. Mathematics/Computation", target: 1, percentage: 2.5 },
    ];

    return tosData.map((article, idx) => {
      const articleNum = idx + 1;
      const articleItems = mcqItems.filter(
        (item) => item.articleNumber === articleNum,
      );

      const factual = articleItems
        .filter((item) => item.type === "Factual")
        .map((item) => item.id);
      const comprehension = articleItems
        .filter((item) => item.type === "Scenario")
        .map((item) => item.id);
      const application = articleItems
        .filter((item) => item.type === "Application")
        .map((item) => item.id);

      return {
        ...article,
        factual: factual.length > 0 ? factual.join(",") : "–",
        comprehension: comprehension.length > 0 ? comprehension.join(",") : "–",
        application: application.length > 0 ? application.join(",") : "–",
        total: articleItems.length,
      };
    });
  };

  const tosData = calculateTOS();
  const totalItems = mcqItems.length;
  const factualCount = mcqItems.filter((i) => i.type === "Factual").length;
  const scenarioCount = mcqItems.filter((i) => i.type === "Scenario").length;
  const applicationCount = mcqItems.filter(
    (i) => i.type === "Application",
  ).length;

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
              label: "MCQ + Table of Specifications",
              href: `/mcq`,
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            MCQ + Table of Specifications
          </h1>
          <p className="text-sm text-[#666]">
            {totalItems} Items ● Factual / Scenario / Application ● External
            Item Analysis
          </p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            isFinalized
              ? "bg-[#E8F5E9] text-[#2E7D32]"
              : "bg-[#FFF3E0] text-[#F57C00]"
          }`}
        >
          {isFinalized ? "Finalized" : "Draft"}
        </span>
      </div>

      {/* Progress */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-[#333]">
            Item Development Progress
          </span>
          <span className="text-sm text-[#666]">
            {totalItems} of 50 items ({((totalItems / 50) * 100).toFixed(0)}%)
          </span>
        </div>
        <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1976D2]"
            style={{ width: `${(totalItems / 50) * 100}%` }}
          />
        </div>
      </div>

      {/* Tab Toggle */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        <button
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            selectedTab === "mcq"
              ? "bg-[#1976D2] text-white"
              : "bg-white text-[#666] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => setSelectedTab("mcq")}
        >
          MCQ Items ({totalItems})
        </button>
        <button
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            selectedTab === "tos"
              ? "bg-[#1976D2] text-white"
              : "bg-white text-[#666] hover:bg-[#F5F5F5]"
          }`}
          onClick={() => setSelectedTab("tos")}
        >
          Table of Specifications
        </button>
      </div>

      {selectedTab === "mcq" ? (
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
            <span className="text-[15px] font-semibold text-[#333]">
              Multiple Choice Questions
            </span>
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] flex items-center gap-2"
              onClick={handleAddNew}
            >
              <PlusIcon className="w-5 h-5 inline" />
              Add Item
            </button>
          </div>

          <div className="p-6 space-y-4">
            {mcqItems.map((item) => (
              <div
                key={item.id}
                className="border border-[#E0E0E0] rounded-lg p-5 hover:border-[#1976D2] transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1976D2] text-white">
                      Item {item.id}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        item.type === "Factual"
                          ? "bg-[#E3F2FD] text-[#1976D2]"
                          : item.type === "Scenario"
                            ? "bg-[#FFF3E0] text-[#F57C00]"
                            : "bg-[#E8F5E9] text-[#2E7D32]"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-[#999]">
                      {item.cognitiveLevel}
                    </span>
                  </div>
                  <div className="flex">
                    <button
                      className="p-1 text-[#1976D2] hover:bg-[#E3F2FD] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isFinalized}
                      title="Edit"
                      onClick={() => {
                        setEditingItem(item);
                        setShowAddModal(false);
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      className="p-1.5 text-[#C62828] hover:bg-[#FFEBEE] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isFinalized}
                      title="Delete"
                      onClick={() => setDeletingItemId(item.id)}
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: item.question }}
                  className="text-sm text-[#333] mb-4 font-medium"
                />

                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === "a" ? "text-[#2E7D32]" : "text-[#666]"}`}
                    >
                      A.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === "a" ? "text-[#2E7D32] font-medium" : "text-[#666]"}`}
                    >
                      {item.options.a}
                      {item.correctAnswer === "a" && " ✓ (Correct Answer)"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === "b" ? "text-[#2E7D32]" : "text-[#666]"}`}
                    >
                      B.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === "b" ? "text-[#2E7D32] font-medium" : "text-[#666]"}`}
                    >
                      {item.options.b}
                      {item.correctAnswer === "b" && " ✓ (Correct Answer)"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === "c" ? "text-[#2E7D32]" : "text-[#666]"}`}
                    >
                      C.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === "c" ? "text-[#2E7D32] font-medium" : "text-[#666]"}`}
                    >
                      {item.options.c}
                      {item.correctAnswer === "c" && " ✓ (Correct Answer)"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span
                      className={`text-sm font-semibold ${item.correctAnswer === "d" ? "text-[#2E7D32]" : "text-[#666]"}`}
                    >
                      D.
                    </span>
                    <span
                      className={`text-sm ${item.correctAnswer === "d" ? "text-[#2E7D32] font-medium" : "text-[#666]"}`}
                    >
                      {item.options.d}
                      {item.correctAnswer === "d" && " ✓ (Correct Answer)"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Table of Specifications */
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0]">
            <span className="text-[15px] font-semibold text-[#333]">
              Table of Specifications (TOS)
            </span>
          </div>

          {/* Detailed TOS Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1976D2]">
                  <th
                    className="px-4 py-3 text-center font-bold text-white border border-[#E0E0E0]"
                    colSpan={6}
                  >
                    TABLE OF SPECIFICATION
                  </th>
                </tr>
                <tr className="bg-[#1976D2]">
                  <th
                    className="px-4 py-2 text-center font-semibold text-white border border-[#E0E0E0]"
                    colSpan={6}
                  >
                    SHIELDED METAL ARC WELDING (SMAW) – National Certificate II
                  </th>
                </tr>
                <tr className="bg-[#1976D2]">
                  <th
                    className="px-4 py-2 text-center font-semibold text-white border border-[#E0E0E0]"
                    colSpan={6}
                  >
                    Written Test
                  </th>
                </tr>
                <tr className="bg-[#FAFAFA]">
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle"
                    rowSpan={2}
                  >
                    ARTICLE NUMBER
                  </th>
                  <th
                    className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]"
                    colSpan={3}
                  >
                    TEST ITEM DISTRIBUTION
                  </th>
                  <th
                    className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle"
                    rowSpan={2}
                  >
                    TOTAL NO. OF
                    <br />
                    ITEMS
                  </th>
                  <th
                    className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] align-middle"
                    rowSpan={2}
                  >
                    PERCENTAGE
                    <br />
                    (%)
                  </th>
                </tr>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE I<br />
                    Factual Knowledge
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE 2<br />
                    Comprehension
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    TYPE 3<br />
                    Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {tosData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      {row.article}
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      {row.factual}
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      {row.comprehension}
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      {row.application}
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      {row.total}
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      {row.percentage}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#E8F5E9]">
                  <td className="px-4 py-3 text-sm font-bold text-right border border-[#E0E0E0]">
                    TOTAL
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                    {factualCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                    {scenarioCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                    {applicationCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-bold">
                    {totalItems}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0] font-bold">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Table */}
          <div className="p-5 border-t border-[#E0E0E0]">
            <div className="text-xs font-semibold text-[#666] uppercase mb-3">
              Summary by Article
            </div>
            <table className="w-full border border-[#E0E0E0]">
              <thead>
                <tr className="bg-[#FAFAFA]">
                  <th className="text-left px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    ARTICLE/DESCRIPTION
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    NO. OF ITEMS
                  </th>
                  <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                    PERCENTAGE (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {tosData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA]">
                    <td className="px-4 py-2 text-sm border border-[#E0E0E0]">
                      {row.article}
                    </td>
                    <td className="px-4 py-2 text-sm text-center border border-[#E0E0E0]">
                      {row.total}
                    </td>
                    <td className="px-4 py-2 text-sm text-center border border-[#E0E0E0]">
                      {row.percentage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Finalize Section */}
      <div className="bg-white border border-[#E0E0E0] rounded p-5 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="font-semibold text-sm text-[#333] mb-1">
              Finalize MCQ Pool
            </div>
            <div className="text-xs text-[#666]">
              Once finalized, this pool will be locked and ready for pilot
              testing and item analysis. All {totalItems} items will be included
              in the Table of Specifications.
            </div>
          </div>
          <button
            className={`px-5 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              isFinalized
                ? "bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]"
                : "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
            }`}
            onClick={() => {
              setIsFinalized(!isFinalized);
              alert(
                isFinalized
                  ? "MCQ pool unlocked for editing"
                  : "MCQ pool finalized successfully!",
              );
            }}
          >
            <CheckCircleIcon className="w-5 h-5 inline" />
            {isFinalized ? "Unfinalize" : "Finalize"}
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-3 justify-end">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          onClick={() => navigateToPage("")}
        >
          ← Back to Dashboard
        </button>
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
          onClick={() => alert("Draft saved successfully!")}
        >
          Save Draft
        </button>
        {selectedTab === "mcq" && (
          <>
            <button
              className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
              onClick={() => setShowPreview(true)}
            >
              <EyeIcon className="w-5 h-5 inline" />
              Preview
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={() => navigateToPage("mcq-analysis")}
            >
              <ArrowTrendingUpIcon className="w-5 h-5 inline" />
              MCQ External Analysis Guide
            </button>
          </>
        )}
        {selectedTab === "tos" && (
          <>
            <button
              className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors flex items-center gap-2"
              onClick={() => setShowTOSPreview(true)}
            >
              <EyeIcon className="w-5 h-5 inline" />
              Preview
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white border border-blue-500 rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              onClick={() => navigateToPage("mcq-tos")}
            >
              <ChartBarIcon className="w-5 h-5 inline" />
              MCQ TOS Summary
            </button>
          </>
        )}
      </div>

      {/* Modals */}
      {(editingItem || showAddModal) && (
        <MCQEditorModal
          item={editingItem}
          onClose={() => {
            setEditingItem(null);
            setShowAddModal(false);
          }}
          onSave={handleSaveItem}
        />
      )}

      {deletingItemId && (
        <DeleteConfirmDialog
          itemNumber={deletingItemId}
          onCancel={() => setDeletingItemId(null)}
          onConfirm={() => handleDeleteItem(deletingItemId)}
        />
      )}

      {showPreview && (
        <MCQPreviewModal
          items={mcqItems}
          onClose={() => setShowPreview(false)}
        />
      )}
      {showTOSPreview && (
        <TOSPreviewModal
          applicationCount={applicationCount}
          factualCount={factualCount}
          scenarioCount={scenarioCount}
          tosData={tosData}
          totalItems={totalItems}
          onClose={() => setShowTOSPreview(false)}
        />
      )}
    </div>
  );
}
