import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteShell from "@/components/SiteShell";
import ValueLinks from "@/components/ValueLinks";
import { clampSalaryForSeo, formatCurrency, toNumber } from "@/lib/pay";
import { STATES, getStateBySlug } from "@/lib/states";

const SITE_URL = "https://mysalarycalculator.co";

type PageProps = {
  params: Promise<{ amount: string; state: string }>;
};

function estimateNet(amount: number, stateRate: number) {
  const federal = amount * 0.18;
  const stateTax = amount * stateRate;
  const net = amount - federal - stateTax;
  return { federal, stateTax, net };
}

export function generateStaticParams() {
  const params = [];
  for (let amount = 10000; amount <= 300000; amount += 1000) {
    for (const state of STATES) {
      params.push({ amount: String(amount), state: state.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { amount: rawAmount, state: rawState } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const state = getStateBySlug(rawState);

  if (!state) {
    return {
      title: "State not found",
    };
  }

  return {
    title: `${formatCurrency(amount, 0)} After Tax in ${state.name}`,
    description: `Estimate take-home pay for ${formatCurrency(
      amount,
      0
    )} in ${state.name} after federal and state taxes.`,
    alternates: {
      canonical: `${SITE_URL}/salary/${amount}/after-tax/${state.slug}`,
    },
  };
}

export default async function AfterTaxStatePage({ params }: PageProps) {
  const { amount: rawAmount, state: rawState } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const state = getStateBySlug(rawState);

  if (!state) {
    return (
      <SiteShell>
        <p className="text-neutral-300">State not found.</p>
      </SiteShell>
    );
  }

  const { federal, stateTax, net } = estimateNet(amount, state.taxRate);

  const salaryLabel = formatCurrency(amount, 0);
  const netLabel = formatCurrency(net, 0);
  const monthlyLabel = formatCurrency(net / 12);
  const biweeklyLabel = formatCurrency(net / 26);
  const hourlyLabel = formatCurrency(net / 2080);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "After Tax",
        item: `${SITE_URL}/salary/${amount}/after-tax`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: state.name,
        item: `${SITE_URL}/salary/${amount}/after-tax/${state.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${salaryLabel} after tax in ${state.name} is how much?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${salaryLabel} per year in ${state.name} is estimated to be about ${netLabel} after federal and state taxes.`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <SiteShell>
        <div className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/salary/${amount}/after-tax`}
            className="hover:text-white"
          >
            After Tax
          </Link>
          <span className="mx-2">/</span>
          <span>{state.name}</span>
        </div>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {salaryLabel} After Tax in {state.name}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            If you earn <strong>{salaryLabel}</strong> per year in{" "}
            <strong>{state.name}</strong>, your estimated take-home pay is about{" "}
            <strong>{netLabel}</strong> annually after federal and state taxes.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Net yearly pay</p>
            <p className="mt-2 text-3xl font-semibold">{netLabel}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Monthly take-home</p>
            <p className="mt-2 text-3xl font-semibold">{monthlyLabel}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Biweekly take-home</p>
            <p className="mt-2 text-3xl font-semibold">{biweeklyLabel}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Hourly take-home</p>
            <p className="mt-2 text-3xl font-semibold">{hourlyLabel}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">
              Tax breakdown in {state.name}
            </h2>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
              <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/60">
                <div className="px-4 py-3 text-sm font-medium text-neutral-300">
                  Category
                </div>
                <div className="px-4 py-3 text-sm font-medium text-neutral-300">
                  Amount
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-neutral-800">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Gross salary
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {salaryLabel}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-neutral-800">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Estimated federal tax
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {formatCurrency(federal)}
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-neutral-800">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Estimated state tax
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {formatCurrency(stateTax)}
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Estimated net income
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {netLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <ValueLinks
              amount={amount}
              type="salary-after-tax"
              currentState={state.slug}
            />
          </div>
        </section>
      </SiteShell>
    </>
  );
}