import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { isCblmFullBleedRoute, isCblmRoute } from "@/app/utils/cblmRoutes";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const isNoVariantPage =
    location.pathname === "/" || location.pathname === "/cats";
  const variant = isCblmRoute(location.pathname) ? "cblm" : "cats";
  const fullBleed = isCblmFullBleedRoute(location.pathname);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <Header
        onToggleSidebar={toggleSidebar}
        variant={isNoVariantPage ? undefined : variant}
        onBack={() => (window.location.href = "/")}
        onSaveDraft={() => alert("Changes have been saved as a draft.")}
        onValidate={() => alert("Validation successful! No issues found.")}
        onFinalize={() => alert("Document has been finalized.")}
      />

      <div className="mt-10 flex min-h-0 flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />

        <main
          className={`flex min-h-0 flex-1 flex-col ${
            fullBleed ? "overflow-hidden" : "overflow-auto p-6"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
