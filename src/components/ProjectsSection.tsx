import { ArrowRight, ExternalLink, Github } from "lucide-react";
import useTheme from "../context/useTheme";
import { SectionHeader } from "./SectionHeader";

const projects = [
  {
    id: 1,
    title: "Hotel Booking Website",
    description:
      "A guest-facing reservation product with date selection, party sizing, availability checks, bookings, and a responsive dashboard experience.",
    impact: "API-driven reservations and reusable booking UI",
    imageLight: "/projects/project1_light.png",
    imageDark: "/projects/project1_dark.png",
    tags: [
      "Next js",
      "react js",
      "tailwind",
      "Supabase",
      "NextAuth js",
      "React-day-picker",
    ],
    demoUrl: "https://hotel-bookings-website.vercel.app",
    githubUrl: "https://github.com/cyberdrish/hotel_bookings_website",
  },
  {
    id: 2,
    title: "Hotel Management",
    description:
      "A staff dashboard for secure login, booking operations, room inventory, pricing updates, account workflows, and visual business reporting.",
    impact: "Dashboard workflows, auth, charts, and admin UX",
    imageLight: "/projects/project2_light.png",
    imageDark: "/projects/project2_dark.png",
    tags: [
      "react",
      "styled components",
      "Supabase",
      "Supabase-Auth",
      "Recharts",
      "React-router-dom",
      "React-hook-form",
    ],
    demoUrl: "https://hotelbookingmanager.netlify.app/",
    githubUrl: "https://github.com/cyberdrish/hotel_manager",
  },
  {
    id: 3,
    title: "Restaurant Food Order",
    description:
      "A customer ordering flow with menu browsing, cart management, checkout, dynamic UI states, and external API integration.",
    impact: "Responsive commerce flow with clean state handling",
    imageLight: "/projects/project3_light.png",
    imageDark: "/projects/project3_dark.png",
    tags: ["react", "tailwind css", "Open Api", "lucide-react", "vite"],
    demoUrl: "https://restaurantfoodorderonline.netlify.app/",
    githubUrl: "https://github.com/cyberdrish/restaurant_food_order",
  },
];

export const ProjectsSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeader
          kicker="Selected work"
          title={
            <>
              Projects built around{" "}
              <span className="text-primary">real product workflows</span>
            </>
          }
          description={
            <>
              Dashboard workflows, authentication, API-driven experiences,
              state management, responsive UI, and production deployment in
              practice.
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group project-card overflow-hidden card-hover"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={isDarkMode ? project.imageDark : project.imageLight}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shadow-2xl"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-md border border-white/15 bg-black/55 px-3 py-2 text-left text-sm text-white backdrop-blur-md">
                  {project.impact}
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="resume-chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} live demo`}
                    className="icon-link"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} GitHub repository`}
                    className="icon-link"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            className="cosmic-button hover:gap-9"
            target="_blank"
            rel="noreferrer"
            href="https://www.github.com/cyberdrish"
          >
            Check My GitHub
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
