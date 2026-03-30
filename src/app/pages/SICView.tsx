import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SICView() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<'draft' | 'finalized'>('draft');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › SIC
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
              PHASE 3
            </span>
            Specific Instructions for Candidate (SIC)
          </h1>
          <p className="text-sm text-[#666]">Derived from Assessor's Guide - Candidate-Friendly Version</p>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'finalized' ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#F57C00]'
          }`}
        >
          {status === 'finalized' ? '✅ Finalized' : '⚠️ Draft'}
        </span>
      </div>

      {/* Edit Mode Toggle & Actions */}
      <div className="bg-white border border-[#E0E0E0] rounded p-4 mb-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-[#666]">Edit Mode:</span>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1976D2]"></div>
            </div>
            <span className={`text-sm font-medium ${editMode ? 'text-[#1976D2]' : 'text-[#999]'}`}>
              {editMode ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Document Content */}
      <div className="bg-white border border-[#E0E0E0] rounded p-8">
        {/* Cover Section */}
        <div className="text-center mb-8 pb-6 border-b border-[#E0E0E0]">
          <div className="text-sm text-[#999] uppercase tracking-wide mb-3">Page 1</div>
          <div className="font-bold text-lg text-[#1E3A5F] mb-4">
            TECHNICAL EDUCATION AND SKILLS DEVELOPMENT AUTHORITY
          </div>
          <div className="text-xl font-bold text-[#1976D2] my-4">
            SHIELDED METAL ARC WELDING (SMAW) NC II
          </div>
          <div className="text-lg font-semibold text-[#333]">
            SPECIFIC INSTRUCTIONS FOR CANDIDATE
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">QUALIFICATION TITLE</h2>
            {editMode ? (
              <input
                type="text"
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                defaultValue="Shielded Metal Arc Welding (SMAW) NC II"
              />
            ) : (
              <p className="text-sm text-[#666]">Shielded Metal Arc Welding (SMAW) NC II</p>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">UNITS OF COMPETENCY</h2>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[80px]"
                defaultValue={`1. Perform Shielded Metal Arc Welding — Plate to Plate Joint
2. Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
3. Repair Welds`}
              />
            ) : (
              <ul className="text-sm text-[#666] space-y-1 ml-5 list-decimal">
                <li>Perform Shielded Metal Arc Welding — Plate to Plate Joint</li>
                <li>Perform Shielded Metal Arc Welding — Pipe to Pipe Joint</li>
                <li>Repair Welds</li>
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">ASSESSMENT DURATION</h2>
            {editMode ? (
              <input
                type="text"
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm"
                defaultValue="Approximately 4 hours"
              />
            ) : (
              <p className="text-sm text-[#666]">Approximately 4 hours</p>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">WHAT TO EXPECT</h2>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[150px]"
                defaultValue={`The assessment consists of three parts:

1. DEMONSTRATION TEST (2.5 hours)
   You will be asked to perform welding tasks according to the Welding Procedure Specification (WPS). You will be provided with all necessary materials, tools, and equipment.

2. ORAL QUESTIONING (30 minutes)
   The assessor will ask you questions related to the welding procedures, safety practices, and quality standards.

3. WRITTEN TEST (1 hour)
   You will answer 30 multiple-choice questions covering the knowledge requirements of the qualification.`}
              />
            ) : (
              <div className="text-sm text-[#666] whitespace-pre-line">
                {`The assessment consists of three parts:

1. DEMONSTRATION TEST (2.5 hours)
   You will be asked to perform welding tasks according to the Welding Procedure Specification (WPS). You will be provided with all necessary materials, tools, and equipment.

2. ORAL QUESTIONING (30 minutes)
   The assessor will ask you questions related to the welding procedures, safety practices, and quality standards.

3. WRITTEN TEST (1 hour)
   You will answer 30 multiple-choice questions covering the knowledge requirements of the qualification.`}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">WHAT TO BRING</h2>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[100px]"
                defaultValue={`• Valid ID
• Personal Protective Equipment (PPE):
  - Welding helmet with appropriate shade lens
  - Welding gloves
  - Safety shoes
  - Long-sleeved welding jacket
  - Safety glasses
• Pen or pencil for the written test`}
              />
            ) : (
              <div className="text-sm text-[#666]">
                <ul className="space-y-1 ml-5 list-disc">
                  <li>Valid ID</li>
                  <li>
                    Personal Protective Equipment (PPE):
                    <ul className="ml-5 mt-1 space-y-1 list-circle">
                      <li>Welding helmet with appropriate shade lens</li>
                      <li>Welding gloves</li>
                      <li>Safety shoes</li>
                      <li>Long-sleeved welding jacket</li>
                      <li>Safety glasses</li>
                    </ul>
                  </li>
                  <li>Pen or pencil for the written test</li>
                </ul>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#333] mb-3">IMPORTANT REMINDERS</h2>
            {editMode ? (
              <textarea
                className="w-full px-3 py-2 border border-[#E0E0E0] rounded text-sm min-h-[120px]"
                defaultValue={`• Arrive at least 15 minutes before the scheduled assessment time.
• Follow all safety procedures and assessor instructions.
• Ask the assessor if you need clarification on any task.
• You will be assessed based on your demonstration of skills, not on speed.
• Your performance will be evaluated against industry standards.
• Results will be available within 2 weeks after the assessment.`}
              />
            ) : (
              <ul className="text-sm text-[#666] space-y-1 ml-5 list-disc">
                <li>Arrive at least 15 minutes before the scheduled assessment time.</li>
                <li>Follow all safety procedures and assessor instructions.</li>
                <li>Ask the assessor if you need clarification on any task.</li>
                <li>You will be assessed based on your demonstration of skills, not on speed.</li>
                <li>Your performance will be evaluated against industry standards.</li>
                <li>Results will be available within 2 weeks after the assessment.</li>
              </ul>
            )}
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
