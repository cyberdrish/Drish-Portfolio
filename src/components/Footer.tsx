import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics/clarity";
import useAnalytics from "../context/useAnalytics";

export const Footer = () => {
  const { openAnalyticsPreferences } = useAnalytics();

  return (
    <footer className="relative mt-12 flex flex-wrap items-center justify-between border-t border-border bg-card px-4 pb-12 pt-8">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Drish Malhotra. All rights reserved.
      </p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Link
          to="/privacy"
          onClick={() => trackEvent("footer_privacy_click")}
          className="transition-colors hover:text-primary"
        >
          Privacy
        </Link>
        <button
          type="button"
          onClick={() => {
            trackEvent("analytics_preferences_open");
            openAnalyticsPreferences();
          }}
          className="transition-colors hover:text-primary"
        >
          Analytics settings
        </button>
      </div>
      <a
        href="#hero"
        onClick={() => trackEvent("footer_back_to_top")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
