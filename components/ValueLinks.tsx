import Link from "next/link";
import { STATES } from "@/lib/states";

type ValueLinksProps = {
  amount: number;
  type?: "salary-after-tax" | "salary-core";
  currentState?: string;
};

export default function ValueLinks({
  amount,
  type = "salary-core",
  currentState,
}: ValueLinksProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white">Popular salary conversions</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href={`/salary/${amount}/to-hourly`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 transition hover:border-neutral-700 hover:bg-neutral-950"
          >
            <p className="text-base font-semibold">Salary to hourly</p>
            <p className="mt-2 text-sm text-neutral-400">See the hourly rate for this yearly salary.</p>
          </Link>
          <Link
            href={`/salary/${amount}/monthly`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 transition hover:border-neutral-700 hover:bg-neutral-950"
          >
            <p className="text-base font-semibold">Salary to monthly</p>
            <p className="mt-2 text-sm text-neutral-400">Break this annual salary into monthly income.</p>
          </Link>
          <Link
            href={`/salary/${amount}/biweekly`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 transition hover:border-neutral-700 hover:bg-neutral-950"
          >
            <p className="text-base font-semibold">Salary to biweekly</p>
            <p className="mt-2 text-sm text-neutral-400">Estimate each paycheck on a biweekly schedule.</p>
          </Link>
          <Link
            href={`/salary/${amount}/after-tax`}
            className="group rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 transition hover:border-neutral-700 hover:bg-neutral-950"
          >
            <p className="text-base font-semibold">After-tax overview</p>
            <p className="mt-2 text-sm text-neutral-400">Compare take-home pay by state.</p>
          </Link>
        </div>
      </div>

      {type === "salary-after-tax" && (
        <div>
          <h3 className="text-lg font-semibold text-white">Compare take-home pay in other states</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {STATES.filter((state) => state.slug !== currentState).map((state) => (
              <Link
                key={state.slug}
                href={`/salary/${amount}/after-tax/${state.slug}`}
                className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-950 hover:text-white"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
