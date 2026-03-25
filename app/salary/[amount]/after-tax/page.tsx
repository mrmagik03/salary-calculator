import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteShell from "@/components/SiteShell";
import { clampSalaryForSeo, formatCurrency, toNumber } from "@/lib/pay";
import { STATES } from "@/lib/states";

const SITE_URL = "https://mysalarycalculator.co";

type PageProps = {
  params: Promise<{ amount: string }>;
};

export function generateStaticParams() {
  const params = [];
  for (let amount = 10000; amount <= 300000; amount += 1000) {
    params.push({ amount: String(amount) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));

  return {
    title: `${formatCurrency(amount, 0)} Salary After Tax by State`,
    description: `Compare ${formatCurrency(
      amount,
      0
    )} salary after tax across states and estimate take-home pay.`,
    alternates: {
      canonical: `${SITE_URL}/salary/${amount}/after-tax`,
    },
  };
}

export default async function AfterTaxHubPage({ params }: PageProps) {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));
  const salaryLabel = formatCurrency(amount, 0);

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
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      <SiteShell>
        <div className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>After Tax</span>
        </div>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {salaryLabel} Salary After Tax by State
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Compare estimated take-home pay for <strong>{salaryLabel}</strong>{" "}
            across states.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Choose a state</h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/salary/${amount}/after-tax/${state.slug}`}
                className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-200 transition hover:border-neutral-700 hover:bg-neutral-950"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>
      </SiteShell>
    </>
  );
}