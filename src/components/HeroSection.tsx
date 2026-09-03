import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Gauge,
  LineChart,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

const impactMetrics = [
  { value: "5+", label: "years building frontend products" },
  { value: "20%", label: "faster rendering and page loads" },
  { value: "25%", label: "less legacy UI maintenance" },
];

const liveSignals = [
  { label: "React + TypeScript modules", value: "Reusable UI", icon: Sparkles },
  { label: "Real-time dashboards", value: "Sub-second data", icon: LineChart },
  { label: "WCAG + testing quality", value: "Reliable delivery", icon: ShieldCheck },
];

function HeroSection() {
  const [showScrollCue, setShowScrollCue] = useState(
    () => typeof window === "undefined" || window.scrollY < 64,
  );

  useEffect(() => {
    let animationFrame = 0;

    const updateScrollCue = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        setShowScrollCue(window.scrollY < 64);
      });
    };

    updateScrollCue();
    window.addEventListener("scroll", updateScrollCue, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateScrollCue);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pb-20 pt-28"
    >
      <div className="container max-w-6xl mx-auto z-10">
        <div className="grid min-h-[72vh] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 text-left">
            <div className="section-kicker opacity-0 animate-fade-in">
              Senior Frontend Engineer
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                <span className="opacity-0 animate-fade-in-delay-1">
                  I build fast, accessible
                </span>
                <span className="text-gradient block opacity-0 animate-fade-in-delay-2">
                  React dashboards
                </span>
                <span className="opacity-0 animate-fade-in-delay-3">
                  for real business workflows.
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-xl opacity-0 animate-fade-in-delay-4">
                I am Drish Malhotra, a React.js, TypeScript, and Next.js
                specialist with 5+ years of experience across SaaS products,
                enterprise dashboards, design systems, real-time energy trading
                tools, performance optimization, WCAG accessibility, and Azure
                CI/CD delivery.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="cosmic-button">
                View case studies
                <ArrowRight size={18} />
              </a>
              <a
                href="/Drish_Malhotra_Resume.pdf"
                className="outline-button"
                download
              >
                Download resume
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="metric-tile">
                  <span>{metric.value}</span>
                  <p>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="glass-panel w-full overflow-hidden p-4 text-left md:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Live portfolio OS
                  </p>
                  <h2 className="text-xl font-semibold">
                    Frontend architecture console
                  </h2>
                </div>
                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                  Available
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background/75 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Performance trace
                  </span>
                </div>
                <div className="space-y-3">
                  {["Lazy loading", "Code splitting", "Caching strategy"].map(
                    (item, index) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="w-28 text-sm text-muted-foreground">
                          {item}
                        </span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-primary to-amber-300"
                            style={{ width: `${88 - index * 9}%` }}
                          />
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {liveSignals.map((signal) => {
                  const Icon = signal.icon;
                  return (
                    <div key={signal.label} className="resume-signal-card">
                      <Icon className="h-5 w-5 text-primary" />
                      <strong>{signal.value}</strong>
                      <span>{signal.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="deployment-status mt-4">
                <Terminal
                  className="relative z-10 mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p>
                  <span>deploy://</span> Azure pipeline cadence improved from
                  bi-monthly to weekly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <a
        href="#about"
        className={`scroll-beacon group fixed bottom-6 z-20 hidden -translate-x-1/2 transition-[opacity,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:flex ${
          showScrollCue
            ? "opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        style={{ left: "calc(50% + clamp(15rem, 20vw, 18rem))" }}
        aria-label="Scroll to About section"
        aria-hidden={!showScrollCue}
        tabIndex={showScrollCue ? 0 : -1}
        title="Scroll to About"
      >
        <span className="scroll-beacon-core" aria-hidden="true">
          <ChevronDown className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </a>
    </section>
  );
}

export default HeroSection;
