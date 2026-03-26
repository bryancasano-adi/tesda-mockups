import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'workflow' | 'package'>('workflow');
  const [selectedPackage, setSelectedPackage] = useState('A');

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development
      </div>

      {/* Page Title */}
      <h1 className="text-xl font-semibold text-[#333] mb-1">
        Competency Assessment Tools (CATS)
      </h1>
      <p className="text-sm text-[#666] mb-5">
        Shielded Metal Arc Welding (SMAW) NC II
      </p>

      {/* View Toggle */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        <button
          onClick={() => setViewMode('workflow')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'workflow'
              ? 'bg-[#1976D2] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Workflow View
        </button>
        <button
          onClick={() => setViewMode('package')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'package'
              ? 'bg-[#1976D2] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Package View
        </button>
      </div>

      {/* Overall Progress */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            Overall Progress
            <span className="ml-2 inline-block bg-[#F5F5F5] px-2 py-0.5 rounded-full text-xs text-[#666]">
              5 packages × 6 documents = 30 total
            </span>
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
            Phase 2 In Progress
          </span>
        </div>
        <div className="p-5">
          <div className="w-full h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#1976D2] transition-all duration-300" style={{ width: '45%' }} />
          </div>
          <div className="text-xs text-[#666] mt-1.5">
            45% — Phase 1 complete, Phase 2 in progress (2 of 3 pools finalized)
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 border border-[#E0E0E0] rounded">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E3F2FD] text-[#1565C0]">
                  PHASE 1
                </span>
                <span className="text-sm font-semibold">Foundation</span>
              </div>
              <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#2E7D32]" style={{ width: '100%' }} />
              </div>
              <div className="text-xs text-[#666] mt-1">Complete — Evidence Plan finalized</div>
            </div>

            <div className="p-3 border border-[#E0E0E0] rounded">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32]">
                  PHASE 2
                </span>
                <span className="text-sm font-semibold">Pool Generation</span>
              </div>
              <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#F57C00]" style={{ width: '67%' }} />
              </div>
              <div className="text-xs text-[#666] mt-1">2 of 3 pools finalized</div>
            </div>

            <div className="p-3 border border-[#E0E0E0] rounded">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100]">
                  PHASE 3
                </span>
                <span className="text-sm font-semibold">5-Package Assembly</span>
              </div>
              <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#BDBDBD]" style={{ width: '0%' }} />
              </div>
              <div className="text-xs text-[#666] mt-1">Locked — waiting for all pools</div>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 1: Foundation Documents */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E3F2FD] text-[#1565C0] mr-2">
              PHASE 1
            </span>
            Foundation Documents
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
            Complete
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA]">
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Document
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Details
                </th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="font-medium text-sm">Evidence Plan</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    4-column table: MCQ | Demonstration | Questioning Tool
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                    Finalized
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-sm text-[#666]">
                  3 units, 12 elements, 47 PCs
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-right">
                  <button
                    onClick={() => navigate('/evidence-plan')}
                    className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="font-medium text-sm">Outline</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    Internal working document (auto-generated)
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                    Generated
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-sm text-[#999] italic">
                  Auto-generated from Evidence Plan
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-right">
                  <button
                    onClick={() => navigate('/outline')}
                    className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PHASE 2: Pool Generation */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            Pool Generation
            <span className="ml-2 inline-block bg-[#F5F5F5] px-2 py-0.5 rounded-full text-xs text-[#666]">
              2 of 3 finalized
            </span>
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
            In Progress
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA]">
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Pool
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0] w-56">
                  Progress
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Details
                </th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-[#666] border-b border-[#E0E0E0]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="font-medium text-sm">A. Demonstration Pool</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    5 variations × 5 sections each + 100-pt rubric
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                    Finalized
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E7D32]" style={{ width: '100%' }} />
                  </div>
                  <div className="text-xs text-[#666] mt-1">All 5 variations complete</div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-sm text-[#666]">
                  Duration: 4 hrs / candidate
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-right">
                  <button
                    onClick={() => navigate('/demonstration-test')}
                    className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="font-medium text-sm">B. Questioning Tool Pool</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    5 Qs per PC · Binary S/NS · 4 Dimensions coverage
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                    Finalized
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E7D32]" style={{ width: '100%' }} />
                  </div>
                  <div className="text-xs text-[#666] mt-1">35 questions (7 PCs × 5)</div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-sm text-[#666]">
                  Scenario: 43% · All 4 dimensions
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-right">
                  <button
                    onClick={() => navigate('/questioning-tool')}
                    className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="font-medium text-sm">C. MCQ Pool + TOS</div>
                  <div className="text-xs text-[#999] mt-0.5">
                    50 items · Factual / Scenario / Application · External item analysis
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
                    Draft
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0]">
                  <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F57C00]" style={{ width: '60%' }} />
                  </div>
                  <div className="text-xs text-[#666] mt-1">47 of 50 items drafted — awaiting pilot</div>
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-sm text-[#666]">
                  Factual 20% · Scenario 40% · Application 40%
                </td>
                <td className="px-4 py-4 border-b border-[#F0F0F0] text-right">
                  <button
                    onClick={() => navigate('/mcq')}
                    className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors"
                  >
                    Continue
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Gate Indicator */}
      <div className="flex items-center gap-2 p-4 bg-[#FFEBEE] border border-[#EF9A9A] rounded mb-6">
        <span className="text-lg">🔒</span>
        <span className="flex-1 text-sm text-[#C62828]">
          <strong>Phase 3 Gate:</strong> All 3 pools must be finalized before package assembly. MCQ Pool + TOS
          not yet finalized.
        </span>
        <button
          onClick={() => navigate('/mcq')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors ml-auto"
        >
          Go to MCQ Pool
        </button>
      </div>

      {/* PHASE 3: 5-Package Assembly (Locked) */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 opacity-60">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            5-Package Assembly
            <span className="ml-2 inline-block bg-[#F5F5F5] px-2 py-0.5 rounded-full text-xs text-[#666]">
              0 of 5 packages
            </span>
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFAFA] text-[#BDBDBD]">
            Locked
          </span>
        </div>

        {/* Package Tabs */}
        <div className="flex border-b border-[#E0E0E0] px-5">
          {['A', 'B', 'C', 'D', 'E'].map((pkg) => (
            <div
              key={pkg}
              onClick={() => setSelectedPackage(pkg)}
              className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 transition-colors ${
                selectedPackage === pkg
                  ? 'text-[#1976D2] border-[#1976D2]'
                  : 'text-[#666] border-transparent hover:text-[#333]'
              }`}
            >
              Set {pkg}
              <span className="inline-block w-2 h-2 rounded-full bg-[#E0E0E0] ml-1.5" />
            </div>
          ))}
        </div>

        <div className="p-5">
          <div className="text-sm text-[#999] mb-3">
            <strong>Step 1:</strong> Assemble & finalize 5 Assessor's Guides →{' '}
            <strong>Step 2:</strong> Generate 5 remaining docs per AG (all parallel)
          </div>

          <div className="space-y-2">
            {[
              {
                icon: '📘',
                name: `Assessor's Guide ${selectedPackage}`,
                detail: `EP + Demo ${selectedPackage} + QT Sample ${selectedPackage} + MCQ Key ${selectedPackage} + Tools ${selectedPackage} + SIA`,
              },
              {
                icon: '📄',
                name: `SIC ${selectedPackage}`,
                detail: 'Candidate-perspective instructions (from AG)',
              },
              {
                icon: '📝',
                name: `Written Test ${selectedPackage} + TOS ${selectedPackage}`,
                detail: 'MCQ subset reformatted (from AG)',
              },
              {
                icon: '📊',
                name: `Rating Sheet ${selectedPackage}`,
                detail: 'Demo rubric + QT questions (from AG)',
              },
              {
                icon: '✅',
                name: 'SAG',
                detail: 'Self-Assessment Guide — shared across all 5 packages',
              },
              {
                icon: '📋',
                name: 'CARS',
                detail: 'Competency Assessment Result Summary — shared across all 5 packages',
              },
            ].map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border border-[#F0F0F0] rounded hover:bg-[#FAFAFA] transition-colors"
              >
                <span className="text-2xl">{doc.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{doc.name}</div>
                  <div className="text-xs text-[#999]">{doc.detail}</div>
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFAFA] text-[#BDBDBD]">
                  Locked
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section (Locked) */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6 opacity-50">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">Download CATS Packages</span>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FAFAFA] text-[#BDBDBD]">
            Locked
          </span>
        </div>
        <div className="p-5 flex gap-3">
          <button
            disabled
            className="flex-1 px-6 py-4 bg-[#2E7D32] text-white rounded text-sm font-medium cursor-not-allowed"
          >
            📦 Download Individual Package (Set A–E)
          </button>
          <button
            disabled
            className="flex-1 px-6 py-4 bg-[#2E7D32] text-white rounded text-sm font-medium cursor-not-allowed"
          >
            📦 Download All 5 Packages (ZIP)
          </button>
        </div>
      </div>

      {/* Workflow Info */}
      <div className="bg-white border border-[#E0E0E0] rounded">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">CATS Development Workflow</span>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="font-semibold text-sm text-[#1565C0] mb-2">Phase 1: Foundation</div>
              <div className="text-sm text-[#666] leading-relaxed">
                Generate Evidence Plan (4-column mapping table: MCQ, Demonstration, Questioning Tool).
                Auto-generate Outline. Must finalize before Phase 2.
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm text-[#2E7D32] mb-2">Phase 2: Pool Generation</div>
              <div className="text-sm text-[#666] leading-relaxed">
                Generate 3 pools in parallel: Demo (5 variations + rubric), QT (5 Qs/PC, S/NS), MCQ (50+ items
                + TOS, external item analysis). All must be finalized before Phase 3.
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm text-[#E65100] mb-2">Phase 3: 5-Package Assembly</div>
              <div className="text-sm text-[#666] leading-relaxed">
                Step 1: Assemble & finalize 5 Assessor's Guides. Step 2: Generate 5 remaining docs per AG in
                parallel (SIC, Written Test, Rating Sheet, SAG, CARS). AG is the sole input.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
