import {
  FolderArrowDownIcon,
  InformationCircleIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface DemoTestPreviewModalProps {
  selectedSet: "A" | "B" | "C" | "D" | "E";
  onClose: () => void;
}

export function DemoTestPreviewModal({
  selectedSet,
  onClose,
}: DemoTestPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              Demonstration Test Preview & Export
            </h2>
            <p className="text-sm text-[#666]">
              Set {selectedSet} - Shielded Metal Arc Welding (SMAW) NC II
            </p>
          </div>
          <button
            aria-label="Close"
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            onClick={onClose}
          >
            <XMarkIcon className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Set Selector Tabs */}
        <div className="px-6 py-3 border-b border-[#E0E0E0] bg-[#FAFAFA] flex gap-2 flex-shrink-0">
          <div className="text-xs text-[#666] mr-2 flex items-center">
            Preview Set:
          </div>
          {(["A", "B", "C", "D", "E"] as const).map((set) => (
            <button
              key={set}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedSet === set
                  ? "bg-[#1976D2] text-white"
                  : "bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#E3F2FD]"
              }`}
            >
              Set {set}
            </button>
          ))}
        </div>

        {/* Validation Status Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">
              <InformationCircleIcon className="w-8 h-8 inline text-blue-500" />
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#1565C0]">
                Viewing Set {selectedSet} - One of 5 variations using the same
                100-point rubric
              </div>
              <div className="text-xs text-[#1565C0] mt-1">
                All sets assess identical Performance Criteria with different
                tasks/materials • Rubric shared across all variations
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
                DEMONSTRATION TEST
              </h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">
                  Shielded Metal Arc Welding (SMAW) NC II
                </div>
                <div className="text-xs">
                  SET {selectedSet} • Assessment Duration: 4 hours
                </div>
              </div>
            </div>

            {/* Task Instructions */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#333] mb-3 uppercase">
                I. TASK INSTRUCTIONS
              </h2>

              <div className="mb-4 p-3 bg-[#FFF3E0] border border-[#FFE0B2] rounded">
                <div className="text-xs font-semibold text-[#E65100] mb-1">
                  SCENARIO (Set {selectedSet}):
                </div>
                <div className="text-xs text-[#333]">
                  You are a welder in a fabrication shop. You have been assigned
                  to perform SMAW on a
                  {selectedSet === "A" &&
                    " plate-to-plate joint using 6mm mild steel plates with a V-groove preparation."}
                  {selectedSet === "B" &&
                    " T-joint connection using 8mm steel plates with fillet weld requirements."}
                  {selectedSet === "C" &&
                    " butt joint on 10mm plates with full penetration requirements."}
                  {selectedSet === "D" &&
                    " corner joint assembly using 6mm plates with specific gap requirements."}
                  {selectedSet === "E" &&
                    " lap joint configuration with 8mm plates and multi-pass welding."}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="font-semibold mb-1">
                    1. Material Preparation
                  </div>
                  <div className="ml-4 text-[#666]">
                    • Inspect and clean base metal plates
                    <br />
                    • Verify dimensions and joint preparation
                    <br />• Identify electrode type and size per WPS
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">2. Equipment Setup</div>
                  <div className="ml-4 text-[#666]">
                    • Set up welding machine to proper current and polarity
                    <br />
                    • Prepare welding accessories and PPE
                    <br />• Verify safety equipment and workspace compliance
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">3. Welding Execution</div>
                  <div className="ml-4 text-[#666]">
                    • Perform tack welds at specified locations
                    <br />
                    • Execute root pass in accordance with WPS
                    <br />
                    • Complete filler and cover passes as required
                    <br />• Maintain proper arc length and travel speed
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">
                    4. Quality Control & Finishing
                  </div>
                  <div className="ml-4 text-[#666]">
                    • Perform visual inspection of completed weld
                    <br />
                    • Clean and finish weld surface
                    <br />• Verify dimensional requirements and acceptance
                    criteria
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Rubric Preview */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#333] mb-3 uppercase">
                II. PERFORMANCE RUBRIC (100 Points)
              </h2>
              <div className="text-xs text-[#1565C0] mb-3 p-2 bg-[#E3F2FD] rounded">
                <InformationCircleIcon className="w-5 h-5 inline text-blue-500" />{" "}
                This rubric is used for ALL sets (A-E). Only task instructions
                vary.
              </div>

              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-[#1976D2] text-white">
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-left font-semibold w-12">
                      No.
                    </th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-left font-semibold">
                      Performance Criterion
                    </th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-16">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      1
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Electrode selection and machine setup per WPS{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-medium">
                      20
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      2
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Material preparation and joint fit-up
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-medium">
                      20
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      3
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Welding technique and process control{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-medium">
                      20
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      4
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Visual inspection and acceptance criteria{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-medium">
                      20
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      5
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Safety compliance and work area management
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-medium">
                      20
                    </td>
                  </tr>
                  <tr className="bg-[#E8F5E9]">
                    <td
                      className="border border-[#E0E0E0] px-2 py-1.5 text-right font-bold"
                      colSpan={2}
                    >
                      TOTAL POINTS
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center font-bold">
                      100
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 p-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded text-xs">
                <div className="font-semibold text-[#2E7D32] mb-1">
                  Competency Decision Rules:
                </div>
                <div className="text-[#1B5E20]">
                  <strong>Competent (C):</strong> Total ≥75/100 AND all critical
                  PCs (*) demonstrated AND no unsafe practice
                  <br />
                  <strong>Not Yet Competent (NYC):</strong> Score &lt;75 OR
                  critical PC failure OR unsafe practice
                </div>
              </div>
            </div>

            {/* Tools & Materials */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-[#333] mb-3 uppercase">
                III. TOOLS, EQUIPMENT & MATERIALS (Set {selectedSet})
              </h2>

              <div className="text-[10px] space-y-3">
                <div>
                  <div className="font-semibold mb-1">
                    A. Supplies and Materials
                  </div>
                  <div className="ml-3 text-[#666]">
                    • Mild steel plates (varies by set)
                    <br />
                    • E6013 electrodes, 3.2mm diameter
                    <br />• Welding wire brush, chipping hammer
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">
                    B. Tools and Equipment
                  </div>
                  <div className="ml-3 text-[#666]">
                    • SMAW machine (AC/DC, 200A capacity)
                    <br />
                    • Welding helmet with shade #10-12 lens
                    <br />• Measuring tools (ruler, square, protractor)
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">C. Facilities</div>
                  <div className="ml-3 text-[#666]">
                    • Welding bay: 25 sqm assessment area
                    <br />• Proper ventilation and fire safety equipment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Preview reflects Set {selectedSet} • Rubric applies to all 5 sets
          </div>
          <div className="flex gap-2">
            {/* Download DOCX */}
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
              onClick={() => alert(`Download Set ${selectedSet} DOCX`)}
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
