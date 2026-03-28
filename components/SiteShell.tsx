import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export default function SiteShell({
  children,
  theme,
}: {
  children: ReactNode;
  theme?: CSSProperties;
}) {
  return (
    <div className="site-frame ambient-top ambient-bottom" style={theme}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-white no-underline"
          >
            My Salary Calculator
          </Link>
          <nav
            className="flex gap-4 text-sm text-neutral-200"
            aria-label="Primary site navigation"
          >
            <Link href="/salary/60000/to-hourly" className="text-link">
              Salary
            </Link>
            <Link href="/hourly/25/to-salary" className="text-link">
              Hourly
            </Link>
            <Link href="/salary/60000/biweekly" className="text-link">
              Biweekly
            </Link>
            <Link href="/salary/60000/after-tax" className="text-link">
              After Tax
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mx-auto mt-10 w-full max-w-6xl px-4 pb-10 md:px-6">
        <section className="section-card">
          <h2 className="text-lg font-semibold text-white">
            More financial calculators
          </h2>
          <p className="mt-2 text-sm text-neutral-200">
            If you are planning a loan or comparing monthly bills, visit{" "}
            <a
              href="https://monthlypaymentcalc.co"
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              Monthly Payment Calculator
            </a>{" "}
            for quick monthly payment estimates.
          </p>
        </section>
      </footer>
    </div>
  );
}
