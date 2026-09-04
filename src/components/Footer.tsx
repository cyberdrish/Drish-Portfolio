import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-12 flex flex-wrap items-center justify-between border-t border-border bg-card px-4 pb-12 pt-8">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Drish Malhotra. All rights reserved.
      </p>
      <a
        href="#hero"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
