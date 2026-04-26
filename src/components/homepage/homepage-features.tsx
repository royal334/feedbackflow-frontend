import {
  MessageSquare,
  BarChart2,
  Clock,
  Users,
  Shield,
  Activity,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Submit Feedback",
    description:
      "Share ideas, report issues, and request features directly with the team. Every voice matters.",
  },
  {
    icon: BarChart2,
    title: "Vote on Ideas",
    description:
      "Upvote what matters most to you. The best ideas rise to the top — democracy in product development.",
  },
  {
    icon: Clock,
    title: "Track Progress",
    description:
      "Watch your ideas move from Open to Planned to In Progress to Completed. Total transparency.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Comment on feedback, discuss ideas, and collaborate with other users to shape the product roadmap.",
  },
  {
    icon: Shield,
    title: "Admin Controls",
    description:
      "Powerful moderation tools for admins. Update statuses, remove spam, and keep the board clean.",
  },
  {
    icon: Activity,
    title: "Real-time Status",
    description:
      "Stay informed with live status badges on every feature request. Know exactly where things stand.",
  },
];

export function HomepageFeatures() {
  return (
    <section className="mx-auto max-w-[1000px] px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[.08em] text-indigo-600">
          Everything you need
        </p>
        <h2 className="hero-serif text-[clamp(1.75rem,4vw,2.5rem)] font-normal text-gray-900">
          Built for <span className="italic text-indigo-600">real teams</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_4px_24px_rgba(79,70,229,0.08)]"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-indigo-50 text-indigo-600">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1.5 text-[14px] font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-[13px] leading-[1.6] text-gray-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
