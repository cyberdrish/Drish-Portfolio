import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { trackEvent } from "../analytics/clarity";
import useTheme from "../context/useTheme";
import { SectionHeader } from "./SectionHeader";

// ── EmailJS Configuration ─────────────────────────────────────────────
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ──────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_MESSAGE_LENGTH = 500;
const fieldClassName =
  "w-full rounded-md border bg-background px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-primary";

type ContactDetail = {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
  breakAll?: boolean;
};

const contactDetails: ContactDetail[] = [
  {
    label: "Email",
    value: "drishmalhotra1997@gmail.com",
    icon: Mail,
    href: "mailto:drishmalhotra1997@gmail.com",
    breakAll: true,
  },
  {
    label: "Phone",
    value: "+91 (946) 466-9661",
    icon: Phone,
    href: "tel:+919464669661",
  },
  {
    label: "Location",
    value: "Noida, Delhi NCR, India",
    icon: MapPin,
  },
];

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const hasStartedForm = useRef(false);
  const { isDarkMode } = useTheme();

  const handleFormFocus = () => {
    if (hasStartedForm.current) return;
    hasStartedForm.current = true;
    trackEvent("contact_form_started");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("contact_form_submit_attempt");

    const form = e.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2) {
      trackEvent("contact_validation_name_failed");
      toast.warn("Please enter your name.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      trackEvent("contact_validation_email_failed");
      toast.warn("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      trackEvent("contact_validation_message_short");
      toast.warn("Please enter a message of at least 10 characters.");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      trackEvent("contact_validation_message_long");
      toast.warn(`Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      trackEvent("contact_configuration_missing");
      toast.error("The contact form is temporarily unavailable.");
      return;
    }

    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement;
    nameInput.value = name;
    emailInput.value = email;
    messageInput.value = message;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      trackEvent("contact_form_success");
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
      setMessageLength(0);
    } catch {
      trackEvent("contact_form_failure");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme={isDarkMode ? "dark" : "light"}
      />
      <div className="container max-w-5xl">
        <SectionHeader
          kicker="Let us talk"
          title={
            <>
              Need React, TypeScript, dashboards, or{" "}
              <span className="text-primary">frontend architecture?</span>
            </>
          }
          description={
            <>
              I am open to senior frontend roles, dashboard-heavy product work,
              performance projects, React migrations, design-system work, and
              frontend collaboration with product teams.
            </>
          }
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                      <h4>{detail.label}</h4>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          onClick={() =>
                            trackEvent(
                              detail.label === "Email"
                                ? "contact_email_click"
                                : "contact_phone_click",
                            )
                          }
                          className={`text-muted-foreground transition-colors hover:text-primary ${
                            detail.breakAll ? "break-all" : ""
                          }`}
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{detail.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex justify-start space-x-4">
                <a
                  href="https://www.linkedin.com/in/drish-malhotra/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Drish Malhotra on LinkedIn"
                  className="hover:text-primary duration-300"
                  onClick={() => trackEvent("contact_linkedin_click")}
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/cyberdrish"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Drish Malhotra on GitHub"
                  className="hover:text-primary duration-300"
                  onClick={() => trackEvent("contact_github_click")}
                >
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              onFocusCapture={handleFormFocus}
              data-clarity-mask="true"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  className={fieldClassName}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={fieldClassName}
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-describedby="message-count"
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className={`${fieldClassName} resize-none`}
                  placeholder="Hello, I'd like to talk about..."
                />
                <p
                  id="message-count"
                  className="mt-1 text-right text-xs text-muted-foreground"
                >
                  {messageLength}/{MAX_MESSAGE_LENGTH}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cosmic-button w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
