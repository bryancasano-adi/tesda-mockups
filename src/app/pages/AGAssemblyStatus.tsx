import { useState } from 'react';
import { useNavigate } from 'react-router';

export function AGAssemblyStatus() {
  const navigate = useNavigate();

  // Simulated AG status for each set
  const [agStatus, setAgStatus] = useState({
    A: 'finalized',
    B: 'finalized',
    C: 'finalized',
    D: 'draft',
    E: 'not-started',
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'finalized':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]"> Finalized</span>;
      case 'draft':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">Draft</span>;
      case 'not-started':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#F5F5F5] text-[#999]">Not Started</span>;
      default:
        return null;
    }
  };

  const finalizedCount = Object.values(agStatus).filter((s) => s === 'finalized').length;
  const allFinalized = finalizedCount === 5;

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › AG Assembly
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3 - STEP 1
          </span>
          Assessor's Guide Assembly
        </h1>
        <p className="text-sm text-[#666]">
          Assemble 5 Assessor's Guides (Sets A-E) from Phase 2 pools before generating remaining documents
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white border border-[#E0E0E0] rounded p-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-[#333]">Assembly Progress</span>
          <span className="text-xs text-[#666]">{finalizedCount} of 5 Assessor's Guides finalized</span>
        </div>
        <div className="mb-2">
          <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2E7D32] transition-all duration-300"
              style={{ width: `${(finalizedCount / 5) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-xs text-[#666]">
          {allFinalized
            ? ' All AGs finalized - Ready to generate remaining 5 documents per package'
            : `${5 - finalizedCount} AG(s) remaining - Complete all to unlock Step 2`}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>Phase 3 Two-Step Model:</strong>
            <div className="mt-1 text-xs">
              <strong>Step 1 (Current):</strong> Assemble and finalize 5 Assessor's Guides from Phase 2 pools
              <br />
              <strong>Step 2 (Locked):</strong> Generate 5 remaining documents (SIC, Written Test, Rating Sheet, SAG,
              CARS) per finalized AG
            </div>
          </div>
        </div>
      </div>

      {/* AG Cards Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {(['A', 'B', 'C', 'D', 'E'] as const).map((set) => (
          <div
            key={set}
            className={`bg-white border-2 rounded-lg transition-all ${
              agStatus[set] === 'finalized'
                ? 'border-[#2E7D32] bg-[#F1F8F4]'
                : agStatus[set] === 'draft'
                ? 'border-[#F57C00]'
                : 'border-[#E0E0E0]'
            }`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[#333]">Assessor's Guide - Set {set}</h3>
                    {getStatusBadge(agStatus[set])}
                  </div>
                  <div className="text-xs text-[#666]">Package {set} • Main compiled document</div>
                </div>
                <div className="text-4xl">📘</div>
              </div>

              {/* Content Sources */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-[#666] uppercase mb-2">Content Sources:</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 4</div>
                    <div className="text-sm font-medium text-[#333]">Evidence Plan</div>
                    <div className="text-xs text-[#666]">From Phase 1</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 5</div>
                    <div className="text-sm font-medium text-[#333]">Specific Instructions</div>
                    <div className="text-xs text-[#666]">Generated + editable</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 6-7</div>
                    <div className="text-sm font-medium text-[#333]">Demo Set {set}</div>
                    <div className="text-xs text-[#666]">From Phase 2</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 8-9</div>
                    <div className="text-sm font-medium text-[#333]">QT Questions</div>
                    <div className="text-xs text-[#666]">Subset from pool</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 10</div>
                    <div className="text-sm font-medium text-[#333]">Tools & Equipment</div>
                    <div className="text-xs text-[#666]">From Demo Set {set}</div>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#E0E0E0]">
                    <div className="text-xs text-[#999] mb-1">Page 11-12</div>
                    <div className="text-sm font-medium text-[#333]">MCQ Answer Keys</div>
                    <div className="text-xs text-[#666]">Subset from pool</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                {agStatus[set] === 'not-started' && (
                  <button
                    onClick={() => {
                      setAgStatus({ ...agStatus, [set]: 'draft' });
                    }}
                    className="px-4 py-2 bg-[#1976D2] text-white rounded text-sm font-medium hover:bg-[#1565C0] transition-colors"
                  >
                    Generate AG {set}
                  </button>
                )}
                {agStatus[set] === 'draft' && (
                  <>
                    <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setAgStatus({ ...agStatus, [set]: 'finalized' });
                      }}
                      className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
                    >
                      Finalize AG {set}
                    </button>
                  </>
                )}
                {agStatus[set] === 'finalized' && (
                  <>
                    <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                      View AG {set}
                    </button>
                    <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gate to Step 2 */}
      {allFinalized ? (
        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded p-5 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl"></span>
            <div className="flex-1">
              <div className="font-semibold text-sm text-[#2E7D32] mb-2">All 5 Assessor's Guides Finalized!</div>
              <div className="text-sm text-[#1B5E20] mb-4">
                You can now proceed to Step 2: Generate the remaining 5 documents for each package (SIC, Written
                Test, Rating Sheet, SAG, CARS).
              </div>
              <button
                onClick={() => navigate('/package-navigator')}
                className="px-6 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
              >
                Proceed to Step 2: Package Navigator →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFF3E0] border-l-4 border-[#F57C00] p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔒</span>
            <div className="flex-1">
              <div className="font-semibold text-sm text-[#E65100] mb-2">Step 2 Locked</div>
              <div className="text-sm text-[#F57C00] mb-3">
                Complete and finalize all 5 Assessor's Guides to unlock Step 2 (remaining documents generation).
              </div>
              <div className="text-xs text-[#E65100] space-y-1">
                {(['A', 'B', 'C', 'D', 'E'] as const).map((set) => (
                  <div key={set}>
                    {agStatus[set] === 'finalized' ? '' : '❌'} Assessor's Guide Set {set}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/distribution-settings')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Distribution Settings
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
