import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../analytics/clarity";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);

  const trackNavigation = (name: string, placement: "desktop" | "mobile") => {
    trackEvent("nav_" + name.toLowerCase() + "_" + placement);
  };

  const toggleMobileMenu = () => {
    trackEvent(isMenuOpen ? "mobile_menu_close_button" : "mobile_menu_open");
    setIsMenuOpen((value) => !value);
  };

  useEffect(() => {
    const handleScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScrolled();
    window.addEventListener("scroll", handleScrolled, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolled);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeMenuAtDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
        menuButtonRef.current?.blur();
      }
    };

    desktopQuery.addEventListener("change", closeMenuAtDesktopBreakpoint);
    return () =>
      desktopQuery.removeEventListener("change", closeMenuAtDesktopBreakpoint);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const navigation = mobileNavigationRef.current;

    document.body.style.overflow = "hidden";
    navigation?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        trackEvent("mobile_menu_close_escape");
        setIsMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = [
        menuButtonRef.current,
        ...(navigation?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
      ].filter(
        (element): element is HTMLAnchorElement | HTMLButtonElement =>
          element !== null,
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      const currentIndex = focusableElements.findIndex(
        (element) => element === document.activeElement,
      );
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? focusableElements.length - 1
          : currentIndex - 1
        : currentIndex < 0 || currentIndex === focusableElements.length - 1
          ? 0
          : currentIndex + 1;

      event.preventDefault();
      focusableElements[nextIndex]?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[padding,background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled && !isMenuOpen
          ? "border-border/70 bg-background/40 py-3 shadow-[0_8px_28px_rgb(15_23_42/0.10)] backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent py-5"
      }`}
    >
      <div className="container flex h-10 items-center justify-between">
        <a
          className="flex h-10 shrink-0 items-center text-xl font-bold text-primary"
          href="#hero"
          onClick={() => trackEvent("logo_click")}
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">DrishDev</span>
            <span className="hidden min-[360px]:inline"> Portfolio</span>
          </span>
        </a>
        <div className="flex h-10 items-center">
          {/* desktop version */}
          <div className="hidden h-10 items-center md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => trackNavigation(item.name, "desktop")}
                className="inline-flex h-10 items-center px-3 text-foreground/80 transition-colors duration-300 hover:text-primary lg:px-4"
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* mobile version */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMobileMenu}
            className="z-50 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ThemeToggle />

          <div
            ref={mobileNavigationRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!isMenuOpen}
            className={`fixed inset-0 bg-background/30 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
              isMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col space-y-8 text-xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => {
                    trackNavigation(item.name, "mobile");
                    trackEvent("mobile_menu_destination_selected");
                    setIsMenuOpen(false);
                  }}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
