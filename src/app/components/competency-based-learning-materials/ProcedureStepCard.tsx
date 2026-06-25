export type ProcedureStep = {
  label: string;
  instruction: string;
};

export function ProcedureStepCard({
  index,
  step,
  onChange,
  onRemove,
}: {
  index: number;
  step: ProcedureStep;
  onChange: (next: ProcedureStep) => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[11px] font-bold text-white">
          {index + 1}
        </div>
        <input
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1 text-xs font-medium text-gray-800 outline-none focus:border-blue-500"
          value={step.label}
          onChange={(event) => onChange({ ...step, label: event.target.value })}
        />
        <button
          aria-label={`Remove step ${index + 1}`}
          className="shrink-0 rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-red-50 hover:text-red-600"
          type="button"
          onClick={onRemove}
        >
          ✕
        </button>
      </div>
      <div className="p-3">
        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500"
          rows={3}
          value={step.instruction}
          onChange={(event) =>
            onChange({ ...step, instruction: event.target.value })
          }
        />
      </div>
    </div>
  );
}
