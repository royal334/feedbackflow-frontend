"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function HomepageNavbar() {
  const { data: session, isPending } = useSession();
  const isLoggedIn = !isPending && !!session;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-[17px] font-bold tracking-tight">
          <span className="text-indigo-600">Feedback</span>Flow
        </span>
        <div className="flex items-center gap-2.5">
          {isLoggedIn ? (
            <Link
              href="/feedback"
              className="text-[13px] font-semibold text-white bg-indigo-600 rounded-[10px] px-[18px] py-[7px] hover:bg-indigo-700 transition-colors"
            >
              Go to board →
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-[13px] font-semibold text-gray-700 border border-gray-300 rounded-[10px] px-[18px] py-[7px] hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="text-[13px] font-semibold text-white bg-indigo-600 rounded-[10px] px-[18px] py-[7px] hover:bg-indigo-700 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
