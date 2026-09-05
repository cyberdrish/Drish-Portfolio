import { useEffect } from "react";
import { setSessionTag, trackEvent } from "../analytics/clarity";
import useAnalytics from "../context/useAnalytics";

const sectionIds = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

const scrollThresholds = [25, 50, 75, 90, 100] as const;

const getViewportGroup = () => {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

const getReferrerCategory = () => {
  if (!document.referrer) return "direct";

  try {
    const hostname = new URL(document.referrer).hostname.toLowerCase();
    if (hostname.includes("linkedin")) return "linkedin";
    if (hostname.includes("github")) return "github";
    if (hostname.includes("google")) return "google";
    if (hostname.includes("bing")) return "bing";
    return "other";
  } catch {
    return "other";
  }
};

const sanitizeCampaignValue = (value: string) =>
  /^[a-zA-Z0-9_-]{1,64}$/.test(value) ? value.toLowerCase() : "invalid";

export const usePortfolioTracking = () => {
  const { isTrackingReady } = useAnalytics();

  useEffect(() => {
    if (!isTrackingReady) return;

    trackEvent("portfolio_loaded");
    setSessionTag("viewport_group", getViewportGroup());
    setSessionTag("landing_path", window.location.pathname);
    setSessionTag("referrer_category", getReferrerCategory());
    setSessionTag(
      "initial_theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
    setSessionTag(
      "initial_accent",
      document.documentElement.classList.contains("accent-blue")
        ? "blue"
        : "purple",
    );

    const query = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
      const value = query.get(key);
      if (value) {
        setSessionTag(key, sanitizeCampaignValue(value));
      }
    }

    let activeStart = document.hidden ? 0 : Date.now();
    let activeMilliseconds = 0;
    const engagementMilestones = new Set<number>();
    const timers = [10, 30, 60].map((seconds) =>
      window.setInterval(() => {
        const currentActiveMilliseconds =
          activeMilliseconds + (activeStart ? Date.now() - activeStart : 0);
        if (
          currentActiveMilliseconds >= seconds * 1000 &&
          !engagementMilestones.has(seconds)
        ) {
          engagementMilestones.add(seconds);
          trackEvent("portfolio_engaged_" + seconds + "_seconds");
        }
      }, 1000),
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (activeStart) {
          activeMilliseconds += Date.now() - activeStart;
          activeStart = 0;
        }
        trackEvent("tab_became_hidden");
      } else {
        activeStart = Date.now();
        trackEvent("tab_became_visible");
      }
    };

    const reachedScrollDepths = new Set<number>();
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth =
        scrollableHeight <= 0
          ? 100
          : Math.min(100, (window.scrollY / scrollableHeight) * 100);

      for (const threshold of scrollThresholds) {
        if (
          scrollDepth >= threshold &&
          !reachedScrollDepths.has(threshold)
        ) {
          reachedScrollDepths.add(threshold);
          trackEvent("scroll_depth_" + threshold);
        }
      }
    };

    const visibleSections = new Set<string>();
    const pendingSectionTimers = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.id;
          const pendingTimer = pendingSectionTimers.get(sectionId);

          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
            if (pendingTimer) {
              window.clearTimeout(pendingTimer);
              pendingSectionTimers.delete(sectionId);
            }
            continue;
          }

          if (visibleSections.has(sectionId) || pendingTimer) continue;

          const timer = window.setTimeout(() => {
            visibleSections.add(sectionId);
            pendingSectionTimers.delete(sectionId);
            trackEvent("section_view_" + sectionId);
            observer.unobserve(entry.target);
          }, 750);
          pendingSectionTimers.set(sectionId, timer);
        }
      },
      { threshold: [0.5] },
    );

    for (const sectionId of sectionIds) {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    }

    handleScroll();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      timers.forEach(window.clearInterval);
      pendingSectionTimers.forEach(window.clearTimeout);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTrackingReady]);
};
