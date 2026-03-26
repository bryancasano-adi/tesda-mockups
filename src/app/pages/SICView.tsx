import { useNavigate } from 'react-router';

export function SICView() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › SIC
      </div>

      <h1 className="text-xl font-semibold text-[#333] mb-1">
        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
          PHASE 3
        </span>
        Specific Instructions for Candidate (SIC)
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Candidate-facing version of assessor instructions — Locked until Phase 3
      </p>

      <div className="bg-white border border-[#E0E0E0] rounded opacity-60 pointer-events-none p-6">
        <p className="text-sm text-[#666] text-center">
          This document will be generated from the Assessor's Guide
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5]"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
