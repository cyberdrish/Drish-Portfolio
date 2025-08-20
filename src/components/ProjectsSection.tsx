import { Description } from "@radix-ui/react-toast";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import useTheme from "../context/useTheme";

const projects = [
  {
    id: 1,
    title: "SaaS Landing page",
    description:
      " Interactive analytics dashboard with data visualisation and filtering capabilities",
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
      " Interactive analytics dashboard with data visualisation and filtering capabilities",
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
    demoUrl: "https://hotelbookingmanager.netlify.app/login",
    githubUrl: "https://github.com/cyberdrish/hotel_manager",
  },
  {
    id: 3,
    title: "SaaS Landing page",
    description:
      " Interactive analytics dashboard with data visualisation and filtering capabilities",
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
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance and user experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card/90 rounded-lg overflow-hidden shadow-md card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={
                    isDarkMode === true ? project.imageDark : project.imageLight
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shadow-2xl"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-1 text-sm font-medium border rounded-full bg-primary/10 text-foreground"
                    >
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
                    className="text-foreground/20 hover:text-primary transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="text-foreground/20 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 ">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 hover:gap-9"
            target="_blank"
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
