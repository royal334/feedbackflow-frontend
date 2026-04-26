import Link from "next/link";

export function HomepageHero() {
  return (
    <section className="relative overflow-hidden py-20 px-6 text-center [background-image:radial-gradient(circle,#D1D5DB_1px,transparent_1px)] [background-size:24px_24px]">
      {/* Fade-out gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-gray-50" />

      <div className="relative mx-auto max-w-[680px]">
        {/* Pill badge */}
        <div className="fade-up mb-6 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[12px] font-semibold text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 inline-block" />
          Open for feedback
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-1 hero-serif mb-5 text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.1] text-gray-900">
          Your ideas shape
          <br />
          <span className="text-indigo-600 italic">what we build next</span>
        </h1>

        {/* Subtitle */}
        <p className="fade-up delay-2 mx-auto mb-8 max-w-[520px] text-[17px] leading-[1.7] text-gray-500">
          FeedbackFlow is the feedback and feature request platform that keeps
          your team and users in sync. Submit ideas, vote on what matters, track
          progress.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-3 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/sign-up"
            className="rounded-[10px] bg-indigo-600 px-6 py-[11px] text-[14px] font-semibold text-white transition-all hover:bg-indigo-700 hover:-translate-y-px"
          >
            Start for free →
          </Link>
          <Link
            href="/sign-in"
            className="rounded-[10px] border border-gray-300 px-6 py-[11px] text-[14px] font-semibold text-gray-700 transition-colors hover:border-indigo-600 hover:text-indigo-600"
          >
            View the board
          </Link>
        </div>
      </div>
    </section>
  );
}
