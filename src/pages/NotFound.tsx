import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics/clarity";
import useAnalytics from "../context/useAnalytics";

export const NotFound = () => {
  const { isTrackingReady } = useAnalytics();

  useEffect(() => {
    if (isTrackingReady) {
      trackEvent("not_found_viewed");
    }
  }, [isTrackingReady]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="glass-panel max-w-lg p-10 text-center">
        <p className="section-kicker">404</p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you requested does not exist or may have moved.
        </p>
        <Link to="/" className="cosmic-button mt-8">
          Return to portfolio
        </Link>
      </div>
    </main>
  );
};
