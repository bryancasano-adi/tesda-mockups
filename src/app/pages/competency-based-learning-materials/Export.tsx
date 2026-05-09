import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon, EyeIcon } from "lucide-react";
import { ButtonLink, SectionCard, Status, StatusBadge } from "./Dashboard";
import { Breadcrumbs } from "../pageUtils";

export function CBLMExport() {
  const sections = [
    ["Front Cover", "1 page", "validated"],
    ["How to Use This Module", "1 page", "validated"],
    ["List of Competencies (All 14 modules)", "2 pages", "validated"],
    ["Module Content Summary — Module 5", "1 page", "validated"],
    ["LO 1 — IS, SC, AK, TS, PCC", "8 sheets", "validated"],
    ["LO 2 — IS 5.2.1, SC 5.2.1, AK, TS, PCC", "8 sheets", "review"],
    ["LO 3 — IS, SC, AK, TS, PCC, OS", "6 sheets", "validated"],
    ["LO 4 — IS, SC, AK", "6 sheets", "validated"],
    ["Job Sheet (JS 5)", "1 sheet", "validated"],
    ["Learning Experiences Table", "4 LO tables", "validated"],
    ["References — Consolidated", "1 page", "validated"],
  ];

  return (
    <div className="mx-auto max-w-8xl p-6 text-gray-800">
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
            label: "Module",
            href: `/cblm/module`,
          },
          {
            label: `Export`,
            href: `/cblm/export`,
          },
        ]}
      />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Export CBLM</h1>
          <p className="text-sm text-gray-600">
            Module 5 — Provide Effective Customer Service · Food and Beverage
            Services NC II
          </p>
        </div>
        <div className="flex gap-2">
          <ButtonLink to="/cblm/module" variant="outline">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Module
          </ButtonLink>
          <button className="inline-flex items-center gap-2 rounded bg-[#1B3A5C] px-4 py-2 text-xs font-semibold text-white">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export as .docx
          </button>
        </div>
      </div>

      <SectionCard className="mb-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="text-sm font-semibold">Export Readiness</span>
          <span className="text-xs font-semibold text-orange-700">
            2 sheets not yet validated — marked [DRAFT] in export
          </span>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">
              Overall validation:{" "}
              <strong className="text-gray-900">
                27 of 29 sheets validated
              </strong>
            </span>
            <span className="font-semibold text-orange-700">93%</span>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded bg-gray-200">
            <div
              className="h-full rounded bg-orange-500"
              style={{ width: "93%" }}
            />
          </div>
          <table className="w-full text-sm">
            <tbody>
              {["LO 1", "LO 2", "LO 3", "LO 4", "Job Sheet", "LET"].map(
                (section, index) => (
                  <tr className="border-t border-gray-100" key={section}>
                    <td className="px-3 py-2 font-medium">{section}</td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={index === 1 ? "review" : "validated"}
                      />
                    </td>
                    <td className="px-3 py-2 text-gray-600">
                      {index === 1 ? "5/7 sheets" : "Complete"}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard className="mb-5 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
          <span className="text-sm font-semibold">Section Toggles</span>
          <span className="text-xs text-gray-500">
            Uncheck to exclude sections from export
          </span>
        </div>
        {sections.map(([label, count, status]) => (
          <label
            className="flex items-center gap-3 border-b border-gray-100 px-5 py-3 last:border-b-0"
            key={label}
          >
            <input
              className="h-4 w-4 accent-blue-600"
              defaultChecked
              type="checkbox"
            />
            <span className="flex-1 text-sm">{label}</span>
            <span className="text-xs text-gray-500">{count}</span>
            <StatusBadge status={status as Status} />
          </label>
        ))}
      </SectionCard>

      <SectionCard className="mb-5 overflow-hidden">
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="text-sm font-semibold">
            TESDA Footer Configuration
          </div>
          <p className="mt-1 text-xs text-gray-500">
            These values appear in the standard TESDA footer on every exported
            page.
          </p>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {[
            ["Qualification Title", "Food and Beverage Services NC II"],
            ["Module Title", "Provide Effective Customer Service"],
            ["Date Developed", "2026-01-15"],
            ["Document No.", "FBS-CBLM-M5-001"],
            ["Issued by", "TESDA"],
            ["Developed by", "[Institution Name]"],
          ].map(([label, value]) => (
            <label
              className="text-xs font-semibold uppercase tracking-wide text-gray-500"
              key={label}
            >
              {label}
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm font-normal normal-case text-gray-800"
                defaultValue={value}
              />
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="p-5">
        <div className="mb-4 text-sm font-semibold">Export Actions</div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded bg-[#1B3A5C] px-5 py-3 text-sm font-semibold text-white">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export as .docx
          </button>
          <button className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
            <EyeIcon className="h-5 w-5" />
            Preview in Browser
          </button>
          <button className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
            <DocumentTextIcon className="h-5 w-5" />
            Copy Export Log
          </button>
          <span className="text-xs text-gray-400">Last export: Never</span>
        </div>
        <div className="mt-4 rounded border border-orange-200 bg-orange-50 p-3 text-xs text-orange-900">
          2 sheets will be marked [DRAFT] in the export: IS 5.2.1 and SC 5.2.1
          are awaiting trainer validation.
        </div>
      </SectionCard>
    </div>
  );
}
