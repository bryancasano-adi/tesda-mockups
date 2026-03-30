import { useState } from 'react';
import { useNavigate } from 'react-router';

export function DemoToolsEquipment() {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Sample tools & equipment per variation set
  const toolsData = {
    A: {
      tools: [
        'Welding helmet with shade #10-12 lens',
        'Chipping hammer',
        'Wire brush',
        'Welding gloves (leather)',
        'Steel rule (300mm)',
        'Combination square',
        'Center punch',
        'Ball peen hammer',
      ],
      equipment: [
        'AC/DC Welding machine (200-300A)',
        'Welding table with clamps',
        'Electrode holder (300A)',
        'Ground clamp',
        'Fire extinguisher (CO2)',
        'Ventilation system',
      ],
      materials: [
        'Mild steel plates (6mm × 150mm × 200mm) - 2 pcs',
        'E6013 electrodes (3.2mm diameter) - 1kg',
        'E7018 electrodes (3.2mm diameter) - 500g',
        'Welding flux',
      ],
    },
    B: {
      tools: [
        'Auto-darkening welding helmet',
        'Chipping hammer',
        'Wire brush (power)',
        'Welding gloves (heat-resistant)',
        'Digital caliper',
        'Protractor',
        'Scriber',
        'Ball peen hammer',
      ],
      equipment: [
        'Inverter welding machine (180-250A)',
        'Welding positioner',
        'Electrode holder (400A)',
        'Magnetic ground clamp',
        'Fire extinguisher (ABC)',
        'Fume extraction unit',
      ],
      materials: [
        'Mild steel plates (8mm × 150mm × 200mm) - 2 pcs',
        'E6013 electrodes (4.0mm diameter) - 1kg',
        'E7018 electrodes (4.0mm diameter) - 500g',
        'Anti-spatter spray',
      ],
    },
    C: {
      tools: [
        'Welding helmet with shade #11 lens',
        'Pneumatic chipping hammer',
        'Wire brush',
        'Welding gloves (TIG/MIG)',
        'Vernier caliper',
        'Try square',
        'Scriber',
        'Cross peen hammer',
      ],
      equipment: [
        'Multi-process welding machine',
        'Welding fixture table',
        'Insulated electrode holder',
        'Spring-loaded ground clamp',
        'Fire blanket + extinguisher',
        'Mobile fume extractor',
      ],
      materials: [
        'Mild steel plates (5mm × 200mm × 250mm) - 2 pcs',
        'E6011 electrodes (3.2mm diameter) - 1kg',
        'E7018 electrodes (3.2mm diameter) - 500g',
        'Cleaning solvent',
      ],
    },
    D: {
      tools: [
        'Flip-front welding helmet',
        'Chipping hammer',
        'Rotary wire brush',
        'Heat-resistant welding gloves',
        'Tape measure (5m)',
        'Speed square',
        'Center punch set',
        'Ball peen hammer',
      ],
      equipment: [
        'Transformer welding machine (250A)',
        'Adjustable welding table',
        'Heavy-duty electrode holder',
        'C-clamp ground',
        'Fire extinguisher (CO2)',
        'Exhaust fan system',
      ],
      materials: [
        'Mild steel plates (10mm × 150mm × 200mm) - 2 pcs',
        'E6013 electrodes (3.2mm diameter) - 1.5kg',
        'E7018 electrodes (4.0mm diameter) - 500g',
        'Wire wheel',
      ],
    },
    E: {
      tools: [
        'Welding helmet with respirator',
        'Chipping hammer',
        'Wire brush (stainless)',
        'Welding gloves (aluminized)',
        'Digital angle finder',
        'Machinist square',
        'Automatic center punch',
        'Cross peen hammer',
      ],
      equipment: [
        'Synergic welding machine',
        'Welding bench with vise',
        'Quick-release electrode holder',
        'Twist-lock ground clamp',
        'Fire extinguisher (ABC)',
        'Downdraft welding table',
      ],
      materials: [
        'Mild steel plates (6mm × 200mm × 250mm) - 2 pcs',
        'E6013 electrodes (4.0mm diameter) - 1kg',
        'E7016 electrodes (3.2mm diameter) - 500g',
        'Anti-spatter gel',
      ],
    },
  };

  const currentData = toolsData[selectedSet];

  return (
    <div className="p-6">
      <div className="text-sm text-[#666] mb-4">
        Training Projects › Shielded Metal Arc Welding NC II › CATS Development › Demo Tools & Equipment
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#333] mb-1">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#C8E6C9] text-[#1B5E20] mr-2">
            PHASE 2
          </span>
          Demonstration Test - Tools & Equipment
        </h1>
        <p className="text-sm text-[#666]">Per-variation lists • AI-extracted from Competency Standard</p>
      </div>

      {/* Info Banner */}
      <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div className="flex-1 text-sm text-[#1565C0]">
            <strong>AI-Extracted Lists:</strong> Tools, equipment, and materials are automatically extracted
            from the Competency Standard and adjusted per variation set to ensure different but equivalent
            resources across Sets A-E. Each variation assesses the same Performance Criteria but differs in
            specific materials and equipment.
          </div>
        </div>
      </div>

      {/* Variation Tabs */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="flex border-b border-[#E0E0E0]">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((set) => (
            <button
              key={set}
              onClick={() => setSelectedSet(set)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedSet === set
                  ? 'text-[#1976D2] border-[#1976D2] bg-[#F5FAFF]'
                  : 'text-[#666] border-transparent hover:bg-[#FAFAFA]'
              }`}
            >
              Set {set}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">Tools - Set {selectedSet}</div>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
              {currentData.tools.length} items
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {currentData.tools.map((tool, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <span className="text-xl">🔧</span>
                <div className="flex-1">
                  <div className="text-sm text-[#333]">{tool}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">Equipment - Set {selectedSet}</div>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
              {currentData.equipment.length} items
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {currentData.equipment.map((equip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <span className="text-xl">⚙️</span>
                <div className="flex-1">
                  <div className="text-sm text-[#333]">{equip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Section */}
      <div className="bg-white border border-[#E0E0E0] rounded mb-6">
        <div className="px-5 py-4 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-[15px] text-[#333]">Materials - Set {selectedSet}</div>
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32]">
              {currentData.materials.length} items
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {currentData.materials.map((material, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAFAFA] rounded border border-[#E0E0E0]">
                <span className="text-xl">📦</span>
                <div className="flex-1">
                  <div className="text-sm text-[#333]">{material}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Note */}
      <div className="bg-[#FFFDE7] border border-[#FFE082] rounded p-4 mb-6">
        <div className="text-sm text-[#F57C00]">
          <strong>Set Variation Strategy:</strong> All 5 sets use different materials, tools, and equipment
          specifications while maintaining equivalent complexity and assessing the same Performance Criteria.
          For example, Set A uses 6mm plates while Set B uses 8mm plates; Set A uses standard welding helmet
          while Set B uses auto-darkening helmet.
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => navigate('/demonstration-test')}
          className="px-4 py-2 bg-white text-[#666] border border-[#E0E0E0] rounded text-sm font-medium hover:bg-[#F5F5F5] transition-colors"
        >
          ← Back to Demo Test Editor
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-[#1976D2] border border-[#1976D2] rounded text-sm font-medium hover:bg-[#E3F2FD] transition-colors">
            Download Tools List (Set {selectedSet})
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#2E7D32] text-white rounded text-sm font-medium hover:bg-[#1B5E20] transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
