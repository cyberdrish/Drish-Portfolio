import { Moon, Sun } from "lucide-react";
import useTheme from "../context/useTheme";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="pl-2 sm:pl-6 rounded-full transition-colors duration-300 focus:outline-hidden"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
}
export default ThemeToggle;
