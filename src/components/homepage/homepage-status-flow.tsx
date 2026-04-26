import { ArrowRight } from "lucide-react";

const STATUSES = [
  {
    label: "Open",
    colorClass: "bg-gray-100 text-gray-700",
    desc: "Newly submitted",
  },
  {
    label: "Planned",
    colorClass: "bg-blue-50 text-blue-700",
    desc: "On the roadmap",
  },
  {
    label: "In Progress",
    colorClass: "bg-amber-50 text-amber-800",
    desc: "Being built",
  },
  {
    label: "Completed",
    colorClass: "bg-emerald-50 text-emerald-700",
    desc: "Shipped!",
  },
];

export function HomepageStatusFlow() {
  return (
    <section className="border-y border-gray-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-[780px] text-center">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[.08em] text-indigo-600">
          Transparency built in
        </p>
        <h2 className="hero-serif mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-gray-900">
          Every idea has a{" "}
          <span className="italic text-indigo-600">journey</span>
        </h2>
        <p className="mx-auto mb-10 max-w-[480px] text-[15px] leading-[1.7] text-gray-500">
          Track every feature request from submission to completion with clear
          status labels everyone can see.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {STATUSES.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="min-w-[110px] rounded-[14px] border border-gray-200 bg-white px-5 py-4 text-center">
                <span
                  className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${s.colorClass}`}
                >
                  {s.label}
                </span>
                <div className="text-[11px] text-gray-400">{s.desc}</div>
              </div>
              {i < STATUSES.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
