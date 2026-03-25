import type { Metadata } from "next";
import LinkCard from "@/components/LinkCard";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Salary Calculator | Hourly to Salary, Salary to Hourly, and After-Tax Pay",
  description:
    "Convert hourly pay to annual salary, salary to hourly pay, and estimate after-tax income by state.",
  alternates: { canonical: "https://mysalarycalculator.co" },
};

const hourlyExamples = [15, 20, 25, 30];
const salaryExamples = [50000, 60000, 75000, 100000];
const afterTaxExamples = [
  { label: "$60k after tax in Texas", href: "/salary/60000/after-tax/texas" },
  { label: "$60k after tax in California", href: "/salary/60000/after-tax/california" },
  { label: "$75k after tax in Florida", href: "/salary/75000/after-tax/florida" },
  { label: "$100k after tax in New York", href: "/salary/100000/after-tax/new-york" },
];

export default function HomePage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Salary calculators that give you answers fast
          </h1>
          <p className="mt-4 max-w-3xl text-neutral-300">
            Convert hourly pay to salary, salary to hourly, and estimate after-tax income by state.
            Built for fast answers, clean breakdowns, and search-friendly pay comparisons.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <LinkCard href="/hourly/25/to-salary">Hourly to salary</LinkCard>
            <LinkCard href="/salary/60000/to-hourly">Salary to hourly</LinkCard>
            <LinkCard href="/salary/60000/after-tax/texas">After-tax calculator</LinkCard>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Hourly to salary</h2>
            <p className="mt-2 text-sm text-neutral-300">
              See what an hourly wage looks like per year, month, and paycheck.
            </p>
            <div className="mt-4 space-y-2">
              {hourlyExamples.map((rate) => (
                <LinkCard key={rate} href={`/hourly/${rate}/to-salary`}>{`$${rate}/hour`}</LinkCard>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Salary to hourly</h2>
            <p className="mt-2 text-sm text-neutral-300">
              Convert annual salary into hourly pay and compare earnings.
            </p>
            <div className="mt-4 space-y-2">
              {salaryExamples.map((salary) => (
                <LinkCard key={salary} href={`/salary/${salary}/to-hourly`}>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(salary)} salary
                </LinkCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">After-tax pay by state</h2>
          <p className="mt-2 text-sm text-neutral-300">Estimate take-home pay after federal and state taxes.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {afterTaxExamples.map((item) => (
              <LinkCard key={item.href} href={item.href}>{item.label}</LinkCard>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
