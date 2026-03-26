import { useState } from 'react';
import { useNavigate } from 'react-router';

interface PC {
  id: string;
  text: string;
  critical: boolean;
  mcq: boolean;
  demo: boolean;
  qt: boolean;
  portfolio: boolean;
}

export function EvidencePlanEditor() {
  const navigate = useNavigate();
  const [showValidation, setShowValidation] = useState(true);
  const [expandedUnits, setExpandedUnits] = useState<{ [key: string]: boolean }>({
    unit1: true,
    unit2: false,
    unit3: false,
  });

  const [pcs, setPcs] = useState<PC[]>([
    {
      id: 'pc1',
      text: 'Identify type and size of electrode to be used in accordance with Welding Procedure Specification (WPS)',
      critical: true,
      mcq: true,
      demo: true,
      qt: true,
      portfolio: true,
    },
    {
      id: 'pc2',
      text: 'Set up welding machine and accessories as per WPS requirements',
      critical: false,
      mcq: false,
      demo: true,
      qt: true,
      portfolio: false,
    },
    {
      id: 'pc3',
      text: 'Clean base metals in accordance with standard operating procedures',
      critical: false,
      mcq: false,
      demo: true,
      qt: false,
      portfolio: false,
    },
    {
      id: 'pc4',
      text: 'Prepare work area and ensure compliance with Occupational Safety and Health Standards (OSHS)',
      critical: false,
      mcq: true,
      demo: true,
      qt: true,
      portfolio: false,
    },
  ]);

  const handleCheckboxChange = (id: string, field: keyof PC) => {
    setPcs(
      pcs.map((pc) => (pc.id === id ? { ...pc, [field]: !(pc as any)[field] as boolean } : pc))
    );
  };

  const toggleUnit = (unit: string) => {
    setExpandedUnits((prev) => ({ ...prev, [unit]: !prev[unit] }));
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Evidence Plan
      </div>

      {/* Page Title */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#333] mb-1">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#E3F2FD] text-[#1565C0] mr-2">
              PHASE 1
            </span>
            Evidence Plan
          </h1>
          <p className="text-sm text-[#666]">4-Column Assessment Tool Mapping Table</p>
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-[#F57C00]">
          Draft
        </span>
      </div>

      {/* Locked Info */}
      <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded p-5 mb-5">
        <div className="flex gap-10 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-1">
              <span className="mr-1.5">🔒</span> Qualification Title
            </div>
            <div className="text-sm text-[#333] font-medium">Shielded Metal Arc Welding (SMAW) NC II</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-xs font-semibold text-[#999] uppercase tracking-wide mb-1">
              <span className="mr-1.5">🔒</span> Units of Competency Covered
            </div>
            <div className="text-sm text-[#333] font-medium">3 Core Units</div>
          </div>
        </div>
      </div>

      {/* Evidence Plan Table */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-4">
        <div className="px-5 py-4 border-b border-[#E0E0E0] flex justify-between items-center">
          <span className="text-[15px] font-semibold text-[#333]">
            Assessment Tool Mapping
            <span className="ml-2 text-xs text-[#999] font-normal">3 units · 8 elements · 24 PCs</span>
          </span>
          <button className="px-3 py-1.5 bg-white text-[#666] border border-[#E0E0E0] rounded text-xs font-medium hover:bg-[#F5F5F5] transition-colors">
            + Add Column
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr>
                <th className="text-left px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] min-w-[320px]">
                  Performance Criteria
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Multiple
                  <br />
                  Choice
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">🔒 default</div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Demon-
                  <br />
                  stration
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">🔒 default</div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[100px]">
                  Questioning
                  <br />
                  Tool
                  <div className="text-[9px] font-normal text-[#BDBDBD] mt-0.5">🔒 default</div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#6B21A8] bg-[#F3E8FF] border border-[#E0E0E0] w-[100px] relative">
                  <button className="absolute top-1 right-1.5 text-[#BDBDBD] hover:text-[#C62828] hover:bg-[#FFEBEE] text-xs p-0.5 rounded transition-colors">
                    ✕
                  </button>
                  <div className="font-semibold">Portfolio</div>
                  <div className="text-[9px] font-normal text-[#9575CD] mt-0.5">user-added</div>
                </th>
                <th className="text-center px-3.5 py-2.5 text-xs font-semibold text-[#666] bg-[#FAFAFA] border border-[#E0E0E0] w-[80px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* UNIT 1 */}
              <tr>
                <td
                  colSpan={6}
                  className="px-3.5 py-2.5 text-sm font-semibold text-white bg-[#1E3A5F] border border-[#E0E0E0]"
                >
                  <span className="mr-1.5">🔒</span>
                  CORE 1: Perform Shielded Metal Arc Welding — Plate to Plate Joint
                </td>
              </tr>

              {expandedUnits.unit1 && (
                <>
                  {/* Element 1.1 */}
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3.5 py-2 text-sm font-semibold text-[#333] bg-[#E8EDF2] border border-[#E0E0E0]"
                    >
                      <span className="mr-1 text-xs text-[#BDBDBD]">🔒</span>
                      Element 1: Prepare materials and welding equipment
                    </td>
                  </tr>

                  {pcs.map((pc, index) => (
                    <tr
                      key={pc.id}
                      className={`${
                        pc.critical
                          ? 'bg-[#FFFDE7] hover:bg-[#FFF9C4]'
                          : 'bg-white hover:bg-[#F8FBFF]'
                      } transition-colors`}
                    >
                      <td className="px-3.5 py-3 border border-[#E0E0E0]">
                        <div className="flex items-start gap-2">
                          <span
                            className="text-sm text-[#BDBDBD] cursor-pointer hover:text-[#1976D2] flex-shrink-0 mt-0.5"
                            title="Edit"
                          >
                            ✏️
                          </span>
                          <div className="flex-1 text-sm leading-relaxed">
                            {pc.text}
                            {pc.critical && <span className="text-[#F57C00] font-bold text-base ml-1">*</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                        <input
                          type="checkbox"
                          checked={pc.mcq}
                          onChange={() => handleCheckboxChange(pc.id, 'mcq')}
                          className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                        />
                      </td>
                      <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                        <input
                          type="checkbox"
                          checked={pc.demo}
                          onChange={() => handleCheckboxChange(pc.id, 'demo')}
                          className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                        />
                      </td>
                      <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                        <input
                          type="checkbox"
                          checked={pc.qt}
                          onChange={() => handleCheckboxChange(pc.id, 'qt')}
                          className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                        />
                      </td>
                      <td className="px-3.5 py-3 border border-[#E0E0E0] text-center bg-[#FAFAFE]">
                        <input
                          type="checkbox"
                          checked={pc.portfolio}
                          onChange={() => handleCheckboxChange(pc.id, 'portfolio')}
                          className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]"
                        />
                      </td>
                      <td className="px-3.5 py-3 border border-[#E0E0E0] text-center whitespace-nowrap">
                        <button
                          className="text-base text-[#BDBDBD] hover:text-[#C62828] transition-colors p-1"
                          title="Delete"
                        >
                          🗑️
                        </button>
                        <button
                          className={`text-lg transition-colors p-1 ${
                            pc.critical
                              ? 'text-[#F9A825]'
                              : 'text-[#E0E0E0] hover:text-[#F57C00]'
                          }`}
                          title="Critical Aspect"
                        >
                          {pc.critical ? '⭐' : '☆'}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* Add Row */}
                  <tr>
                    <td colSpan={6} className="px-3.5 py-2 bg-[#FAFAFA] border border-[#E0E0E0]">
                      <button className="text-sm text-[#1976D2] font-medium hover:underline">
                        + Add Row Below
                      </button>
                    </td>
                  </tr>

                  {/* Element 1.2 */}
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3.5 py-2 text-sm font-semibold text-[#333] bg-[#E8EDF2] border border-[#E0E0E0]"
                    >
                      <span className="mr-1 text-xs text-[#BDBDBD]">🔒</span>
                      Element 2: Perform root pass on plate to plate joint
                    </td>
                  </tr>

                  <tr className="bg-[#FFFDE7] hover:bg-[#FFF9C4] transition-colors">
                    <td className="px-3.5 py-3 border border-[#E0E0E0]">
                      <div className="flex items-start gap-2">
                        <span
                          className="text-sm text-[#BDBDBD] cursor-pointer hover:text-[#1976D2] flex-shrink-0 mt-0.5"
                          title="Edit"
                        >
                          ✏️
                        </span>
                        <div className="flex-1 text-sm leading-relaxed">
                          Perform root pass in accordance with WPS
                          <span className="text-[#F57C00] font-bold text-base ml-1">*</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center bg-[#FAFAFE]">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center whitespace-nowrap">
                      <button
                        className="text-base text-[#BDBDBD] hover:text-[#C62828] transition-colors p-1"
                        title="Delete"
                      >
                        🗑️
                      </button>
                      <button className="text-lg text-[#F9A825] transition-colors p-1" title="Critical Aspect">
                        ⭐
                      </button>
                    </td>
                  </tr>

                  <tr className="bg-white hover:bg-[#F8FBFF] transition-colors">
                    <td className="px-3.5 py-3 border border-[#E0E0E0]">
                      <div className="flex items-start gap-2">
                        <span
                          className="text-sm text-[#BDBDBD] cursor-pointer hover:text-[#1976D2] flex-shrink-0 mt-0.5"
                          title="Edit"
                        >
                          ✏️
                        </span>
                        <div className="flex-1 text-sm leading-relaxed">
                          Clean and inspect root pass using visual and mechanical methods
                        </div>
                      </div>
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center bg-[#FAFAFE]">
                      <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center whitespace-nowrap">
                      <button
                        className="text-base text-[#BDBDBD] hover:text-[#C62828] transition-colors p-1"
                        title="Delete"
                      >
                        🗑️
                      </button>
                      <button
                        className="text-lg text-[#E0E0E0] hover:text-[#F57C00] transition-colors p-1"
                        title="Critical Aspect"
                      >
                        ☆
                      </button>
                    </td>
                  </tr>

                  {/* Warning Row: Only 1 method */}
                  <tr className="bg-white hover:bg-[#F8FBFF] transition-colors border-l-[3px] border-l-[#F57C00]">
                    <td className="px-3.5 py-3 border border-[#E0E0E0]">
                      <div className="flex items-start gap-2">
                        <span
                          className="text-sm text-[#BDBDBD] cursor-pointer hover:text-[#1976D2] flex-shrink-0 mt-0.5"
                          title="Edit"
                        >
                          ✏️
                        </span>
                        <div className="flex-1 text-sm leading-relaxed text-[#E65100]">
                          Repair root pass defects as required
                          <span className="text-xs text-[#F57C00] ml-2">⚠️ Only 1 method selected</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" checked className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center">
                      <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center bg-[#FAFAFE]">
                      <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#1976D2]" />
                    </td>
                    <td className="px-3.5 py-3 border border-[#E0E0E0] text-center whitespace-nowrap">
                      <button
                        className="text-base text-[#BDBDBD] hover:text-[#C62828] transition-colors p-1"
                        title="Delete"
                      >
                        🗑️
                      </button>
                      <button
                        className="text-lg text-[#E0E0E0] hover:text-[#F57C00] transition-colors p-1"
                        title="Critical Aspect"
                      >
                        ☆
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={6} className="px-3.5 py-2 bg-[#FAFAFA] border border-[#E0E0E0]">
                      <button className="text-sm text-[#1976D2] font-medium hover:underline">
                        + Add Row Below
                      </button>
                    </td>
                  </tr>
                </>
              )}

              {!expandedUnits.unit1 && (
                <tr>
                  <td colSpan={6} className="px-3.5 py-3 bg-[#F8FBFF] text-center border border-[#E0E0E0]">
                    <button
                      onClick={() => toggleUnit('unit1')}
                      className="text-sm text-[#1976D2] font-medium hover:underline"
                    >
                      ▼ Expand Unit 1 (3 elements, 10 PCs)
                    </button>
                  </td>
                </tr>
              )}

              {/* UNIT 2 (collapsed) */}
              <tr>
                <td
                  colSpan={6}
                  className="px-3.5 py-2.5 text-sm font-semibold text-white bg-[#1E3A5F] border border-[#E0E0E0]"
                >
                  <span className="mr-1.5">🔒</span>
                  CORE 2: Perform Shielded Metal Arc Welding — Pipe to Pipe Joint
                  <span className="float-right text-xs font-normal opacity-70">3 elements · 9 PCs</span>
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="px-3.5 py-3 bg-[#F8FBFF] text-center border border-[#E0E0E0]">
                  <button
                    onClick={() => toggleUnit('unit2')}
                    className="text-sm text-[#1976D2] font-medium hover:underline"
                  >
                    ▼ Expand Unit 2 (3 elements, 9 PCs)
                  </button>
                </td>
              </tr>

              {/* UNIT 3 (collapsed) */}
              <tr>
                <td
                  colSpan={6}
                  className="px-3.5 py-2.5 text-sm font-semibold text-white bg-[#1E3A5F] border border-[#E0E0E0]"
                >
                  <span className="mr-1.5">🔒</span>
                  CORE 3: Repair Welds
                  <span className="float-right text-xs font-normal opacity-70">2 elements · 5 PCs</span>
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="px-3.5 py-3 bg-[#F8FBFF] text-center border border-[#E0E0E0]">
                  <button
                    onClick={() => toggleUnit('unit3')}
                    className="text-sm text-[#1976D2] font-medium hover:underline"
                  >
                    ▼ Expand Unit 3 (2 elements, 5 PCs)
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Panel */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-4">
        <div
          onClick={() => setShowValidation(!showValidation)}
          className="px-4 py-3 bg-[#FFF3E0] border-b border-[#FFE0B2] flex justify-between items-center cursor-pointer select-none"
        >
          <span className="text-sm font-semibold text-[#E65100]">⚠️ Validation Issues (3)</span>
          <span className="text-xs text-[#999]">Click to expand ▼</span>
        </div>
        {showValidation && (
          <div className="p-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                <span className="text-sm text-[#C62828]">⚠️</span>
                <span className="text-sm text-[#C62828]">
                  <strong>Row 7 (Element 2, PC 3):</strong> Only 1 assessment method selected — minimum 2
                  recommended
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                <span className="text-sm text-[#E65100]">⚠️</span>
                <span className="text-sm text-[#E65100]">
                  <strong>Unit 2:</strong> Not yet expanded — 9 PCs need method assignment
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#F5F5F5] transition-colors">
                <span className="text-sm text-[#E65100]">⚠️</span>
                <span className="text-sm text-[#E65100]">
                  <strong>Unit 3:</strong> Not yet expanded — 5 PCs need method assignment
                </span>
              </div>

              <div className="border-t border-[#F0F0F0] my-2 pt-2">
                <div className="flex items-center gap-2 p-2 rounded">
                  <span className="text-sm text-[#2E7D32]">✅</span>
                  <span className="text-sm text-[#2E7D32]">
                    All critical aspect PCs (*) have all 3 methods checked
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded">
                  <span className="text-sm text-[#2E7D32]">✅</span>
                  <span className="text-sm text-[#2E7D32]">No empty PC text fields in Unit 1</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded">
                  <span className="text-sm text-[#2E7D32]">✅</span>
                  <span className="text-sm text-[#2E7D32]">
                    At least 1 PC marked for each assessment method type (MCQ: 4, Demo: 10, QT: 7)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#E0E0E0] px-5 py-3 flex justify-between items-center gap-3">
        <div className="text-sm text-[#666] flex items-center gap-3">
          <span>
            Unit 1: <strong className="text-[#333]">10 PCs</strong> mapped
          </span>
          <span className="text-[#E0E0E0]">|</span>
          <span>
            MCQ: <strong className="text-[#333]">4</strong>
          </span>
          <span className="text-[#E0E0E0]">·</span>
          <span>
            Demo: <strong className="text-[#333]">10</strong>
          </span>
          <span className="text-[#E0E0E0]">·</span>
          <span>
            QT: <strong className="text-[#333]">7</strong>
          </span>
          <span className="text-[#E0E0E0]">·</span>
          <span className="text-[#6B21A8]">
            Portfolio: <strong>3</strong>
          </span>
          <span className="text-[#E0E0E0]">|</span>
          <span className="text-[#2E7D32]">💾 Auto-saved 12s ago</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
          >
            ← Back to Dashboard
          </button>
          <button className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors">
            Finalize Evidence Plan
          </button>
        </div>
      </div>
    </div>
  );
}
