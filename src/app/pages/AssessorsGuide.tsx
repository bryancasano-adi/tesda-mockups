import { useNavigate } from 'react-router';

export function AssessorsGuide() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Assessor's Guide
      </div>

      <h1 className="text-xl font-semibold text-[#333] mb-1">
        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
          PHASE 3
        </span>
        Assessor's Guide (Compiled Document)
      </h1>
      <p className="text-sm text-[#666] mb-6">
        Main assessment document — Locked until all Phase 2 pools are finalized
      </p>

      <div className="bg-white border border-[#E0E0E0] rounded opacity-60 pointer-events-none">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">Document Sections</span>
        </div>
        <div className="p-6 space-y-4">
          {[
            'Page 1-3: Template Pages (TESDA logo, qualification description)',
            'Page 4: Evidence Plan (copied from Phase 1)',
            'Page 5: Specific Instructions for Assessor (SIA) - generated',
            'Page 6-7: Assessment Guide for Demonstration (from Demo Pool)',
            'Page 8-9: Suggested Questions and Acceptable Answers (from QT Pool)',
            'Page 10: Recommended List of Tools, Equipment, Materials',
            'Page 11-12: Answer Keys (Sets A, B, C from MCQ Pool)',
          ].map((section, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded">
              <span className="text-2xl">📄</span>
              <span className="text-sm text-[#666]">{section}</span>
            </div>
          ))}
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
