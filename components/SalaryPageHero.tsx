import type { ReactNode } from "react";

type SalaryPageHeroProps = {
  title: string;
  description: ReactNode;
  marker?: string;
};

export default function SalaryPageHero({
  title,
  description,
  marker,
}: SalaryPageHeroProps) {
  return (
    <section className="hero-card">
      {marker ? <div className="page-identity">{marker}</div> : null}
      <h1 className={`text-3xl font-bold tracking-tight md:text-5xl ${marker ? "mt-4" : ""}`}>
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base text-neutral-300 md:text-lg">{description}</p>
    </section>
  );
}
