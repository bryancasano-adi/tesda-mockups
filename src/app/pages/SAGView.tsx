import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SAGView() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › SAG
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Self-Assessment Guide (SAG)
          </h1>
          <p className="text-sm text-[#666]">Derived from Evidence Plan - Methods Removed, Checkboxes Added</p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'finalized' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#F57C00]'
          }`}
        >
          {status === 'finalized' ? '✅ Finalized' : '⚠️ Draft'}
        </span>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>Auto-generated from Evidence Plan (Phase 1)</strong>
            <div className="mt-1 text-xs">
              The SAG is a transformation of the Evidence Plan with assessment method columns removed and
              YES/NO checkboxes added for candidate self-evaluation.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-5 flex justify-end gap-2">
        <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Download Preview
        </button>
        {status === 'draft' && (
          <button
            onClick={() => setStatus('finalized')}
            className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
          >
            Finalize Document
          </button>
        )}
      </div>

      {/* SAG Document */}
      <div className="bg-white border border-[#E0E0E0] rounded p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-[#E0E0E0]">
          <div className="font-bold text-lg text-[#1E3A5F] mb-4">
            TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
          </div>
          <div className="text-xl font-bold text-[#1976D2] my-4">
            SHIELDED METAL ARC WELDING (SMAW) NC II
          </div>
          <div className="text-lg font-semibold text-[#333]">SELF-ASSESSMENT GUIDE</div>
        </div>

        {/* Introduction */}
        <div className="mb-6 p-4 bg-[#FFFDE7] border border-[#FFE082] rounded">
          <h3 className="font-semibold text-sm text-[#333] mb-2">How to Use This Self-Assessment Guide</h3>
          <p className="text-sm text-[#666] mb-2">
            This guide will help you determine if you are ready for assessment. For each performance criteria
            listed below, honestly assess your ability to perform the task.
          </p>
          <p className="text-sm text-[#666]">
            Check <strong>YES</strong> if you can perform the task confidently and correctly. Check{' '}
            <strong>NO</strong> if you need more practice or training.
          </p>
        </div>

        {/* Locked Info Section */}
        <div className="mb-6 bg-[#FAFAFA] border border-[#E0E0E0] rounded p-4">
          <div className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-2">
            <span className="mr-1.5">🔒</span> Qualification Information
          </div>
          <div className="space-y-2">
            <div>
              <strong className="text-sm text-[#666]">Qualification Title:</strong>
              <div className="text-sm text-[#333]">Shielded Metal Arc Welding (SMAW) NC II</div>
            </div>
            <div>
              <strong className="text-sm text-[#666]">Units of Competency Covered:</strong>
              <ul className="text-sm text-[#333] ml-5 list-disc mt-1">
                <li>Perform Shielded Metal Arc Welding — Plate to Plate Joint</li>
                <li>Perform Shielded Metal Arc Welding — Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Self-Assessment Table */}
        <div className="overflow-x-auto border border-[#E0E0E0] rounded">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] bg-[#FAFAFA] border-b border-[#E0E0E0]">
                  The evidence must show that the candidate...
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] bg-[#FAFAFA] border-b border-[#E0E0E0] w-24">
                  YES
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] bg-[#FAFAFA] border-b border-[#E0E0E0] w-24">
                  NO
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Unit Header */}
              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-white bg-[#1E3A5F] border-b border-[#E0E0E0]">
                  CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint
                </td>
              </tr>

              {/* Element Header */}
              <tr>
                <td colSpan={3} className="px-4 py-2.5 text-sm font-semibold text-[#333] bg-[#E8EDF2] border-b border-[#E0E0E0]">
                  Element 1: Prepare materials and welding equipment
                </td>
              </tr>

              {/* Performance Criteria Rows */}
              {[
                'Identify type and size of electrode to be used in accordance with Welding Procedure Specification (WPS)',
                'Set up welding machine and accessories as per WPS requirements',
                'Clean base metals in accordance with standard operating procedures',
                'Prepare work area and ensure compliance with Occupational Safety and Health Standards (OSHS)',
              ].map((pc, index) => (
                <tr key={index} className="hover:bg-[#F8FBFF]">
                  <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">{pc}</td>
                  <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                    <input type="checkbox" className="w-5 h-5 cursor-pointer accent-[#2E7D32]" />
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                    <input type="checkbox" className="w-5 h-5 cursor-pointer accent-[#C62828]" />
                  </td>
                </tr>
              ))}

              {/* Element 2 */}
              <tr>
                <td colSpan={3} className="px-4 py-2.5 text-sm font-semibold text-[#333] bg-[#E8EDF2] border-b border-[#E0E0E0]">
                  Element 2: Perform root pass on plate to plate joint
                </td>
              </tr>

              {[
                'Perform root pass in accordance with WPS *',
                'Clean and inspect root pass using visual and mechanical methods',
                'Repair root pass defects as required',
              ].map((pc, index) => (
                <tr key={index} className={pc.includes('*') ? 'bg-[#FFFDE7] hover:bg-[#FFF9C4]' : 'hover:bg-[#F8FBFF]'}>
                  <td className="px-4 py-3 text-sm border-b border-[#F0F0F0]">
                    {pc}
                    {pc.includes('*') && (
                      <span className="ml-2 text-xs text-[#F57C00]">(Critical Aspect)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                    <input type="checkbox" className="w-5 h-5 cursor-pointer accent-[#2E7D32]" />
                  </td>
                  <td className="px-4 py-3 text-center border-b border-[#F0F0F0]">
                    <input type="checkbox" className="w-5 h-5 cursor-pointer accent-[#C62828]" />
                  </td>
                </tr>
              ))}

              {/* Additional Units Placeholder */}
              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-white bg-[#1E3A5F]">
                  CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-[#999] bg-[#FAFAFA]">
                  [Additional elements and PCs continue...]
                </td>
              </tr>

              <tr>
                <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-white bg-[#1E3A5F]">
                  CORE 3: Repair Welds
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-[#999] bg-[#FAFAFA]">
                  [Additional elements and PCs continue...]
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="mt-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded">
          <h3 className="font-semibold text-sm text-[#2E7D32] mb-2">Self-Assessment Summary</h3>
          <p className="text-sm text-[#1B5E20] mb-3">
            After completing this self-assessment, review your responses:
          </p>
          <ul className="text-sm text-[#1B5E20] space-y-1 ml-5 list-disc">
            <li>If you checked <strong>YES</strong> for most or all items, you may be ready for assessment.</li>
            <li>
              If you checked <strong>NO</strong> for several items, especially critical aspects (*), consider
              additional training before assessment.
            </li>
            <li>Discuss your self-assessment results with your trainer or supervisor.</li>
          </ul>
        </div>

        {/* Signature Section */}
        <div className="mt-8 pt-6 border-t border-[#E0E0E0]">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-[#666] mb-2">Candidate Name:</div>
              <div className="border-b border-[#333] pb-1 mb-4"></div>
              <div className="text-xs text-[#999]">Print Name</div>
            </div>
            <div>
              <div className="text-sm text-[#666] mb-2">Date:</div>
              <div className="border-b border-[#333] pb-1 mb-4"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-[#666] mb-2">Signature:</div>
            <div className="border-b border-[#333] pb-1"></div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors">
            Export to DOCX
          </button>
        </div>
      </div>
    </div>
  );
}
