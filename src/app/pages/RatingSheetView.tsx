import { useNavigate } from 'react-router';

export function RatingSheetView() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Rating Sheet
      </div>

      <h1 className="text-xl font-semibold text-[#333] mb-1">
        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
          PHASE 3
        </span>
        Rating Sheet
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Compiled scoring document — Locked until Phase 3
      </p>

      <div className="bg-white border border-[#E0E0E0] rounded opacity-60 pointer-events-none">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">Rating Sheet Sections</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-[#F5F5F5] rounded">
            <div className="font-semibold text-sm text-[#333] mb-2">Part I: Skills Demonstration (50% weight)</div>
            <p className="text-sm text-[#666]">100-point rubric from Demonstration Test</p>
          </div>
          <div className="p-4 bg-[#F5F5F5] rounded">
            <div className="font-semibold text-sm text-[#333] mb-2">Part II: Oral Questioning (30% weight)</div>
            <p className="text-sm text-[#666]">S/NS scoring from Questioning Tool</p>
          </div>
          <div className="p-4 bg-[#F5F5F5] rounded">
            <div className="font-semibold text-sm text-[#333] mb-2">Part III: Written Test (20% weight)</div>
            <p className="text-sm text-[#666]">MCQ answer sheet</p>
          </div>
          <div className="p-4 bg-[#F5F5F5] rounded">
            <div className="font-semibold text-sm text-[#333] mb-2">Part IV: Final Summary</div>
            <p className="text-sm text-[#666]">≥ 80% = Competent (C), &lt; 80% = Not Yet Competent (NYC)</p>
          </div>
        </div>
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
