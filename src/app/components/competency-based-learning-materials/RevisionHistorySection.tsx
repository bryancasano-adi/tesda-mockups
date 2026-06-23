import { useState } from "react";

import { cn } from "./CblmFrontendPrimitives";
import { SectionDivider } from "./CblmFieldPrimitives";
import { ucMeta } from "@/app/data/cblmData";

type RevRow = {
  revNo: string;
  placeholder?: boolean;
  dateRevised: string;
  description: string;
  revisedBy: string;
};

function nextRevNo(rows: RevRow[]): string {
  const max = rows.reduce(
    (highest, row) => Math.max(highest, Number.parseInt(row.revNo, 10) || 0),
    -1,
  );

  return String(max + 1).padStart(2, "0");
}

export function RevisionHistorySection({
  isEditing = true,
  showToast,
}: {
  isEditing?: boolean;
  showToast?: (msg: string) => void;
}) {
  const [revRows, setRevRows] = useState<RevRow[]>([
    {
      revNo: ucMeta.revision,
      dateRevised: "2026-05-01",
      description: "Initial version",
      revisedBy: "TESDA CTAD",
    },
    {
      revNo: nextRevNo([{ revNo: ucMeta.revision, dateRevised: "", description: "", revisedBy: "" }]),
      placeholder: true,
      dateRevised: "",
      description: "",
      revisedBy: "",
    },
  ]);

  const updateRevRow = (index: number, patch: Partial<RevRow>) => {
    setRevRows((rows) =>
      rows.map((row, i) => {
        if (i !== index) return row;

        const updated = { ...row, ...patch };
        const hasManualEntry =
          updated.dateRevised || updated.description || updated.revisedBy;

        if (row.placeholder && hasManualEntry) {
          updated.placeholder = false;
        }

        return updated;
      }),
    );
  };

  const addRevRow = () => {
    setRevRows((rows) => [
      ...rows,
      {
        revNo: nextRevNo(rows),
        placeholder: true,
        dateRevised: "",
        description: "",
        revisedBy: "",
      },
    ]);
    showToast?.("Revision row added");
  };

  return (
    <>
      <SectionDivider label="Revision History (Page 2 of exported document)" />

      <p className="mb-3 text-xs text-gray-600">
        Full revision history table appears on the page immediately after the
        cover page in the exported .docx. Revision No. is system-generated; other
        fields are editable.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-[100px] border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                Revision No.
                <br />
                <span className="text-[10px] font-normal">System-generated</span>
              </th>
              <th className="w-[120px] border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                Date Revised
                <br />
                <span className="text-[10px] font-normal">Manual entry</span>
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                Description of Changes
                <br />
                <span className="text-[10px] font-normal">Manual entry</span>
              </th>
              <th className="w-[140px] border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">
                Revised By
                <br />
                <span className="text-[10px] font-normal">Manual entry</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {revRows.map((row, index) => (
              <tr key={`${row.revNo}-${index}`}>
                <td
                  className={cn(
                    "border border-gray-200 px-3 py-1.5 font-mono",
                    row.placeholder ? "text-gray-500" : "text-gray-700",
                  )}
                >
                  {row.revNo}
                </td>
                <td className="border border-gray-200 px-3 py-1.5">
                  {isEditing ? (
                    <input
                      className="w-full border-0 bg-transparent font-sans text-xs text-gray-800 focus:outline-none"
                      type="date"
                      value={row.dateRevised}
                      onChange={(event) =>
                        updateRevRow(index, { dateRevised: event.target.value })
                      }
                    />
                  ) : (
                    <span className="text-gray-700">
                      {row.dateRevised
                        ? new Date(
                            `${row.dateRevised}T12:00:00`,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  )}
                </td>
                <td className="border border-gray-200 px-3 py-1.5">
                  {isEditing ? (
                    <input
                      className={cn(
                        "w-full border-0 bg-transparent font-sans text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none",
                        row.placeholder &&
                          !row.description &&
                          "text-gray-500",
                      )}
                      placeholder={
                        row.placeholder ? "Enter description..." : undefined
                      }
                      value={row.description}
                      onChange={(event) =>
                        updateRevRow(index, { description: event.target.value })
                      }
                    />
                  ) : (
                    <span
                      className={cn(
                        "text-gray-700",
                        row.placeholder &&
                          !row.description &&
                          "text-gray-500",
                      )}
                    >
                      {row.description || "—"}
                    </span>
                  )}
                </td>
                <td className="border border-gray-200 px-3 py-1.5">
                  {isEditing ? (
                    <input
                      className={cn(
                        "w-full border-0 bg-transparent font-sans text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none",
                        row.placeholder && !row.revisedBy && "text-gray-500",
                      )}
                      placeholder={
                        row.placeholder ? "Revised by..." : undefined
                      }
                      value={row.revisedBy}
                      onChange={(event) =>
                        updateRevRow(index, { revisedBy: event.target.value })
                      }
                    />
                  ) : (
                    <span
                      className={cn(
                        "text-gray-700",
                        row.placeholder && !row.revisedBy && "text-gray-500",
                      )}
                    >
                      {row.revisedBy || "—"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <button
          className="mt-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={addRevRow}
        >
          + Add Revision Row
        </button>
      )}
    </>
  );
}
