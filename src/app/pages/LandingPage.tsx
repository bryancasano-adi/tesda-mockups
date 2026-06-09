import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  DocumentTextIcon,
  TableCellsIcon,
  BookOpenIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../components/ui/button";
import { ChartBarIcon } from "lucide-react";

const featureCards = [
  {
    title: "Level Alignment Matrix",
    description:
      "Visualize competency alignment and keep mapping relationships clear and consistent.",
    href: "/lam",
    icon: TableCellsIcon,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Implementing Guidelines",
    description:
      "Practical guidance and reference materials for consistent assessment implementation.",
    href: "/ig",
    icon: BookOpenIcon,
    accent: "from-fuchsia-500 to-rose-500",
  },
  {
    title: "Competency Assessment Tool",
    description:
      "Manage assessments, MCQs, evidence plans and export work in a structured workspace.",
    href: "/cats",
    icon: DocumentTextIcon,
    accent: "from-sky-500 to-indigo-500",
  },
  {
    title: "Competency-Based Learning Materials",
    description:
      "Generate CBLM modules, review learning sheets, manage front matter and export documents.",
    href: "/cbc",
    icon: AcademicCapIcon,
    accent: "from-amber-500 to-orange-600",
  },
  {
    title: "Control Dashboard",
    description:
      "Monitor and manage all tools, user access, and system settings from a centralized dashboard.",
    href: "/control-dashboard",
    icon: ChartBarIcon,
    accent: "from-gray-500 to-gray-700",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-full">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Mockups for Assessment Tools Portal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Access the mockups for the assessment tools for competency
            assessment, alignment mapping, and implementation guidance in one
            place.
          </p>
        </header>

        {/* Cards */}
        <section className="mt-14 grid gap-6 sm:grid-cols-3 lg:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-sm`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-xl font-semibold text-slate-900">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.description}
                </p>

                <Button asChild className="mt-6 w-full justify-between">
                  <Link to={card.href}>
                    Open
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
