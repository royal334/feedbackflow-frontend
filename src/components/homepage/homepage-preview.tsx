import { ChevronUp } from "lucide-react";

const FILTERS = ["All", "Open", "Planned", "In Progress", "Completed"];

const MOCK_ITEMS = [
  {
    votes: 42,
    title: "Dark mode support across the platform",
    desc: "A dark mode option for low-light environments would significantly improve the experience.",
    badge: "Planned",
    badgeClass: "bg-blue-50 text-blue-700",
    voted: true,
  },
  {
    votes: 28,
    title: "CSV export for all feedback data",
    desc: "Export feedback as CSV for reporting and integration with other business tools.",
    badge: "Open",
    badgeClass: "bg-gray-100 text-gray-700",
    voted: false,
  },
  {
    votes: 17,
    title: "Slack notifications for status changes",
    desc: "Automatically notify teams in Slack when feature request statuses are updated.",
    badge: "In Progress",
    badgeClass: "bg-amber-50 text-amber-800",
    voted: false,
  },
];

export function HomepagePreview() {
  return (
    <section className="mx-auto max-w-[780px] px-6 pb-20">
      <div className="fade-in delay-4 overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        {/* Mock navbar */}
        <div className="flex h-12 items-center justify-between border-b border-gray-200 bg-white px-5">
          <span className="text-[14px] font-bold tracking-tight">
            <span className="text-indigo-600">Feedback</span>
            <span className="text-gray-900">Flow</span>
          </span>
          <div className="flex items-center gap-2">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
              JD
            </div>
            <div className="rounded-[7px] bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white">
              + Submit
            </div>
          </div>
        </div>

        {/* Mock content */}
        <div className="bg-gray-50 p-5">
          {/* Filter pills */}
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {FILTERS.map((f, i) => (
              <div
                key={f}
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                  i === 0
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Mock cards */}
          <div className="flex flex-col gap-2.5">
            {MOCK_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-indigo-200"
              >
                {/* Vote */}
                <div className="flex min-w-[34px] flex-col items-center gap-0.5">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                      item.voted
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <ChevronUp
                      className={`h-3 w-3 ${item.voted ? "text-indigo-600" : "text-gray-400"}`}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-bold ${item.voted ? "text-indigo-600" : "text-gray-400"}`}
                  >
                    {item.votes}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 text-[12px] font-semibold text-gray-900">
                    {item.title}
                  </div>
                  <div className="mb-1.5 line-clamp-1 text-[11px] text-gray-500">
                    {item.desc}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
