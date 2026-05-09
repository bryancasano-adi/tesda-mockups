import { FlagIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState, useRef } from "react";
import { SheetKind } from "../../pages/competency-based-learning-materials/Dashboard";
import { loData } from "@/app/data/cblmData";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

function FieldLabel({
  label,
  editable = true,
  children,
}: {
  label: string;
  editable?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="mb-1.5 flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span
        className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${
          editable
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-gray-200 bg-gray-100 text-gray-500"
        }`}
      >
        {editable ? "✏ Editable" : "🔒 Read-only"}
      </span>
      {children}
    </div>
  );
}

function AiRegenButton({
  onClick,
  label = "✨ Regenerate",
  small = false,
}: {
  onClick: () => void;
  label?: string;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded border border-violet-200 bg-violet-50 font-semibold text-violet-700 transition-colors hover:border-violet-600 hover:bg-violet-600 hover:text-white ${
        small ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]"
      }`}
    >
      <SparklesIcon className={small ? "h-2.5 w-2.5" : "h-3 w-3"} />
      {label}
    </button>
  );
}

function AiRegenBox({
  open,
  onClose,
  fieldName,
  placeholder,
  hint,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  fieldName: string;
  placeholder?: string;
  hint?: string;
  onSubmit: (instruction: string) => void;
}) {
  const [instruction, setInstruction] = useState("");
  if (!open) return null;
  return (
    <div className="mt-2 overflow-hidden rounded-md border border-violet-200 bg-violet-50">
      <div className="flex items-center gap-2 border-b border-violet-200 bg-violet-100 px-3 py-2">
        <span className="text-[11px] font-semibold text-violet-800">
          ✨ AI Regenerate — {fieldName}
        </span>
        <button
          onClick={onClose}
          className="ml-auto text-sm text-violet-600 hover:text-violet-900"
        >
          ✕
        </button>
      </div>
      <div className="p-3">
        <textarea
          className="min-h-[56px] w-full rounded border border-violet-200 px-3 py-2 text-xs italic text-gray-600 placeholder:text-violet-300 focus:border-violet-500 focus:outline-none"
          placeholder={
            placeholder ||
            "Optional: Give the AI specific instructions, or leave blank to regenerate."
          }
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 border-t border-violet-100 px-3 py-2">
        <span className="text-[10px] text-violet-500">
          {hint || "Leave blank to regenerate based on the same inputs."}
        </span>
        <button
          onClick={() => {
            onSubmit(instruction);
            setInstruction("");
          }}
          className="ml-auto inline-flex items-center gap-1.5 rounded bg-violet-700 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-violet-800"
        >
          <SparklesIcon className="h-3 w-3" />
          Regenerate Now
        </button>
      </div>
    </div>
  );
}

function useRegenState() {
  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSubmit = (_instruction: string) => {
    setOpen(false);
    setGenerating(true);
    timerRef.current = setTimeout(() => setGenerating(false), 1800);
  };
  return { open, setOpen, generating, handleSubmit };
}

function GeneratingBar({
  visible,
  label,
}: {
  visible: boolean;
  label: string;
}) {
  if (!visible) return null;
  return (
    <div className="mt-2 flex items-center gap-2 rounded border border-violet-200 bg-violet-100 px-3 py-2 text-xs text-violet-700">
      <svg
        className="h-3.5 w-3.5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      Regenerating {label}…
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

/** Shared meta strip */
function MetaStrip({
  items,
}: {
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-[18px] rounded border border-gray-200 bg-white px-4 py-3">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {item.label}
          </span>
          <div className="text-[13px] font-medium text-gray-700">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shared read-only source block */
function SourceField({
  label,
  source,
  children,
}: {
  label: string;
  source: "cbc" | "clm" | "cs";
  children: ReactNode;
}) {
  const colors = {
    cbc: "border-blue-600 bg-blue-50",
    clm: "border-green-600 bg-green-50",
    cs: "border-violet-600 bg-violet-50",
  };
  const badges = {
    cbc: "text-blue-700",
    clm: "text-green-700",
    cs: "text-violet-700",
  };
  const icons = {
    cbc: "📋 Source: CBC",
    clm: "🗺️ Source: CLM",
    cs: "📝 Source: CS",
  };
  return (
    <div
      className={`rounded border-l-4 p-3 text-xs leading-6 text-gray-700 ${colors[source]}`}
    >
      <span
        className={`mb-1 block text-[10px] font-semibold ${badges[source]}`}
      >
        {icons[source]} — {label}
      </span>
      {children}
    </div>
  );
}

/** Shared references table */
function ReferencesTable({
  refs = [
    { name: "FBS-CBC-NC2-2023-v1.pdf", type: "CBC" },
    { name: "TRS-CS-NC2-Food-Beverage-2022.pdf", type: "CS" },
    { name: "CLM-Food-Beverage-NC2-v2.pdf", type: "CLM" },
  ],
}: {
  refs?: { name: string; type: string }[];
}) {
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const typeColors: Record<string, string> = {
    CBC: "bg-blue-100 text-blue-700",
    CS: "bg-violet-100 text-violet-700",
    CLM: "bg-green-100 text-green-700",
  };
  return (
    <>
      <table className="mb-2 w-full border-collapse overflow-hidden rounded border border-gray-200">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
              Document / URL
            </th>
            <th className="w-30 px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
              Type
            </th>
            <th className="w-45 px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {refs.map((ref, i) => (
            <tr
              key={i}
              className={`border-t border-gray-100 hover:bg-gray-50 ${flagged[i] ? "bg-red-50" : ""}`}
            >
              <td
                className={`px-4 py-2.5 font-mono text-xs ${flagged[i] ? "text-red-600" : "text-gray-700"}`}
              >
                {ref.name}
              </td>
              <td className="px-4 py-2.5">
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${typeColors[ref.type] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {ref.type}
                </span>
              </td>
              <td className="flex items-left justify-left gap-2 px-4 py-2.5">
                <button className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100">
                  ✏ Edit
                </button>
                <button
                  onClick={() => setFlagged((p) => ({ ...p, [i]: !p[i] }))}
                  className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[11px] ${
                    flagged[i]
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  🚩 {flagged[i] ? "Flagged" : "Flag"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-4 text-[11px] text-gray-400">
        📌 References show filenames or URLs only — no clickable links. Trainers
        verify source documents independently.
      </p>
    </>
  );
}

/** Dynamic editable list (materials, safety, etc.) */
function DynList({ defaultItems }: { defaultItems: string[] }) {
  const [items, setItems] = useState(defaultItems);
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            defaultValue={item}
            className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-blue-500"
          />
          <button
            onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}
            className="text-gray-300 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => setItems((p) => [...p, ""])}
        className="mt-1 inline-flex items-center gap-1 rounded border border-dashed border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
      >
        + Add Item
      </button>
    </div>
  );
}

function StepCards({ steps }: { steps: { title: string; body: string }[] }) {
  const [list, setList] = useState(steps);
  return (
    <div className="flex flex-col gap-2">
      {list.map((step, i) => (
        <div
          key={i}
          className="overflow-hidden rounded border border-gray-200 bg-white"
        >
          <div className="flex items-center gap-2.5 border-b border-gray-200 bg-gray-50 px-3.5 py-2">
            <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gray-800 text-[11px] font-bold text-white">
              {i + 1}
            </span>
            <span className="flex-1 text-xs font-medium text-gray-700">
              {step.title}
            </span>
            <AiRegenButton onClick={() => {}} label="✨" small />
            <button
              onClick={() => setList((p) => p.filter((_, idx) => idx !== i))}
              className="text-gray-300 hover:text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
          <div className="p-3.5">
            <textarea
              className="w-full resize-none rounded border border-gray-200 px-2.5 py-2 text-xs text-gray-700 outline-none focus:border-blue-500"
              defaultValue={step.body}
              rows={2}
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          setList((p) => [...p, { title: `Step ${p.length + 1}`, body: "" }])
        }
        className="mt-1 inline-flex items-center gap-1 rounded border border-dashed border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
      >
        + Add Step
      </button>
    </div>
  );
}

function QuestionCard({
  num,
  stem,
  choices,
  correct,
}: {
  num: number;
  stem: string;
  choices: string[];
  correct: string;
}) {
  const regen = useRegenState();
  return (
    <div className="mb-2.5 overflow-hidden rounded-md border border-gray-200 bg-white">
      <div className="flex items-center gap-2.5 border-b border-violet-200 bg-violet-50 px-3.5 py-2">
        <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-violet-700 text-[11px] font-bold text-white">
          {num}
        </span>
        <span className="flex-1 text-xs font-medium text-violet-800">
          Question {num}
        </span>
        <AiRegenButton onClick={() => regen.setOpen((o) => !o)} small />
        <button className="text-gray-300 hover:text-red-500 text-sm">✕</button>
      </div>
      <div className="p-3.5">
        <textarea
          className="mb-2.5 w-full resize-none rounded border border-gray-300 px-2.5 py-2 text-xs text-gray-700 outline-none focus:border-violet-500"
          defaultValue={stem}
          rows={2}
        />
        <div className="flex flex-col gap-1">
          {choices.map((choice, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="w-4 text-[11px] font-bold text-violet-700">
                  {letter}.
                </span>
                <input
                  type="text"
                  defaultValue={choice}
                  className="flex-1 rounded border border-gray-200 px-2.5 py-1 text-xs text-gray-700 outline-none focus:border-violet-500"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex items-center gap-2.5 border-t border-gray-100 pt-2">
          <span className="text-[11px] font-semibold text-gray-600">
            Correct Answer:
          </span>
          {["A", "B", "C", "D"].map((l) => (
            <label key={l} className="flex items-center gap-1 text-xs">
              <input
                type="radio"
                name={`q${num}ans`}
                defaultChecked={l === correct}
              />
              {l}
            </label>
          ))}
        </div>
      </div>
      <AiRegenBox
        open={regen.open}
        onClose={() => regen.setOpen(false)}
        fieldName={`Question ${num}`}
        placeholder={`e.g., 'Make it harder' or 'Add a scenario context'`}
        hint="Uses IS content."
        onSubmit={regen.handleSubmit}
      />
      <GeneratingBar visible={regen.generating} label={`Q${num}`} />
    </div>
  );
}

function EditabilityLegend() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 rounded border border-gray-200 bg-white px-4 py-2 text-[11px] text-gray-600">
      <span className="font-semibold text-gray-700">Field editability:</span>
      <span className="flex items-center gap-1.5">
        <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
          🔒 Read-only
        </span>
        Copied from CS / CBC / CLM
      </span>
      <span className="flex items-center gap-1.5">
        <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
          ✏ Editable
        </span>
        LLM synthesized — trainer may edit or regenerate
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
          <SparklesIcon className="h-2.5 w-2.5" /> Regenerate
        </span>
        AI-assisted rewrite of that field
      </span>
    </div>
  );
}

function InformationSheetContent() {
  const [flaggedRefs, setFlaggedRefs] = useState<Record<number, boolean>>({
    2: true,
  });

  const loRegen = useRegenState();
  const bodyRegen = useRegenState();
  const imgRegen = useRegenState();
  const scRegen = useRegenState();
  const pccRegen = useRegenState();

  const refs = [
    { name: "FBS-CBC-NC2-2023-v1.pdf", type: "CBC", typeColor: "blue" },
    {
      name: "TRS-CS-NC2-Food-Beverage-2022.pdf",
      type: "CS",
      typeColor: "violet",
    },
    { name: "CLM-Food-Beverage-NC2-v2.pdf", type: "CLM", typeColor: "green" },
  ];

  return (
    <>
      <EditabilityLegend />
      {/* ── Meta strip ── */}
      <div className="mb-4 flex flex-wrap items-start gap-6 rounded border border-gray-200 bg-white px-5 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Sheet Code
          </span>
          <span className="font-mono text-sm font-semibold text-blue-700">
            IS 5.2.1
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Module · LO · Item
          </span>
          <span className="text-sm text-gray-600">
            Module 5 · LO 2 · Item 1
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            IS Title
            <span className="rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
              🔒 Read-only
            </span>
          </span>
          <span className="text-[15px] font-bold text-gray-900">
            Customer Complaint Handling Procedures
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Phase
          </span>
          <span className="text-xs font-medium text-orange-600">
            Phase 1 — No web sources
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Status
          </span>
          <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
            ⚑ Needs Review
          </span>
        </div>
      </div>

      {/* ── Learning Objective ── */}
      <div className="mb-4">
        <FieldLabel label="Learning Objective">
          <AiRegenButton onClick={() => loRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="min-h-[72px] w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
          defaultValue="At the end of this Information Sheet, you should be able to: identify the proper steps in addressing customer complaints, apply de-escalation techniques in a service environment, and document customer complaint resolutions in accordance with TESDA service quality standards."
        />
        <AiRegenBox
          open={loRegen.open}
          onClose={() => loRegen.setOpen(false)}
          fieldName="Learning Objective"
          placeholder="Optional: e.g., 'Make it more practical and skills-focused' or 'Add a third objective about empathy' or 'Keep it to one sentence'"
          onSubmit={loRegen.handleSubmit}
        />
        <GeneratingBar
          visible={loRegen.generating}
          label="Learning Objective"
        />
        <p className="mt-1 text-[11px] text-gray-400">
          SMART objective (Specific, Measurable, Attainable, Relevant,
          Time-bounded) for this content item.
        </p>
      </div>

      {/* ── Body Content (RTE) ── */}
      <div className="mb-4">
        <FieldLabel label="Body Content">
          <AiRegenButton onClick={() => bodyRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <div className="overflow-hidden rounded border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-1.5">
            {["B", "I", "U", "H2", "H3", "• List", "1. List", "Table"].map(
              (item, i) => (
                <button
                  key={i}
                  className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
                >
                  {item === "B" ? (
                    <strong>B</strong>
                  ) : item === "I" ? (
                    <em>I</em>
                  ) : item === "U" ? (
                    <u>U</u>
                  ) : (
                    item
                  )}
                </button>
              ),
            )}
          </div>
          {/* Editable body */}
          <div
            className="min-h-[180px] p-4 text-sm leading-7 text-gray-700 outline-none"
            contentEditable
            suppressContentEditableWarning
          >
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              1. Introduction to Customer Complaints
            </h3>
            <p className="mb-3">
              Customer complaints are formal or informal expressions of
              dissatisfaction with a product, service, or experience. In the
              food and beverage sector, handling complaints professionally is a
              critical competency that directly impacts customer retention and
              establishment reputation.
            </p>
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              2. Types of Customer Complaints
            </h3>
            <ul className="mb-3 list-disc pl-5">
              <li>
                <strong>Service complaints</strong> — slow service, inattentive
                staff, incorrect orders
              </li>
              <li>
                <strong>Product complaints</strong> — food quality, temperature,
                presentation
              </li>
              <li>
                <strong>Facility complaints</strong> — cleanliness, ambiance,
                accessibility
              </li>
              <li>
                <strong>Billing complaints</strong> — incorrect charges, pricing
                disputes
              </li>
            </ul>
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              3. The L.A.S.T. Framework for Complaint Handling
            </h3>
            <ul className="mb-3 list-disc pl-5">
              <li>
                <strong>L — Listen:</strong> Give the customer full attention.
              </li>
              <li>
                <strong>A — Apologize:</strong> Offer a sincere, non-defensive
                apology.
              </li>
              <li>
                <strong>S — Solve:</strong> Propose and implement an appropriate
                remedy.
              </li>
              <li>
                <strong>T — Thank:</strong> Express gratitude for the customer's
                feedback.
              </li>
            </ul>
            <h3 className="mb-2 text-sm font-semibold text-blue-900">
              4. Documentation and Escalation
            </h3>
            <p>
              All complaints must be recorded in the Complaint Log. Unresolved
              complaints must be escalated to the supervisor within 15 minutes.
            </p>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] text-gray-400">
            📌 Phase 1 — Sources: LLM knowledge + CS / CBC / CLM only. No URL
            fetch active.
          </div>
        </div>
        <AiRegenBox
          open={bodyRegen.open}
          onClose={() => bodyRegen.setOpen(false)}
          fieldName="Body Content"
          placeholder="Optional: e.g., 'Add a section on cultural sensitivity in Filipino service contexts' or 'Simplify the language for NC II level learners'"
          hint="Regeneration uses Phase 1 inputs (CS/CBC/CLM + LLM). No web access."
          onSubmit={bodyRegen.handleSubmit}
        />
        <GeneratingBar visible={bodyRegen.generating} label="Body Content" />
      </div>

      {/* ── Image Description ── */}
      <div className="mb-4">
        <FieldLabel label="Recommended Image Description">
          <AiRegenButton onClick={() => imgRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <div className="overflow-hidden rounded border border-gray-200">
          <div className="flex items-center gap-2 border-b border-violet-100 bg-violet-50 px-4 py-2">
            <span className="text-[11px] font-semibold text-violet-700">
              🎨 Image Generation Prompt
            </span>
            <span className="text-[10px] text-violet-400">
              K-Galing outputs this text prompt only — trainer uses an external
              image tool (e.g., Adobe Firefly)
            </span>
          </div>
          <textarea
            className="min-h-[56px] w-full border-0 px-4 py-3 text-xs text-gray-600 focus:outline-none"
            defaultValue="A Filipino food service professional in uniform calmly speaking with a seated customer at a restaurant table. Empathetic expression, holding a notepad. Clean, well-lit restaurant interior. Realistic, professional style. Suitable for TESDA educational training material."
          />
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] text-gray-400">
            Trainer copies this prompt to an external image tool. K-Galing does
            not generate images directly.
          </div>
        </div>
        <AiRegenBox
          open={imgRegen.open}
          onClose={() => imgRegen.setOpen(false)}
          fieldName="Image Prompt"
          placeholder="Optional: e.g., 'Show a team meeting context instead of one-on-one' or 'Include a hotel setting'"
          hint="AI will produce a new image description prompt for the trainer to use externally."
          onSubmit={imgRegen.handleSubmit}
        />
        <GeneratingBar
          visible={imgRegen.generating}
          label="Image Description"
        />
      </div>

      {/* ── CBC / CLM Read-only sources ── */}
      <SectionDivider label="CBC / CLM Source Content — Read-Only" />
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel label="Assessment Criteria for LO 2" editable={false} />
          <div className="rounded border-l-4 border-blue-600 bg-blue-50 p-3 text-xs leading-6 text-gray-700">
            <span className="mb-1 block text-[10px] font-semibold text-blue-700">
              📋 Source: CBC
            </span>
            <ol className="list-decimal pl-4">
              <li>Customer complaints resolved per establishment standards</li>
              <li>De-escalation techniques applied per TESDA standards</li>
              <li>Complaint resolution documented per establishment SOP</li>
            </ol>
          </div>
        </div>
        <div>
          <FieldLabel label="Methodologies" editable={false} />
          <div className="rounded border-l-4 border-green-600 bg-green-50 p-3 text-xs leading-6 text-gray-700">
            <span className="mb-1 block text-[10px] font-semibold text-green-700">
              🗺️ Source: CLM
            </span>
            <ul className="list-disc pl-4">
              <li>Lecture / Discussion</li>
              <li>Role-playing and simulation</li>
              <li>Case study analysis</li>
              <li>Demonstration</li>
            </ul>
            <p className="mt-2 text-[10px] italic text-gray-400">
              Formative assessment methods — separate from CATS summative.
            </p>
          </div>
        </div>
      </div>

      {/* ── Self-Check preview ── */}
      <SectionDivider label="SC 5.2.1 — Self-Check Preview (next sheet)" />
      <div className="mb-4 overflow-hidden rounded border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-violet-200 bg-violet-50 px-4 py-2.5">
          <span className="text-[11px] font-semibold text-violet-800">
            SELF-CHECK 5.2.1
          </span>
          <span className="text-[10px] text-violet-500">
            Paired to IS 5.2.1 — comprehension validation
          </span>
          <AiRegenButton
            label="✨ Regenerate Questions"
            onClick={() => scRegen.setOpen((o) => !o)}
          />
        </div>
        <div className="p-4">
          <div className="mb-3">
            <FieldLabel label="Type of Test" />
            <select className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none">
              <option selected>Multiple Choice</option>
              <option>Matching Type</option>
              <option>Fill in the Blanks</option>
              <option>Enumeration</option>
              <option>Essay</option>
              <option>Multiple Choice + Essay</option>
            </select>
            <p className="mt-1 text-[11px] text-gray-400">
              AI generates questions appropriate for the selected test type.
            </p>
          </div>
          <div className="rounded border border-gray-200 bg-gray-50 p-3 text-xs leading-6 text-gray-600">
            <strong>Direction:</strong> Choose the letter of the best answer.
            Write your answer on a separate sheet.
            <div className="mt-2">
              1. Which of the following best describes a service complaint?
              <br />
              <span className="ml-4">
                a. Food is cold &nbsp; b. Slow service &nbsp; c. Incorrect bill
                &nbsp; d. Dirty restroom
              </span>
            </div>
            <div className="mt-1.5">
              2. What does the "A" in the L.A.S.T. framework stand for?
              <br />
              <span className="ml-4">
                a. Acknowledge &nbsp; b. Apologize &nbsp; c. Act &nbsp; d.
                Analyze
              </span>
            </div>
            <div className="mt-1.5 italic text-gray-400">
              …5 questions total
            </div>
          </div>
        </div>
        <AiRegenBox
          open={scRegen.open}
          onClose={() => scRegen.setOpen(false)}
          fieldName="Self-Check Questions"
          placeholder="Optional: e.g., 'Make question 3 harder' or 'Add a scenario-based question' or 'Change to 8 items'"
          hint="Regeneration uses IS 5.2.1 content as primary input."
          onSubmit={scRegen.handleSubmit}
        />
        <GeneratingBar
          visible={scRegen.generating}
          label="Self-Check Questions"
        />
      </div>

      {/* ── PCC Preview ── */}
      <SectionDivider label="PCC 5.2.1 — Performance Criteria Checklist Preview" />
      <div className="mb-4 overflow-hidden rounded border border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-orange-200 bg-orange-50 px-4 py-2.5">
          <span className="text-[11px] font-semibold text-orange-800">
            PERFORMANCE CRITERIA CHECKLIST 5.2.1
          </span>
          <span className="text-[10px] text-orange-600">
            Paired to TS 5.2.1
          </span>
          <AiRegenButton
            label="✨ Regenerate Criteria"
            onClick={() => pccRegen.setOpen((o) => !o)}
          />
        </div>
        <div className="p-4">
          <p className="mb-3 text-xs text-gray-500">
            Trainee's Name: _______________________ &nbsp;&nbsp; Date:
            _______________
          </p>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-600 text-white">
                <th className="px-4 py-2.5 text-left">CRITERIA — Did you…</th>
                <th className="w-16 px-4 py-2.5 text-center">YES</th>
                <th className="w-16 px-4 py-2.5 text-center">NO</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Greet the customer calmly and professionally?",
                "Listen to the complaint without interrupting?",
                "Offer a sincere and non-defensive apology?",
                "Propose and implement an appropriate remedy?",
                "Thank the customer for raising the concern?",
                "Record the complaint in the Complaint Log?",
                "Escalate to supervisor within 15 minutes if unresolved?",
              ].map((criterion, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2.5">
                    {i + 1}. {criterion}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-500">
            Comments/Suggestions:{" "}
            _________________________________________________
          </p>
          <div className="mt-4 flex gap-8">
            {["Learning Facilitator / Trainer", "Trainee", "Date"].map(
              (sig) => (
                <div key={sig} className="flex-1">
                  <div className="mb-1 h-6 border-b border-gray-700" />
                  <p className="text-[10px] text-gray-500">{sig}</p>
                </div>
              ),
            )}
          </div>
        </div>
        <AiRegenBox
          open={pccRegen.open}
          onClose={() => pccRegen.setOpen(false)}
          fieldName="PCC Criteria"
          placeholder="Optional: e.g., 'Add a criterion about using de-escalation language' or 'Remove criterion 7 and replace with documentation step'"
          hint="Regeneration uses TS 5.2.1 steps and CBC assessment criteria as inputs."
          onSubmit={pccRegen.handleSubmit}
        />
        <GeneratingBar visible={pccRegen.generating} label="PCC Criteria" />
      </div>

      <SectionDivider label="References for IS 5.2.1 — Auto-compiled · Trainer may edit or flag" />
      <div className="mb-6 overflow-hidden rounded border border-gray-200">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
                Document / URL
              </th>
              <th className="w-30 px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
                Type
              </th>
              <th className="w-45 px-4 py-2.5 text-left text-[11px] font-semibold uppercase text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {refs.map((ref, i) => (
              <tr
                key={i}
                className={`border-t border-gray-100 hover:bg-gray-50 ${
                  flaggedRefs[i] ? "bg-red-50" : ""
                }`}
              >
                <td
                  className={`px-4 py-2.5 font-mono ${
                    flaggedRefs[i] ? "text-red-600" : "text-gray-700"
                  }`}
                >
                  {ref.name}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      ref.type === "CBC"
                        ? "bg-blue-100 text-blue-700"
                        : ref.type === "CS"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ref.type}
                  </span>
                </td>
                <td className="flex items-left justify-left gap-2 px-4 py-2.5">
                  <button className="rounded border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100">
                    ✏ Edit
                  </button>
                  <button
                    onClick={() =>
                      setFlaggedRefs((prev) => ({ ...prev, [i]: !prev[i] }))
                    }
                    className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[11px] transition-colors ${
                      flaggedRefs[i]
                        ? "border-red-200 bg-red-50 text-red-600"
                        : "border-gray-200 bg-white text-gray-500 hover:border-orange-300 hover:text-orange-600"
                    }`}
                  >
                    <FlagIcon className="h-3 w-3" />
                    {flaggedRefs[i] ? "Flagged" : "Flag"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-[11px] text-gray-400">
        📌 References show filenames or URLs only — no clickable links. Trainers
        verify source documents independently.
      </p>
    </>
  );
}

function SelfCheckContent() {
  const dirRegen = useRegenState();
  const allQRegen = useRegenState();
  const akRegen = useRegenState();

  const questions = [
    {
      stem: "Which of the following best describes a service complaint in the food and beverage sector?",
      choices: [
        "Food is cold or improperly prepared",
        "Slow or inattentive service from staff",
        "Incorrect billing amount charged",
        "Dirty or poorly maintained restroom",
      ],
      correct: "B",
    },
    {
      stem: 'What does the "A" in the L.A.S.T. framework for complaint handling stand for?',
      choices: [
        "Acknowledge",
        "Apologize",
        "Act immediately",
        "Analyze the situation",
      ],
      correct: "B",
    },
    {
      stem: "A guest in a food and beverage establishment begins raising their voice about a delayed order. What should the service staff do FIRST?",
      choices: [
        "Immediately offer a refund or discount",
        "Escalate to supervisor right away",
        "Listen calmly to the customer without interrupting",
        "Ask the customer to calm down first",
      ],
      correct: "C",
    },
    {
      stem: "How long does a staff member have to escalate an unresolved complaint to a supervisor, per establishment SOP?",
      choices: ["5 minutes", "10 minutes", "15 minutes", "30 minutes"],
      correct: "C",
    },
    {
      stem: "After resolving a customer complaint, what is the LAST step in the L.A.S.T. framework?",
      choices: [
        "Listen to any additional concerns",
        "Apologize again sincerely",
        "Solve the problem completely",
        "Thank the customer for their feedback",
      ],
      correct: "D",
    },
  ];

  return (
    <>
      <EditabilityLegend />

      {/* Meta strip */}
      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm text-violet-700">
                SC 5.2.1
              </span>
            ),
          },
          {
            label: "Paired IS",
            value: (
              <span className="text-sm text-blue-600">
                IS 5.2.1 — Customer Complaint Handling
              </span>
            ),
          },
          { label: "Module · LO", value: "Module 5 · LO 2" },
          {
            label: "Status",
            value: (
              <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                ⚑ Needs Review
              </span>
            ),
          },
        ]}
      />

      {/* Type of test */}
      <div className="mb-4">
        <FieldLabel label="Type of Test" />
        <select className="mt-1 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 focus:border-violet-500 focus:outline-none">
          {[
            "Multiple Choice",
            "Matching Type",
            "Fill in the Blanks",
            "Enumeration",
            "Essay",
            "Multiple Choice + Essay",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <p className="mt-1 text-[11px] text-gray-400">
          AI generates questions appropriate for the selected type. Changing
          type triggers a regeneration prompt.
        </p>
      </div>

      {/* Directions */}
      <div className="mb-4">
        <FieldLabel label="Directions / Instruction Text">
          <AiRegenButton onClick={() => dirRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
          defaultValue="Choose the letter of the best answer. Write your answer on a separate sheet of paper."
          rows={2}
        />
        <AiRegenBox
          open={dirRegen.open}
          onClose={() => dirRegen.setOpen(false)}
          fieldName="Directions"
          placeholder="e.g., 'Adjust for Fill in the Blanks format' or 'Make it shorter'"
          hint="Appears verbatim above the questions in the CBLM printout."
          onSubmit={dirRegen.handleSubmit}
        />
        <GeneratingBar visible={dirRegen.generating} label="Directions" />
      </div>

      {/* Questions */}
      <div className="mb-4">
        <FieldLabel label="Questions and Choices">
          <AiRegenButton
            onClick={() => allQRegen.setOpen((o) => !o)}
            label="✨ Regenerate All Questions"
          />
        </FieldLabel>
        <AiRegenBox
          open={allQRegen.open}
          onClose={() => allQRegen.setOpen(false)}
          fieldName="All Questions"
          placeholder="e.g., 'Make questions more scenario-based' or 'Change to 8 items'"
          hint="Regeneration uses IS 5.2.1 body content as primary input."
          onSubmit={allQRegen.handleSubmit}
        />
        <GeneratingBar visible={allQRegen.generating} label="All Questions" />
        <div className="mt-3">
          {questions.map((q, i) => (
            <QuestionCard
              key={i}
              num={i + 1}
              stem={q.stem}
              choices={q.choices}
              correct={q.correct}
            />
          ))}
        </div>
        <button className="mt-1 inline-flex items-center gap-1 rounded border border-dashed border-violet-400 px-3 py-1 text-xs text-violet-600 hover:bg-violet-50">
          + Add Question
        </button>
      </div>

      {/* Number of items (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Number of Items" editable={false} />
        <div className="rounded border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-600">
          5 items (auto-counted from question cards above)
        </div>
      </div>

      <SectionDivider label="Answer Key — AK 5.2.1 (linked)" />

      {/* Inline AK table */}
      <div className="mb-4">
        <FieldLabel label="Answer Key & Rationale">
          <AiRegenButton
            onClick={() => akRegen.setOpen((o) => !o)}
            label="✨ Regenerate Rationales"
          />
        </FieldLabel>
        <div className="mb-2 rounded border border-blue-200 bg-blue-50 px-3.5 py-2 text-[11px] text-blue-700">
          📌 AK 5.2.1 is a linked document — changes here sync to the Answer Key
          sheet.
        </div>
        <table className="w-full border-collapse overflow-hidden rounded border border-gray-200 text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th
                className="px-3.5 py-2 text-left font-semibold text-gray-500 uppercase"
                style={{ width: 60 }}
              >
                Item
              </th>
              <th
                className="px-3.5 py-2 text-left font-semibold text-gray-500 uppercase"
                style={{ width: 100 }}
              >
                Correct
              </th>
              <th className="px-3.5 py-2 text-left font-semibold text-gray-500 uppercase">
                Brief Rationale
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "1",
                "B",
                "Service complaints relate specifically to staff performance quality.",
              ],
              [
                "2",
                "B",
                "'A' in L.A.S.T. stands for Apologize — sincere apology.",
              ],
              [
                "3",
                "C",
                "Listen step: give full attention without interrupting.",
              ],
              [
                "4",
                "C",
                "Establishment SOP: escalate within 15 minutes if unresolved.",
              ],
              [
                "5",
                "D",
                "'T' in L.A.S.T. stands for Thank — express gratitude.",
              ],
            ].map(([num, ans, rat]) => (
              <tr key={num} className="border-t border-gray-100">
                <td className="px-3.5 py-2 font-semibold">{num}</td>
                <td className="px-3.5 py-2">
                  <select className="rounded border border-gray-200 px-2 py-1 text-xs">
                    {["A", "B", "C", "D"].map((l) => (
                      <option key={l} selected={l === ans}>
                        {l}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3.5 py-2">
                  <input
                    type="text"
                    defaultValue={rat}
                    className="w-full rounded border border-gray-200 px-2 py-1 text-xs outline-none focus:border-violet-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AiRegenBox
          open={akRegen.open}
          onClose={() => akRegen.setOpen(false)}
          fieldName="Rationales"
          placeholder="e.g., 'Make rationales more concise' or 'Add reference to TESDA standards'"
          hint="Uses IS 5.2.1 content as input."
          onSubmit={akRegen.handleSubmit}
        />
        <GeneratingBar visible={akRegen.generating} label="Rationales" />
      </div>

      <SectionDivider label="References — Auto-compiled · Trainer may edit or flag" />
      <ReferencesTable
        refs={[
          { name: "FBS-CBC-NC2-2023-v1.pdf", type: "CBC" },
          { name: "TRS-CS-NC2-Food-Beverage-2022.pdf", type: "CS" },
        ]}
      />
    </>
  );
}

function AnswerKeyContent() {
  const tableRegen = useRegenState();
  const footerRegen = useRegenState();

  return (
    <>
      <EditabilityLegend />

      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm text-green-700">AK 5.2.1</span>
            ),
          },
          {
            label: "Paired SC",
            value: (
              <span className="text-sm text-violet-600">
                SC 5.2.1 — Multiple Choice · 5 items
              </span>
            ),
          },
          { label: "Module · LO", value: "Module 5 · LO 2" },
          {
            label: "Status",
            value: (
              <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                ✓ Generated
              </span>
            ),
          },
        ]}
      />

      {/* Answer Key Table */}
      <div className="mb-4">
        <FieldLabel label="Answer Key Table">
          <AiRegenButton onClick={() => tableRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <table className="w-full border-collapse overflow-hidden rounded border border-gray-200 text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th
                className="px-3.5 py-2 text-left font-semibold uppercase text-gray-500"
                style={{ width: 60 }}
              >
                Item
              </th>
              <th
                className="px-3.5 py-2 text-left font-semibold uppercase text-gray-500"
                style={{ width: 80 }}
              >
                Correct
              </th>
              <th className="px-3.5 py-2 text-left font-semibold uppercase text-gray-500">
                Rationale
              </th>
              <th
                className="px-3.5 py-2 text-center font-semibold uppercase text-gray-500"
                style={{ width: 60 }}
              >
                Regen
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "1",
                "B",
                "Service complaints relate to staff performance quality.",
              ],
              [
                "2",
                "B",
                "'A' in L.A.S.T. stands for Apologize — sincere apology.",
              ],
              [
                "3",
                "C",
                "Listen step: give full attention without interrupting.",
              ],
              [
                "4",
                "C",
                "Establishment SOP: escalate within 15 minutes if unresolved.",
              ],
              [
                "5",
                "D",
                "'T' in L.A.S.T. stands for Thank — express gratitude.",
              ],
            ].map(([num, ans, rat]) => (
              <tr key={num} className="border-t border-gray-100">
                <td className="px-3.5 py-2 font-semibold">{num}</td>
                <td className="px-3.5 py-2">
                  <select className="rounded border border-gray-200 px-2 py-1 text-xs">
                    {["A", "B", "C", "D"].map((l) => (
                      <option key={l} selected={l === ans}>
                        {l}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3.5 py-2">
                  <input
                    type="text"
                    defaultValue={rat}
                    className="w-full rounded border border-gray-200 px-2 py-1 text-xs outline-none focus:border-green-500"
                  />
                </td>
                <td className="px-3.5 py-2 text-center">
                  <AiRegenButton onClick={() => {}} label="✨" small />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AiRegenBox
          open={tableRegen.open}
          onClose={() => tableRegen.setOpen(false)}
          fieldName="Answer Key Table"
          placeholder="e.g., 'Make rationales more concise'"
          hint="Uses IS/SC 5.2.1 content as inputs."
          onSubmit={tableRegen.handleSubmit}
        />
        <GeneratingBar
          visible={tableRegen.generating}
          label="Answer Key Table"
        />
      </div>

      {/* Footer Note */}
      <div className="mb-4">
        <FieldLabel label="Answer Key Footer Note">
          <AiRegenButton onClick={() => footerRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
          defaultValue="Refer to your Information Sheet if you scored below 80%. Retake the Self-Check after review. Ask your Learning Facilitator if you need clarification."
          rows={2}
        />
        <AiRegenBox
          open={footerRegen.open}
          onClose={() => footerRegen.setOpen(false)}
          fieldName="Footer Note"
          placeholder="e.g., 'Add encouragement for re-reading the IS'"
          hint="Uses Phase 1 inputs."
          onSubmit={footerRegen.handleSubmit}
        />
        <GeneratingBar visible={footerRegen.generating} label="Footer Note" />
      </div>

      <SectionDivider label="SC 5.2.1 — Question Stems (cross-reference)" />
      <SourceField label="SC 5.2.1 (read-only cross-reference)" source="cs">
        <ol className="list-decimal pl-4 text-xs leading-7">
          <li>
            Which of the following best describes a service complaint in the
            food and beverage sector?
          </li>
          <li>What does the "A" in the L.A.S.T. framework stand for?</li>
          <li>
            A guest raises their voice about a delayed order. What should staff
            do FIRST?
          </li>
          <li>
            How long does staff have to escalate an unresolved complaint to
            supervisor?
          </li>
          <li>
            After resolving a complaint, what is the LAST step in L.A.S.T.?
          </li>
        </ol>
      </SourceField>

      <SectionDivider label="References — Auto-compiled · Trainer may edit or flag" />
      <ReferencesTable />
    </>
  );
}

function TaskSheetContent() {
  const poRegen = useRegenState();
  const matsRegen = useRegenState();
  const condRegen = useRegenState();
  const stepsRegen = useRegenState();

  return (
    <>
      <EditabilityLegend />

      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm text-orange-600">
                TS 5.2.1
              </span>
            ),
          },
          {
            label: "Conditional",
            value: (
              <span className="rounded border border-yellow-300 bg-yellow-50 px-2 py-0.5 text-[11px] font-semibold text-yellow-700">
                ⚡ Conditional — LLM decided
              </span>
            ),
          },
          {
            label: "Paired PCC",
            value: <span className="text-sm text-red-600">PCC 5.2.1</span>,
          },
          {
            label: "Status",
            value: (
              <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                ✓ Generated
              </span>
            ),
          },
        ]}
      />

      {/* Task Title (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Task Title" editable={false} />
        <SourceField label="CBC — Content Item Title LO 2" source="cbc">
          Conduct a Complaint Resolution Role-Play
        </SourceField>
      </div>

      {/* Performance Objective */}
      <div className="mb-4">
        <FieldLabel label="Performance Objective">
          <AiRegenButton onClick={() => poRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          defaultValue="Given a simulated customer complaint scenario, the trainee shall demonstrate the ability to apply the L.A.S.T. framework to resolve the complaint within 10 minutes, achieving a score of at least 80% on the accompanying Performance Criteria Checklist (PCC 5.2.1)."
          rows={3}
        />
        <AiRegenBox
          open={poRegen.open}
          onClose={() => poRegen.setOpen(false)}
          fieldName="Performance Objective"
          placeholder="e.g., 'Add condition about professional tone' or 'Adjust standard to 70%'"
          hint="States what the trainee does, under what conditions, to what standard."
          onSubmit={poRegen.handleSubmit}
        />
        <GeneratingBar
          visible={poRegen.generating}
          label="Performance Objective"
        />
      </div>

      {/* Nominal Duration */}
      <div className="mb-4">
        <FieldLabel label="Nominal Duration" />
        <input
          type="text"
          defaultValue="45 minutes"
          className="w-44 rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-orange-500"
        />
        <p className="mt-1 text-[11px] text-gray-400">
          Recommended time to complete the task.
        </p>
      </div>

      {/* Materials */}
      <div className="mb-4">
        <FieldLabel label="Materials, Tools and Equipment">
          <AiRegenButton onClick={() => matsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <DynList
          defaultItems={[
            "Role-play scenario card (provided by trainer)",
            "Complaint Log form (TESDA template)",
            "Pen and writing materials",
            "Timer (for 10-minute scenario)",
          ]}
        />
        <AiRegenBox
          open={matsRegen.open}
          onClose={() => matsRegen.setOpen(false)}
          fieldName="Materials List"
          placeholder="e.g., 'Add a printed script for the assessor'"
          hint="Uses TS scenario context."
          onSubmit={matsRegen.handleSubmit}
        />
        <GeneratingBar visible={matsRegen.generating} label="Materials List" />
      </div>

      {/* Conditions */}
      <div className="mb-4">
        <FieldLabel label="Conditions / Safety Precautions">
          <AiRegenButton onClick={() => condRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none"
          defaultValue="Conduct role-play in a simulated service environment. No live customers involved. Supervisor must be present throughout. Trainee must not look at reference materials during performance."
          rows={2}
        />
        <AiRegenBox
          open={condRegen.open}
          onClose={() => condRegen.setOpen(false)}
          fieldName="Conditions / Safety"
          placeholder="e.g., 'Add note about language (English only)'"
          hint="Uses Phase 1 inputs."
          onSubmit={condRegen.handleSubmit}
        />
        <GeneratingBar
          visible={condRegen.generating}
          label="Conditions / Safety"
        />
      </div>

      {/* Steps */}
      <div className="mb-4">
        <FieldLabel label="Procedure / Steps">
          <AiRegenButton onClick={() => stepsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <AiRegenBox
          open={stepsRegen.open}
          onClose={() => stepsRegen.setOpen(false)}
          fieldName="All Steps"
          placeholder="e.g., 'Add a final debrief step' or 'Break step 3 into two parts'"
          hint="Uses L.A.S.T. framework and CBC assessment criteria."
          onSubmit={stepsRegen.handleSubmit}
        />
        <GeneratingBar visible={stepsRegen.generating} label="All Steps" />
        <div className="mt-2">
          <StepCards
            steps={[
              {
                title: "Set the Scene",
                body: "Trainer presents a written scenario card describing a specific customer complaint. Read it carefully before beginning.",
              },
              {
                title: "Approach the Customer",
                body: "Approach the role-play assessor calmly and professionally with a greeting.",
              },
              {
                title: "Listen",
                body: "Give the customer full, uninterrupted attention while they describe their complaint.",
              },
              {
                title: "Apologize",
                body: "Offer a sincere, non-defensive apology acknowledging the inconvenience caused.",
              },
              {
                title: "Solve",
                body: "Propose an appropriate remedy. Implement the solution or explain the next steps clearly.",
              },
              {
                title: "Thank",
                body: "Thank the customer sincerely for bringing the complaint to your attention.",
              },
              {
                title: "Document",
                body: "Complete the Complaint Log form with all relevant details: nature of complaint, action taken, time, and outcome.",
              },
            ]}
          />
        </div>
      </div>

      {/* Assessment Method (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Assessment Method" editable={false} />
        <SourceField label="CLM — LO 2" source="clm">
          Direct Observation by Training Facilitator using Performance Criteria
          Checklist (PCC 5.2.1). Minimum score: 80% (6 of 7 criteria marked
          YES).
        </SourceField>
      </div>

      {/* Conditional flag (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Conditional TS Flag" editable={false} />
        <div className="rounded border border-yellow-200 bg-yellow-50 px-3.5 py-2.5 text-xs text-yellow-800">
          ⚡ <strong>Task Sheet Conditional:</strong> This TS was generated
          because LO 2 assessment criteria include a practical/performance
          demonstration element.
        </div>
      </div>

      <SectionDivider label="PCC 5.2.1 — Performance Criteria Checklist Preview" />
      <div className="mb-4 rounded border border-red-100 bg-red-50 px-3.5 py-2 text-xs text-red-700">
        Paired to this Task Sheet. Edit full PCC in the PCC Editor tab.
      </div>
      <table className="mb-4 w-full border-collapse text-xs">
        <thead>
          <tr className="bg-slate-600 text-white">
            <th className="px-4 py-2.5 text-left">CRITERIA — Did you…</th>
            <th className="w-16 px-4 py-2.5 text-center">YES</th>
            <th className="w-16 px-4 py-2.5 text-center">NO</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Approach the customer calmly and professionally?",
            "Listen to the complaint without interrupting?",
            "Offer a sincere and non-defensive apology?",
            "Propose and implement an appropriate remedy?",
            "Thank the customer for raising the concern?",
            "Record the complaint in the Complaint Log?",
            "Complete the full task within 10 minutes?",
          ].map((c, i) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="px-4 py-2.5">
                {i + 1}. {c}
              </td>
              <td className="px-4 py-2.5 text-center">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2.5 text-center">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionDivider label="References — Auto-compiled · Trainer may edit or flag" />
      <ReferencesTable />
    </>
  );
}

function PerformanceCriterionContent() {
  const critRegen = useRegenState();
  const ratingRegen = useRegenState();
  const [criteria, setCriteria] = useState([
    "Greet the customer calmly and professionally?",
    "Listen to the complaint without interrupting?",
    "Offer a sincere and non-defensive apology?",
    "Propose and implement an appropriate remedy?",
    "Thank the customer for raising the concern?",
    "Record the complaint in the Complaint Log?",
    "Escalate to supervisor within 15 minutes if unresolved?",
  ]);

  return (
    <>
      <EditabilityLegend />

      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm text-red-600">PCC 5.2.1</span>
            ),
          },
          {
            label: "Paired TS",
            value: (
              <span className="text-sm text-orange-600">
                TS 5.2.1 — Complaint Resolution Role-Play
              </span>
            ),
          },
          {
            label: "Status",
            value: (
              <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                ✓ Generated
              </span>
            ),
          },
        ]}
      />

      {/* Trainee name strip */}
      <div className="mb-4 rounded border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-600">
        Trainee's Name:{" "}
        <span className="ml-1 inline-block w-44 border-b border-gray-400">
          &nbsp;
        </span>
        &nbsp;&nbsp; Date:{" "}
        <span className="ml-1 inline-block w-28 border-b border-gray-400">
          &nbsp;
        </span>
      </div>

      {/* Editable criteria list */}
      <div className="mb-4">
        <FieldLabel label='Criteria — "Did you…"'>
          <AiRegenButton onClick={() => critRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <div className="flex flex-col gap-1.5">
          {criteria.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 text-xs text-gray-500">{i + 1}.</span>
              <input
                type="text"
                defaultValue={c}
                className="flex-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs outline-none focus:border-red-400"
              />
              <span className="whitespace-nowrap text-[11px] text-gray-400">
                YES ☐ NO ☐
              </span>
              <button
                onClick={() =>
                  setCriteria((p) => p.filter((_, idx) => idx !== i))
                }
                className="text-gray-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCriteria((p) => [...p, "Did you…?"])}
          className="mt-2 inline-flex items-center gap-1 rounded border border-dashed border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
        >
          + Add Criterion
        </button>
        <p className="mt-1 text-[11px] text-gray-400">
          Each criterion maps to one TS procedural step. Use "Did you…"
          phrasing.
        </p>
        <AiRegenBox
          open={critRegen.open}
          onClose={() => critRegen.setOpen(false)}
          fieldName="PCC Criteria"
          placeholder="e.g., 'Add criterion about using de-escalation language'"
          hint="Uses TS 5.2.1 steps and CBC criteria."
          onSubmit={critRegen.handleSubmit}
        />
        <GeneratingBar visible={critRegen.generating} label="PCC Criteria" />
      </div>

      {/* Rating Scale Note */}
      <div className="mb-4">
        <FieldLabel label="Rating Scale Note">
          <AiRegenButton onClick={() => ratingRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
          defaultValue="Satisfactory: All criteria marked YES. Unsatisfactory: Any criterion marked NO requires immediate remediation before re-assessment."
          rows={2}
        />
        <AiRegenBox
          open={ratingRegen.open}
          onClose={() => ratingRegen.setOpen(false)}
          fieldName="Rating Scale Note"
          placeholder="e.g., 'Soften the language for trainees'"
          hint="Phase 1 inputs."
          onSubmit={ratingRegen.handleSubmit}
        />
        <GeneratingBar
          visible={ratingRegen.generating}
          label="Rating Scale Note"
        />
      </div>

      {/* Signature Block */}
      <div className="mb-4">
        <FieldLabel label="Signature Block" editable={false} />
        <div className="flex gap-8 mt-2">
          {["Learning Facilitator / Trainer", "Trainee", "Date"].map((sig) => (
            <div key={sig} className="flex-1">
              <div className="mb-1 h-6 border-b border-gray-700" />
              <p className="text-[10px] text-gray-500">{sig}</p>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider label="Live PCC Preview" />
      <table className="mb-4 w-full border-collapse border border-gray-400 text-xs">
        <thead>
          <tr>
            <th className="border border-slate-500 bg-slate-600 px-4 py-2.5 text-left text-white">
              CRITERIA — Did you…
            </th>
            <th className="w-16 border border-slate-500 bg-slate-600 px-4 py-2.5 text-center text-white">
              YES
            </th>
            <th className="w-16 border border-slate-500 bg-slate-600 px-4 py-2.5 text-center text-white">
              NO
            </th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((c, i) => (
            <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">
                {i + 1}. {c}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                ☐
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                ☐
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SectionDivider label="References — Auto-compiled" />
      <ReferencesTable />
    </>
  );
}

function OutcomeStatementContent() {
  const safetyRegen = useRegenState();
  const partsRegen = useRegenState();
  const stepsRegen = useRegenState();

  return (
    <>
      <EditabilityLegend />

      {/* Conditional banner */}
      <div className="mb-4 flex items-start gap-2.5 rounded border border-yellow-200 bg-yellow-50 px-4 py-3">
        <span className="text-base">⚡</span>
        <div>
          <strong className="text-orange-600">
            Operation Sheet — Conditionally Generated.
          </strong>{" "}
          <span className="text-xs text-yellow-800">
            This sheet was created because TS 5.3.1 references a commercial
            espresso machine (complex powered equipment).
          </span>
        </div>
      </div>

      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm text-amber-800">OS 5.3.1</span>
            ),
          },
          {
            label: "Triggered by",
            value: (
              <span className="text-sm text-orange-600">
                TS 5.3.1 — LO 3 Customer Requests
              </span>
            ),
          },
          {
            label: "Status",
            value: (
              <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                ✓ Validated
              </span>
            ),
          },
        ]}
      />

      {/* Equipment Name (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Equipment Name" editable={false} />
        <div className="rounded border-l-4 border-orange-500 bg-orange-50 px-3.5 py-2.5 text-sm text-gray-700">
          <span className="mb-1 block text-[10px] font-semibold text-orange-600">
            📋 Source: TS 5.3.1 Equipment List
          </span>
          Commercial Espresso Machine
        </div>
      </div>

      {/* Safety Precautions */}
      <div className="mb-4">
        <FieldLabel label="Safety Precautions">
          <AiRegenButton onClick={() => safetyRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <DynList
          defaultItems={[
            "Risk of burns from steam wand and hot surfaces — always use heat-resistant gloves when handling portafilter",
            "Electrical hazard — do not operate machine near water spills or with wet hands",
            "Cleaning chemicals — wear gloves when applying descaling solution",
          ]}
        />
        <AiRegenBox
          open={safetyRegen.open}
          onClose={() => safetyRegen.setOpen(false)}
          fieldName="Safety Precautions"
          placeholder="e.g., 'Add pressure monitoring precaution'"
          hint="Phase 1 inputs."
          onSubmit={safetyRegen.handleSubmit}
        />
        <GeneratingBar
          visible={safetyRegen.generating}
          label="Safety Precautions"
        />
      </div>

      {/* Parts and Functions */}
      <div className="mb-4">
        <FieldLabel label="Parts and Functions">
          <AiRegenButton onClick={() => partsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <table className="mb-2 w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-500"
                style={{ width: "35%" }}
              >
                Part Name
              </th>
              <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-500">
                Function
              </th>
              <th
                className="border border-gray-200 px-3 py-2 text-center"
                style={{ width: 48 }}
              >
                Del
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Boiler", "Heats water to brewing temperature (90–96°C)"],
              [
                "Group Head",
                "Delivers pressurised water through the portafilter to extract espresso",
              ],
              [
                "Portafilter",
                "Holds the coffee grounds; locks into the group head",
              ],
              ["Steam Wand", "Produces steam to heat and texture milk"],
              [
                "Pressure Gauge",
                "Displays boiler and pump pressure (target: 9 bar)",
              ],
              [
                "Drip Tray",
                "Collects overflow; must be emptied and cleaned regularly",
              ],
            ].map(([part, fn], i) => (
              <tr key={i}>
                <td className="border border-gray-200 p-1.5">
                  <input
                    type="text"
                    defaultValue={part}
                    className="w-full border-none bg-transparent text-xs outline-none"
                  />
                </td>
                <td className="border border-gray-200 p-1.5">
                  <input
                    type="text"
                    defaultValue={fn}
                    className="w-full border-none bg-transparent text-xs outline-none"
                  />
                </td>
                <td className="border border-gray-200 p-1.5 text-center">
                  <button className="text-gray-300 hover:text-red-500">
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="inline-flex items-center gap-1 rounded border border-dashed border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50">
          + Add Part
        </button>
        <AiRegenBox
          open={partsRegen.open}
          onClose={() => partsRegen.setOpen(false)}
          fieldName="Parts and Functions"
          placeholder="e.g., 'Add thermometer as a part'"
          hint="Phase 1 inputs."
          onSubmit={partsRegen.handleSubmit}
        />
        <GeneratingBar
          visible={partsRegen.generating}
          label="Parts and Functions"
        />
      </div>

      {/* Operating Steps */}
      <div className="mb-4">
        <FieldLabel label="Step-by-Step Operating Procedure">
          <AiRegenButton onClick={() => stepsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <AiRegenBox
          open={stepsRegen.open}
          onClose={() => stepsRegen.setOpen(false)}
          fieldName="Operating Steps"
          placeholder="e.g., 'Add a pre-shot flushing step'"
          hint="Phase 1 inputs."
          onSubmit={stepsRegen.handleSubmit}
        />
        <GeneratingBar
          visible={stepsRegen.generating}
          label="Operating Steps"
        />
        <div className="mt-2">
          <StepCards
            steps={[
              {
                title: "Power On and Warm-Up",
                body: "Turn on the main power switch. Allow the machine to heat (~5 minutes). Verify pressure gauge reads 9 bar.",
              },
              {
                title: "Check Water and Beans",
                body: "Verify the water reservoir is filled. Check coffee bean hopper level and refill if needed.",
              },
              {
                title: "Grind and Dose",
                body: "Grind coffee beans to the appropriate setting. Dose 18–20g into the portafilter basket.",
              },
              {
                title: "Tamp",
                body: "Apply firm, level pressure (~15–20kg force) on the coffee grounds. Wipe edge of portafilter.",
              },
              {
                title: "Lock and Extract",
                body: "Lock portafilter into group head. Initiate extraction. Target: 25–30ml espresso in 25–30 seconds.",
              },
              {
                title: "Steam Milk (if applicable)",
                body: "Purge steam wand before use. Submerge tip 1cm below milk surface. Stretch to 65°C.",
              },
              {
                title: "Serve",
                body: "Assemble the beverage per recipe. Present to the customer within 30 seconds of extraction.",
              },
              {
                title: "Shutdown Preparation",
                body: "At end of shift, turn off the machine. Follow the Shutdown/Cleaning Procedure.",
              },
            ]}
          />
        </div>
      </div>

      {/* Shutdown */}
      <div className="mb-4">
        <FieldLabel label="Shutdown / Cleaning Procedure" />
        <StepCards
          steps={[
            {
              title: "Remove Portafilter",
              body: "Remove portafilter. Empty and brush out spent grounds. Rinse portafilter basket with hot water.",
            },
            {
              title: "Clean Steam Wand",
              body: "Wipe steam wand with damp cloth immediately after use. Purge briefly to clear residue.",
            },
            {
              title: "Wipe Surfaces",
              body: "Wipe group head, drip tray, and all exterior surfaces with a clean damp cloth.",
            },
            {
              title: "Power Off and Cover",
              body: "Switch off the machine at the power button. Replace the machine cover if end-of-day service.",
            },
          ]}
        />
      </div>

      <div className="mb-4">
        <FieldLabel label="Estimated Operating Time" />
        <input
          type="text"
          defaultValue="15–20 minutes per session"
          className="w-52 rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-orange-500"
        />
      </div>

      <SectionDivider label="References — Auto-compiled" />
      <ReferencesTable />
    </>
  );
}

function JobSheetContent() {
  const titleRegen = useRegenState();
  const poRegen = useRegenState();
  const safetyRegen = useRegenState();
  const matsRegen = useRegenState();
  const scenarioRegen = useRegenState();
  const stepsRegen = useRegenState();
  const pccRegen = useRegenState();

  return (
    <>
      <EditabilityLegend />

      <MetaStrip
        items={[
          {
            label: "Sheet Code",
            value: (
              <span className="font-mono text-sm" style={{ color: "#1B3A5C" }}>
                JS 5
              </span>
            ),
          },
          {
            label: "Step",
            value: (
              <span className="text-sm text-blue-600">
                Step 3 — Consolidation
              </span>
            ),
          },
          {
            label: "Integrates",
            value: (
              <span className="text-sm text-gray-600">
                TS 5.1.1 · TS 5.2.1 · TS 5.3.1
              </span>
            ),
          },
          {
            label: "Status",
            value: (
              <span
                className="rounded px-2 py-0.5 text-xs font-semibold"
                style={{ background: "#E3E8F0", color: "#1B3A5C" }}
              >
                📝 In Progress
              </span>
            ),
          },
        ]}
      />

      {/* Job Title */}
      <div className="mb-4">
        <FieldLabel label="Job Title">
          <AiRegenButton onClick={() => titleRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <input
          type="text"
          defaultValue="Providing Effective Customer Service — Capstone Performance Activity"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
        <AiRegenBox
          open={titleRegen.open}
          onClose={() => titleRegen.setOpen(false)}
          fieldName="Job Title"
          placeholder="e.g., 'Make it shorter and more action-oriented'"
          hint="Phase 1 inputs."
          onSubmit={titleRegen.handleSubmit}
        />
        <GeneratingBar visible={titleRegen.generating} label="Job Title" />
      </div>

      {/* Performance Objective */}
      <div className="mb-4">
        <FieldLabel label="Performance Objective">
          <AiRegenButton onClick={() => poRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <textarea
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          defaultValue="Given a simulated food and beverage service scenario incorporating customer service, complaint handling, espresso preparation, and payment processing, the trainee shall demonstrate competency across all four Learning Outcomes of Module 5, achieving a score of 80% or above on the Job Sheet Performance Criteria Checklist."
          rows={4}
        />
        <AiRegenBox
          open={poRegen.open}
          onClose={() => poRegen.setOpen(false)}
          fieldName="Performance Objective"
          placeholder="e.g., 'Reframe to be more skill-focused'"
          hint="Phase 1 inputs."
          onSubmit={poRegen.handleSubmit}
        />
        <GeneratingBar
          visible={poRegen.generating}
          label="Performance Objective"
        />
      </div>

      {/* Nominal Time */}
      <div className="mb-4">
        <FieldLabel label="Nominal Time" />
        <input
          type="text"
          defaultValue="3 hours"
          className="w-36 rounded border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-blue-500"
        />
      </div>

      {/* Safety */}
      <div className="mb-4">
        <FieldLabel label="Safety Precautions">
          <AiRegenButton onClick={() => safetyRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <DynList
          defaultItems={[
            "Conduct all activities in a simulated, supervised environment. No live customer transactions.",
            "Follow espresso machine OS 5.3.1 safety precautions when operating powered equipment.",
            "All monetary transactions are simulated — no real currency involved.",
          ]}
        />
        <AiRegenBox
          open={safetyRegen.open}
          onClose={() => safetyRegen.setOpen(false)}
          fieldName="Safety Precautions"
          placeholder="e.g., 'Add note about TESDA observer requirements'"
          hint="Phase 1 inputs."
          onSubmit={safetyRegen.handleSubmit}
        />
        <GeneratingBar
          visible={safetyRegen.generating}
          label="Safety Precautions"
        />
      </div>

      {/* Materials */}
      <div className="mb-4">
        <FieldLabel label="Equipment, Tools and Materials">
          <AiRegenButton onClick={() => matsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <DynList
          defaultItems={[
            "Commercial espresso machine (per OS 5.3.1)",
            "Role-play scenario cards (customer service, complaint, payment scenarios)",
            "Complaint Log form, service log, simulated billing slips",
            "Uniform and personal protective equipment as required",
          ]}
        />
        <AiRegenBox
          open={matsRegen.open}
          onClose={() => matsRegen.setOpen(false)}
          fieldName="Materials List"
          placeholder="e.g., 'Add POS terminal simulation card'"
          hint="Phase 1 inputs."
          onSubmit={matsRegen.handleSubmit}
        />
        <GeneratingBar visible={matsRegen.generating} label="Materials List" />
      </div>

      {/* Scenario — RTE */}
      <div className="mb-4">
        <FieldLabel label="Scenario / Specifications — Rich Text">
          <AiRegenButton onClick={() => scenarioRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <div className="overflow-hidden rounded border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200">
          <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 px-3 py-1.5">
            {["B", "I", "U", "H2", "• List"].map((t, i) => (
              <button
                key={i}
                className="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
              >
                {t}
              </button>
            ))}
          </div>
          <div
            className="min-h-[140px] p-4 text-sm leading-7 text-gray-700 outline-none"
            contentEditable
            suppressContentEditableWarning
          >
            <p className="mb-2 font-semibold text-blue-900">
              Workplace Scenario
            </p>
            <p className="mb-2">
              You are a newly hired service crew member at a mid-range food and
              beverage establishment. On your first full shift, you are assigned
              to handle bar and counter service from opening until midday. The
              scenario covers four sequential service episodes:
            </p>
            <ol className="mb-2 list-decimal pl-5 text-sm">
              <li className="mb-1">
                <strong>Episode 1:</strong> Greet and serve a regular customer
                who orders a standard espresso beverage.
              </li>
              <li className="mb-1">
                <strong>Episode 2:</strong> Handle a complaint from a customer
                who received the wrong order.
              </li>
              <li className="mb-1">
                <strong>Episode 3:</strong> Prepare and serve a specialty
                espresso drink following OS 5.3.1.
              </li>
              <li className="mb-1">
                <strong>Episode 4:</strong> Process payment for the customer's
                bill accurately.
              </li>
            </ol>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-3 py-1.5 text-[10px] text-gray-400">
            📌 Phase 1 — Scenario derived from CS/CBC/CLM inputs.
          </div>
        </div>
        <AiRegenBox
          open={scenarioRegen.open}
          onClose={() => scenarioRegen.setOpen(false)}
          fieldName="Scenario"
          placeholder="e.g., 'Add a staff shortage sub-scenario for episode 2'"
          hint="Phase 1 inputs."
          onSubmit={scenarioRegen.handleSubmit}
        />
        <GeneratingBar visible={scenarioRegen.generating} label="Scenario" />
      </div>

      {/* Procedure */}
      <div className="mb-4">
        <FieldLabel label="Procedure / Steps">
          <AiRegenButton onClick={() => stepsRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <AiRegenBox
          open={stepsRegen.open}
          onClose={() => stepsRegen.setOpen(false)}
          fieldName="All Steps"
          placeholder="e.g., 'Add a debrief step at the end'"
          hint="Integrates all Module 5 TS steps."
          onSubmit={stepsRegen.handleSubmit}
        />
        <GeneratingBar visible={stepsRegen.generating} label="All Steps" />
        <div className="mt-2">
          <StepCards
            steps={[
              {
                title: "Prepare Service Area",
                body: "Ensure all materials and equipment are ready. Review the scenario briefly before beginning.",
              },
              {
                title: "Welcome and Greet Customer",
                body: "Approach customer area. Deliver a warm, professional greeting using the establishment's standard phrase.",
              },
              {
                title: "Take Initial Order",
                body: "Listen attentively to the customer's order. Confirm all details. Repeat order back.",
              },
              {
                title: "Prepare Beverage",
                body: "Proceed to bar/counter area. Select appropriate ingredients. Follow the SOP for beverage preparation.",
              },
              {
                title: "Serve Customer",
                body: "Present the beverage to the customer. Check customer satisfaction immediately after service.",
              },
              {
                title: "Handle Complaint (if raised) [TS 5.2.1]",
                body: "If the customer raises a complaint, apply the L.A.S.T. framework (Listen, Apologize, Solve, Thank).",
              },
              {
                title: "Operate Espresso Machine (if required) [OS 5.3.1]",
                body: "Follow OS 5.3.1 procedure for espresso preparation. Ensure safety precautions are observed.",
              },
              {
                title: "Process Payment [TS 5.4.1]",
                body: "Present the bill accurately. Process the payment per establishment procedure.",
              },
              {
                title: "Bid Farewell",
                body: "Thank the customer sincerely. Invite them to return. Maintain professional demeanor until customer leaves.",
              },
              {
                title: "Clear and Reset Station",
                body: "Clear the service area. Reset for the next service. Complete the service log if required.",
              },
              {
                title: "Documentation",
                body: "Complete the Complaint Log (if applicable) and service record as required by establishment SOP.",
              },
            ]}
          />
        </div>
      </div>

      {/* Assessment Method (read-only) */}
      <div className="mb-4">
        <FieldLabel label="Assessment Method" editable={false} />
        <SourceField label="CLM — Module 5 Consolidation" source="clm">
          Direct observation using Job Sheet Performance Criteria Checklist.
          Trainer signature required. All 4 LO performance episodes must be
          observed.
        </SourceField>
      </div>

      <SectionDivider label="Job Sheet PCC — Performance Criteria Checklist" />

      <div className="mb-4">
        <FieldLabel label="PCC Criteria">
          <AiRegenButton onClick={() => pccRegen.setOpen((o) => !o)} />
        </FieldLabel>
        <div className="mb-2 rounded border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-600">
          Trainee's Name:{" "}
          <span className="inline-block w-44 border-b border-gray-400 ml-1">
            &nbsp;
          </span>
          &nbsp;&nbsp; Date:{" "}
          <span className="inline-block w-28 border-b border-gray-400 ml-1">
            &nbsp;
          </span>
        </div>
        <table className="mb-3 w-full border-collapse text-xs">
          <thead>
            <tr className="bg-slate-600 text-white">
              <th className="px-4 py-2.5 text-left">CRITERIA — Did you…</th>
              <th className="w-16 px-4 py-2.5 text-center">YES</th>
              <th className="w-16 px-4 py-2.5 text-center">NO</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Greeted the customer professionally using establishment standards?",
              "Listened to and confirmed the customer's order accurately?",
              "Prepared the beverage following the correct SOP?",
              "Served the customer within the prescribed service time?",
              "Applied the L.A.S.T. framework when handling a complaint?",
              "Operated the espresso machine following OS 5.3.1 safety precautions?",
              "Processed payment accurately using establishment procedure?",
              "Completed all required documentation and service records?",
            ].map((c, i) => (
              <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2.5">
                  {i + 1}. {c}
                </td>
                <td className="px-4 py-2.5 text-center">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2.5 text-center">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AiRegenBox
          open={pccRegen.open}
          onClose={() => pccRegen.setOpen(false)}
          fieldName="Job Sheet PCC"
          placeholder="e.g., 'Regenerate from all Module 5 PCCs combined'"
          hint="Integrates PCC 5.1.1 · 5.2.1 · 5.3.1."
          onSubmit={pccRegen.handleSubmit}
        />
        <GeneratingBar visible={pccRegen.generating} label="Job Sheet PCC" />
        <div className="mt-4 flex gap-8">
          {["Learning Facilitator / Trainer", "Trainee", "Date"].map((sig) => (
            <div key={sig} className="flex-1">
              <div className="mb-1 h-6 border-b border-gray-700" />
              <p className="text-[10px] text-gray-500">{sig}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mb-4 text-[11px] text-gray-400">
        📌 References consolidated from all Module 5 sheets.
      </p>
    </>
  );
}
function LOAccordion({ lo }: { lo: (typeof loData)[0] }) {
  const [open, setOpen] = useState(true);
  const [activities, setActivities] = useState(lo.activities);
  const actRegen = useRegenState();
  const instRegen = useRegenState();

  return (
    <>
      <div className="mb-3 overflow-hidden rounded-md border border-gray-200 bg-white">
        {/* Header */}
        <div
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-50 ${open ? "border-b border-gray-200" : ""}`}
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gray-800 text-xs font-bold text-white">
            {lo.num}
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Learning Outcome {lo.num}
            </div>
            <div className="text-sm font-medium text-gray-800">{lo.title}</div>
          </div>
          <span className="flex-shrink-0 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
            ✓ Auto-generated
          </span>
          <span className="text-xs text-gray-400">{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <div className="p-4 bg-gray-50">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Activities */}
              <div>
                <FieldLabel label="Learning Activities">
                  <AiRegenButton
                    onClick={() => actRegen.setOpen((o) => !o)}
                    small
                  />
                </FieldLabel>
                <div className="flex flex-col gap-1.5">
                  {activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        defaultValue={act}
                        className="flex-1 rounded border border-gray-200 px-2.5 py-1 text-xs text-gray-700 outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() =>
                          setActivities((p) => p.filter((_, idx) => idx !== i))
                        }
                        className="text-gray-300 hover:text-red-500"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActivities((p) => [...p, "● "])}
                  className="mt-2 inline-flex items-center gap-1 rounded border border-dashed border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
                >
                  + Add Activity
                </button>
                <AiRegenBox
                  open={actRegen.open}
                  onClose={() => actRegen.setOpen(false)}
                  fieldName={`LO ${lo.num} Activities`}
                  placeholder="e.g., 'Add a peer review activity'"
                  hint="Uses validated IS/SC/AK/TS sequence."
                  onSubmit={actRegen.handleSubmit}
                />
                <GeneratingBar
                  visible={actRegen.generating}
                  label={`LO ${lo.num} Activities`}
                />
              </div>

              {/* Special Instructions */}
              <div>
                <FieldLabel label="Special Instructions">
                  <AiRegenButton
                    onClick={() => instRegen.setOpen((o) => !o)}
                    small
                  />
                </FieldLabel>
                <textarea
                  className="w-full rounded border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none"
                  defaultValue={lo.instructions}
                  rows={6}
                />
                <AiRegenBox
                  open={instRegen.open}
                  onClose={() => instRegen.setOpen(false)}
                  fieldName={`LO ${lo.num} Instructions`}
                  placeholder="e.g., 'Add guidance for visual learners'"
                  hint="Phase 1 inputs."
                  onSubmit={instRegen.handleSubmit}
                />
                <GeneratingBar
                  visible={instRegen.generating}
                  label={`LO ${lo.num} Instructions`}
                />
              </div>
            </div>

            {/* TESDA Format Preview */}
            <SectionDivider label={`TESDA Format Preview — LO ${lo.num}`} />
            <table className="w-full border-collapse border border-gray-400 text-[11px]">
              <thead>
                <tr>
                  <th className="border border-blue-700 bg-blue-600 px-3.5 py-2 text-center text-white">
                    Learning Activities
                  </th>
                  <th className="border border-blue-700 bg-blue-600 px-3.5 py-2 text-center text-white">
                    Special Instructions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map((act, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 px-3.5 py-2 bg-white">
                      {act}
                    </td>
                    {i === 0 && (
                      <td
                        className="border border-gray-200 px-3.5 py-2 text-blue-700 bg-blue-50"
                        rowSpan={activities.length}
                      >
                        {lo.instructions}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function LearningExperiencesTableContent() {
  const bulkRegen = useRegenState();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[11px] text-gray-400 italic">
          Module 5: Providing Effective Customer Service
        </div>
        <button
          onClick={() => {
            window.location.href = "/cblm/front-matter";
          }}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
        >
          <ArrowRightIcon className="h-3.5 w-3.5" />
          Proceed to Front Matter
        </button>
      </div>

      <EditabilityLegend />

      <MetaStrip
        items={[
          {
            label: "Document",
            value: (
              <span className="text-sm text-blue-600">
                Learning Experiences Table — Module 5
              </span>
            ),
          },
          {
            label: "Format",
            value: (
              <span className="text-sm text-gray-600">
                TESDA 2-column (Learning Activities | Special Instructions)
              </span>
            ),
          },
          {
            label: "Status",
            value: (
              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                📝 Auto-generated
              </span>
            ),
          },
        ]}
      />

      {/* Bulk regen */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <AiRegenButton
            onClick={() => bulkRegen.setOpen((o) => !o)}
            label="✨ Regenerate Full Table — All LOs"
          />
        </div>
        <AiRegenBox
          open={bulkRegen.open}
          onClose={() => bulkRegen.setOpen(false)}
          fieldName="Full Table — All LOs"
          placeholder="e.g., 'Regenerate from scratch using all validated sheets'"
          hint="Regenerates all 4 LO sections from validated IS/SC/AK/TS sheets."
          onSubmit={bulkRegen.handleSubmit}
        />
        <GeneratingBar
          visible={bulkRegen.generating}
          label="Full Table — All LOs"
        />
      </div>

      {loData.map((lo) => (
        <LOAccordion key={lo.num} lo={lo} />
      ))}

      <p className="mb-4 mt-3 text-[11px] text-gray-400">
        📌 Learning Experiences Table is auto-compiled from validated sheets.
        Edit only if the trainer needs to adjust activity phrasing.
      </p>
    </>
  );
}

export function EditorContent({ kind }: { kind: SheetKind }) {
  switch (kind) {
    case "information-sheet":
      return <InformationSheetContent />;
    case "self-check":
      return <SelfCheckContent />;
    case "answer-key":
      return <AnswerKeyContent />;
    case "task-sheet":
      return <TaskSheetContent />;
    case "performance-criterion":
      return <PerformanceCriterionContent />;
    case "outcome-statement":
      return <OutcomeStatementContent />;
    case "job-sheet":
      return <JobSheetContent />;
    case "learning-experiences-table":
      return <LearningExperiencesTableContent />;
    default:
      return <InformationSheetContent />;
  }
}
