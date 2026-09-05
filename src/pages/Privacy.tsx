import { ArrowLeft, BarChart3, Mail, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics/clarity";
import useAnalytics from "../context/useAnalytics";

export const Privacy = () => {
  const { isTrackingReady, openAnalyticsPreferences } = useAnalytics();

  useEffect(() => {
    if (isTrackingReady) {
      trackEvent("privacy_page_viewed");
    }
  }, [isTrackingReady]);

  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground">
      <article className="container max-w-3xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>

        <div className="glass-panel p-6 text-left sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="rounded-md bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="section-kicker">Your privacy</p>
              <h1 className="mt-1 text-3xl font-bold">Analytics and privacy</h1>
            </div>
          </div>

          <div className="space-y-8 leading-7 text-muted-foreground">
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
                Microsoft Clarity
              </h2>
              <p>
                If you allow analytics, this portfolio uses Microsoft Clarity
                to understand page engagement, clicks, scrolling, device type,
                approximate location, errors, and navigation patterns. Clarity
                can create session replays and aggregated heatmaps. Analytics
                remains disabled when you deny permission.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Information not sent to analytics
              </h2>
              <p>
                Names, email addresses, phone numbers, contact messages, raw IP
                addresses, exact GPS location, and individual keystrokes are not
                intentionally sent as custom analytics data. Contact-form fields
                are explicitly masked from Clarity recordings.
              </p>
            </section>

            <section>
              <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold text-foreground">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                Contact form
              </h2>
              <p>
                Information you deliberately enter into the contact form is
                processed through EmailJS so that your message can be delivered.
                Analytics records only general outcomes such as whether sending
                succeeded or failed, never the submitted values.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-xl font-semibold text-foreground">
                Change your preference
              </h2>
              <p className="mb-4">
                You can reopen the analytics choice at any time. Withdrawing
                previously granted permission reloads the page so Clarity is no
                longer initialized on the next page load.
              </p>
              <button
                type="button"
                onClick={openAnalyticsPreferences}
                className="outline-button"
              >
                Analytics preferences
              </button>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};
