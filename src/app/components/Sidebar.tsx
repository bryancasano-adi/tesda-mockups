"use client";

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Bars3BottomLeftIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChartBarIcon } from "lucide-react";

const mockTrainingProjects = [
  {
    project_id: "1",
    sub_sector_id: "a",
    project_name: "Leadership Training Program",
  },
  {
    project_id: "2",
    sub_sector_id: "b",
    project_name: "Digital Transformation Workshop",
  },
  {
    project_id: "3",
    sub_sector_id: "c",
    project_name: "Customer Experience Enhancement",
  },
  {
    project_id: "4",
    sub_sector_id: "d",
    project_name: "Agile Methodology Bootcamp",
  },
  {
    project_id: "5",
    sub_sector_id: "e",
    project_name: "Battery Electric Vehicle (BEV) Servicing Level II",
  },
];

const navigation = [
  {
    name: "Sectors",
    href: "/sectors",
    icon: <Bars3BottomLeftIcon />,
  },
  { name: "Documents", href: "/documents", icon: <DocumentTextIcon /> },
  {
    name: "Adopt and Adapt",
    href: "/adopt-and-adapt",
    icon: <Cog6ToothIcon />,
  },
  {
    name: "Supermarket of Competencies",
    href: "/supermarket-of-competencies",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Control Dashboard",
    href: "/control-dashboard",
    icon: <ChartBarIcon />,
  },
];

interface SidebarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export function Sidebar({ onClose, isOpen = true }: SidebarProps) {
  const navigate = useNavigate();

  const [projectSearch, setProjectSearch] = useState("");
  const [trainingProjects, setTrainingProjects] = useState<any[]>([]);
  const [isLoadingTrainingProjects, setIsLoadingTrainingProjects] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrainingProjects(mockTrainingProjects);
      setIsLoadingTrainingProjects(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (subSectorId?: string, projectId?: string) => {
    if (subSectorId && projectId) {
      navigate(projectId === "5" ? `/cbc` : `/`);
    }
  };

  const handleProjectKeyDown = (
    e: React.KeyboardEvent,
    subSectorId?: string,
    projectId?: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleProjectClick(subSectorId, projectId);
    }
  };

  const filteredProjects = trainingProjects.filter((project) =>
    project.project_name?.toLowerCase().includes(projectSearch.toLowerCase()),
  );

  return (
    <div
      className={`
        flex flex-col bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-0 overflow-hidden"}
      `}
    >
      {isOpen && (
        <>
          {/* Navigation */}
          <nav className="py-6 px-8 border-b border-gray-200 flex flex-col gap-1 flex-shrink-0">
            {navigation.map((item) => {
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="w-5 h-5 text-blue-800">{item.icon}</span>
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Training Projects */}
          <div className="px-4 pb-4 flex flex-col flex-1 overflow-y-auto">
            {isLoadingTrainingProjects && trainingProjects.length === 0 ? (
              <div className="text-sm text-gray-400 text-center py-4">
                Loading Training Projects...
              </div>
            ) : trainingProjects.length > 0 ? (
              <>
                <h3 className="text-sm font-medium text-gray-500 mb-3 mt-4">
                  Training Projects
                </h3>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                />

                {/* Project List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => {
                      const isCBLMProject =
                        project.project_name === "BEV Servicing Level II" ||
                        project.project_name ===
                          "Food and Beverage Services NC II";

                      return (
                        <div
                          key={`training-${project.project_id || index}`}
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            handleProjectClick(
                              project.sub_sector_id,
                              project.project_id,
                            )
                          }
                          onKeyDown={(e) =>
                            handleProjectKeyDown(
                              e,
                              project.sub_sector_id,
                              project.project_id,
                            )
                          }
                          className={`text-sm hover:bg-blue-50 hover:text-blue-800 cursor-pointer py-1 px-2 rounded truncate ${
                            isCBLMProject
                              ? "bg-blue-50 text-blue-800 font-medium"
                              : "text-black"
                          }`}
                        >
                          {project.project_name}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-sm text-gray-400 py-2 pl-2">
                      No projects found
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
