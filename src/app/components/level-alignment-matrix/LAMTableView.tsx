import { useState } from "react";
import {
  CheckIcon,
  InformationCircleIcon,
  LightBulbIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface Competency {
  id: string;
  type: "competency" | "element";
  code: string;
  name: string;
}

interface Descriptor {
  id: string;
  title: string;
  domain: string;
}

export type MappingStatus = "generated" | "reviewed" | "finalized";

interface Mapping {
  competencyId: string;
  descriptorId: string;
  value: string;
  reasoning?: string;
  status?: MappingStatus;
}

type PQFLevel = 1 | 2 | 3 | 4 | 5;

interface LAMTableViewProps {
  qualificationName: string;
  pqfLevel: PQFLevel;
  competencies: Competency[];
  descriptors: {
    domain: string;
    genericDescriptor: string;
    granularized: Descriptor[];
  }[];
  mappings: Mapping[];
  onUpdateMapping: (
    competencyId: string,
    descriptorId: string,
    value: string,
    status?: MappingStatus,
  ) => void;
  editable?: boolean;
}

const toRomanPQF = (level: number): string => {
  const map = ["I", "II", "III", "IV", "V"];

  return map[level - 1] ?? "—";
};

export function LAMTableView({
  qualificationName,
  pqfLevel,
  competencies,
  descriptors,
  mappings,
  onUpdateMapping,
  editable = false,
}: LAMTableViewProps) {
  const [editingCell, setEditingCell] = useState<{
    compId: string;
    descId: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showReasoningFor, setShowReasoningFor] = useState<string | null>(null);

  const getMapping = (
    competencyId: string,
    descriptorId: string,
  ): Mapping | undefined => {
    return mappings.find(
      (m) => m.competencyId === competencyId && m.descriptorId === descriptorId,
    );
  };

  const startEdit = (compId: string, descId: string) => {
    const mapping = getMapping(compId, descId);

    setEditingCell({ compId, descId });
    setEditValue(mapping?.value || "");
  };

  const saveEdit = () => {
    if (!editingCell) return;

    const trimmed = editValue.trim();

    if (trimmed === "") {
      onUpdateMapping(editingCell.compId, editingCell.descId, "", undefined);
    } else {
      onUpdateMapping(
        editingCell.compId,
        editingCell.descId,
        trimmed,
        "reviewed",
      );
    }

    setEditingCell(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const isEditing = (compId: string, descId: string) =>
    editingCell?.compId === compId && editingCell?.descId === descId;

  const getStatusStyles = (status?: MappingStatus) => {
    switch (status) {
      case "generated":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "reviewed":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "finalized":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-300";
    }
  };

  // const deleteMapping = (compId: string, descId: string) => {
  //   onUpdateMapping(compId, descId, "", undefined);
  // };

  return (
    <div className="bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Level Alignment Matrix Guide
          </h2>
        </div>
        <div className="flex gap-8 text-sm">
          <div>
            <span className="text-gray-600">
              NAME OF QUALIFICATION/DOCUMENT:
            </span>
            <span className="ml-2 font-medium text-gray-900">
              {qualificationName}
            </span>
          </div>
          <div>
            <span className="text-gray-600">PQF Level</span>
            <span className="ml-2 font-semibold text-gray-900">
              {toRomanPQF(pqfLevel)}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th
                className="border border-gray-300 px-3 py-2 font-semibold text-left align-top w-100"
                rowSpan={7}
              >
                Outcomes
                <br />
                (Unit of Competency)
                <br />
                Elements of Competency
              </th>

              <th
                className="border border-gray-300 px-3 py-2 font-semibold text-center"
                colSpan={descriptors.reduce(
                  (sum, domain) => sum + domain.granularized.length,
                  0,
                )}
              >
                Philippine Qualification Framework
              </th>
            </tr>
            <tr className="bg-gray-300 text-black">
              <th
                className="border border-gray-200 px-3 py-2 font-semibold text-center"
                colSpan={descriptors.reduce(
                  (sum, domain) => sum + domain.granularized.length,
                  0,
                )}
              >
                DOMAINS
              </th>
            </tr>

            {/* Domain Names */}
            <tr className="bg-gray-50 text-black">
              {descriptors.map((domain, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-3 py-2 font-semibold text-center"
                  colSpan={domain.granularized.length}
                >
                  {domain.domain}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-200 text-black">
              <th
                className="border border-gray-300 px-3 py-2 font-semibold text-center"
                colSpan={descriptors.reduce(
                  (sum, domain) => sum + domain.granularized.length,
                  0,
                )}
              >
                Level Descriptors
              </th>
            </tr>

            {/* Generic Descriptors */}
            <tr className="bg-gray-50 text-black">
              {descriptors.map((domain, idx) => (
                <td
                  key={idx}
                  className="border border-gray-300 px-3 py-3 text-gray-700 text-center"
                  colSpan={domain.granularized.length}
                >
                  {domain.genericDescriptor}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-200 text-black">
              <th
                className="border border-gray-300 px-3 py-2 font-semibold text-center"
                colSpan={descriptors.reduce(
                  (sum, domain) => sum + domain.granularized.length,
                  0,
                )}
              >
                Granulized Level Descriptor
              </th>
            </tr>

            {/* Granularized Descriptor Headers */}
            <tr className="bg-gray-50">
              {descriptors.flatMap((domain) =>
                domain.granularized.map((desc) => (
                  <td
                    key={desc.id}
                    className="border border-gray-300 px-2 py-2 text-gray-800 align-top text-center"
                    style={{
                      minWidth: "150px",
                      maxWidth: "200px",
                    }}
                  >
                    <div className="leading-snug">{desc.title}</div>
                  </td>
                )),
              )}
            </tr>
          </thead>

          <tbody>
            {competencies.map((comp) => (
              <tr
                key={comp.id}
                className={
                  comp.type === "competency"
                    ? "bg-gray-100 font-semibold"
                    : "bg-white hover:bg-gray-50"
                }
              >
                <td
                  className={`border border-gray-300 px-3 py-2 ${
                    comp.type === "competency"
                      ? "font-semibold text-gray-900"
                      : "text-gray-700 pl-6"
                  }`}
                >
                  <span className="font-mono text-xs mr-2">{comp.code}</span>
                  {comp.name}
                </td>

                {descriptors.flatMap((domain) =>
                  domain.granularized.map((desc) => {
                    const mapping = getMapping(comp.id, desc.id);
                    const editing = isEditing(comp.id, desc.id);
                    const cellKey = `${comp.id}-${desc.id}`;

                    return (
                      <td
                        key={desc.id}
                        className="border border-gray-300 px-2 py-2 align-top relative group"
                      >
                        {comp.type === "element" && (
                          <div>
                            {!editing ? (
                              <div
                                className={`min-h-[50px] text-center py-3 ${getStatusStyles(mapping?.status)}`}
                              >
                                {mapping?.value && (
                                  <div className="space-y-1">
                                    <div className="text-gray-900 font-mono text-xs break-words leading-relaxed">
                                      {mapping.value}
                                    </div>
                                  </div>
                                )}

                                {editable && (
                                  <div className="absolute top-1 right-1 flex gap-1">
                                    <button
                                      className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity "
                                      title="Edit Mapping"
                                      onClick={() =>
                                        startEdit(comp.id, desc.id)
                                      }
                                    >
                                      <PencilSquareIcon className="size-3 text-gray-600" />
                                    </button>
                                    {mapping?.reasoning && (
                                      <button
                                        className="p-1 bg-white border border-gray-300 rounded hover:bg-gray-50 "
                                        title="View AI Reasoning"
                                        onClick={() =>
                                          setShowReasoningFor(
                                            showReasoningFor === cellKey
                                              ? null
                                              : cellKey,
                                          )
                                        }
                                      >
                                        {mapping.status === "generated" ? (
                                          <InformationCircleIcon className="size-3 text-blue-600" />
                                        ) : (
                                          <LightBulbIcon className="size-3 text-yellow-600" />
                                        )}
                                      </button>
                                    )}

                                    {/* {mapping?.value && (
                                      <button
                                        className="p-1 bg-white border border-gray-300 rounded hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Clear Mapping"
                                        onClick={() =>
                                          deleteMapping(comp.id, desc.id)
                                        }
                                      >
                                        <TrashIcon className="size-3 text-red-600" />
                                      </button>
                                    )} */}
                                  </div>
                                )}

                                {showReasoningFor === cellKey &&
                                  mapping?.reasoning && (
                                    <div
                                      className={`absolute z-10 top-full left-0 mt-1 w-64 p-2 ${getStatusStyles(mapping.status)} rounded shadow-lg text-[10px]`}
                                    >
                                      <div className="font-medium mb-1">
                                        AI Reasoning:
                                      </div>
                                      <div className="text-gray-900 leading-relaxed">
                                        {mapping.reasoning}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <textarea
                                  className="w-full px-2 py-1 text-xs text-gray-700 border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                                  placeholder="e.g., C1-E2"
                                  rows={2}
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                />
                                <div className="flex gap-1">
                                  <button
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    onClick={saveEdit}
                                  >
                                    <CheckIcon className="size-3" />
                                    <span className="text-[10px]">Save</span>
                                  </button>
                                  <button
                                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={cancelEdit}
                                  >
                                    <TrashIcon className="size-3" />
                                    <span className="text-[10px]">Cancel</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  }),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
