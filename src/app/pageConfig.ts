import { EvidencePlanEditor } from "./pages/competency-assessment-tool/EvidencePlanEditor";
import { OutlineView } from "./pages/competency-assessment-tool/OutlineView";
import { DemonstrationTestEditor } from "./pages/competency-assessment-tool/DemonstrationTestEditor";
import { QuestioningToolEditor } from "./pages/competency-assessment-tool/QuestioningToolEditor";
import { MCQConfig } from "./pages/competency-assessment-tool/MCQConfig";
import { MCQEditor } from "./pages/competency-assessment-tool/MCQEditor";
import { MCQTOSSummary } from "./pages/competency-assessment-tool/MCQTOSSummary";
import { MCQExternalAnalysis } from "./pages/competency-assessment-tool/MCQExternalAnalysis";
import { DistributionSettings } from "./pages/competency-assessment-tool/DistributionSettings";
import { AGAssemblyStatus } from "./pages/competency-assessment-tool/AGAssemblyStatus";
import { PackageNavigator } from "./pages/competency-assessment-tool/PackageNavigator";
import { AssessorsGuide } from "./pages/competency-assessment-tool/AssessorsGuide";
import { SICView } from "./pages/competency-assessment-tool/SICView";
import { WrittenTestView } from "./pages/competency-assessment-tool/WrittenTestView";
import { RatingSheetView } from "./pages/competency-assessment-tool/RatingSheetView";
import { SAGView } from "./pages/competency-assessment-tool/SAGView";
import { CARSView } from "./pages/competency-assessment-tool/CARSView";
import { FinalExport } from "./pages/competency-assessment-tool/FinalExport";

export const pageConfig = {
  "evidence-plan": {
    component: EvidencePlanEditor,
    label: "Evidence Plan",
  },
  outline: {
    component: OutlineView,
    label: "Outline",
  },
  "demonstration-test": {
    component: DemonstrationTestEditor,
    label: "Demonstration Test",
  },
  "questioning-tool": {
    component: QuestioningToolEditor,
    label: "Questioning Tool",
  },
  "mcq-config": {
    component: MCQConfig,
    label: "MCQ Config",
  },
  mcq: {
    component: MCQEditor,
    label: "MCQ Editor",
  },
  "mcq-tos": {
    component: MCQTOSSummary,
    label: "MCQ TOS",
  },
  "mcq-analysis": {
    component: MCQExternalAnalysis,
    label: "MCQ Analysis",
  },
  "distribution-settings": {
    component: DistributionSettings,
    label: "Distribution Settings",
  },
  "ag-assembly": {
    component: AGAssemblyStatus,
    label: "Assessors Guide Assembly",
  },
  "package-navigator": {
    component: PackageNavigator,
    label: "Package Navigator",
  },
  "assessors-guide": {
    component: AssessorsGuide,
    label: "Assessor's Guide",
  },
  sic: {
    component: SICView,
    label: "SIC",
  },
  "written-test": {
    component: WrittenTestView,
    label: "Written Test",
  },
  "rating-sheet": {
    component: RatingSheetView,
    label: "Rating Sheet",
  },
  sag: {
    component: SAGView,
    label: "SAG",
  },
  cars: {
    component: CARSView,
    label: "CARS",
  },
  export: {
    component: FinalExport,
    label: "Final Export",
  },
} as const;

export type PageKey = keyof typeof pageConfig;
