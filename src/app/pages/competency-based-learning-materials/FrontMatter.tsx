import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  FrontMatterKind,
  frontMatterMeta,
  SectionCard,
  AiPrompt,
  SourcePanel,
} from "./Dashboard";
import { Breadcrumbs } from "../pageUtils";
import { modules } from "@/app/data/cblmData";

function FrontMatterNav({ active }: { active: FrontMatterKind }) {
  const items: FrontMatterKind[] = ["cover", "howto", "list"];

  return (
    <aside className="w-[196px] flex-shrink-0 overflow-hidden border-r border-gray-200 bg-[#FAFAFA]">
      <div className="border-b border-gray-200 bg-white px-3.5 py-2.5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Step 1 — Front Matter
        </div>
        <div className="mt-0.5 text-[10px] text-gray-600">
          Auto-initialized on project creation
        </div>
      </div>

      <div className="py-1.5">
        <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
          Front Matter Documents
        </div>

        {items.map((item) => (
          <Link
            key={item}
            to={`/cblm/front-matter?page=${item}`}
            className={`flex gap-1.5 px-3 py-1.5 transition hover:bg-gray-100 ${
              item === active ? "bg-blue-50" : ""
            }`}
          >
            <span className="mt-1.5 h-[5px] w-[5px] rounded-full bg-green-700" />
            <span>
              <span
                className={`block text-[11px] leading-tight ${
                  item === active
                    ? "font-medium text-blue-700"
                    : "text-gray-600"
                }`}
              >
                {frontMatterMeta[item].label}
              </span>
              <span className="mt-1 inline-block rounded bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
                ✓ Generated
              </span>
            </span>
          </Link>
        ))}

        <div className="mt-3 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
          Module Documents
        </div>
        <Link
          className="flex gap-1.5 px-3 py-1.5 hover:bg-gray-100"
          to="/cblm/module"
        >
          <span className="mt-1.5 h-[5px] w-[5px] rounded-full bg-blue-600" />
          <span>
            <span className="block text-[11px] text-gray-600">Module View</span>
            <span className="mt-1 inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700">
              → Go to Module 5
            </span>
          </span>
        </Link>

        <div className="mt-3 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
          Export
        </div>
        <Link
          className="flex gap-1.5 px-3 py-1.5 hover:bg-gray-100"
          to="/cblm/export"
        >
          <span className="mt-1.5 h-[5px] w-[5px] rounded-full bg-green-700" />
          <span>
            <span className="block text-[11px] text-gray-600">
              Export .docx
            </span>
            <span className="mt-1 inline-block rounded bg-green-50 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
              📥 Export Page
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}

export function CBLMFrontMatter() {
  const [searchParams] = useSearchParams();
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);
  const [showHowToPrompt, setShowHowToPrompt] = useState(false);

  const page = searchParams.get("page") as FrontMatterKind | null;

  const validKinds: FrontMatterKind[] = Object.keys(
    frontMatterMeta,
  ) as FrontMatterKind[];

  const kind: FrontMatterKind =
    page && validKinds.includes(page) ? page : "cover";

  const meta = frontMatterMeta[kind];

  return (
    <div className="-m-6 flex h-[calc(100vh-5rem)] flex-col overflow-hidden bg-white text-gray-800 mt-1">
      <div className="flex h-12 items-center border-b border-gray-200 px-5">
        <Breadcrumbs
          items={[
            {
              label: "Sector Details",
              href: `#`,
            },
            {
              label: "Sector Projects",
              href: `/`,
            },
            {
              label: "Competency Based Learning Materials (CBLM)",
              href: `/cblm`,
            },
            {
              label: "Front Matter",
              href: `/cblm/front-matter`,
            },
            {
              label: meta.label,
              href: `/cblm/front-matter?page=${kind}`,
            },
          ]}
        />
      </div>
      <div className="border-b border-orange-200 bg-orange-50 px-5 py-2 text-xs text-orange-700">
        Step 1 — Front Matter · auto-initialized from qualification metadata.
      </div>
      <div className="flex min-h-0 flex-1">
        <FrontMatterNav active={kind} />
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] px-6 py-5">
          {kind === "cover" && (
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-white px-3.5 py-2 text-[11px]">
                <span className="font-semibold text-gray-600">
                  Field editability:
                </span>
                <span>
                  <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    🔒 Read-only
                  </span>{" "}
                  Auto-derived from qualification
                </span>
                <span>
                  <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    ✏ Editable
                  </span>{" "}
                  Cover document fields
                </span>
              </div>

              <div className="mb-3 flex flex-wrap gap-4 rounded-md border border-gray-200 bg-white px-4 py-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Document
                  </div>
                  <div className="text-[13px] font-medium text-[#1a3a6b]">
                    Front Cover
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </div>
                  <div className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                    ✓ Generated
                  </div>
                </div>
              </div>

              <SectionCard className="mb-4 p-6">
                <div className="mx-auto max-w-[520px] rounded border-2 border-[#1a3a6b] bg-white p-8 text-center">
                  <img
                    alt="TESDA"
                    className="mx-auto mb-5 h-20 w-20 object-contain"
                    src="/tesda-cropped-logo.png"
                  />
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                    Competency-Based Learning Material
                  </div>
                  <h2 className="mt-3 text-3xl font-bold text-[#1a3a6b]">
                    Provide Effective Customer Service
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Module 5 · Food and Beverage Services NC II
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-200 pt-3 text-left text-[11px] text-gray-600">
                    <div>
                      <strong>Unit Code:</strong> TRS141202
                    </div>
                    <div>
                      <strong>NC Level:</strong> NC II
                    </div>
                    <div>
                      <strong>Sector:</strong> Tourism
                    </div>
                    <div>
                      <strong>Qualification:</strong> FBS NC II
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-200 pt-3 text-left text-[11px] text-gray-600">
                    <div>
                      <strong>Date Developed:</strong> January 2026
                    </div>
                    <div>
                      <strong>Developed by:</strong> [Institution Name]
                    </div>
                    <div>
                      <strong>Document No.:</strong> FBS-CBLM-M5-001
                    </div>
                    <div>
                      <strong>Revision #:</strong> 00
                    </div>
                  </div>

                  <div className="mx-auto mt-4 flex h-10 w-20 items-center justify-center text-[10px] text-gray-400">
                    <img
                      src="https://framerusercontent.com/images/ZTFMmj0dCqmBf3pYDe4E01jBkY.png?scale-down-to=512"
                      alt="ADI Logo"
                      className="h-32 object-contain"
                    />
                  </div>
                </div>
              </SectionCard>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Editable Cover Fields
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <SectionCard className="grid gap-4 p-4 md:grid-cols-2">
                {[
                  [
                    "Qualification Title",
                    "Competency-Based Learning Material (CBLM)",
                    true,
                  ],
                  [
                    "Qualification Name",
                    "Food and Beverage Services NC II",
                    true,
                  ],
                  ["NC Level", "NC II", true],
                  ["Unit Code", "TRS141202", true],
                  ["Sector", "Tourism", true],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                        {label}
                      </span>
                      <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                        🔒 Read-only
                      </span>
                    </div>
                    <div className="rounded border border-gray-200 border-l-blue-600 bg-blue-50 px-3.5 py-2.5 text-sm text-gray-700">
                      {value}
                    </div>
                  </div>
                ))}

                {[
                  ["Module Number", "Module 5"],
                  ["Module Title", "Provide Effective Customer Service"],
                  ["Date Developed", "2026-01-15"],
                  ["Developed by", "[Institution Name]"],
                  ["Document No.", "FBS-CBLM-M5-001"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                        {label}
                      </span>
                      <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                        ✏ Editable
                      </span>
                    </div>
                    <input
                      className="w-full rounded border border-gray-400 bg-white px-3.5 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      defaultValue={value}
                    />
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {kind === "howto" && (
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-white px-3.5 py-2 text-[11px]">
                <span className="font-semibold text-gray-600">
                  Field editability:
                </span>
                <span>
                  <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    ✏ Editable
                  </span>{" "}
                  Introduction and instructions
                </span>
                <span>
                  <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    🔒 Read-only
                  </span>{" "}
                  References
                </span>
                <span>
                  <span className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                    ✨ Regenerate
                  </span>{" "}
                  AI-assisted rewrite
                </span>
              </div>

              <SectionCard className="p-4">
                <div className="mb-4 flex flex-wrap gap-4 rounded-md border border-gray-200 bg-white px-4 py-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Document
                    </div>
                    <div className="text-[13px] font-medium text-[#1a3a6b]">
                      How to Use This Module
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </div>
                    <div className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                      ✓ Generated
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                      Introduction Paragraph
                    </span>
                    <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      ✏ Editable
                    </span>
                    <button
                      onClick={() => setShowIntroPrompt((v) => !v)}
                      className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 transition hover:bg-purple-700 hover:text-white"
                    >
                      ✨ Regenerate
                    </button>
                  </div>
                  <textarea
                    className="min-h-[92px] w-full rounded border border-gray-400 bg-white px-3.5 py-2.5 text-sm leading-6 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    defaultValue={`Welcome to this Competency-Based Learning Material (CBLM). This module is designed for self-paced learning aligned with TESDA's Competency-Based Training (CBT) approach. You will be guided through a set of learning activities that will help you achieve the required competency standards for Module 5 — Provide Effective Customer Service.`}
                  />
                  {showIntroPrompt && (
                    <AiPrompt
                      label="AI Regenerate - Introductions"
                      tag="intro"
                    />
                  )}
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                      How to Use — Instructions
                    </span>
                    <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      ✏ Editable
                    </span>
                    <button
                      onClick={() => setShowHowToPrompt((v) => !v)}
                      className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 transition hover:bg-purple-700 hover:text-white"
                    >
                      ✨ Regenerate
                    </button>
                  </div>
                  {showHowToPrompt && (
                    <AiPrompt
                      label="AI Regenerate - All Instructions"
                      tag="how-to-use"
                    />
                  )}

                  <div className="space-y-2">
                    {[
                      "Read the module carefully before starting any task or activity.",
                      "Answer the Self-Check (SC) provided after each Information Sheet.",
                      "Compare your answers with the Answer Key provided.",
                      "Perform the Task Sheet under trainer supervision.",
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-md border border-gray-200 bg-white"
                      >
                        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3.5 py-2">
                          <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gray-800 text-[11px] font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="flex-1 text-xs font-medium">
                            Step {index + 1}
                          </span>
                          <button className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 text-[9px] font-semibold text-purple-700">
                            ✨
                          </button>
                        </div>
                        <div className="p-3.5">
                          <textarea
                            className="min-h-[52px] w-full rounded border border-gray-200 px-3 py-2 text-xs outline-none focus:border-blue-600"
                            defaultValue={step}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                      Icons Used in This Module
                    </span>
                    <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                      🔒 Read-only
                    </span>
                  </div>
                  <table className="w-full border-collapse overflow-hidden rounded border border-gray-200 text-xs">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="w-16 px-3 py-2 text-center font-semibold text-gray-600">
                          Icon
                        </th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-600">
                          Meaning
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "📄",
                          "Information Sheet — Contains theoretical knowledge to be learned",
                        ],
                        [
                          "📝",
                          "Self-Check — Tests your understanding of the IS content",
                        ],
                        [
                          "✅",
                          "Answer Key — Use to evaluate your Self-Check answers",
                        ],
                        [
                          "⚡",
                          "Task Sheet — Practical activity to be performed",
                        ],
                        [
                          "☑",
                          "Performance Criteria Checklist — Evaluation tool for TS performance",
                        ],
                        [
                          "📚",
                          "References — Source documents and reading materials",
                        ],
                      ].map(([icon, meaning]) => (
                        <tr key={meaning} className="border-t border-gray-100">
                          <td className="px-3 py-2 text-center text-lg">
                            {icon}
                          </td>
                          <td className="px-3 py-2 text-gray-700">{meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                      References Used in This Module
                    </span>
                    <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                      🔒 Read-only
                    </span>
                  </div>
                  <div className="rounded border border-gray-200 border-l-blue-600 bg-blue-50 px-3.5 py-2.5 text-xs leading-7 text-gray-700">
                    <div className="mb-1 font-semibold text-blue-700">
                      📋 Source: Auto-compiled from all validated sheets
                    </div>
                    <ul className="list-disc pl-5">
                      <li>
                        FBS-CBC-NC2-2023-v1.pdf — Competency-Based Curriculum
                      </li>
                      <li>
                        TRS-CS-NC2-Food-Beverage-2022.pdf — Competency Standards
                      </li>
                      <li>
                        CLM-Food-Beverage-NC2-v2.pdf — Curriculum Learning Map
                      </li>
                    </ul>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {kind === "list" && (
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-white px-3.5 py-2 text-[11px]">
                <span className="font-semibold text-gray-600">
                  This document is:
                </span>
                <span>
                  <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                    🔒 Read-only
                  </span>{" "}
                  Auto-generated from qualification structure
                </span>
              </div>

              <div className="mb-3 rounded border border-yellow-200 bg-yellow-50 px-3.5 py-2.5 text-xs text-yellow-900">
                ℹ️ <strong>Read-only document.</strong> The list of competencies
                is generated from the selected qualification and module
                metadata.
              </div>

              <SectionCard className="overflow-hidden">
                <table className="w-full border-collapse text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-28 px-3.5 py-2 text-left font-semibold uppercase text-gray-600">
                        Module No.
                      </th>
                      <th className="px-3.5 py-2 text-left font-semibold uppercase text-gray-600">
                        Unit of Competency
                      </th>
                      <th className="w-36 px-3.5 py-2 text-left font-semibold uppercase text-gray-600">
                        Unit Code
                      </th>
                      <th className="w-36 px-3.5 py-2 text-left font-semibold uppercase text-gray-600">
                        Nominal Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.flatMap((group) => [
                      <tr key={group.group}>
                        <td
                          className={`${group.color} px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-white`}
                          colSpan={4}
                        >
                          {group.group}
                        </td>
                      </tr>,
                      ...group.items.map((item) => (
                        <tr
                          key={item.no}
                          className={`border-b border-gray-200 ${item.current ? "bg-blue-50 font-semibold" : ""}`}
                        >
                          <td className="px-3.5 py-2 text-gray-600">
                            {item.no}
                          </td>
                          <td className="px-3.5 py-2 text-gray-800">
                            {item.title}
                            {item.current ? " ← Current Module" : ""}
                          </td>
                          <td className="px-3.5 py-2 font-mono text-[11px] text-gray-600">
                            {item.code}
                          </td>
                          <td className="px-3.5 py-2 text-gray-600">
                            {item.duration}
                          </td>
                        </tr>
                      )),
                    ])}
                    <tr>
                      <td
                        className="bg-purple-600 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide text-white"
                        colSpan={4}
                      >
                        Elective Competencies
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-3.5 py-2 text-xs italic text-gray-400"
                        colSpan={4}
                      >
                        No elective competencies defined for Food and Beverage
                        Services NC II.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </SectionCard>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Trainer Notes (Optional)
                </div>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <SectionCard className="p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
                    Trainer Notes / Remarks
                  </span>
                  <span className="rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    ✏ Editable
                  </span>
                </div>
                <textarea
                  className="min-h-[72px] w-full rounded border border-gray-400 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="Optional trainer note appended below the competency table in the printed CBLM. Leave blank if not needed."
                />
                <div className="mt-1 text-[11px] text-gray-400">
                  ⚠️ Common competency deduplication: Provisional until TESDA
                  resolves final policy. Modules 4–8 are shared across Tourism
                  qualifications.
                </div>
              </SectionCard>
            </div>
          )}
        </main>
        <SourcePanel isFrontMatter={true} />
      </div>
    </div>
  );
}
