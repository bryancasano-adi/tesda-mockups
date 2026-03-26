import { useNavigate } from 'react-router';

export function CARSView() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › CARS
      </div>

      <h1 className="text-xl font-semibold text-[#333] mb-1">
        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
          PHASE 3
        </span>
        Competency Assessment Results Summary (CARS)
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Results summary template — Locked until Phase 3
      </p>

      <div className="bg-white border border-[#E0E0E0] rounded opacity-60 pointer-events-none p-6">
        <p className="text-sm text-[#666] mb-4 text-center">
          Template form pre-filled with qualification title and units
        </p>
        <div className="bg-[#F5F5F5] rounded p-4 space-y-4">
          <div>
            <div className="text-xs font-semibold text-[#999] uppercase mb-1">Qualification</div>
            <div className="text-sm font-medium text-[#333]">Shielded Metal Arc Welding (SMAW) NC II</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#999] uppercase mb-1">Units of Competency</div>
            <ul className="text-sm text-[#666] space-y-1">
              <li>• CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint</li>
              <li>• CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint</li>
              <li>• CORE 3: Repair Welds</li>
            </ul>
          </div>
          <div className="border-t border-[#E0E0E0] pt-4">
            <div className="text-xs font-semibold text-[#999] uppercase mb-2">Assessment Results Fields (Blank)</div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-sm text-[#666]">Candidate Name:</span>
                <div className="flex-1 border-b border-dashed border-[#BDBDBD]"></div>
              </div>
              <div className="flex gap-2">
                <span className="text-sm text-[#666]">Assessment Date:</span>
                <div className="flex-1 border-b border-dashed border-[#BDBDBD]"></div>
              </div>
              <div className="flex gap-2">
                <span className="text-sm text-[#666]">Result:</span>
                <div className="flex-1 border-b border-dashed border-[#BDBDBD]"></div>
              </div>
            </div>
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
