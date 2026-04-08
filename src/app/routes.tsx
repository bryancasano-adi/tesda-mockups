import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { EvidencePlanEditor } from "./pages/EvidencePlanEditor";
import { OutlineView } from "./pages/OutlineView";
import { DemonstrationTestEditor } from "./pages/DemonstrationTestEditor";
import { DemoToolsEquipment } from "./pages/DemoToolsEquipment";
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
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "evidence-plan", Component: EvidencePlanEditor },
      { path: "outline", Component: OutlineView },
      { path: "demonstration-test", Component: DemonstrationTestEditor },
      { path: "demo-tools", Component: DemoToolsEquipment },
      { path: "questioning-tool", Component: QuestioningToolEditor },
      { path: "mcq-config", Component: MCQConfig },
      { path: "mcq", Component: MCQEditor },
      { path: "mcq-tos", Component: MCQTOSSummary },
      { path: "mcq-analysis", Component: MCQExternalAnalysis },
      { path: "distribution-settings", Component: DistributionSettings },
      { path: "ag-assembly", Component: AGAssemblyStatus },
      { path: "package-navigator", Component: PackageNavigator },
      { path: "assessors-guide", Component: AssessorsGuide },
      { path: "sic", Component: SICView },
      { path: "written-test", Component: WrittenTestView },
      { path: "rating-sheet", Component: RatingSheetView },
      { path: "sag", Component: SAGView },
      { path: "cars", Component: CARSView },
      { path: "export", Component: FinalExport },
      { path: "*", Component: NotFound },
    ],
  },
]);