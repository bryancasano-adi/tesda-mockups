import { useState } from 'react';
import { useNavigate } from 'react-router';

export function PackageNavigator() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Document status per package
  const packageStatus = {
    A: {
      ag: 'finalized',
      sic: 'finalized',
      written: 'finalized',
      rating: 'finalized',
      sag: 'finalized',
      cars: 'finalized',
    },
    B: {
      ag: 'finalized',
      sic: 'draft',
      written: 'draft',
      rating: 'draft',
      sag: 'finalized',
      cars: 'finalized',
    },
    C: {
      ag: 'finalized',
      sic: 'not-started',
      written: 'not-started',
      rating: 'not-started',
      sag: 'finalized',
      cars: 'finalized',
    },
    D: {
      ag: 'draft',
      sic: 'locked',
      written: 'locked',
      rating: 'locked',
      sag: 'finalized',
      cars: 'finalized',
    },
    E: {
      ag: 'not-started',
      sic: 'locked',
      written: 'locked',
      rating: 'locked',
      sag: 'finalized',
      cars: 'finalized',
    },
  };

  const documents = [
    {
      icon: '📘',
      name: "Assessor's Guide",
      key: 'ag',
      route: '/assessors-guide',
      type: 'per-package',
      description: 'Main compiled document from Phase 2 pools',
    },
    {
      icon: '📄',
      name: 'Specific Instructions for Candidate (SIC)',
      key: 'sic',
      route: '/sic',
      type: 'per-package',
      description: 'Derived from AG - Candidate-friendly version',
    },
    {
      icon: '📝',
      name: 'Written Test with TOS',
      key: 'written',
      route: '/mcq',
      type: 'per-package',
      description: 'MCQ subset from pool + per-set TOS',
    },
    {
      icon: '📊',
      name: 'Rating Sheet (Rubrics)',
      key: 'rating',
      route: '/rating-sheet',
      type: 'per-package',
      description: 'Demo S/NS + Oral Q&A (no written test section)',
    },
    {
      icon: '✅',
      name: 'Self-Assessment Guide (SAG)',
      key: 'sag',
      route: '/sag',
      type: 'shared',
      description: 'Shared across all 5 packages',
    },
    {
      icon: '📋',
      name: 'CARS (Results Summary)',
      key: 'cars',
      route: '/cars',
      type: 'shared',
      description: 'Shared across all 5 packages',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'finalized':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">Finalized</span>;
      case 'draft':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">Draft</span>;
      case 'not-started':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#F5F5F5] text-[#999]">Not Started</span>;
      case 'locked':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#F5F5F5] text-[#999]">Locked</span>;
      default:
        return null;
    }
  };

  const currentStatus = packageStatus[selectedPackage];
  const agFinalized = currentStatus.ag === 'finalized';
  const packageFinalized = Object.values(currentStatus).every((s) => s === 'finalized');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Package Navigator
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3 - STEP 2
          </span>
          Package Navigator
        </h1>
        <p className="text-sm text-[#666]">
          View, edit, and download all 6 documents across 5 CATS packages (30 total deliverables)
        </p>
      </div>

      {/* Package Tabs */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((pkg) => {
            const pkgStatus = packageStatus[pkg];
            const isComplete = Object.values(pkgStatus).every((s) => s === 'finalized');
            const agDone = pkgStatus.ag === 'finalized';

            return (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedPackage === pkg
                    ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                    : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="font-bold">Package {pkg}</div>
                  <div className="text-xs">
                    {isComplete ? (
                      <span className="text-[#2E7D32]">✅ Complete</span>
                    ) : agDone ? (
                      <span className="text-[#F57C00]">⚠️ In Progress</span>
                    ) : (
                      <span className="text-[#999]">🔒 Locked</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Package Content */}
        <div className="p-6">
          {/* Package Header */}
          <div className="mb-6 pb-4 border-b border-[#E0E0E0]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-[#333] mb-2">Package {selectedPackage}</h2>
                <div className="text-sm text-[#666] mb-3">
                  {agFinalized
                    ? `Assessor's Guide finalized - ${
                        packageFinalized ? 'All documents ready' : 'Remaining documents in progress'
                      }`
                    : 'Locked - Finalize Assessor\'s Guide first'}
                </div>
              </div>
              <div>
                {packageFinalized && (
                  <button className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors">
                    📦 Download Package {selectedPackage} ZIP
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-3">
            {documents.map((doc) => {
              const status = currentStatus[doc.key as keyof typeof currentStatus];
              const isLocked = status === 'locked';
              const isShared = doc.type === 'shared';

              return (
                <div
                  key={doc.key}
                  className={`flex items-start justify-between p-4 rounded border-2 transition-all ${
                    status === 'finalized'
                      ? 'border-[#2E7D32] bg-[#F1F8F4]'
                      : status === 'draft'
                      ? 'border-[#F57C00] bg-[#FFF8F0]'
                      : isLocked
                      ? 'border-[#E0E0E0] bg-[#FAFAFA] opacity-60'
                      : 'border-[#E0E0E0] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-3xl">{doc.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-[#333]">{doc.name}</h3>
                        {getStatusBadge(status)}
                        {isShared && (
                          <span className="px-2 py-0.5 rounded text-xs bg-[#E3F2FD] text-[#1976D2] border border-[#90CAF9]">
                            Shared
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#666] mb-2">{doc.description}</div>
                      {isLocked && (
                        <div className="text-xs text-[#F57C00] bg-[#FFF3E0] inline-block px-2 py-1 rounded">
                          🔒 Unlock by finalizing Assessor's Guide first
                        </div>
                      )}
                      {doc.key === 'ag' && status === 'draft' && (
                        <div className="text-xs text-[#1976D2] bg-[#E3F2FD] inline-block px-2 py-1 rounded">
                          ⚠️ Finalize AG to unlock remaining 5 documents
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!isLocked && status !== 'not-started' && (
                      <button
                        onClick={() => navigate(doc.route)}
                        className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors"
                      >
                        View
                      </button>
                    )}
                    {!isLocked && status === 'draft' && (
                      <button
                        onClick={() => navigate(doc.route)}
                        className="px-3 py-1.5 bg-white text-[#1976D2] border border-[#1976D2] rounded text-xs font-medium hover:bg-[#E3F2FD] transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {!isLocked && status === 'finalized' && (
                      <button className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors">
                        Download
                      </button>
                    )}
                    {status === 'not-started' && agFinalized && (
                      <button className="px-3 py-1.5 bg-[#1976D2] text-white rounded text-xs font-medium hover:bg-[#1565C0] transition-colors">
                        Generate
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Package Notes */}
          <div className="mt-6 p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded">
            <div className="text-sm text-[#1565C0] mb-2">
              <strong>Package {selectedPackage} Notes:</strong>
            </div>
            <ul className="text-xs text-[#1565C0] space-y-1 ml-5 list-disc">
              <li>
                <strong>Per-Package Documents:</strong> AG, SIC, Written Test, Rating Sheet contain unique
                content for Set {selectedPackage}
              </li>
              <li>
                <strong>Shared Documents:</strong> SAG and CARS are identical across all 5 packages (edit once,
                applies to all)
              </li>
              <li>
                AG must be finalized before the other 5 documents can be generated
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="bg-white border border-[#E0E0E0] rounded p-5 mb-6">
        <div className="font-semibold text-sm text-[#333] mb-4">Overall Progress Across All Packages</div>
        <div className="grid grid-cols-5 gap-4">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((pkg) => {
            const status = packageStatus[pkg];
            const totalDocs = 6;
            const finalizedDocs = Object.values(status).filter((s) => s === 'finalized').length;
            const progress = (finalizedDocs / totalDocs) * 100;

            return (
              <div key={pkg} className="p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <div className="text-sm font-bold text-[#333] mb-2">Package {pkg}</div>
                <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#2E7D32] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-[#666]">
                  {finalizedDocs}/{totalDocs} docs
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/ag-assembly')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to AG Assembly
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
