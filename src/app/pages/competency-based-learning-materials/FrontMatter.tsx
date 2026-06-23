import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import { CblmEditorLayout } from "@/app/components/competency-based-learning-materials/CblmEditorLayout";
import { FrontCoverSection } from "@/app/components/competency-based-learning-materials/FrontCoverSection";
import { FrontMatterShell } from "@/app/components/competency-based-learning-materials/FrontMatterShell";
import { RevisionHistorySection } from "@/app/components/competency-based-learning-materials/RevisionHistorySection";
import {
  FRONT_MATTER_ALL_NAV,
  sectionNotice,
  type FrontMatterPageId,
} from "@/app/components/competency-based-learning-materials/front-matter-nav";
import {
  FieldReadOnly,
  ReadOnlyList,
  SectionDivider,
} from "@/app/components/competency-based-learning-materials/CblmFieldPrimitives";
import { ucMeta } from "@/app/data/cblmData";
import {
  CblmToast,
  useCblmToast,
} from "@/app/components/competency-based-learning-materials/cblmMockupHooks";

const MOCK_HOW_TO_USE =
  "This module is designed for self-paced learning. Read each Information Sheet carefully before attempting the Self-Check and Task Sheet activities. Use the Answer Key to verify your responses after completing each Self-Check.";

const MOCK_COMPETENCY_LIST = [
  {
    unitCode: "AUTBEV311101",
    unitTitle: "Receive and store kitchen supplies",
    competencyType: "basic",
    isCurrentModule: false,
  },
  {
    unitCode: "AUTBEV311102",
    unitTitle: "Work in a team environment",
    competencyType: "common",
    isCurrentModule: false,
  },
  {
    unitCode: ucMeta.unitCode,
    unitTitle: ucMeta.title,
    competencyType: "core",
    isCurrentModule: true,
  },
];

const MOCK_LO_SUMMARY = [
  { loNumber: "1", loTitle: "Prepare for inspection" },
  { loNumber: "2", loTitle: "Carry out inspection procedures" },
  { loNumber: "3", loTitle: "Complete inspection documentation" },
];

function StubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <SectionDivider label={title} />
      {children}
    </>
  );
}

function renderSection(
  page: FrontMatterPageId,
  showToast: (msg: string, color?: string) => void,
): ReactNode {
  switch (page) {
    case "cover":
      return <FrontCoverSection />;
    case "rev-history":
      return <RevisionHistorySection showToast={showToast} />;
    case "howto":
      return (
        <StubSection title="How to Use This Module">
          <FieldReadOnly label="Body" value={MOCK_HOW_TO_USE} />
        </StubSection>
      );
    case "list":
      return (
        <StubSection title="List of Competencies">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
                  <th className="px-4 py-2.5">Unit Code</th>
                  <th className="px-4 py-2.5">Title</th>
                  <th className="px-4 py-2.5">Type</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COMPETENCY_LIST.map((entry) => (
                  <tr
                    key={entry.unitCode}
                    className="border-b border-gray-100 text-gray-800"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-800">
                      {entry.unitCode}
                    </td>
                    <td
                      className={`px-4 py-3 text-gray-800 ${
                        entry.isCurrentModule ? "font-bold italic" : ""
                      }`}
                    >
                      {entry.unitTitle}
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-800">
                      {entry.competencyType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StubSection>
      );
    case "module-content":
      return (
        <StubSection title="Module Content Summary">
          <FieldReadOnly label="Unit Code" value={ucMeta.unitCode} />
          <FieldReadOnly label="Module Title" value={ucMeta.title} />
          <FieldReadOnly
            label="Module Descriptor"
            value="This module covers the competencies required to carry out inspection of electric vehicles for fleet operations."
          />
          <FieldReadOnly label="Nominal Duration (hours)" value="40" />
          <FieldReadOnly
            label="Summary of Learning Outcomes"
            value={
              <ReadOnlyList
                items={MOCK_LO_SUMMARY.map(
                  (lo) => `${lo.loNumber}. ${lo.loTitle}`,
                )}
              />
            }
          />
          <FieldReadOnly
            label="Assessment Criteria"
            value={
              <ReadOnlyList
                items={[
                  "Inspection checklist completed accurately",
                  "Safety protocols followed throughout",
                  "Documentation submitted within required timeframe",
                ]}
              />
            }
          />
          <FieldReadOnly
            label="Conditions"
            value="Work is performed in a fleet maintenance facility with access to BEV diagnostic equipment and appropriate PPE."
          />
        </StubSection>
      );
    case "prerequisites":
      return (
        <StubSection title="Prerequisites">
          <FieldReadOnly label="Unit Code" value={ucMeta.unitCode} />
          <FieldReadOnly
            label="Prerequisite Unit"
            value="AUTBEV311102 — Work in a team environment"
          />
        </StubSection>
      );
    case "lo-summary":
      return (
        <StubSection title="Learning Outcome Summary Table">
          <div className="rounded-md border border-blue-100 bg-blue-50/40 p-4">
            <div className="mb-1 text-sm font-semibold text-gray-900">
              Summary of Learning Outcomes
            </div>
            <p className="mb-2 text-xs text-gray-600">
              Upon completion of this module, the students/trainees will be able
              to:
            </p>
            <ul className="space-y-1 text-sm text-gray-800">
              {MOCK_LO_SUMMARY.map((lo) => (
                <li key={lo.loNumber} className="flex gap-2">
                  <span className="whitespace-nowrap font-semibold text-blue-700">
                    LO{lo.loNumber}.
                  </span>
                  <span>{lo.loTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </StubSection>
      );
    default:
      return null;
  }
}

export function CBLMFrontMatter() {
  const [searchParams] = useSearchParams();
  const { toast, showToast } = useCblmToast();

  const pageParam = searchParams.get("page") as FrontMatterPageId | null;
  const validPages = FRONT_MATTER_ALL_NAV.map((item) => item.id);
  const page: FrontMatterPageId =
    pageParam && validPages.includes(pageParam) ? pageParam : "cover";

  return (
    <>
      <CblmEditorLayout sheetNav={null} sourcePanel={null} notice={null} toolbar={null}>
        <FrontMatterShell activePage={page} notice={sectionNotice(page, true)}>
          {renderSection(page, showToast)}
        </FrontMatterShell>
      </CblmEditorLayout>
      <CblmToast toast={toast} />
    </>
  );
}
