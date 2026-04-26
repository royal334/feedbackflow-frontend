import Link from "next/link";

export function HomepageCta() {
  return (
    <section className="bg-indigo-600 px-6 py-20 text-center">
      <div className="mx-auto max-w-[560px]">
        <h2 className="hero-serif mb-4 text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.15] text-white">
          Start collecting{" "}
          <span className="italic opacity-85">better feedback</span> today
        </h2>
        <p className="mb-8 text-[15px] leading-[1.6] text-white/75">
          Join teams who use FeedbackFlow to build products their users actually
          want.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link
            href="/sign-up"
            className="rounded-[10px] bg-white px-6 py-[11px] text-[14px] font-bold text-indigo-600 transition-opacity hover:opacity-90"
          >
            Get started free →
          </Link>
          <Link
            href="/sign-in"
            className="rounded-[10px] border border-white/40 px-6 py-[11px] text-[14px] font-semibold text-white transition-colors hover:border-white/70"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
