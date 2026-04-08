import {
  FolderArrowDownIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface OutlinePreviewModalProps {
  onClose: () => void;
}

export function OutlinePreviewModal({ onClose }: OutlinePreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              Outline Preview & Export
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
                Internal Working Document
              </div>
              <div className="text-xs text-[#1565C0] mt-1">
                This outline is automatically generated from the Evidence Plan
                and serves as a reference for generating assessment tools.
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-sm max-w-[800px] mx-auto p-8">
            {/* Document Header */}
            <div className="text-center mb-6 pb-6 border-b-2 border-[#1976D2]">
              <div className="text-xs text-[#999] uppercase tracking-wider mb-2">
                Technical Education and Skills Development Authority
              </div>
              <h1 className="text-xl font-bold text-[#333] mb-2">
                TOPICS, SKILLS, AND TASKS OUTLINE
              </h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">
                  Unit of Competency: Shielded Metal Arc Welding (SMAW) NC II
                </div>
                <div>
                  Internal Working Document • Auto-Generated from Evidence Plan
                </div>
              </div>
            </div>

            {/* Outline Content */}
            <div className="space-y-6 text-sm">
              {/* CORE 1 */}
              <div>
                <h3 className="font-bold text-[#1E3A5F] mb-3 pb-2 border-b-2 border-[#1976D2]">
                  CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate
                  Joint
                </h3>
                <div className="ml-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 1: Prepare materials and welding equipment
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Electrode selection and identification
                      </li>
                      <li className="list-disc">
                        Welding Procedure Specification (WPS) interpretation
                      </li>
                      <li className="list-disc">
                        Welding machine setup and adjustment
                      </li>
                      <li className="list-disc">
                        Base metal preparation and cleaning
                      </li>
                      <li className="list-disc">
                        Workplace safety and OSHS compliance
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 2: Perform root pass on plate to plate joint
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">Root pass welding technique</li>
                      <li className="list-disc">
                        Visual and mechanical inspection methods
                      </li>
                      <li className="list-disc">
                        Defect identification and assessment
                      </li>
                      <li className="list-disc">Root pass repair procedures</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 3: Perform fill and cover pass
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Fill and cover pass welding technique
                      </li>
                      <li className="list-disc">
                        Weldment visual inspection procedures
                      </li>
                      <li className="list-disc">
                        Acceptance criteria evaluation
                      </li>
                      <li className="list-disc">
                        Work area cleaning and equipment storage
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CORE 2 */}
              <div>
                <h3 className="font-bold text-[#1E3A5F] mb-3 pb-2 border-b-2 border-[#1976D2]">
                  CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe
                  Joint
                </h3>
                <div className="ml-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 1: Prepare pipe materials and welding equipment
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Electrode selection for pipe welding applications
                      </li>
                      <li className="list-disc">
                        Welding machine configuration for pipe operations
                      </li>
                      <li className="list-disc">
                        Pipe surface preparation techniques
                      </li>
                      <li className="list-disc">
                        Pipe joint preparation and fit-up
                      </li>
                      <li className="list-disc">Pipe alignment procedures</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 2: Perform pipe welding operations
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Root pass execution on pipe joints
                      </li>
                      <li className="list-disc">
                        Fill pass bead sequencing and technique
                      </li>
                      <li className="list-disc">
                        Cap pass profile and appearance control
                      </li>
                      <li className="list-disc">Multi-position pipe welding</li>
                      <li className="list-disc">
                        Heat control and distortion management
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 3: Inspect and document pipe welds
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Visual inspection procedures for pipe welds
                      </li>
                      <li className="list-disc">
                        Weld defect identification and classification
                      </li>
                      <li className="list-disc">
                        Inspection report preparation
                      </li>
                      <li className="list-disc">Quality acceptance criteria</li>
                      <li className="list-disc">
                        Documentation and record keeping
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CORE 3 */}
              <div>
                <h3 className="font-bold text-[#1E3A5F] mb-3 pb-2 border-b-2 border-[#1976D2]">
                  CORE 3: Repair Welds
                </h3>
                <div className="ml-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 1: Identify weld defects and repair requirements
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Weld defect types and characteristics
                      </li>
                      <li className="list-disc">Defect severity assessment</li>
                      <li className="list-disc">
                        Repair procedure determination
                      </li>
                      <li className="list-disc">
                        Defective area preparation techniques
                      </li>
                      <li className="list-disc">
                        Repair planning and documentation
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#333] mb-2">
                      Element 2: Execute weld repairs
                    </h4>
                    <ul className="ml-6 space-y-1.5 text-[#666]">
                      <li className="list-disc">
                        Repair welding operations following approved procedures
                      </li>
                      <li className="list-disc">
                        Heat input control during repairs
                      </li>
                      <li className="list-disc">
                        Post-repair quality verification
                      </li>
                      <li className="list-disc">
                        Repair inspection and acceptance
                      </li>
                      <li className="list-disc">
                        Repair documentation and reporting
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA] mt-6">
              <div className="text-xs font-semibold text-[#333] mb-2">
                Outline Summary
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#666]">
                <div>
                  <div className="font-medium">Total Units:</div>
                  <div>3 Core Units</div>
                </div>
                <div>
                  <div className="font-medium">Total Elements:</div>
                  <div>7 Elements</div>
                </div>
                <div>
                  <div className="font-medium">Total Performance Criteria:</div>
                  <div>21 PCs</div>
                </div>
                <div>
                  <div className="font-medium">Document Status:</div>
                  <div className="text-[#2E7D32]">Auto-Generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Auto-generated from Evidence Plan • Last updated: 12s ago
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
