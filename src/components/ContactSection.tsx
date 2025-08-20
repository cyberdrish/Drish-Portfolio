import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast(
      <div>
        <strong>Message Sent!</strong>
        <br />
        Thank you for your message. I'll get back to you soon.
      </div>,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        progress: undefined,
        theme: "dark",
      }
    );
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <ToastContainer />
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {" "}
          Have a project in mind or want to collaborate ? Feel free to reach
          out. I'm always open to discussing new opportunities.{" "}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col items-center w-[60%]">
                  <h4>Email</h4>
                  <a
                    href="mailto:drishmalhotra1997@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    drishmalhotra1997@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col items-center w-[60%]">
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
                <div className="flex flex-col items-center w-[60%]">
                  <h4>Location</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Noida, Delhi NCR, India
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center ">
                <a
                  href="https://www.linkedin.com/in/drish-malhotra/"
                  target="_blank"
                  className="hover:text-primary duration-300"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/cyberdrish"
                  target="_blank"
                  className="hover:text-primary duration-300"
                >
                  <Github />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="hover:text-primary duration-300"
                >
                  <Instagram />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
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
                  className="w-full px-4 py-3 rounded-md border
                 bg-background focus:outline-hidden focus:ring-1 focus:ring-primary"
                  placeholder="Drish Malhotra....."
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
                  placeholder="DrishMalhotra@gmail.com....."
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
                  className="w-full px-4 py-3 rounded-md border
                 bg-background focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
                  placeholder=" Hello, I'd like to talk about..."
                />
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
