import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import useAnalytics from "../context/useAnalytics";

export const AnalyticsConsentToast = () => {
  const { acceptAnalytics, denyAnalytics, isPromptOpen } = useAnalytics();

  if (!isPromptOpen) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      className="fixed bottom-4 left-[50vw] z-50 w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <span className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="analytics-consent-title" className="font-semibold">
              Help improve this portfolio
            </h2>
            <p
              id="analytics-consent-description"
              className="mt-1 break-words text-sm leading-6 text-muted-foreground"
            >
              Microsoft Clarity can anonymously record interactions and create
              heatmaps. Contact-form fields are masked.{" "}
              <Link
                to="/privacy"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Privacy details
              </Link>
            </p>
          </div>
        </div>
        <div className="grid min-w-0 shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-col">
          <button
            type="button"
            onClick={acceptAnalytics}
            className="cosmic-button min-w-0 justify-center px-3 py-2 text-sm"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={denyAnalytics}
            className="outline-button min-w-0 justify-center px-3 py-2 text-sm"
          >
            Deny
          </button>
        </div>
      </div>
    </aside>
  );
};
