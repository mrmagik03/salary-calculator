import Link from "next/link";

type State = {
  slug: string;
  name: string;
  shortName?: string;
};

type ValueLinksProps = {
  amount: number;
  type?: "salary-after-tax" | "default";
  currentState?: string;
};

const STATES: State[] = [
  { slug: "arizona", name: "Arizona" },
  { slug: "california", name: "California" },
  { slug: "colorado", name: "Colorado" },
  { slug: "florida", name: "Florida" },
  { slug: "georgia", name: "Georgia" },
  { slug: "illinois", name: "Illinois" },
  { slug: "massachusetts", name: "Massachusetts", shortName: "Mass." },
  { slug: "michigan", name: "Michigan" },
  { slug: "new-jersey", name: "New Jersey", shortName: "N. Jersey" },
  { slug: "new-york", name: "New York" },
  { slug: "north-carolina", name: "North Carolina", shortName: "N. Carolina" },
  { slug: "ohio", name: "Ohio" },
  { slug: "pennsylvania", name: "Pennsylvania", shortName: "Penn." },
  { slug: "texas", name: "Texas" },
  { slug: "virginia", name: "Virginia" },
  { slug: "washington", name: "Washington" },
];

function ConversionCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 transition hover:border-neutral-700 hover:bg-neutral-950"
    >
      <div className="text-sm font-semibold leading-5 text-white">{title}</div>
      <p className="mt-2 text-xs leading-5 text-neutral-400">{description}</p>
    </Link>
  );
}

function StatePill({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-[44px] items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-center text-xs font-medium leading-4 text-neutral-200 transition hover:border-neutral-700 hover:bg-neutral-950"
      title={label}
    >
      <span>{label}</span>
    </Link>
  );
}

export default function ValueLinks({
  amount,
  type = "default",
  currentState,
}: ValueLinksProps) {
  const conversionLinks = [
    {
      href: `/salary/${amount}/to-hourly`,
      title: "Salary to hourly",
      description: "See the hourly rate for this yearly salary.",
    },
    {
      href: `/salary/${amount}/monthly`,
      title: "Salary to monthly",
      description: "Break annual salary into monthly income.",
    },
    {
      href: `/salary/${amount}/biweekly`,
      title: "Salary to biweekly",
      description: "Estimate each paycheck on a biweekly schedule.",
    },
    {
      href: `/salary/${amount}/after-tax`,
      title: "After-tax overview",
      description: "Compare take-home pay by state.",
    },
  ];

  const otherStates =
    type === "salary-after-tax"
      ? STATES.filter((state) => state.slug !== currentState)
      : [];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold">Explore more salary pages</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
          Use these related pages to compare gross pay, paycheck timing, and
          take-home estimates.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {conversionLinks.map((link) => (
            <ConversionCard
              key={link.href}
              href={link.href}
              title={link.title}
              description={link.description}
            />
          ))}
        </div>
      </section>

      {type === "salary-after-tax" && otherStates.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold">
            Compare take-home pay in other states
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {otherStates.map((state) => (
              <StatePill
                key={state.slug}
                href={`/salary/${amount}/after-tax/${state.slug}`}
                label={state.shortName || state.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
