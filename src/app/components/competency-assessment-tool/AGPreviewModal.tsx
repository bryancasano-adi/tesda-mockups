import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
} from "@heroicons/react/24/solid";

interface AGPreviewModalProps {
  onClose: () => void;
}

export function AGPreviewModal({ onClose }: AGPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              Assessor&apos;s Guide Preview & Export
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
            <XMarkIcon className="w-5 h-5 inline text-gray-500" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">
              <InformationCircleIcon className="w-8 h-8 inline text-blue-500" />
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#1976D2]">
                Final Deliverable - Phase 3
              </div>
              <div className="text-xs text-[#1565C0] mt-1">
                This document compiles all assessment tools from Phase 2 with
                instructions for assessors.
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-sm max-w-[800px] mx-auto p-8">
            {/* Cover Page */}
            <div className="text-center mb-8 pb-8 border-b-2 border-[#1976D2]">
              <div className="mb-4">
                <img
                  alt="TESDA Logo"
                  className="mx-auto mb-3"
                  height={64}
                  src="/tesda-cropped-logo.png"
                  width={64}
                />
              </div>
              <div className="text-xs text-[#999] uppercase tracking-wider mb-2">
                Technical Education and Skills Development Authority
              </div>
              <h1 className="text-xl font-bold text-[#333] mb-4">
                ASSESSOR&apos;S GUIDE
              </h1>
              <div className="text-sm text-[#666] mb-2">
                <div className="font-semibold mb-1">
                  National Assessment for:
                </div>
                <div className="text-lg font-bold text-[#1976D2] my-3">
                  SHIELDED METAL ARC WELDING (SMAW) NC II
                </div>
              </div>
              <div className="text-xs text-[#999] mt-4">
                Document Ref: TESDA-OP-QSO-02-F01
                <br />
                Rev. No. 00 03/01/17
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#333] mb-4 pb-2 border-b border-[#E0E0E0]">
                TABLE OF CONTENTS
              </h2>
              <div className="space-y-2 text-sm text-[#666]">
                <div className="flex justify-between">
                  <span>1. Introduction</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Qualification Description</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span>3. Evidence Plan</span>
                  <span>4</span>
                </div>
                <div className="flex justify-between">
                  <span>4. Specific Instructions for the Assessor</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span>5. Assessment Guide for Demonstration</span>
                  <span>6</span>
                </div>
                <div className="flex justify-between">
                  <span>6. Questioning Tools</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between">
                  <span>7. Tools, Materials, and Equipment List</span>
                  <span>10</span>
                </div>
                <div className="flex justify-between">
                  <span>8. Answer Keys</span>
                  <span>11</span>
                </div>
              </div>
            </div>

            {/* Sample Page: Specific Instructions */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#333] mb-4 pb-2 border-b border-[#E0E0E0]">
                4. SPECIFIC INSTRUCTIONS FOR THE ASSESSOR
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold text-[#333] mb-1">
                    Qualification Title:
                  </div>
                  <div className="text-[#666]">
                    Shielded Metal Arc Welding (SMAW) NC II
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[#333] mb-1">
                    Time Allotted:
                  </div>
                  <div className="text-[#666]">
                    4 hours per candidate / 8 hours for 10 candidates
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[#333] mb-2">
                    Instructions:
                  </div>
                  <ol className="ml-5 space-y-2 text-[#666] list-decimal">
                    <li>
                      Conduct orientation (10 minutes) to explain the assessment
                      process and answer candidate questions.
                    </li>
                    <li>
                      Provide complete set of supplies, materials, tools, and
                      equipment as specified in the list.
                    </li>
                    <li>
                      Ensure the assessment area meets the minimum space
                      requirements and safety standards.
                    </li>
                    <li>
                      Observe candidates during the demonstration test without
                      interference unless safety is compromised.
                    </li>
                    <li>
                      Use the rating sheet to evaluate performance against the
                      specified criteria.
                    </li>
                    <li>
                      Conduct the oral questioning session after the
                      demonstration test.
                    </li>
                    <li>
                      Administer the written test in a separate quiet area.
                    </li>
                    <li>Compile all results using the CARS template.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Sample Page: Assessment Guide */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-[#333] mb-4 pb-2 border-b border-[#E0E0E0]">
                5. ASSESSMENT GUIDE FOR DEMONSTRATION
              </h2>
              <div className="text-xs text-[#666] italic mb-3">
                Performance Criteria and Rubrics from Demonstration Test (Phase
                2)
              </div>
              <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA] text-sm text-[#666]">
                <div className="font-medium mb-2">100-Point Rubric</div>
                <ul className="space-y-1 ml-5 list-disc">
                  <li>Electrode identification and selection (15 points)</li>
                  <li>Root pass execution * (25 points)</li>
                  <li>Fill and cover pass quality (20 points)</li>
                  <li>
                    Visual inspection and acceptance criteria * (20 points)
                  </li>
                  <li>
                    Safety compliance and work area management (20 points)
                  </li>
                </ul>
                <div className="text-xs mt-2 text-[#F57C00]">
                  * Critical aspects - Must be demonstrated for competency
                </div>
              </div>
            </div>

            {/* Copyright Notice */}
            <div className="mt-8 pt-4 border-t border-[#E0E0E0]">
              <div className="text-xs text-[#999] text-center p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                &ldquo;No part of this Competency Assessment Tools (CATs) may be
                produced, distributed, or transmitted in any form or by any
                means, including photocopying, recording, or other electronic or
                mechanical methods, without prior written consent of TESDA. Any
                violation hereof shall be subject to the penalties under
                applicable laws, rules and regulations.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Final Deliverable • Phase 3 • Total: 10 pages
          </div>
          <div className="flex gap-2">
            {/* Download PDF */}
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
              onClick={() => alert("Download PDF")}
            >
              <FolderArrowDownIcon className="w-5 h-5 inline" />
              Download
            </button>

            {/* Print Preview */}
            <button
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
              onClick={() => window.print()}
            >
              <PrinterIcon className="w-5 h-5 inline" />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
