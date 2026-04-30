import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

interface SICPreviewModalProps {
  onClose: () => void;
}

export function SICPreviewModal({ onClose }: SICPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              SIC Preview & Export
            </h2>
            <p className="text-sm text-[#666]">
              Shielded Metal Arc Welding (SMAW) NC II
            </p>
          </div>
          <button
            aria-label="Close"
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex-shrink-0">
          <div className="flex items-start gap-2">
            <InformationCircleIcon className="w-6 h-6 text-blue-500" />
            <div>
              <div className="text-sm font-medium text-[#1976D2]">
                Candidate Instructions Document
              </div>
              <div className="text-xs text-[#1565C0] mt-1">
                This is the candidate-facing version of the assessment guide.
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-black shadow-sm max-w-[800px] mx-auto p-8 text-[13px] text-black">
            {/* Legal Notice */}
            <div className="border border-black p-3 text-center mb-6 text-[12px] font-bold leading-tight">
              “No part of the Competency Assessment Tools (CATs) may be
              produced, distributed, or transmitted in any form or by any means,
              including photocopying, recording, or other electronic or
              mechanical methods, without prior written consent of TESDA. Any
              violation hereof shall be subject to the penalties provided for by
              applicable laws, rules and regulations.”
            </div>

            {/* Title */}
            <h2 className="font-bold mb-3">
              SPECIFIC INSTRUCTIONS FOR THE CANDIDATE
            </h2>

            {/* Info Table */}
            <div className="border border-black mb-4">
              <div className="grid grid-cols-3 border-b border-black">
                <div className="border-r border-black p-2">Qualification</div>
                <div className="col-span-2 p-2">
                  Shielded Metal Arc Welding (SMAW) NC II
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-black">
                <div className="border-r border-black p-2">
                  Units of Competency Covered
                </div>
                <div className="col-span-2 p-2 whitespace-pre-line">
                  {`1. Perform Shielded Metal Arc Welding — Plate to Plate Joint
2. Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
3. Repair Welds`}
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="border-r border-black p-2">Time Allotment</div>
                <div className="col-span-2 p-2">Approximately 4 hours</div>
              </div>
            </div>

            {/* Instructions */}
            <ol className="list-decimal ml-5 space-y-3">
              <li>
                You will be given a maximum of fifteen (15) minutes to
                familiarize with ALL the tools/materials/equipment that will be
                used.
              </li>

              <li>
                For safety reasons, you may be instructed to temporarily halt or
                completely end the demonstration at any given time.
              </li>

              <li>
                The 10 candidates will be divided into 2 groups. You will be
                assigned in one group of 5 candidates.
              </li>

              <li>Follow all safety procedures at all times.</li>

              <li>Ask the assessor if clarification is needed.</li>

              <li>Perform tasks according to given instructions.</li>

              <li>Ensure proper use of tools and equipment.</li>

              <li>Maintain cleanliness of your work area.</li>

              <li>
                The final assessment shall be the responsibility of your
                Accredited Assessor.
              </li>

              <li>
                At the end of the assessment, you shall be provided feedback on
                the assessment results. The feedback shall indicate whether you
                are:
              </li>
            </ol>

            {/* Result Checkboxes */}
            <div className="flex gap-12 mt-6 ml-8">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="font-semibold">COMPETENT</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="font-semibold">NOT YET COMPETENT</span>
              </label>
            </div>

            {/* Footer Notice */}
            <div className="mt-10 pt-4 border-t border-black text-center text-[11px]">
              TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            SIC Document • Candidate Copy • Page 1
          </div>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] flex items-center gap-2"
              onClick={() => alert("Download PDF")}
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Download
            </button>

            <button
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] flex items-center gap-2"
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
