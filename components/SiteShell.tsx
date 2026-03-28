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
          <Link href="/" className="text-sm font-semibold tracking-wide text-white">
            My Salary Calculator
          </Link>
          <nav className="flex gap-4 text-sm text-neutral-300" aria-label="Primary site navigation">
            <Link href="/salary/60000/to-hourly" className="hover:text-white">
              Salary
            </Link>
            <Link href="/hourly/25/to-salary" className="hover:text-white">
              Hourly
            </Link>
            <Link href="/salary/60000/biweekly" className="hover:text-white">
              Biweekly
            </Link>
            <Link href="/salary/60000/after-tax" className="hover:text-white">
              After Tax
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-6">
        <div className="text-sm text-neutral-400">
          Related tool:{" "}
          <a
            href="https://monthlypaymentcalc.co"
            className="hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Monthly Payment Calculator for estimating loan and bill payments
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
