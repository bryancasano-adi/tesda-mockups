import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { WorkflowGuide } from '../components/WorkflowGuide';
import { DocumentActions } from '../components/DocumentActions';

export function Dashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'workflow' | 'package'>('workflow');
  const [showGuide, setShowGuide] = useState(false);

  // Phase statuses
  const phase1Complete = true;
  const phase2Complete = true;
  const phase3Step1Complete = true; // All 5 AGs finalized

  // 5 Package statuses
  const packageStatuses = {
    A: { completed: 6, total: 6 },
    B: { completed: 4, total: 6 },
    C: { completed: 2, total: 6 },
    D: { completed: 1, total: 6 },
    E: { completed: 0, total: 6 },
  };

  const totalCompleted = Object.values(packageStatuses).reduce((sum, pkg) => sum + pkg.completed, 0);
  const totalDocs = 30;
  const overallProgress = Math.round((totalCompleted / totalDocs) * 100);

  // Determine what's next
  const getNextStep = () => {
    if (!phase1Complete) return { text: 'Complete Evidence Plan', route: '/evidence-plan' };
    if (!phase2Complete) return { text: 'Finalize Phase 2 Pools', route: '/demonstration-test' };
    if (!phase3Step1Complete) return { text: 'Finalize Assessor\'s Guides', route: '/ag-assembly' };
    if (totalCompleted < 30) return { text: 'Complete Package Documents', route: '/package-navigator' };
    return { text: 'Download CATS Packages', route: '/export' };
  };

  const nextStep = getNextStep();

  // Only show "Next Step" banner when there's active in-progress work
  // Hide when: nothing started yet OR everything is complete
  const showNextStepBanner = totalCompleted > 0 && totalCompleted < 30;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-xs text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">Competency Assessment Tools (CATS)</h1>
        <p className="text-sm text-[#666]">Shielded Metal Arc Welding (SMAW) NC II</p>
      </div>

      {/* Overall Progress with Phase Cards Inside */}
      <div className="bg-white border border-[#E0E0E0] rounded-lg mb-6">
        <div className="p-5 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium text-sm text-[#333]">Overall Progress</div>
            <div className="text-xs text-[#666]">5 packages • 6 documents • 30 total</div>
          </div>
          <div className="mb-2">
            <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1976D2] transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-[#666]">
              {overallProgress}% — {phase1Complete ? 'Phase 1 complete, ' : ''}
              {phase2Complete ? 'Phase 2 complete' : 'Phase 2 in progress (2 of 3 pools finalized)'}
              {totalCompleted > 0 && totalCompleted < 30 && `, ${totalCompleted} of 30 docs`}
            </span>
            {totalCompleted === 30 && (
              <button
                onClick={() => navigate('/export')}
                className="text-[#1976D2] hover:underline font-medium flex items-center gap-1"
              >
                Download CATS <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Phase Cards Inside Overall Progress */}
        <div className="p-5">
          <div className="grid grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1976D2] uppercase">Phase 1</span>
                    {phase1Complete && <span className="text-sm">✅</span>}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">Foundation</div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E7D32]" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="text-xs text-[#2E7D32] mb-2">Complete — Evidence Plan finalized</div>
                <button
                  onClick={() => navigate('/evidence-plan')}
                  className="text-xs text-[#1976D2] hover:underline"
                >
                  View documents →
                </button>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2E7D32] uppercase">Phase 2</span>
                    {phase2Complete && <span className="text-sm">✅</span>}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">Pool Generation</div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E7D32]" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="text-xs text-[#2E7D32] mb-2">Complete — 3 pools finalized</div>
                <button
                  onClick={() => navigate('/demonstration-test')}
                  className="text-xs text-[#1976D2] hover:underline"
                >
                  View pools →
                </button>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded">
              <div className="px-4 py-3 border-b border-[#E0E0E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F57C00] uppercase">Phase 3</span>
                    {totalCompleted === 30 ? (
                      <span className="text-sm">✅</span>
                    ) : totalCompleted > 0 ? (
                      <span className="text-sm">⚠️</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm text-[#333] mb-2">5-Package Assembly</div>
                <div className="mb-3">
                  <div className="h-1 bg-[#E0E0E0] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${totalCompleted === 30 ? 'bg-[#2E7D32]' : 'bg-[#F57C00]'}`}
                      style={{ width: `${(totalCompleted / 30) * 100}%` }}
                    />
                  </div>
                </div>
                <div className={`text-xs mb-2 ${totalCompleted === 30 ? 'text-[#2E7D32]' : 'text-[#F57C00]'}`}>
                  {totalCompleted === 30
                    ? 'Complete — All 30 documents finalized'
                    : `In progress — ${totalCompleted} of 30 docs`}
                </div>
                <button
                  onClick={() => navigate('/package-navigator')}
                  className="text-xs text-[#1976D2] hover:underline"
                >
                  {totalCompleted > 0 ? 'Continue packages' : 'View settings'} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setViewMode('workflow')}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            viewMode === 'workflow'
              ? 'bg-[#1976D2] text-white'
              : 'bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]'
          }`}
        >
          Workflow View
        </button>
        <button
          onClick={() => setViewMode('package')}
          className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
            viewMode === 'package'
              ? 'bg-[#1976D2] text-white'
              : 'bg-white text-[#666] border border-[#E0E0E0] hover:bg-[#F5F5F5]'
          }`}
        >
          Package View
        </button>
      </div>

      {viewMode === 'workflow' ? (
        <div className="space-y-4">
          {/* Phase 1 Documents */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg">
            <div className="px-5 py-3 bg-[#E3F2FD] border-b border-[#90CAF9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#1976D2] text-white text-xs font-bold rounded">PHASE 1</span>
                <span className="font-bold text-[#333]">Foundation Documents</span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full font-semibold">✅ Complete</span>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Document</th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Description</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase">Status</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        <span className="font-semibold text-sm">Evidence Plan</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">4-column table: MCQ, Demo, QT coverage</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Finalized</span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Evidence Plan"
                        status="finalized"
                        onView={() => navigate('/evidence-plan')}
                        onDownload={() => alert('Download Evidence Plan')}
                        onRefresh={() => alert('Refresh Evidence Plan')}
                        showLogs={true}
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📄</span>
                        <span className="font-semibold text-sm">Outline</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">Auto-generated from Evidence Plan</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Generated</span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Outline"
                        status="finalized"
                        onView={() => navigate('/outline')}
                        onDownload={() => alert('Download Outline')}
                        onRefresh={() => alert('Regenerate Outline')}
                        showGenerate={true}
                        showLogs={true}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phase 2 Pools */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg">
            <div className="px-5 py-3 bg-[#E8F5E9] border-b border-[#A5D6A7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#2E7D32] text-white text-xs font-bold rounded">PHASE 2</span>
                <span className="font-bold text-[#333]">Pool Generation</span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full font-semibold">✅ Complete</span>
            </div>
            <div className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Pool</th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Contents</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase">Status</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🔨</span>
                        <span className="font-semibold text-sm">Demonstration Test</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">5 variations (A-E) + shared 100-pt rubric</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Finalized</span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Demonstration Test"
                        status="finalized"
                        onView={() => navigate('/demonstration-test')}
                        onDownload={() => alert('Download Demonstration Test')}
                        onEdit={() => navigate('/demonstration-test')}
                        onRefresh={() => alert('Refresh Demonstration Test')}
                        showLogs={true}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💬</span>
                        <span className="font-semibold text-sm">Questioning Tool</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">25 questions (5 per PC × 4 Dimensions)</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Finalized</span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Questioning Tool"
                        status="finalized"
                        onView={() => navigate('/questioning-tool')}
                        onDownload={() => alert('Download Questioning Tool')}
                        onEdit={() => navigate('/questioning-tool')}
                        onRefresh={() => alert('Refresh Questioning Tool')}
                        showLogs={true}
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📝</span>
                        <span className="font-semibold text-sm">Written Test (MCQ)</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">50 items + TOS</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Finalized</span>
                    </td>
                    <td className="text-center py-3">
                      <DocumentActions
                        documentName="Written Test (MCQ)"
                        status="finalized"
                        onView={() => navigate('/mcq')}
                        onDownload={() => alert('Download Written Test')}
                        onEdit={() => navigate('/mcq')}
                        onRefresh={() => alert('Refresh Written Test')}
                        showLogs={true}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phase 3 - Package Assembly */}
          <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
            <div className="px-5 py-3 bg-[#FFF3E0] border-b border-[#FFB74D] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-[#F57C00] text-white text-xs font-bold rounded">PHASE 3</span>
                <span className="font-bold text-[#333]">5-Package Assembly</span>
              </div>
              <span className="text-xs px-2 py-1 bg-[#FFF3E0] text-[#F57C00] rounded-full font-semibold">⚠️ {totalCompleted}/30 docs</span>
            </div>
            <div className="p-5">
              <div className="mb-4 p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded-lg">
                <div className="text-sm font-semibold text-[#1565C0] mb-2">📦 Phase 3 produces 5 complete CATS packages</div>
                <div className="text-xs text-[#1565C0]">
                  Each package (A, B, C, D, E) contains 6 documents: Assessor's Guide, SIC, Written Test, Rating Sheet, SAG, and CARS
                </div>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E0E0E0]">
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Step</th>
                    <th className="text-left py-2 text-xs font-semibold text-[#666] uppercase">Description</th>
                    <th className="text-center py-2 text-xs font-semibold text-[#666] uppercase">Status</th>
                    <th className="text-right py-2 text-xs font-semibold text-[#666] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⚙️</span>
                        <span className="font-semibold text-sm">Distribution Settings</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">Configure how pools are distributed to 5 packages</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ Configured</span>
                    </td>
                    <td className="text-right py-3">
                      <button
                        onClick={() => navigate('/distribution-settings')}
                        className="px-3 py-1.5 text-xs font-medium text-[#1976D2] hover:bg-[#E3F2FD] rounded transition-colors"
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📘</span>
                        <span className="font-semibold text-sm">Step 1: Assessor's Guides</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">Create 5 Assessor's Guides (Sets A-E)</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-xs font-semibold">✅ 5 of 5 done</span>
                    </td>
                    <td className="text-right py-3">
                      <button
                        onClick={() => navigate('/ag-assembly')}
                        className="px-3 py-1.5 text-xs font-medium text-[#1976D2] hover:bg-[#E3F2FD] rounded transition-colors"
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📦</span>
                        <span className="font-semibold text-sm">Step 2: Package Navigator</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-[#666]">Complete remaining docs for all 5 packages</td>
                    <td className="text-center py-3">
                      <span className="px-2 py-1 bg-[#FFF3E0] text-[#F57C00] rounded-full text-xs font-semibold">⚠️ {totalCompleted}/30 docs</span>
                    </td>
                    <td className="text-right py-3">
                      <button
                        onClick={() => navigate('/package-navigator')}
                        className="px-3 py-1.5 text-xs font-medium bg-[#F57C00] text-white hover:bg-[#E65100] rounded transition-colors"
                      >
                        Continue →
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* PACKAGE VIEW */
        <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#E0E0E0]">
            <div className="text-sm text-[#666] mb-4">
              View all 30 documents organized by package. Each package (A-E) contains 6 documents.
            </div>
            
            {/* Package Progress Cards */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {Object.entries(packageStatuses).map(([pkg, status]) => (
                <button
                  key={pkg}
                  onClick={() => navigate('/package-navigator')}
                  className={`p-4 rounded-lg border-2 hover:shadow-md transition-all ${
                    status.completed === 6
                      ? 'border-[#2E7D32] bg-[#F1F8F4]'
                      : 'border-[#E0E0E0] bg-white hover:border-[#1976D2]'
                  }`}
                >
                  <div className="text-center mb-2">
                    <div className="text-2xl mb-1">{status.completed === 6 ? '✅' : '📦'}</div>
                    <div className="font-bold text-sm">Package {pkg}</div>
                  </div>
                  <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full ${status.completed === 6 ? 'bg-[#2E7D32]' : 'bg-[#F57C00]'}`}
                      style={{ width: `${(status.completed / 6) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-center text-[#666]">{status.completed}/6</div>
                </button>
              ))}
            </div>
          </div>

          {/* Document Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAFA] border-b-2 border-[#E0E0E0]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#666] uppercase">Document</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-[#666] uppercase">Type</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">A</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">B</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">C</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">D</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] uppercase">E</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📘</span>
                      <span className="text-sm font-medium">Assessor's Guide</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">Unique per pkg</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">⚠️</td>
                  <td className="text-center px-4 py-3 text-xl">◯</td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <span className="text-sm font-medium">SIC</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">Unique per pkg</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">⚠️</td>
                  <td className="text-center px-4 py-3 text-xl">◯</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📝</span>
                      <span className="text-sm font-medium">Written Test + TOS</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">Unique per pkg</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">⚠️</td>
                  <td className="text-center px-4 py-3 text-xl">◯</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📊</span>
                      <span className="text-sm font-medium">Rating Sheet</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#FFF3E0] text-[#F57C00] rounded text-xs">Unique per pkg</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl">✅</td>
                  <td className="text-center px-4 py-3 text-xl">⚠️</td>
                  <td className="text-center px-4 py-3 text-xl">◯</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                  <td className="text-center px-4 py-3 text-xl">🔒</td>
                </tr>
                <tr className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✅</span>
                      <span className="text-sm font-medium">SAG</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">Shared (all 5)</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl" colSpan={5}>✅</td>
                </tr>
                <tr className="hover:bg-[#FAFAFA]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📋</span>
                      <span className="text-sm font-medium">CARS</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 bg-[#E3F2FD] text-[#1976D2] rounded text-xs">Shared (all 5)</span>
                  </td>
                  <td className="text-center px-4 py-3 text-xl" colSpan={5}>✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 bg-[#FAFAFA] border-t border-[#E0E0E0]">
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <span>✅</span>
                  <span className="text-[#666]">Finalized</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⚠️</span>
                  <span className="text-[#666]">Draft</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>◯</span>
                  <span className="text-[#666]">Not Started</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🔒</span>
                  <span className="text-[#666]">Locked (finalize AG first)</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/package-navigator')}
                className="px-4 py-2 bg-[#1976D2] text-white rounded text-xs font-semibold hover:bg-[#1565C0] transition-colors"
              >
                Open Package Navigator →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Guide */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowGuide(true)}
          className="bg-[#1976D2] text-white rounded-full p-3 shadow-lg hover:bg-[#1565C0] transition-colors"
        >
          <HelpCircle size={20} />
        </button>
      </div>

      {showGuide && <WorkflowGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
}