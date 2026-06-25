import { useState } from "react";

import {
  FieldReadOnly,
  SectionDivider,
  fieldTextareaClass,
} from "../CblmFieldPrimitives";

function PccChecklistItemCard({
  index,
  item,
  onChange,
  onRemove,
}: {
  index: number;
  item: string;
  onChange: (next: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1 text-xs font-medium text-gray-800">
          Criterion {index + 1}
        </div>
        <button
          className="shrink-0 rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600"
          type="button"
          onClick={onRemove}
        >
          ✕
        </button>
      </div>
      <div className="p-3">
        <textarea
          className={fieldTextareaClass}
          rows={3}
          value={item}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export function PccEditor({ sheetCode = "1.1-3" }: { sheetCode?: string }) {
  const [items, setItems] = useState([
    "PPE donned correctly — insulating gloves inspected, EH footwear and high-visibility vest worn before approaching vehicle.",
    "LOTO applied — ignition off, key fob removed, MSD disengaged, lockout tag applied, and zero-voltage verified with approved meter.",
    "Work area secured — warning signs posted within 2 metres and vehicle confirmed stable on level surface with parking brake applied.",
    "Documentation complete — pre-inspection safety checklist signed and filed per fleet standard before visual inspection begins.",
  ]);

  const updateItem = (index: number, next: string) => {
    setItems(items.map((item, i) => (i === index ? next : item)));
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <>
      <FieldReadOnly label="Paired Sheet" value="Task Sheet 1.1-3" />
      <SectionDivider label="Checklist Items" />
      <div className="mb-3 flex justify-end">
        <button
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          type="button"
          onClick={() => setItems([...items, ""])}
        >
          + Add Criterion
        </button>
      </div>
      {items.map((item, index) => (
        <PccChecklistItemCard
          key={index}
          index={index}
          item={item}
          onChange={(next) => updateItem(index, next)}
          onRemove={() => removeItem(index)}
        />
      ))}
    </>
  );
}
