import Link from "next/link";
import type { ReactNode } from "react";

export default function LinkCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-200 transition hover:border-neutral-700 hover:bg-neutral-950"
    >
      {children}
    </Link>
  );
}
