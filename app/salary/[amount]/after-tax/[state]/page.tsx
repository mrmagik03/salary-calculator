export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SalaryPageHero from "@/components/SalaryPageHero";
import SiteShell from "@/components/SiteShell";
import ValueLinks from "@/components/ValueLinks";
import { PAGE_IDENTITY_LABELS, getPageTheme } from "@/lib/pageThemes";
import { clampSalaryForSeo, formatCurrency, toNumber } from "@/lib/pay";
import { getThemeByStateSlug, themeToCssVars } from "@/lib/stateThemes";
import { getStateBySlug } from "@/lib/states";

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
        <main className="shell">
          <p className="text-neutral-300">State not found.</p>
        </main>
      </SiteShell>
    );
  }

  const { federal, stateTax, net } = estimateNet(amount, state.taxRate);

  const salaryLabel = formatCurrency(amount, 0);
  const netLabel = formatCurrency(net, 0);
  const monthlyLabel = formatCurrency(net / 12);
  const biweeklyLabel = formatCurrency(net / 26);
  const hourlyLabel = formatCurrency(net / 2080);
  const stateTheme = {
    ...getPageTheme("after-tax"),
    ...themeToCssVars(getThemeByStateSlug(state.slug)),
  };

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

      <SiteShell theme={stateTheme}>
        <main className="shell">
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

          <SalaryPageHero
            marker={PAGE_IDENTITY_LABELS["after-tax"]}
            title={`${salaryLabel} After Tax in ${state.name}`}
            description={
              <>
                If you earn <strong>{salaryLabel}</strong> per year in{" "}
                <strong>{state.name}</strong>, your estimated take-home pay is
                about <strong>{netLabel}</strong> annually after federal and
                state taxes.
              </>
            }
          />

          <section className="gap-sections grid gap-4 md:grid-cols-4">
            <div className="result-card">
              <p className="metric-label">Net yearly pay</p>
              <p className="metric-value metric-value-primary">{netLabel}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Monthly take-home</p>
              <p className="metric-value">{monthlyLabel}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Biweekly take-home</p>
              <p className="metric-value">{biweeklyLabel}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Hourly take-home</p>
              <p className="metric-value">{hourlyLabel}</p>
            </div>
          </section>

          <section className="gap-sections grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="section-card">
              <h2 className="section-title">
                Tax breakdown in {state.name}
              </h2>

              <div className="table-wrap">
                <div className="table-head">
                  <div className="table-head-cell">Category</div>
                  <div className="table-head-cell">Amount</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Gross salary</div>
                  <div className="table-cell-value">{salaryLabel}</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Estimated federal tax</div>
                  <div className="table-cell-value">{formatCurrency(federal)}</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Estimated state tax</div>
                  <div className="table-cell-value">{formatCurrency(stateTax)}</div>
                </div>

                <div className="table-row">
                  <div className="table-cell-label">Estimated net income</div>
                  <div className="table-cell-value">{netLabel}</div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <ValueLinks
                amount={amount}
                type="salary-after-tax"
                currentState={state.slug}
              />
            </div>
          </section>
        </main>
      </SiteShell>
    </>
  );
}
