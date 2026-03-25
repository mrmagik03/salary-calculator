import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { getStateBySlug, STATES } from "@/lib/states";

const SITE_URL = "https://mysalarycalculator.co";

type PageProps = { params: Promise<{ amount: string; state: string }> };

function estimateTax(salary: number, stateTaxRate: number) {
  const federal = salary * 0.18;
  const state = salary * stateTaxRate;
  const net = salary - federal - state;
  return { federal, state, net };
}

export function generateStaticParams() {
  return STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { amount: rawAmount, state: stateSlug } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const state = getStateBySlug(stateSlug);
  if (!state) return {};
  return {
    title: `${formatCurrency(amount, 0)} After Tax in ${state.name}`,
    description: `Estimate take-home pay for ${formatCurrency(amount, 0)} per year in ${state.name} after federal and state taxes.`,
    alternates: { canonical: `${SITE_URL}/salary/${amount}/after-tax/${state.slug}` },
  };
}

export default async function StateAfterTaxPage({ params }: PageProps) {
  const { amount: rawAmount, state: stateSlug } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const stateInfo = getStateBySlug(stateSlug);
  if (!stateInfo) notFound();

  const { federal, state, net } = estimateTax(amount, stateInfo.taxRate);
  const salaryLabel = formatCurrency(amount, 0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is ${salaryLabel} after tax in ${stateInfo.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${salaryLabel} per year in ${stateInfo.name} is estimated to be about ${formatCurrency(net, 0)} after federal and state taxes.` },
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
          <Link href={`/salary/${amount}/after-tax`} className="hover:text-white">After Tax</Link>
          <span className="mx-2">/</span>
          <span>{stateInfo.name}</span>
        </div>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{salaryLabel} After Tax in {stateInfo.name}</h1>
          <p className="mt-4 max-w-3xl text-neutral-300">If you earn <strong>{salaryLabel}</strong> per year in <strong>{stateInfo.name}</strong>, your estimated take-home pay is about <strong>{formatCurrency(net, 0)}</strong> annually after federal and state taxes.</p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Net yearly pay</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(net, 0)}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Monthly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToMonthly(net))}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Biweekly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToBiweekly(net))}</p></div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm"><p className="text-sm text-neutral-400">Hourly take-home</p><p className="mt-2 text-3xl font-semibold">{formatCurrency(annualSalaryToHourly(net))}</p></div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Tax breakdown in {stateInfo.name}</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
              <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-300"><div>Category</div><div>Amount</div></div>
              <div className="grid grid-cols-2 border-b border-neutral-800 px-4 py-3 text-sm"><div className="text-neutral-400">Gross salary</div><div>{salaryLabel}</div></div>
              <div className="grid grid-cols-2 border-b border-neutral-800 px-4 py-3 text-sm"><div className="text-neutral-400">Estimated federal tax</div><div>{formatCurrency(federal)}</div></div>
              <div className="grid grid-cols-2 border-b border-neutral-800 px-4 py-3 text-sm"><div className="text-neutral-400">Estimated state tax</div><div>{formatCurrency(state)}</div></div>
              <div className="grid grid-cols-2 px-4 py-3 text-sm"><div className="text-neutral-400">Estimated net income</div><div>{formatCurrency(net, 0)}</div></div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Explore more salary pages</h2>
            <div className="mt-6">
              <ValueLinks amount={amount} type="salary-after-tax" currentState={stateInfo.slug} />
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
