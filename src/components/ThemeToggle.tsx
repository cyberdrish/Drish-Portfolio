import { Moon, Sun } from "lucide-react";
import useTheme from "../context/useTheme";

const toggleButtonClassName =
  "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

function ThemeToggle() {
  const { accentTheme, isDarkMode, toggleAccentTheme, toggleTheme } = useTheme();

  return (
    <div
      className="ml-2 inline-flex h-10 shrink-0 items-center rounded-md border border-border bg-card/70 p-1 shadow-sm backdrop-blur-md sm:ml-3"
      role="group"
      aria-label="Appearance settings"
    >
      <button
        type="button"
        onClick={toggleAccentTheme}
        className={`${toggleButtonClassName} text-primary`}
        aria-label={`Switch to ${accentTheme === "purple" ? "blue" : "purple"} accent`}
        title={`Switch to ${accentTheme === "purple" ? "blue" : "purple"} accent`}
      >
        <span
          className="h-4 w-4 rounded-full bg-primary shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
          aria-hidden="true"
        />
      </button>
      <span className="h-5 w-px bg-border" aria-hidden="true" />
      <button
        type="button"
        onClick={toggleTheme}
        className={`${toggleButtonClassName} text-foreground`}
        aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
        title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4 text-amber-300" />
        ) : (
          <Moon className="h-4 w-4 text-primary" />
        )}
      </button>
    </div>
  );
}
export default ThemeToggle;
