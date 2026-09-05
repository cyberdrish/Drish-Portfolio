import Clarity from "@microsoft/clarity";

export type AnalyticsConsent = "accepted" | "denied" | null;

const CONSENT_STORAGE_KEY = "portfolio_analytics_consent_v1";
const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

let isInitialized = false;
let isTrackingEnabled = false;

export const readAnalyticsConsent = (): AnalyticsConsent => {
  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return storedConsent === "accepted" || storedConsent === "denied"
      ? storedConsent
      : null;
  } catch {
    return null;
  }
};

export const storeAnalyticsConsent = (
  consent: Exclude<AnalyticsConsent, null>,
) => {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Consent still applies for the current page when storage is unavailable.
  }
};

export const enableClarity = () => {
  if (!import.meta.env.PROD || !projectId) return;

  if (!isInitialized) {
    Clarity.init(projectId);
    isInitialized = true;
  }

  Clarity.consentV2({
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  isTrackingEnabled = true;
  Clarity.setTag("analytics_consent", "accepted");
};

export const disableClarity = () => {
  isTrackingEnabled = false;

  if (isInitialized) {
    Clarity.consentV2({
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });
  }
};

export const trackEvent = (eventName: string) => {
  if (!isTrackingEnabled) return;
  Clarity.event(eventName);
};

export const setSessionTag = (key: string, value: string | string[]) => {
  if (!isTrackingEnabled) return;
  Clarity.setTag(key, value);
};
