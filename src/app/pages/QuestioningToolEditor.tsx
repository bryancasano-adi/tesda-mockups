import { useState } from 'react';
import { useNavigate } from 'react-router';

export function QuestioningToolEditor() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'tabular' | 'script'>('tabular');

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Questioning Tool
      </div>

      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E8F5E9] text-[#2E7D32] mr-2">
              PHASE 2
            </span>
            Questioning Tool Pool
          </h1>
          <p className="text-sm text-[#666]">25 Questions · Binary S/NS · 4 Dimensions Coverage</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
          Finalized
        </span>
      </div>

      {/* View Toggle */}
      <div className="inline-flex border border-[#E0E0E0] rounded overflow-hidden mb-6">
        <button
          onClick={() => setViewMode('tabular')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'tabular'
              ? 'bg-[#2E7D32] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Tabular Format (Validation)
        </button>
        <button
          onClick={() => setViewMode('script')}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            viewMode === 'script'
              ? 'bg-[#2E7D32] text-white'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5]'
          }`}
        >
          Interview Script (Download)
        </button>
      </div>

      {viewMode === 'tabular' ? (
        <>
          {/* Coverage Summary */}
          <div className="bg-white border border-[#E0E0E0] rounded mb-6">
            <div className="px-5 py-4 border-b border-[#E0E0E0]">
              <span className="text-[15px] font-semibold text-[#333]">Coverage Summary</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F5F5F5] rounded">
                  <div className="text-xs font-semibold text-[#999] uppercase mb-2">
                    Question Type Distribution
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Knowledge-based:</span>
                      <span className="font-semibold text-[#333]">14 (56%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Scenario-based:</span>
                      <span className="font-semibold text-[#2E7D32]">11 (44%)</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded">
                  <div className="text-xs font-semibold text-[#999] uppercase mb-2">
                    Dimensions of Competency
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Task Skills:</span>
                      <span className="font-semibold text-[#333]">10 questions</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Task Management:</span>
                      <span className="font-semibold text-[#333]">6 questions</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Contingency Management:</span>
                      <span className="font-semibold text-[#333]">5 questions</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#666]">Job/Role Environment:</span>
                      <span className="font-semibold text-[#333]">4 questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabular Format */}
          <div className="bg-white border border-[#E0E0E0] rounded mb-6">
            <div className="px-5 py-4 border-b border-[#E0E0E0]">
              <span className="text-[15px] font-semibold text-[#333]">25 Questions with Model Answers</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FAFAFA]">
                    <th className="text-center px-3 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-12">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0]">
                      Question
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-40">
                      Dimension of Competency
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-32">
                      Test Type
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[#666] border border-[#E0E0E0] w-64">
                      Model Answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      1
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      What type of electrode would you use for welding low carbon steel in a flat position?
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Task Skills</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
                        Knowledge
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                      E6013 or E6011 electrodes, following WPS specifications
                    </td>
                  </tr>
                  <tr className="bg-[#FFFEF5] hover:bg-[#FFF9E6]">
                    <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      2
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      <strong>Scenario:</strong> You notice that the electrode is sticking frequently during
                      welding. What would you do to address this problem?
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      Contingency Management
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
                        Scenario
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                      Check and increase amperage if too low; ensure proper arc length; verify electrode is
                      dry; adjust travel speed
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      3
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      Why is it important to clean the base metal before welding?
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">Task Skills</td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
                        Knowledge
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                      To prevent contamination, porosity, and weak welds; to ensure proper fusion and weld
                      quality
                    </td>
                  </tr>
                  <tr className="bg-[#FFFEF5] hover:bg-[#FFF9E6]">
                    <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      4
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      <strong>Scenario:</strong> While welding, you smell smoke and see small sparks near the
                      welding cables. What should you do immediately?
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      Contingency Management
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
                        Scenario
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                      Stop welding immediately; disconnect power; inspect cables for damage; report to
                      supervisor; do not resume until cables are replaced or repaired
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td className="px-3 py-3 text-sm text-center border border-[#E0E0E0] font-semibold">
                      5
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0]">
                      How would you prioritize your tasks when preparing for a welding job?
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      Task Management
                    </td>
                    <td className="px-4 py-3 text-sm text-center border border-[#E0E0E0]">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1976D2]">
                        Knowledge
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border border-[#E0E0E0] text-[#666]">
                      Safety first (PPE, equipment check); review WPS; prepare materials; set up equipment;
                      clean work area
                    </td>
                  </tr>
                  <tr className="hover:bg-[#FAFAFA]">
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-center text-sm text-[#999] italic border border-[#E0E0E0]"
                    >
                      ... 20 more questions (Total: 25 questions)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Interview Script Format */
        <div className="bg-white border border-[#E0E0E0] rounded mb-6">
          <div className="px-5 py-4 border-b border-[#E0E0E0]">
            <span className="text-[15px] font-semibold text-[#333]">
              Oral Interview Script (Ready-to-Use)
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="p-4 bg-[#E3F2FD] border-l-4 border-[#1976D2]">
              <div className="font-semibold text-sm text-[#1976D2] mb-2">Instructions for Assessor:</div>
              <ul className="text-sm text-[#1565C0] space-y-1 ml-4">
                <li>• Ask questions in a neutral, non-leading manner</li>
                <li>• Allow candidate time to think and respond</li>
                <li>• Record responses using S (Satisfactory) or NS (Not Satisfactory)</li>
                <li>• Any unsafe knowledge response = Not Satisfactory</li>
              </ul>
            </div>

            <div className="space-y-5">
              <div className="border-l-4 border-[#2E7D32] pl-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#2E7D32] text-white">
                    Q1
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#333] mb-1">
                      What type of electrode would you use for welding low carbon steel in a flat position?
                    </div>
                    <div className="text-xs text-[#666] mb-2">
                      <strong>Dimension:</strong> Task Skills | <strong>Type:</strong> Knowledge-based
                    </div>
                    <div className="p-3 bg-[#FAFAFA] rounded text-sm text-[#666]">
                      <strong className="text-[#333]">Expected Answer:</strong> E6013 or E6011 electrodes,
                      following WPS specifications
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="q1" className="w-4 h-4" />
                        <span className="text-[#2E7D32] font-medium">S - Satisfactory</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="q1" className="w-4 h-4" />
                        <span className="text-[#C62828] font-medium">NS - Not Satisfactory</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-[#F57C00] pl-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#F57C00] text-white">
                    Q2
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#333] mb-1">
                      <strong className="text-[#F57C00]">SCENARIO:</strong> You notice that the electrode is
                      sticking frequently during welding. What would you do to address this problem?
                    </div>
                    <div className="text-xs text-[#666] mb-2">
                      <strong>Dimension:</strong> Contingency Management | <strong>Type:</strong> Scenario-based
                    </div>
                    <div className="p-3 bg-[#FAFAFA] rounded text-sm text-[#666]">
                      <strong className="text-[#333]">Expected Answer:</strong> Check and increase amperage if
                      too low; ensure proper arc length; verify electrode is dry; adjust travel speed
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="q2" className="w-4 h-4" />
                        <span className="text-[#2E7D32] font-medium">S - Satisfactory</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="q2" className="w-4 h-4" />
                        <span className="text-[#C62828] font-medium">NS - Not Satisfactory</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F5F5F5] rounded text-center text-sm text-[#666] italic">
                ... 23 more questions in ready-to-use format (Total: 25 questions)
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Dashboard
        </button>
        <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
          Download {viewMode === 'tabular' ? 'Tabular Format' : 'Interview Script'}
        </button>
      </div>
    </div>
  );
}
