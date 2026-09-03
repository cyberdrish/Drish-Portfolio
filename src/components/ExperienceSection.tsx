import { Award, Building2, GraduationCap, TrendingUp } from "lucide-react";

const roles = [
  {
    company: "TechUApps Technologies",
    title: "Software Developer",
    period: "Apr 2024 - Present",
    location: "Noida, India",
    focus: "Enterprise dashboards and high-frequency workflows",
    bullets: [
      "Architected reusable React, TypeScript, and Next.js modules for data-heavy enterprise dashboards.",
      "Built real-time visualization panels, interactive charts, and data tables for faster operational decisions.",
      "Led frontend reviews and mentored junior engineers on design-system consistency, WCAG, testing, and AI-assisted development.",
    ],
    metrics: ["20% rendering improvement", "Sub-second operational updates"],
  },
  {
    company: "Open Access Technology India Pvt Ltd",
    title: "Intern to Senior Software Developer",
    period: "Jan 2021 - Apr 2024",
    location: "Mohali, India",
    focus: "Energy trading SaaS and market analytics workflows",
    bullets: [
      "Worked on WebSmartTrader, WebTrader, and Deal Entry for North American energy and utility workflows.",
      "Migrated Backbone.js and Ext JS modules into modern React components and Hooks.",
      "Partnered with UX, QA, DevOps, product, and engineering to align delivery with business requirements.",
    ],
    metrics: ["25% less UI maintenance", "Weekly release cadence"],
  },
];

const credentials = [
  "MCA, Chitkara University - CGPA 9.39",
  "BCA, Chitkara University - CGPA 7.95",
  "Acceptance Test-Driven Development for the Front End",
  "Introduction to Playwright",
  "Qualcomm AI Upskilling 2026",
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative px-4 py-24 bg-secondary/25">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-5 text-left md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker mb-4">Career trace</div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Built through real products and{" "}
              <span className="text-primary">measurable outcomes</span>
            </h2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Modern React delivery, measurable performance work, real-time
            dashboards, and senior-level collaboration across product teams.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.62fr]">
          <div className="space-y-5">
            {roles.map((role, index) => (
              <article key={role.company} className="timeline-card">
                <div className="timeline-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="timeline-index-mobile">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>{role.period}</span>
                      <span>{role.location}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold">{role.company}</h3>
                    <p className="mt-1 text-primary">{role.title}</p>
                    <p className="mt-4 text-muted-foreground">{role.focus}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-52 md:justify-end">
                    {role.metrics.map((metric) => (
                      <span key={metric} className="resume-chip">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-left text-sm leading-6 text-muted-foreground">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <TrendingUp className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="glass-panel p-6 text-left">
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Education and proof</h3>
            </div>
            <div className="space-y-3">
              {credentials.map((item) => (
                <div key={item} className="credential-row">
                  <Award className="h-4 w-4 text-amber-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-border bg-background/60 p-5">
              <p className="text-sm text-muted-foreground">Best fit roles</p>
              <p className="mt-2 font-semibold">
                Senior Frontend Engineer, React Engineer, Frontend Architect,
                Dashboard UI Engineer
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
