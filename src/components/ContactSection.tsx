import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import useTheme from "../context/useTheme";

// ── EmailJS Configuration ─────────────────────────────────────────────
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ──────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_MESSAGE_LENGTH = 500;

export const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2) {
      toast.warn("Please enter your name.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast.warn("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      toast.warn("Please enter a message of at least 10 characters.");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      toast.warn(`Message must be under ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
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
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
      setMessageLength(0);
    } catch {
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
      <div className="container mx-auto max-w-5xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker mx-auto mb-4">Let us talk</div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Need React, TypeScript, dashboards, or{" "}
            <span className="text-primary">frontend architecture?</span>
          </h2>
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I am open to senior frontend roles, dashboard-heavy product work,
          performance projects, React migrations, design-system work, and
          frontend collaboration with product teams.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                  <h4>Email</h4>
                  <a
                    href="mailto:drishmalhotra1997@gmail.com"
                    className="break-all text-muted-foreground transition-colors hover:text-primary"
                  >
                    drishmalhotra1997@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                  <h4>Phone</h4>
                  <a
                    href="tel:+919464669661"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 (946) 466-9661
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                  <h4>Location</h4>
                  <p className="text-muted-foreground">
                    Noida, Delhi NCR, India
                  </p>
                </div>
              </div>
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
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/cyberdrish"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Drish Malhotra on GitHub"
                  className="hover:text-primary duration-300"
                >
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
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
                  className="w-full px-4 py-3 rounded-md border
                 bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
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
                  className="w-full px-4 py-3 rounded-md border
                 bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
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
                  className="w-full px-4 py-3 rounded-md border
                 bg-background focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
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
                className="cosmic-button w-full flex items-center justify-center gap-2"
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
