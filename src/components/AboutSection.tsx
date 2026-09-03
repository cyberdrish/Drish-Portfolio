import {
  Bot,
  BriefcaseBusiness,
  Code2,
  Gauge,
  Layers3,
  Users,
} from "lucide-react";

const strengths = [
  {
    title: "Frontend Architecture",
    description:
      "Reusable React, TypeScript, and Next.js modules for data-heavy enterprise products.",
    icon: Layers3,
  },
  {
    title: "Performance Engineering",
    description:
      "Lazy loading, code splitting, caching, and rendering improvements that cut page-load friction.",
    icon: Gauge,
  },
  {
    title: "Design Systems",
    description:
      "Component-driven UI, theming, accessibility, and consistency across complex workflows.",
    icon: Code2,
  },
  {
    title: "Product Collaboration",
    description:
      "Close work with UX, QA, DevOps, product stakeholders, and engineering teams in Agile delivery.",
    icon: Users,
  },
  {
    title: "AI-Assisted Delivery",
    description:
      "Practical use of Copilot, Cursor, Claude Code, ChatGPT, and Gemini to move faster with quality.",
    icon: Bot,
  },
  {
    title: "Enterprise Dashboards",
    description:
      "Real-time visualization panels, interactive charts, tables, and decision-support experiences.",
    icon: BriefcaseBusiness,
  },
];

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker mx-auto mb-4">Engineering profile</div>
          <h2 className="text-3xl md:text-4xl font-bold">
            A frontend engineer for{" "}
            <span className="text-primary">serious product surfaces</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            I do my best work where UI meets business pressure: real-time
            dashboards, high-frequency data, accessibility, performance, and
            teams that need reusable frontend systems instead of one-off pages.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="bento-card lg:col-span-3 lg:row-span-2">
            <span className="section-kicker">Core story</span>
            <h3 className="mt-4 text-2xl font-semibold">
              From intern to Senior Software Developer, with product impact
              along the way.
            </h3>
            <p className="mt-4 text-muted-foreground">
              I have worked across SaaS products, real-time energy trading
              workflows, enterprise dashboards, and modern React migrations. My
              work reduced rendering/page-load time by 20%, reduced legacy UI
              maintenance by 25%, and helped release cadence move from
              bi-monthly to weekly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "WCAG", "Azure CI/CD"].map(
                (item) => (
                  <span key={item} className="resume-chip">
                    {item}
                  </span>
                )
              )}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#experience" className="cosmic-button">
                Explore experience
              </a>
              <a href="#contact" className="outline-button">
                Start a conversation
              </a>
            </div>
          </div>

          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <div
                key={strength.title}
                className="bento-card card-hover lg:col-span-3"
              >
                <div className="mb-5 inline-flex rounded-md border border-border bg-secondary/60 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">{strength.title}</h4>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {strength.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
