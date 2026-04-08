import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

interface SAGPreviewModalProps {
  onClose: () => void;
}

export function SAGPreviewModal({ onClose }: SAGPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              SAG Preview & Export
            </h2>
            <p className="text-sm text-[#666]">
              Shielded Metal Arc Welding (SMAW) NC II
            </p>
          </div>
          <button className="p-2 hover:bg-[#F5F5F5] rounded" onClick={onClose}>
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-gray-300 flex-shrink-0">
          <div className="flex gap-2 items-start">
            <InformationCircleIcon className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium text-[#1976D2]">
                Self-Assessment Guide (Candidate Copy)
              </div>
              <div className="text-xs text-[#1565C0]">
                Auto-generated from Evidence Plan with YES/NO checklist
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-black max-w-[800px] mx-auto p-8 text-[13px] text-black">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="font-bold">
                TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
              </div>
              <div className="font-bold mt-2">
                SHIELDED METAL ARC WELDING (SMAW) NC II
              </div>
              <div className="font-bold mt-2">SELF-ASSESSMENT GUIDE</div>
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <p className="mb-2">
                This guide will help you determine if you are ready for
                assessment.
              </p>
              <p>
                Check <strong>YES</strong> if you can perform the task
                confidently and correctly. Check <strong>NO</strong> if you need
                more practice.
              </p>
            </div>

            {/* Info Table */}
            <div className="border border-black mb-4">
              <div className="grid grid-cols-3 border-b border-black">
                <div className="border-r border-black p-2">Qualification</div>
                <div className="col-span-2 p-2">
                  Shielded Metal Arc Welding (SMAW) NC II
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="border-r border-black p-2">
                  Units of Competency Covered
                </div>
                <div className="col-span-2 p-2 whitespace-pre-line">
                  {`1. Perform Shielded Metal Arc Welding — Plate to Plate Joint
2. Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
3. Repair Welds`}
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="w-full border border-black text-sm">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-left">
                    The evidence must show that the candidate...
                  </th>
                  <th className="border border-black p-2 text-center w-20">
                    YES
                  </th>
                  <th className="border border-black p-2 text-center w-20">
                    NO
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Unit */}
                <tr>
                  <td className="border border-black p-2 font-bold" colSpan={3}>
                    CORE 1: Plate to Plate Joint
                  </td>
                </tr>

                {/* Element */}
                <tr>
                  <td
                    className="border border-black p-2 font-semibold"
                    colSpan={3}
                  >
                    Element 1: Prepare materials and welding equipment
                  </td>
                </tr>

                {[
                  "Identify type and size of electrode",
                  "Set up welding machine",
                  "Clean base metals",
                  "Prepare work area",
                ].map((pc, i) => (
                  <tr key={i}>
                    <td className="border border-black p-2">{pc}</td>
                    <td className="border border-black text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="border border-black text-center">
                      <input type="checkbox" />
                    </td>
                  </tr>
                ))}

                {/* Critical */}
                <tr>
                  <td className="border border-black p-2">
                    Perform root pass <strong>(Critical Aspect)</strong>
                  </td>
                  <td className="border border-black text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="border border-black text-center">
                    <input type="checkbox" />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div className="mt-6">
              <p>
                If most answers are <strong>YES</strong>, you may be ready for
                assessment. Otherwise, further training is recommended.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10">
              <div className="mb-4">
                Candidate Name: __________________________
              </div>
              <div className="mb-4">
                Signature: ________________________________
              </div>
              <div>Date: __________________</div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-4 border-t border-black text-center text-xs">
              TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-300 bg-[#FAFAFA] flex justify-between items-center">
          <div className="text-xs text-[#666]">
            SAG Document • Candidate Copy • Page 1
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm flex items-center gap-2"
              onClick={() => alert("Download PDF")}
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Download
            </button>

            <button
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded text-sm flex items-center gap-2"
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
