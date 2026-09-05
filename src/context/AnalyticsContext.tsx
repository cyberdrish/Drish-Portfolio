import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  disableClarity,
  enableClarity,
  readAnalyticsConsent,
  storeAnalyticsConsent,
  trackEvent,
  type AnalyticsConsent,
} from "../analytics/clarity";

type AnalyticsContextValue = {
  consent: AnalyticsConsent;
  isTrackingReady: boolean;
  isPromptOpen: boolean;
  acceptAnalytics: () => void;
  denyAnalytics: () => void;
  openAnalyticsPreferences: () => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(
  undefined,
);

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<AnalyticsConsent>(
    readAnalyticsConsent,
  );
  const [isPromptOpen, setIsPromptOpen] = useState(consent === null);
  const [isTrackingReady, setIsTrackingReady] = useState(false);

  useEffect(() => {
    if (consent === "accepted") {
      enableClarity();
      setIsTrackingReady(true);
    } else {
      setIsTrackingReady(false);
    }
  }, [consent]);

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      consent,
      isTrackingReady,
      isPromptOpen,
      acceptAnalytics: () => {
        enableClarity();
        trackEvent("analytics_consent_accepted");
        storeAnalyticsConsent("accepted");
        setConsent("accepted");
        setIsTrackingReady(true);
        setIsPromptOpen(false);
      },
      denyAnalytics: () => {
        const isRevokingConsent = consent === "accepted";
        disableClarity();
        storeAnalyticsConsent("denied");
        setConsent("denied");
        setIsTrackingReady(false);
        setIsPromptOpen(false);

        if (isRevokingConsent) {
          window.location.reload();
        }
      },
      openAnalyticsPreferences: () => setIsPromptOpen(true),
    }),
    [consent, isPromptOpen, isTrackingReady],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export { AnalyticsContext, AnalyticsProvider };
