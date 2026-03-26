import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { EvidencePlanEditor } from "./pages/EvidencePlanEditor";
import { OutlineView } from "./pages/OutlineView";
import { DemonstrationTestEditor } from "./pages/DemonstrationTestEditor";
import { QuestioningToolEditor } from "./pages/QuestioningToolEditor";
import { MCQEditor } from "./pages/MCQEditor";
import { AssessorsGuide } from "./pages/AssessorsGuide";
import { SICView } from "./pages/SICView";
import { RatingSheetView } from "./pages/RatingSheetView";
import { SAGView } from "./pages/SAGView";
import { CARSView } from "./pages/CARSView";
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
      { path: "questioning-tool", Component: QuestioningToolEditor },
      { path: "mcq", Component: MCQEditor },
      { path: "assessors-guide", Component: AssessorsGuide },
      { path: "sic", Component: SICView },
      { path: "rating-sheet", Component: RatingSheetView },
      { path: "sag", Component: SAGView },
      { path: "cars", Component: CARSView },
      { path: "*", Component: NotFound },
    ],
  },
]);
