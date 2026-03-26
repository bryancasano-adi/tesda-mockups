import { useState } from 'react';
import { useNavigate } from 'react-router';

export function DemonstrationTestEditor() {
  const navigate = useNavigate();
  const [selectedVariation, setSelectedVariation] = useState('A');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Demonstration Test
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            Demonstration Test Pool
          </h1>
          <p className="text-sm text-[#666]">5 Variations × 5 Sections Each + 100-pt Rubric</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Finalized
        </span>
      </div>

      {/* Variation Tabs */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        {['A', 'B', 'C', 'D', 'E'].map((variation) => (
          <button
            key={variation}
            onClick={() => setSelectedVariation(variation)}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              selectedVariation === variation
                ? 'bg-[#2E7D32] text-white'
                : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
            }`}
          >
            Variation {variation}
          </button>
        ))}
      </div>

      {/* Variation Details */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">
            Variation {selectedVariation} — Task Instructions & Requirements
          </span>
        </div>
        <div className="p-6 space-y-6">
          {/* Task Instructions */}
          <div>
            <h3 className="font-semibold text-sm text-[#333] mb-3">1. Task Instructions</h3>
            <div className="p-4 bg-[#FAFAFA] rounded text-sm text-[#666] leading-relaxed">
              <p className="mb-3">
                You are required to perform Shielded Metal Arc Welding (SMAW) on a plate-to-plate joint
                following the given Welding Procedure Specification (WPS). Your task includes:
              </p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Prepare the work area and ensure compliance with safety standards</li>
                <li>Select and set up the appropriate electrode and welding machine</li>
                <li>Clean and prepare the base metals</li>
                <li>Perform the root pass according to WPS requirements</li>
                <li>Complete the fill and cover passes</li>
                <li>Conduct visual inspection and clean the work area</li>
              </ol>
            </div>
          </div>

          {/* Expected Output */}
          <div>
            <h3 className="font-semibold text-sm text-[#333] mb-3">2. Expected Output / Product</h3>
            <div className="p-4 bg-[#FAFAFA] rounded text-sm text-[#666]">
              A completed welded plate-to-plate joint meeting the acceptance criteria specified in the WPS,
              free from major defects such as cracks, undercut, porosity, and incomplete penetration.
            </div>
          </div>

          {/* Supplies, Materials, and Ingredients */}
          <div>
            <h3 className="font-semibold text-sm text-[#333] mb-3">3. Supplies, Materials, and Ingredients</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-[#E0E0E0]">
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                      Item
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                      Specification
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-[#666] border-b border-[#E0E0E0]">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">Steel Plates</td>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">A36, 6mm x 150mm x 200mm</td>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">2 pieces</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">Welding Electrode</td>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">E6013, 3.2mm diameter</td>
                    <td className="px-4 py-2 text-sm border-b border-[#F0F0F0]">1 kg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Cleaning Materials</td>
                    <td className="px-4 py-2 text-sm">Wire brush, grinding disc</td>
                    <td className="px-4 py-2 text-sm">As needed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tools, Equipment, and Facilities */}
          <div>
            <h3 className="font-semibold text-sm text-[#333] mb-3">4. Tools, Equipment, and Facilities</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-[#F5F5F5] rounded">
                <div className="text-xs font-semibold text-[#999] uppercase mb-1">Tools</div>
                <ul className="text-sm text-[#666] space-y-1">
                  <li>• Chipping hammer</li>
                  <li>• Wire brush</li>
                  <li>• Measuring tape</li>
                  <li>• Square</li>
                </ul>
              </div>
              <div className="p-3 bg-[#F5F5F5] rounded">
                <div className="text-xs font-semibold text-[#999] uppercase mb-1">Equipment</div>
                <ul className="text-sm text-[#666] space-y-1">
                  <li>• SMAW machine (AC/DC)</li>
                  <li>• Electrode holder</li>
                  <li>• Ground clamp</li>
                  <li>• Angle grinder</li>
                </ul>
              </div>
              <div className="p-3 bg-[#F5F5F5] rounded">
                <div className="text-xs font-semibold text-[#999] uppercase mb-1">Facilities</div>
                <ul className="text-sm text-[#666] space-y-1">
                  <li>• Welding booth</li>
                  <li>• Welding table</li>
                  <li>• Proper ventilation</li>
                  <li>• Fire extinguisher</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Assessment Conditions */}
          <div>
            <h3 className="font-semibold text-sm text-[#333] mb-3">5. Assessment Conditions</h3>
            <div className="p-4 bg-[#FAFAFA] rounded space-y-2 text-sm text-[#666]">
              <div>
                <strong className="text-[#333]">Duration:</strong> 4 hours maximum
              </div>
              <div>
                <strong className="text-[#333]">Setting:</strong> TESDA-accredited welding workshop or assessment
                center
              </div>
              <div>
                <strong className="text-[#333]">Safety:</strong> Candidate must wear complete PPE (welding helmet,
                gloves, apron, safety shoes)
              </div>
              <div>
                <strong className="text-[#333]">Observation:</strong> Continuous observation by assessor; all
                safety violations result in immediate disqualification
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Rubric (100 points) */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">
            Performance Rubric (Used for All 5 Variations)
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                  Performance Criteria
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-20">
                  Max Points
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                  4 - Fully Meets Standard
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                  3 - Minor Errors
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                  2 - Major Errors
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                  1 - Not Demonstrated
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                  Electrode identification and selection according to WPS
                </td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-center font-semibold">15</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">15 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">11 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">8 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">0 pts</td>
              </tr>
              <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                  Root pass execution according to WPS
                  <span className="text-[#F57C00] font-bold ml-1">*</span>
                </td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-center font-semibold">25</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">25 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">19 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">13 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">0 pts</td>
              </tr>
              <tr className="hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                  Fill and cover pass quality
                </td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-center font-semibold">20</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">20 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">15 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">10 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">0 pts</td>
              </tr>
              <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4]">
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                  Visual inspection and acceptance criteria
                  <span className="text-[#F57C00] font-bold ml-1">*</span>
                </td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-center font-semibold">20</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">20 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">15 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">10 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">0 pts</td>
              </tr>
              <tr className="hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                  Safety compliance and work area management
                </td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-center font-semibold">20</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">20 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">15 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">10 pts</td>
                <td className="px-4 py-3 text-sm border border-[#E0E0E0]">0 pts</td>
              </tr>
              <tr className="bg-[#E8F5E9]">
                <td
                  colSpan={2}
                  className="px-4 py-3 text-sm font-bold text-right border border-[#E0E0E0]"
                >
                  TOTAL
                </td>
                <td
                  colSpan={4}
                  className="px-4 py-3 text-sm font-bold border border-[#E0E0E0]"
                >
                  100 points
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Competency Decision Rules */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <span className="text-[15px] font-semibold text-[#333]">Competency Decision Rules</span>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-3 p-3 bg-[#E8F5E9] rounded">
            <span className="text-xl">✅</span>
            <div className="text-sm text-[#2E7D32]">
              <strong>Competent (C):</strong> Total score ≥ 75/100 AND all critical PCs demonstrated AND no
              unsafe practice observed
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#FFEBEE] rounded">
            <span className="text-xl">❌</span>
            <div className="text-sm text-[#C62828]">
              <strong>Not Yet Competent (NYC):</strong> Score &lt; 75 OR failure to demonstrate a critical PC OR
              unsafe practice observed
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
          Download All Variations
        </button>
      </div>
    </div>
  );
}
