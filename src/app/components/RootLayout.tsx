import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const isNoVariantPage =
    location.pathname === "/" ||
    location.pathname === "/cats" ||
    location.pathname === "/cblm";
  const variant = location.pathname.startsWith("/cblm") ? "cblm" : "cats";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        onToggleSidebar={toggleSidebar}
        variant={isNoVariantPage ? undefined : variant}
        onBack={() => (window.location.href = "/")}
        onSaveDraft={() => alert("Changes have been saved as a draft.")}
        onValidate={() => alert("Validation successful! No issues found.")}
        onFinalize={() => alert("Document has been finalized.")}
      />

      <div className="flex flex-1 mt-10">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
