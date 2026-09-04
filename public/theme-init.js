(() => {
  // Keep this in sync with ThemeContext. It runs before React renders so the
  // saved appearance is applied without flashing the default theme.
  const root = document.documentElement;

  try {
    const isDarkMode = localStorage.getItem("theme") !== "light";
    const isBlueAccent = localStorage.getItem("accent-theme") === "blue";

    root.classList.toggle("dark", isDarkMode);
    root.classList.toggle("accent-blue", isBlueAccent);
    root.style.colorScheme = isDarkMode ? "dark" : "light";
  } catch {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }
})();
