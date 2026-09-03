import { createContext, useEffect, useState, type ReactNode } from "react";

type AccentTheme = "purple" | "blue";

const getInitialTheme = () => {
  try {
    return localStorage.getItem("theme") !== "light";
  } catch {
    return true;
  }
};

const getInitialAccent = (): AccentTheme => {
  try {
    return localStorage.getItem("accent-theme") === "blue"
      ? "blue"
      : "purple";
  } catch {
    return "purple";
  }
};

const ThemeContext = createContext<
  | {
      isDarkMode: boolean;
      accentTheme: AccentTheme;
      toggleTheme: () => void;
      toggleAccentTheme: () => void;
    }
  | undefined
>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [accentTheme, setAccentTheme] = useState<AccentTheme>(getInitialAccent);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle(
      "accent-blue",
      accentTheme === "blue"
    );
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";

    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      localStorage.setItem("accent-theme", accentTheme);
    } catch {
      // The selected theme still works when storage is unavailable.
    }
  }, [accentTheme, isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };

  const toggleAccentTheme = () => {
    setAccentTheme((currentAccent) =>
      currentAccent === "purple" ? "blue" : "purple"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, accentTheme, toggleTheme, toggleAccentTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
