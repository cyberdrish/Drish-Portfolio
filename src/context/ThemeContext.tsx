import { createContext, useEffect, useState, type ReactNode } from "react";

const ThemeContext = createContext<
  | {
      isDarkMode: boolean;
      toggleTheme: () => void;
    }
  | undefined
>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
