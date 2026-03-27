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
      <header className="site-header">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-wide text-white">
            My Salary Calculator
          </Link>
          <nav className="flex gap-4 text-sm text-neutral-300">
            <Link href="/salary/60000/to-hourly" className="hover:text-white">Salary</Link>
            <Link href="/hourly/25/to-salary" className="hover:text-white">Hourly</Link>
            <Link href="/salary/60000/after-tax" className="hover:text-white">After Tax</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
