import { X, Download, FileText, Printer } from 'lucide-react';

interface EvidencePlanPreviewModalProps {
  onClose: () => void;
}

export function EvidencePlanPreviewModal({ onClose }: EvidencePlanPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">Evidence Plan Preview & Export</h2>
            <p className="text-sm text-[#666]">Shielded Metal Arc Welding (SMAW) NC II</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Validation Status Banner */}
        <div className="px-6 py-3 bg-[#E8F5E9] border-b border-[#A5D6A7] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">✅</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#2E7D32]">All validation checks passed. Evidence Plan is ready for export.</div>
              <div className="text-xs text-[#2E7D32] mt-1">
                24 Performance Criteria mapped across 3 units • All critical aspects have sufficient coverage
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
              <h1 className="text-xl font-bold text-[#333] mb-2">EVIDENCE PLAN</h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">Unit of Competency: Shielded Metal Arc Welding (SMAW) NC II</div>
                <div>Nominal Duration: 52 hours • Qualification: BEV Servicing NC II</div>
              </div>
            </div>

            {/* Evidence Plan Table */}
            <div className="mb-6">
              <table className="w-full border-collapse text-[10px]">
                <thead>
                  <tr className="bg-[#1976D2] text-white">
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-left font-semibold">Performance Criteria</th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">MCQ</th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">Demo</th>
                    <th className="border border-[#E0E0E0] px-2 py-1.5 text-center font-semibold w-[60px]">QT</th>
                  </tr>
                </thead>
                <tbody>
                  {/* CORE 1 */}
                  <tr>
                    <td colSpan={4} className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]">
                      CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold">
                      Element 1: Prepare materials and welding equipment
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Identify type and size of electrode to be used in accordance with WPS <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Set up welding machine and accessories as per WPS requirements
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center"></td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Clean base metals in accordance with standard operating procedures
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center"></td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center"></td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Prepare work area and ensure compliance with OSHS
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                  </tr>

                  <tr>
                    <td colSpan={4} className="border border-[#E0E0E0] px-2 py-1 bg-[#E8EDF2] font-semibold">
                      Element 2: Perform root pass on plate to plate joint
                    </td>
                  </tr>
                  <tr className="bg-[#FFFDE7]">
                    <td className="border border-[#E0E0E0] px-2 py-1.5">
                      Perform root pass in accordance with WPS <span className="text-[#F57C00] font-bold">*</span>
                    </td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center">✓</td>
                  </tr>

                  {/* CORE 2 Sample */}
                  <tr>
                    <td colSpan={4} className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]">
                      CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center text-[#999] italic" colSpan={4}>
                      [9 Performance Criteria mapped - view full table in editor]
                    </td>
                  </tr>

                  {/* CORE 3 Sample */}
                  <tr>
                    <td colSpan={4} className="border border-[#E0E0E0] px-2 py-1.5 bg-[#1E3A5F] text-white font-semibold text-[11px]">
                      CORE 3: Repair Welds
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#E0E0E0] px-2 py-1.5 text-center text-[#999] italic" colSpan={4}>
                      [5 Performance Criteria mapped - view full table in editor]
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="border border-[#E0E0E0] rounded p-4 bg-[#FAFAFA]">
              <div className="text-xs font-semibold text-[#333] mb-2">Assessment Coverage Summary</div>
              <div className="grid grid-cols-3 gap-3 text-xs text-[#666]">
                <div>
                  <div className="font-medium">Multiple Choice:</div>
                  <div>4 PCs</div>
                </div>
                <div>
                  <div className="font-medium">Demonstration:</div>
                  <div>10 PCs</div>
                </div>
                <div>
                  <div className="font-medium">Questioning Tool:</div>
                  <div>7 PCs</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-[#F57C00]">
                <span className="font-bold">*</span> Critical aspects: 2 PCs
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
              onClick={() => alert('Download DOCX')}
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Download DOCX
            </button>

            {/* Export ZIP */}
            <button
              onClick={() => alert('Export all CLMs as ZIP')}
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Download ZIP
            </button>

            {/* Print Preview */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors flex items-center gap-2"
            >
              <Printer size={16} />
              Print Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
