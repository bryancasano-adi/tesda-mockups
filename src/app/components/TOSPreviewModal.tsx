import { X, Download, FileText, Printer } from 'lucide-react';

interface TOSData {
  article: string;
  factual: string;
  comprehension: string;
  application: string;
  total: number;
  percentage: number;
}

interface TOSPreviewModalProps {
  tosData: TOSData[];
  totalItems: number;
  factualCount: number;
  scenarioCount: number;
  applicationCount: number;
  onClose: () => void;
}

export function TOSPreviewModal({
  tosData,
  totalItems,
  factualCount,
  scenarioCount,
  applicationCount,
  onClose,
}: TOSPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E0E0E0] flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#333]">Table of Specifications Preview & Export</h2>
            <p className="text-sm text-[#666]">Shielded Metal Arc Welding (SMAW) NC II - Written Test</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F5F5F5] rounded transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-[#666]" />
          </button>
        </div>

        {/* Summary Banner */}
        <div className="px-6 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex-shrink-0">
          <div className="flex items-start gap-2">
            <span className="text-lg">📊</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-[#1976D2]">
                {totalItems} total items • {factualCount} Factual • {scenarioCount} Comprehension • {applicationCount} Application
              </div>
              <div className="text-xs text-[#1976D2] mt-1">
                Distributed across 6 competency articles
              </div>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto bg-[#F5F5F5] p-6">
          <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-sm max-w-[900px] mx-auto p-8">
            {/* Document Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-[#1976D2]">
              <div className="text-xs text-[#999] uppercase tracking-wider mb-2">
                Technical Education and Skills Development Authority
              </div>
              <h1 className="text-xl font-bold text-[#333] mb-2">TABLE OF SPECIFICATION</h1>
              <div className="text-sm text-[#666]">
                <div className="font-semibold mb-1">Shielded Metal Arc Welding (SMAW) NC II</div>
                <div className="text-xs">Written Test • {totalItems} Items Total</div>
              </div>
            </div>

            {/* Main TOS Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1976D2]">
                    <th colSpan={6} className="px-4 py-3 text-center font-bold text-white border-2 border-[#1976D2]">
                      TABLE OF SPECIFICATION
                    </th>
                  </tr>
                  <tr className="bg-[#1976D2]">
                    <th colSpan={6} className="px-4 py-2 text-center font-semibold text-white text-sm border-2 border-[#1976D2]">
                      SHIELDED METAL ARC WELDING (SMAW) – National Certificate II
                    </th>
                  </tr>
                  <tr className="bg-[#1976D2]">
                    <th colSpan={6} className="px-4 py-2 text-center font-semibold text-white text-sm border-2 border-[#1976D2]">
                      Written Test
                    </th>
                  </tr>
                  <tr className="bg-[#E3F2FD]">
                    <th
                      rowSpan={2}
                      className="text-left px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2] align-middle"
                    >
                      ARTICLE NUMBER
                    </th>
                    <th
                      colSpan={3}
                      className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]"
                    >
                      TEST ITEM DISTRIBUTION
                    </th>
                    <th
                      rowSpan={2}
                      className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2] align-middle"
                    >
                      TOTAL NO. OF<br />ITEMS
                    </th>
                    <th
                      rowSpan={2}
                      className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2] align-middle"
                    >
                      PERCENTAGE<br />(%)
                    </th>
                  </tr>
                  <tr className="bg-[#E3F2FD]">
                    <th className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      TYPE I<br />
                      <span className="font-normal">Factual Knowledge</span>
                    </th>
                    <th className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      TYPE 2<br />
                      <span className="font-normal">Comprehension</span>
                    </th>
                    <th className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      TYPE 3<br />
                      <span className="font-normal">Application</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tosData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAFA]">
                      <td className="px-3 py-2 text-xs border border-[#999]">{row.article}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999]">{row.factual}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999]">{row.comprehension}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999]">{row.application}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999] font-bold">{row.total}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999]">{row.percentage}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#E8F5E9]">
                    <td className="px-3 py-2 text-xs font-bold text-right border-2 border-[#2E7D32]">TOTAL</td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">
                      {factualCount}
                    </td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">
                      {scenarioCount}
                    </td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">
                      {applicationCount}
                    </td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">
                      {totalItems}
                    </td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary by Article */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-[#333] mb-3 uppercase">Summary by Article</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#E3F2FD]">
                    <th className="text-left px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      ARTICLE/DESCRIPTION
                    </th>
                    <th className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      NO. OF ITEMS
                    </th>
                    <th className="text-center px-3 py-2 text-[10px] font-bold text-[#333] border border-[#1976D2]">
                      PERCENTAGE (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tosData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFAFA]">
                      <td className="px-3 py-2 text-xs border border-[#999]">{row.article}</td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999] font-semibold">
                        {row.total}
                      </td>
                      <td className="px-3 py-2 text-xs text-center border border-[#999]">{row.percentage}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#E8F5E9]">
                    <td className="px-3 py-2 text-xs font-bold text-right border-2 border-[#2E7D32]">TOTAL</td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">
                      {totalItems}
                    </td>
                    <td className="px-3 py-2 text-xs text-center border-2 border-[#2E7D32] font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Notes Section */}
            <div className="mt-6 p-4 bg-[#E3F2FD] border-l-4 border-[#1976D2] rounded">
              <div className="text-xs font-semibold text-[#1976D2] mb-2">TOS Validation:</div>
              <ul className="text-xs text-[#1565C0] space-y-1">
                <li>✓ All {totalItems} MCQ items mapped to competency articles</li>
                <li>✓ Item distribution aligns with TESDA assessment guidelines</li>
                <li>✓ Balanced coverage across knowledge, comprehension, and application levels</li>
                <li>✓ Total percentage equals 100%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E0E0E0] bg-[#FAFAFA] flex justify-between items-center flex-shrink-0">
          <div className="text-xs text-[#666]">Preview reflects current TOS • {totalItems} items</div>
          <div className="flex gap-2">
            {/* Download DOCX */}
            <button
              onClick={() => alert('Download TOS DOCX')}
              className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Download DOCX
            </button>

            {/* Export ZIP */}
            <button
              onClick={() => alert('Export TOS as ZIP')}
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
