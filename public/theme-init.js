(() => {
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
