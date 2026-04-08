import { EvidencePlanEditor } from "./pages/EvidencePlanEditor";
import { OutlineView } from "./pages/OutlineView";
import { DemonstrationTestEditor } from "./pages/DemonstrationTestEditor";
import { QuestioningToolEditor } from "./pages/QuestioningToolEditor";
import { MCQConfig } from "./pages/MCQConfig";
import { MCQEditor } from "./pages/MCQEditor";
import { MCQTOSSummary } from "./pages/MCQTOSSummary";
import { MCQExternalAnalysis } from "./pages/MCQExternalAnalysis";
import { DistributionSettings } from "./pages/DistributionSettings";
import { AGAssemblyStatus } from "./pages/AGAssemblyStatus";
import { PackageNavigator } from "./pages/PackageNavigator";
import { AssessorsGuide } from "./pages/AssessorsGuide";
import { SICView } from "./pages/SICView";
import { WrittenTestView } from "./pages/WrittenTestView";
import { RatingSheetView } from "./pages/RatingSheetView";
import { SAGView } from "./pages/SAGView";
import { CARSView } from "./pages/CARSView";
import { FinalExport } from "./pages/FinalExport";

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
