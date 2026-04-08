import { useMemo, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

import {
  DOCUMENT_ID,
  SECTOR_PROJECT_ID,
  usePageNavigation,
} from "./pageUtils";

import { initialMCQItems, MCQItem } from "../data/mcqQuestions";
import { WrittenTestPreviewModal } from "../components/WrittenTestPreviewModal";
import { Breadcrumbs } from "./Dashboard";

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// Generate 5 packages (20 items each)
function generatePackages(items: MCQItem[]) {
  const shuffled = shuffleArray(items);

  const getSet = (start: number) => {
    const result: MCQItem[] = [];

    for (let i = 0; i < 20; i++) {
      result.push(shuffled[(start + i) % shuffled.length]);
    }

    return result.map((item, idx) => ({
      ...item,
      num: idx + 1,
    }));
  };

  return {
    A: getSet(0),
    B: getSet(10),
    C: getSet(20),
    D: getSet(30),
    E: getSet(40),
  };
}

export function WrittenTestView() {
  const { navigateToPage } = usePageNavigation();

  const [selectedPackage, setSelectedPackage] = useState<
    "A" | "B" | "C" | "D" | "E"
  >("A");

  const [previewType, setPreviewType] = useState<"test" | "answer" | null>(
    null,
  );

  const packages = useMemo(() => generatePackages(initialMCQItems), []);

  const currentQuestions = packages[selectedPackage];

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
              label: "Written Test Preview",
              href: `/written-test`,
            },
          ]}
        />
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3
          </span>
          Written Test Preview
        </h1>
        <p className="text-sm text-[#666]">
          MCQ subset per package • Candidate view (no answers shown)
        </p>
      </div>

      {/* Package Selector */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          {(["A", "B", "C", "D", "E"] as const).map((pkg) => (
            <button
              key={pkg}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedPackage === pkg
                  ? "text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]"
                  : "text-[#666] border-transparent hover:bg-[#FAFAFA]"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              Package {pkg}
            </button>
          ))}
        </div>
      </div>

      {/* Test Header */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-6 py-5 border-b border-[#E0E0E0] bg-[#FAFAFA]">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#333] mb-2">
              COMPETENCY ASSESSMENT
              <br />
              WRITTEN TEST
            </h2>
            <div className="text-sm text-[#666] mb-4">
              Qualification:{" "}
              <strong>Shielded Metal Arc Welding (SMAW) NC II</strong>
            </div>
            <div className="inline-block px-4 py-2 bg-[#E3F2FD] border border-[#90CAF9] rounded">
              <div className="text-xs text-[#1565C0] font-semibold">
                PACKAGE {selectedPackage}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-[#FFFDE7] border border-[#FFE082] rounded p-4 mb-6">
            <div className="text-sm text-[#F57C00]">
              <strong>INSTRUCTIONS TO CANDIDATE:</strong>
              <ul className="mt-2 ml-5 space-y-1 text-xs">
                <li>This test contains 20 multiple choice questions</li>
                <li>Read each question carefully</li>
                <li>Select the BEST answer</li>
                <li>You have 30 minutes to complete this test</li>
              </ul>
            </div>
          </div>

          {/* Preview all questions */}
          <div className="space-y-6">
            {currentQuestions.map((item) => (
              <div
                key={item.num}
                className="pb-6 border-b border-[#E0E0E0] last:border-b-0"
              >
                <div className="font-semibold text-sm text-[#333] mb-3">
                  {item.num}. {item.question}
                </div>
                <div className="space-y-2 ml-6">
                  <div>A. {item.options.a}</div>
                  <div>B. {item.options.b}</div>
                  <div>C. {item.options.c}</div>
                  <div>D. {item.options.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Per-Set TOS */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Table of Specifications - Package {selectedPackage}
          </div>
          <div className="text-xs text-[#666]">
            Auto-generated for this package&apos;s 20 items
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E0E0E0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">
                  Unit of Competency
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Learning
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Process
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">
                  Application
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] bg-[#E8F5E9]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">
                  Prepare and Maintain Tools and Equipment
                </td>
                <td className="text-center px-4 py-3 text-sm">4</td>
                <td className="text-center px-4 py-3 text-sm">3</td>
                <td className="text-center px-4 py-3 text-sm">2</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">
                  9
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">
                  Perform Manual Metal Arc Welding
                </td>
                <td className="text-center px-4 py-3 text-sm">3</td>
                <td className="text-center px-4 py-3 text-sm">4</td>
                <td className="text-center px-4 py-3 text-sm">2</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">
                  9
                </td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Apply Safety Practices</td>
                <td className="text-center px-4 py-3 text-sm">1</td>
                <td className="text-center px-4 py-3 text-sm">1</td>
                <td className="text-center px-4 py-3 text-sm">0</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">
                  2
                </td>
              </tr>
              <tr className="bg-[#E8F5E9] border-t-2 border-[#2E7D32]">
                <td className="px-4 py-3 text-sm font-bold text-[#1B5E20]">
                  Total
                </td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">
                  8
                </td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">
                  8
                </td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">
                  4
                </td>
                <td className="text-center px-4 py-3 text-lg font-bold text-[#2E7D32]">
                  20
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
          onClick={() => navigateToPage("package-navigator")}
        >
          ← Back to Package Navigator
        </button>

        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded text-sm font-medium border transition
            ${
              previewType === "test"
                ? "bg-blue-700 text-white border-blue-700 shadow"
                : "bg-white text-blue-700 border-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setPreviewType("test")}
          >
            <EyeIcon className="w-5 h-5 inline mr-1" />
            Preview Questions (Package {selectedPackage})
          </button>

          <button
            className={`px-4 py-2 rounded text-sm font-medium border transition
            ${
              previewType === "answer"
                ? "bg-green-700 text-white border-green-700 shadow"
                : "bg-white text-green-700 border-green-700 hover:bg-green-100"
            }`}
            onClick={() => setPreviewType("answer")}
          >
            <EyeIcon className="w-5 h-5 inline mr-1" />
            Preview Answer Keys (Package {selectedPackage})
          </button>
        </div>
      </div>

      {previewType && (
        <WrittenTestPreviewModal
          questions={currentQuestions}
          selectedPackage={selectedPackage}
          type={previewType}
          onClose={() => setPreviewType(null)}
        />
      )}
    </div>
  );
}
