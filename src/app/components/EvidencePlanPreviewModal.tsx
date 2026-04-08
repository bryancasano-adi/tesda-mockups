import {
  FolderArrowDownIcon,
  PrinterIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface EvidencePlanPreviewModalProps {
  onClose: () => void;
}

export function EvidencePlanPreviewModal({
  onClose,
}: EvidencePlanPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">
              Evidence Plan Preview & Export
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
            <XMarkIcon className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Validation Status Banner */}
        <div className="px-6 py-3 bg-[#E8F5E9] border-b border-[#A5D6A7] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">✅</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#2E7D32]">
                All validation checks passed. Evidence Plan is ready for export.
              </div>
              <div className="text-xs text-[#2E7D32] mt-1">
                21 Performance Criteria mapped across 3 units • All critical
                aspects have sufficient coverage
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
                EVIDENCE PLAN
              </h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">
                  Unit of Competency: Shielded Metal Arc Welding (SMAW) NC II
                </div>
                <div>
                  Nominal Duration: 52 hours • Qualification: BEV Servicing NC
                  II
                </div>
              </div>
            </div>

            {/* Evidence Plan Table */}
            <div className="mb-6">
              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-[#1976D2] text-white">
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-left font-semibold">
                      Performance Criteria
                    </th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">
                      MCQ
                    </th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">
                      Demo
                    </th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">
                      QT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* CORE 1 */}
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]"
                      colSpan={4}
                    >
                      CORE 1: Perform Shielded Metal Arc Welding — Plate to
                      Plate Joint
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 1: Prepare materials and welding equipment
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Identify type and size of electrode to be used in
                      accordance with WPS{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Set up welding machine and accessories as per WPS
                      requirements
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Clean base metals in accordance with standard operating
                      procedures
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Prepare work area and ensure compliance with OSHS
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>

                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 2: Perform root pass on plate to plate joint
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Perform root pass in accordance with WPS{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Clean and inspect root pass using visual and mechanical
                      methods
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Repair root pass defects as required
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                  </tr>

                  {/* CORE 2 */}
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]"
                      colSpan={4}
                    >
                      CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe
                      Joint
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 1: Prepare pipe materials and welding equipment
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Select appropriate electrodes for pipe welding as per WPS{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Set up welding machine for pipe welding operations
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Prepare pipe surfaces according to welding requirements
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>

                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 2: Perform pipe welding operations
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Execute root pass on pipe joints following WPS{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Perform fill passes maintaining proper bead sequence
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Complete cap pass with proper profile and appearance
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                  </tr>

                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 3: Inspect and document pipe welds
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Conduct visual inspection of completed pipe welds
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Identify and document weld defects
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Prepare weld inspection reports
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>

                  {/* CORE 3 */}
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]"
                      colSpan={4}
                    >
                      CORE 3: Repair Welds
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 1: Identify weld defects and repair requirements
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Identify types of weld defects requiring repair{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Determine appropriate repair procedures
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Prepare defective areas for repair welding
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>

                  <tr>
                    <td
                      className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold"
                      colSpan={4}
                    >
                      Element 2: Execute weld repairs
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Perform repair welding operations following approved
                      procedures{" "}
                      <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center" />
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Verify quality of repaired welds through inspection
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">
                      ✓
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
              <div className="text-xs font-semibold text-[#333] mb-2">
                Assessment Coverage Summary
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs text-[#666]">
                <div>
                  <div className="font-medium">Multiple Choice:</div>
                  <div>11 PCs</div>
                </div>
                <div>
                  <div className="font-medium">Demonstration:</div>
                  <div>17 PCs</div>
                </div>
                <div>
                  <div className="font-medium">Questioning Tool:</div>
                  <div>16 PCs</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-[#F57C00]">
                <span className="font-bold">*</span> Critical aspects: 5 PCs
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">
            Preview reflects current draft • Last saved: 12s ago
          </div>
          <div className="flex gap-2">
            {/* Download DOCX */}
            <button
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
              onClick={() => alert("Download DOCX")}
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
