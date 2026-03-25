import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Salary Calculator | Hourly to Salary, Salary to Hourly, and After-Tax Pay",
  description:
    "Convert hourly pay to annual salary, salary to hourly pay, and estimate after-tax income by state.",
  alternates: {
    canonical: "https://mysalarycalculator.co",
  },
};

const hourlyExamples = [
  { label: "$15/hour", href: "/hourly/15/to-salary" },
  { label: "$20/hour", href: "/hourly/20/to-salary" },
  { label: "$25/hour", href: "/hourly/25/to-salary" },
  { label: "$30/hour", href: "/hourly/30/to-salary" },
];

const salaryExamples = [
  { label: "$50,000 salary", href: "/salary/50000/to-hourly" },
  { label: "$60,000 salary", href: "/salary/60000/to-hourly" },
  { label: "$75,000 salary", href: "/salary/75000/to-hourly" },
  { label: "$100,000 salary", href: "/salary/100000/to-hourly" },
];

const afterTaxExamples = [
  { label: "$60k after tax in Texas", href: "/salary/60000/after-tax/texas" },
  {
    label: "$60k after tax in California",
    href: "/salary/60000/after-tax/california",
  },
  {
    label: "$75k after tax in Florida",
    href: "/salary/75000/after-tax/florida",
  },
  {
    label: "$100k after tax in New York",
    href: "/salary/100000/after-tax/new-york",
  },
];

function LinkCard({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="subtle-link-card block text-sm text-neutral-100">
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="ambient-top ambient-bottom min-h-screen">
      <div className="shell">
        <section className="hero-card">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Salary calculators that give you answers fast
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Convert hourly pay to salary, salary to hourly, and estimate
            after-tax income by state. Built for fast answers, clean
            breakdowns, and search-friendly pay comparisons.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <LinkCard href="/hourly/25/to-salary">Hourly to salary</LinkCard>
            <LinkCard href="/salary/60000/to-hourly">Salary to hourly</LinkCard>
            <LinkCard href="/salary/60000/after-tax/texas">
              After-tax calculator
            </LinkCard>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">Hourly to salary</h2>
            <p className="mt-2 text-neutral-300">
              See what an hourly wage looks like per year, month, and paycheck.
            </p>

            <div className="mt-5 space-y-3">
              {hourlyExamples.map((item) => (
                <LinkCard key={item.href} href={item.href}>
                  {item.label}
                </LinkCard>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">Salary to hourly</h2>
            <p className="mt-2 text-neutral-300">
              Convert annual salary into hourly pay and compare earnings.
            </p>

            <div className="mt-5 space-y-3">
              {salaryExamples.map((item) => (
                <LinkCard key={item.href} href={item.href}>
                  {item.label}
                </LinkCard>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card mt-8 p-6">
          <h2 className="text-2xl font-semibold">After-tax pay by state</h2>
          <p className="mt-2 text-neutral-300">
            Estimate take-home pay after federal and state taxes.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {afterTaxExamples.map((item) => (
              <LinkCard key={item.href} href={item.href}>
                {item.label}
              </LinkCard>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
