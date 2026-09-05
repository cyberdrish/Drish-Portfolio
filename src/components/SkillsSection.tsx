import { useState } from "react";
import {
  Bot,
  Braces,
  ChartNoAxesCombined,
  Database,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { setSessionTag, trackEvent } from "../analytics/clarity";
import { careerMetrics } from "../data/portfolio";
import { SectionHeader } from "./SectionHeader";

const skillGroups = [
  {
    category: "frontend",
    title: "Frontend Architecture",
    icon: Braces,
    skills: [
      "React.js",
      "React Hooks",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "React Router",
      "Tailwind CSS",
      "Styled Components",
    ],
    proof: "Reusable UI modules, component libraries, theming, and responsive dashboard layouts.",
  },
  {
    category: "data",
    title: "Dashboards and Data",
    icon: ChartNoAxesCombined,
    skills: [
      "Recharts",
      "Chart.js",
      "Data tables",
      "GraphQL",
      "REST APIs",
      "Axios",
      "Real-time panels",
      "Market analytics",
    ],
    proof: "Interactive charts and operational screens for enterprise and energy-trading products.",
  },
  {
    category: "quality",
    title: "Quality and Accessibility",
    icon: ShieldCheck,
    skills: [
      "WCAG",
      "Jest",
      "React Testing Library",
      "Cypress",
      "Playwright",
      "TDD",
      "ATDD",
      "Regression testing",
    ],
    proof: "Accessible, cross-browser, tested interfaces built for stable release cycles.",
  },
  {
    category: "backend",
    title: "Backend and Data Stores",
    icon: Database,
    skills: [
      "Supabase",
      "Firebase",
      "PostgreSQL",
      "MySQL",
      "Microsoft SQL",
      ".NET basics",
      "C# basics",
      "RBAC",
      "JWT",
    ],
    proof: "Enough backend fluency to wire secure API-driven frontend workflows end to end.",
  },
  {
    category: "delivery",
    title: "DevOps and Delivery",
    icon: GitBranch,
    skills: [
      "Git",
      "GitHub Actions",
      "Azure DevOps",
      "Azure Pipelines",
      "CI/CD",
      "Vite",
      "Webpack",
      "Release automation",
    ],
    proof: `Release-aware frontend work, including Azure pipeline collaboration and ${careerMetrics.releaseCadence.current} cadence.`,
  },
  {
    category: "ai",
    title: "AI-Assisted Workflow",
    icon: Bot,
    skills: [
      "GitHub Copilot",
      "Cursor",
      "Claude Code",
      "ChatGPT",
      "Google Gemini",
      "Code reviews",
      "Debugging",
      "Mentoring",
    ],
    proof: "Modern AI tooling used as an accelerator for delivery, reviews, and troubleshooting.",
  },
];

const categories = ["all", ...skillGroups.map((group) => group.category)];

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setSessionTag("skill_interest", category);
    trackEvent("skill_filter_" + category);
  };

  const filteredSkillGroups = skillGroups.filter(
    (group) => activeCategory === "all" || group.category === activeCategory,
  );

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeader
          kicker="Capability map"
          title={
            <>
              Skills organized around{" "}
              <span className="text-primary">the work you hire me for</span>
            </>
          }
          description={
            <>
              A broad technical toolkit grouped into practical product
              capabilities, from frontend architecture to reliable delivery.
            </>
          }
        />

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => selectCategory(category)}
              aria-pressed={activeCategory === category}
              className={`filter-pill ${
                activeCategory === category ? "filter-pill-active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredSkillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.title} className="skill-matrix-card">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm capitalize text-muted-foreground">
                      {group.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{group.title}</h3>
                  </div>
                  <div className="rounded-md border border-border bg-secondary/70 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="mb-5 text-sm leading-6 text-muted-foreground">
                  {group.proof}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="resume-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
