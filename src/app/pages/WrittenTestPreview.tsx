import { useState } from 'react';
import { useNavigate } from 'react-router';

export function WrittenTestPreview() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Sample MCQ items for preview
  const sampleItems = [
    {
      num: 1,
      question: 'What is the primary purpose of flux in SMAW?',
      options: [
        'To cool the weld',
        'To protect the molten weld pool from atmospheric contamination',
        'To increase welding speed',
        'To reduce electrode cost',
      ],
    },
    {
      num: 2,
      question: 'Which of the following is the correct electrode angle for flat position welding?',
      options: ['45-60 degrees', '70-80 degrees', '90 degrees', '15-30 degrees'],
    },
    {
      num: 3,
      question:
        'A welder notices excessive spatter during welding. What is the most likely cause of this problem?',
      options: [
        'Arc length too short',
        'Current setting too high',
        'Electrode too large',
        'Base metal too thick',
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Written Test Preview
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#FFF3E0] text-[#E65100] mr-2">
            PHASE 3
          </span>
          Written Test Preview
        </h1>
        <p className="text-sm text-[#666]">MCQ subset per package • Candidate view (no answers shown)</p>
      </div>

      {/* Package Selector */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((pkg) => (
            <button
              key={pkg}
              onClick={() => setSelectedPackage(pkg)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedPackage === pkg
                  ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                  : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
              }`}
            >
              Package {pkg}
            </button>
          ))}
        </div>
      </div>

      {/* Test Header - Candidate View */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-6 py-5 border-b border-[#E0E0E0] bg-[#FAFAFA]">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#333] mb-2">
              COMPETENCY ASSESSMENT
              <br />
              WRITTEN TEST
            </h2>
            <div className="text-sm text-[#666] mb-4">
              Qualification: <strong>Shielded Metal Arc Welding (SMAW) NC II</strong>
            </div>
            <div className="inline-block px-4 py-2 bg-[#E3F2FD] border border-[#90CAF9] rounded">
              <div className="text-xs text-[#1565C0] font-semibold">PACKAGE {selectedPackage}</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-[#FFFDE7] border border-[#FFE082] rounded p-4 mb-6">
            <div className="text-sm text-[#F57C00]">
              <strong>INSTRUCTIONS TO CANDIDATE:</strong>
              <ul className="mt-2 ml-5 space-y-1 text-xs">
                <li>This test contains 20 multiple choice questions</li>
                <li>Read each question carefully</li>
                <li>Select the BEST answer from the four (4) options provided</li>
                <li>Write your answer on the answer sheet provided</li>
                <li>You have 30 minutes to complete this test</li>
                <li>Do not write on this test booklet</li>
              </ul>
            </div>
          </div>

          {/* Sample Items Preview */}
          <div className="space-y-6">
            {sampleItems.map((item) => (
              <div key={item.num} className="pb-6 border-b border-[#E0E0E0] last:border-b-0">
                <div className="font-semibold text-sm text-[#333] mb-3">
                  {item.num}. {item.question}
                </div>
                <div className="space-y-2 ml-6">
                  {item.options.map((opt, idx) => (
                    <div key={idx} className="text-sm text-[#666]">
                      {String.fromCharCode(65 + idx)}. {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center py-6 border-2 border-dashed border-[#E0E0E0] rounded bg-[#FAFAFA]">
              <div className="text-sm text-[#999] mb-2">+ 17 more questions</div>
              <div className="text-xs text-[#666]">
                Total: 20 items for Package {selectedPackage} (subset from 50-item master pool)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Set TOS */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="font-semibold text-[15px] text-[#333]">
            Table of Specifications - Package {selectedPackage}
          </div>
          <div className="text-xs text-[#666]">Auto-generated for this package's 20 items</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E0E0E0]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#666]">Unit of Competency</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">Learning</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">Process</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666]">Application</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] bg-[#E8F5E9]">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Prepare and Maintain Tools and Equipment</td>
                <td className="text-center px-4 py-3 text-sm">4</td>
                <td className="text-center px-4 py-3 text-sm">3</td>
                <td className="text-center px-4 py-3 text-sm">2</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">9</td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Perform Manual Metal Arc Welding</td>
                <td className="text-center px-4 py-3 text-sm">3</td>
                <td className="text-center px-4 py-3 text-sm">4</td>
                <td className="text-center px-4 py-3 text-sm">2</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">9</td>
              </tr>
              <tr className="border-b border-[#F0F0F0]">
                <td className="px-4 py-3 text-sm">Apply Safety Practices</td>
                <td className="text-center px-4 py-3 text-sm">1</td>
                <td className="text-center px-4 py-3 text-sm">1</td>
                <td className="text-center px-4 py-3 text-sm">0</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1976D2] bg-[#F5FAFF]">2</td>
              </tr>
              <tr className="bg-[#E8F5E9] border-t-2 border-[#2E7D32]">
                <td className="px-4 py-3 text-sm font-bold text-[#1B5E20]">Total</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">8</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">8</td>
                <td className="text-center px-4 py-3 text-sm font-bold text-[#1B5E20]">4</td>
                <td className="text-center px-4 py-3 text-lg font-bold text-[#2E7D32]">20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/package-navigator')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Package Navigator
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
            Download Test (Package {selectedPackage})
          </button>
          <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
            Download Answer Key
          </button>
        </div>
      </div>
    </div>
  );
}
