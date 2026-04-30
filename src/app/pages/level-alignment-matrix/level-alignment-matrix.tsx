import { useState } from "react";

import {
  LAMTableView,
  MappingStatus,
} from "../../components/level-alignment-matrix/LAMTableView";
import {
  mockCompetencies,
  mockDescriptors,
  createInitialMappings,
  Mapping,
} from "../../data/lamCompetencyMapping";

export function LevelAlignmentMatrix() {
  const [mappings, setMappings] = useState<Mapping[]>(createInitialMappings());

  const handleUpdateMapping = (
    competencyId: string,
    descriptorId: string,
    value: string,
    status?: MappingStatus,
  ) => {
    setMappings((prev) => {
      const exists = prev.find(
        (m) =>
          m.competencyId === competencyId && m.descriptorId === descriptorId,
      );

      if (exists) {
        return prev.map((m) =>
          m.competencyId === competencyId && m.descriptorId === descriptorId
            ? { ...m, value, status: status ?? m.status }
            : m,
        );
      }

      return [
        ...prev,
        {
          competencyId,
          descriptorId,
          value,
          reasoning: "Manually added by expert",
          status: status ?? "reviewed",
        },
      ];
    });
  };

  return (
    <div className="size-full flex flex-col bg-gray-50">
      <div className="flex-1 overflow-hidden">
        <div className="h-[calc(100%-60px)] px-6 pb-6">
          <LAMTableView
            competencies={mockCompetencies}
            descriptors={mockDescriptors}
            editable={true}
            mappings={mappings}
            pqfLevel={2}
            qualificationName="Food Service NC II"
            onUpdateMapping={handleUpdateMapping}
          />
        </div>
      </div>
    </div>
  );
}
