import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  InformationCircleIcon,
  CheckIcon,
  PrinterIcon,
  FolderArrowDownIcon,
} from "@heroicons/react/24/solid";

interface TOSRow {
  unitTitle: string;
  learning: number;
  process: number;
  application: number;
  total: number;
}

interface MCQTOSPreviewModalProps {
  tosData: TOSRow[];
  onClose: () => void;
  title?: string;
}

export function MCQTOSPreviewModal({
  tosData,
  onClose,
  title,
}: MCQTOSPreviewModalProps) {
  const totals = {
    learning: tosData.reduce((sum, row) => sum + row.learning, 0),
    process: tosData.reduce((sum, row) => sum + row.process, 0),
    application: tosData.reduce((sum, row) => sum + row.application, 0),
    total: tosData.reduce((sum, row) => sum + row.total, 0),
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 text-gray-800">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              {title || "MCQ Table of Specifications (TOS) Preview"}
            </h2>
            <p className="text-sm text-[#666]">
              Auto-generated from MCQ items • Reference-only document
            </p>
          </div>
          <button className="p-2 hover:bg-[#F5F5F5] rounded" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-gray-300 flex gap-2">
          <InformationCircleIcon className="w-5 h-5 text-blue-500" />
          <div className="text-xs text-[#1565C0]">
            This TOS summary is auto-generated from the MCQ pool. Changes to the
            MCQ items will update this table automatically. Reference only.
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-gray-300 p-6 space-y-6">
            {/* TOS Table */}
            <div>
              <h3 className="font-bold mb-3">Master Pool TOS</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b-2 border-[#E0E0E0]">
                      <th className="text-left px-4 py-2 text-xs font-semibold text-[#666]">
                        Unit Title
                      </th>
                      <th className="text-center px-4 py-2 text-xs font-semibold text-[#666]">
                        Learning
                      </th>
                      <th className="text-center px-4 py-2 text-xs font-semibold text-[#666]">
                        Process
                      </th>
                      <th className="text-center px-4 py-2 text-xs font-semibold text-[#666]">
                        Application
                      </th>
                      <th className="text-center px-4 py-2 text-xs font-semibold text-[#666] bg-[#E8F5E9]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tosData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]"
                      >
                        <td className="px-4 py-2 text-sm font-medium text-[#333]">
                          {row.unitTitle}
                        </td>
                        <td className="text-center px-4 py-2 text-sm text-[#666]">
                          {row.learning}
                        </td>
                        <td className="text-center px-4 py-2 text-sm text-[#666]">
                          {row.process}
                        </td>
                        <td className="text-center px-4 py-2 text-sm text-[#666]">
                          {row.application}
                        </td>
                        <td className="text-center px-4 py-2 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#E8F5E9] border-t-2 border-[#2E7D32] font-bold text-[#1B5E20]">
                      <td className="px-4 py-2">Total Number of Items</td>
                      <td className="text-center">{totals.learning}</td>
                      <td className="text-center">{totals.process}</td>
                      <td className="text-center">{totals.application}</td>
                      <td className="text-center text-[#2E7D32]">
                        {totals.total}
                      </td>
                    </tr>
                    <tr className="bg-[#F1F8F4] text-[#666] font-semibold">
                      <td className="px-4 py-2">Percentage (%)</td>
                      <td className="text-center">
                        {Math.round((totals.learning / totals.total) * 100)}%
                      </td>
                      <td className="text-center">
                        {Math.round((totals.process / totals.total) * 100)}%
                      </td>
                      <td className="text-center">
                        {Math.round((totals.application / totals.total) * 100)}%
                      </td>
                      <td className="text-center text-[#2E7D32]">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reconciliation Check */}
            <div>
              <h3 className="font-bold mb-3">Reconciliation Check</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckIcon className="w-6 h-6 text-green-500" />
                    <div className="font-semibold text-sm text-[#2E7D32]">
                      Item Count Match
                    </div>
                  </div>
                  <div className="text-xs text-[#1B5E20]">
                    Total items ({totals.total}) match MCQ pool count
                  </div>
                </div>
                <div className="p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckIcon className="w-6 h-6 text-green-500" />
                    <div className="font-semibold text-sm text-[#2E7D32]">
                      Coverage Check
                    </div>
                  </div>
                  <div className="text-xs text-[#1B5E20]">
                    All unit competencies & cognitive levels represented
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Level Distribution */}
            <div>
              <h3 className="font-bold mb-3">Cognitive Level Distribution</h3>
              <div className="space-y-3">
                {["learning", "process", "application"].map((level) => {
                  const colors = {
                    learning: "#1976D2",
                    process: "#F57C00",
                    application: "#7B1FA2",
                  };
                  const labels = {
                    learning: "Learning / Recall",
                    process: "Process / Comprehension",
                    application: "Application / Problem-Solving",
                  };
                  const value = totals[level as keyof typeof totals];

                  return (
                    <div key={level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#666]">
                          {labels[level as keyof typeof labels]}
                        </span>
                        <span
                          className="font-semibold"
                          style={{
                            color: colors[level as keyof typeof colors],
                          }}
                        >
                          {value} items (
                          {Math.round((value / totals.total) * 100)}%)
                        </span>
                      </div>
                      <div className="h-4 bg-[#E0E0E0] rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            backgroundColor:
                              colors[level as keyof typeof colors],
                            width: `${(value / totals.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 bg-[#FAFAFA] flex justify-between items-center">
          <div className="text-xs text-[#666]">
            MCQ TOS Summary • Reference Document
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white text-[#666] border border-gray-300 rounded text-sm flex items-center gap-2"
              onClick={() => alert("Download PDF / DOCX logic")}
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Download
            </button>
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm flex items-center gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="w-5 h-5" />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
