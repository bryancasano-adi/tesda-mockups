import { useNavigate } from 'react-router';

export function OutlineView() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Outline
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E3F2FD] text-[#1565C0] mr-2">
              PHASE 1
            </span>
            Outline
          </h1>
          <p className="text-sm text-[#666]">Internal Working Document (Auto-Generated)</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Generated
        </span>
      </div>

      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <div className="font-semibold text-sm text-[#1976D2] mb-1">Internal Working Document</div>
            <div className="text-sm text-[#1565C0] leading-relaxed">
              This outline is automatically generated from the Evidence Plan and serves as a reference for
              generating assessment tools. It is not included in the final CATS package.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">Topics, Skills, and Tasks Outline</span>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-sm text-[#1E3A5F] mb-3">
                CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint
              </h3>
              <div className="ml-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-[#333] mb-2">Element 1: Prepare materials and welding equipment</h4>
                  <ul className="ml-6 space-y-1.5 text-sm text-[#666]">
                    <li className="list-disc">Electrode selection and identification</li>
                    <li className="list-disc">Welding Procedure Specification (WPS) interpretation</li>
                    <li className="list-disc">Welding machine setup and adjustment</li>
                    <li className="list-disc">Base metal preparation and cleaning</li>
                    <li className="list-disc">Workplace safety and OSHS compliance</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-[#333] mb-2">Element 2: Perform root pass on plate to plate joint</h4>
                  <ul className="ml-6 space-y-1.5 text-sm text-[#666]">
                    <li className="list-disc">Root pass welding technique</li>
                    <li className="list-disc">Visual and mechanical inspection methods</li>
                    <li className="list-disc">Defect identification and assessment</li>
                    <li className="list-disc">Root pass repair procedures</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-[#333] mb-2">Element 3: Perform fill and cover pass</h4>
                  <ul className="ml-6 space-y-1.5 text-sm text-[#666]">
                    <li className="list-disc">Fill and cover pass welding technique</li>
                    <li className="list-disc">Weldment visual inspection procedures</li>
                    <li className="list-disc">Acceptance criteria evaluation</li>
                    <li className="list-disc">Work area cleaning and equipment storage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-[#1E3A5F] mb-3">
                CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
              </h3>
              <div className="ml-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-[#333] mb-2">Element 1: Prepare pipe materials and equipment</h4>
                  <ul className="ml-6 space-y-1.5 text-sm text-[#666]">
                    <li className="list-disc">Pipe joint preparation techniques</li>
                    <li className="list-disc">Pipe alignment and fit-up procedures</li>
                    <li className="list-disc">Tack welding for pipe joints</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-[#1E3A5F] mb-3">CORE 3: Repair Welds</h3>
              <div className="ml-4 space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-[#333] mb-2">Element 1: Identify and prepare weld defects for repair</h4>
                  <ul className="ml-6 space-y-1.5 text-sm text-[#666]">
                    <li className="list-disc">Weld defect identification and classification</li>
                    <li className="list-disc">Defect removal procedures</li>
                    <li className="list-disc">Repair area preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  );
}
