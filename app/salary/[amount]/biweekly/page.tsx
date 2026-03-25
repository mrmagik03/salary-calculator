export const dynamic = "force-dynamic";

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

const SITE_URL = "https://mysalarycalculator.co";

type PageProps = {
  params: Promise<{ amount: string }>;
;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));

  return {
    title: `${formatCurrency(amount, 0)} Salary to Biweekly Pay`,
    description: `Convert ${formatCurrency(
      amount,
      0
    )} a year to biweekly pay and compare it with monthly and hourly income.`,
    alternates: {
      canonical: `${SITE_URL}/salary/${amount}/biweekly`,
    },
  };
}

export default async function SalaryToBiweeklyPage({ params }: PageProps) {
  const { amount: rawAmount } = await params;
  const amount = clampSalaryForSeo(toNumber(rawAmount));

  const biweekly = annualSalaryToBiweekly(amount);
  const monthly = annualSalaryToMonthly(amount);
  const hourly = annualSalaryToHourly(amount);

  const salaryLabel = formatCurrency(amount, 0);
  const biweeklyLabel = formatCurrency(biweekly);
  const monthlyLabel = formatCurrency(monthly);
  const hourlyLabel = formatCurrency(hourly);

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
        name: "Salary",
        item: `${SITE_URL}/salary/${amount}/biweekly`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Salary to Biweekly",
        item: `${SITE_URL}/salary/${amount}/biweekly`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${salaryLabel} a year is how much biweekly?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${salaryLabel} per year is about ${biweeklyLabel} every two weeks before taxes.`,
        },
      },
      {
        "@type": "Question",
        name: `What is ${salaryLabel} per year monthly?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${salaryLabel} per year is about ${monthlyLabel} per month.`,
        },
      },
      {
        "@type": "Question",
        name: `What is ${salaryLabel} a year per hour?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${salaryLabel} per year is about ${hourlyLabel} per hour based on a 40-hour work week and 52 weeks per year.`,
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
          <span>Salary to Biweekly</span>
        </div>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {salaryLabel} a Year is How Much Every 2 Weeks?
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A salary of <strong>{salaryLabel}</strong> per year works out to
            about <strong>{biweeklyLabel} every two weeks</strong> before taxes.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Biweekly pay</p>
            <p className="mt-2 text-3xl font-semibold">{biweeklyLabel}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Monthly pay</p>
            <p className="mt-2 text-3xl font-semibold">{monthlyLabel}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <p className="text-sm text-neutral-400">Hourly pay</p>
            <p className="mt-2 text-3xl font-semibold">{hourlyLabel}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Salary to biweekly breakdown</h2>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-800">
              <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/60">
                <div className="px-4 py-3 text-sm font-medium text-neutral-300">
                  Conversion
                </div>
                <div className="px-4 py-3 text-sm font-medium text-neutral-300">
                  Amount
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-neutral-800">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  {salaryLabel} per year
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {biweeklyLabel} every 2 weeks
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-neutral-800">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Per month
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {monthlyLabel}
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-3 text-sm text-neutral-400">
                  Per hour
                </div>
                <div className="px-4 py-3 text-sm font-medium">
                  {hourlyLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
            <ValueLinks amount={amount} />
          </div>
        </section>
      </SiteShell>
    </>
  );
}
