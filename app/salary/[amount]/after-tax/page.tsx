import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteShell from "@/components/SiteShell";
import ValueLinks from "@/components/ValueLinks";
import {
  annualSalaryToBiweekly,
  annualSalaryToHourly,
  annualSalaryToMonthly,
  clampSalaryForSeo,
  formatCurrency,
  toNumber,
} from "@/lib/pay";
import { STATES } from "@/lib/states";

const SITE_URL = "https://mysalarycalculator.co";
type PageProps = { params: Promise<{ amount: string }> };

function estimateGenericTax(salary: number) {
  const federal = salary * 0.18;
  const state = salary * 0.05;
  const net = salary - federal - state;
  return { federal, state, net };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  return {
    title: `${formatCurrency(amount, 0)} Salary After Tax`,
    description: `Estimate take-home pay for ${formatCurrency(amount, 0)} per year after taxes and compare it across states.`,
    alternates: { canonical: `${SITE_URL}/salary/${amount}/after-tax` },
  };
}

export default async function AfterTaxHubPage({ params }: PageProps) {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const { net } = estimateGenericTax(amount);
  const salaryLabel = formatCurrency(amount, 0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is ${salaryLabel} after tax?`,
        acceptedAnswer: { "@type": "Answer", text: `${salaryLabel} per year could be around ${formatCurrency(net, 0)} after estimated taxes, depending on your state and deductions.` },
      },
    ],
  };

  return (
    <SiteShell>
      <JsonLd data={faqJsonLd} />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span>After Tax</span>
        </div>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{salaryLabel} After Tax</h1>
          <p className="mt-4 max-w-3xl text-neutral-300">
            If you earn <strong>{salaryLabel}</strong> per year, your estimated take-home pay is about <strong>{formatCurrency(net, 0)}</strong> annually after simplified federal and state taxes.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Net yearly pay</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(net, 0)}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Monthly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToMonthly(net))}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Biweekly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToBiweekly(net))}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Hourly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToHourly(net))}</p></div>
        </section>

        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">After-tax by state</h2>
          <p className="mt-3 text-neutral-300">Select a state below to see a more specific estimate for the same salary.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {STATES.map((state) => (
              <Link key={state.slug} href={`/salary/${amount}/after-tax/${state.slug}`} className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-950 hover:text-white">
                {state.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
          <ValueLinks amount={amount} type="salary-after-tax" currentState={undefined} />
        </section>
      </main>
    </SiteShell>
  );
}
