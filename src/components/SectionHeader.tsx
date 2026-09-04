import type { ReactNode } from "react";

type SectionHeaderProps = {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
};

export const SectionHeader = ({
  kicker,
  title,
  description,
}: SectionHeaderProps) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <div className="section-kicker mx-auto mb-4">{kicker}</div>
    <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
    {description ? (
      <p className="mt-5 text-muted-foreground">{description}</p>
    ) : null}
  </div>
);
