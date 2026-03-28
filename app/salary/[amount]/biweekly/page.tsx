export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SalaryPageHero from "@/components/SalaryPageHero";
import SiteShell from "@/components/SiteShell";
import ValueLinks from "@/components/ValueLinks";
import { PAGE_IDENTITY_LABELS, getPageTheme } from "@/lib/pageThemes";
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
};

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

      <SiteShell theme={getPageTheme("salary-biweekly")}>
        <main className="shell">
          <div className="mb-8 text-sm text-neutral-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Salary to Biweekly</span>
          </div>

          <SalaryPageHero
            marker={PAGE_IDENTITY_LABELS["salary-biweekly"]}
            title={`${salaryLabel} a Year is How Much Every 2 Weeks?`}
            description={
              <>
                A salary of <strong>{salaryLabel}</strong> per year works out
                to about <strong>{biweeklyLabel} every two weeks</strong> before
                taxes.
              </>
            }
          />

          <section className="gap-sections grid gap-4 md:grid-cols-3">
            <div className="result-card">
              <p className="metric-label">Biweekly pay</p>
              <p className="metric-value metric-value-primary">{biweeklyLabel}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Monthly pay</p>
              <p className="metric-value">{monthlyLabel}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Hourly pay</p>
              <p className="metric-value">{hourlyLabel}</p>
            </div>
          </section>

          <section className="gap-sections grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="section-card">
              <h2 className="section-title">Salary to biweekly breakdown</h2>

              <div className="table-wrap">
                <div className="table-head">
                  <div className="table-head-cell">Conversion</div>
                  <div className="table-head-cell">Amount</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">{salaryLabel} per year</div>
                  <div className="table-cell-value">{biweeklyLabel} every 2 weeks</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Per month</div>
                  <div className="table-cell-value">{monthlyLabel}</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Per hour</div>
                  <div className="table-cell-value">{hourlyLabel}</div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <ValueLinks amount={amount} />
            </div>
          </section>
        </main>
      </SiteShell>
    </>
  );
}
