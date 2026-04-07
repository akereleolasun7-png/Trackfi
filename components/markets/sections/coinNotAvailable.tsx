import { ChevronLeft, SearchX } from "lucide-react";
import Link from "next/link";

export function CoinNotAvailable() {
  return (
    <div className="pt-24 px-6 pb-10 min-h-screen text-white">
      <Link
        href="/markets"
        className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 transition-colors w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 flex items-center justify-center mb-4">
          <SearchX className="w-20 h-20 text-white/20" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Coin Not Available
        </h1>
        <p className="text-white/50 text-center mb-6 max-w-md">
          This coin is not available right now. It will be added to our platform
          soon. Please check back later!
        </p>
        <Link
          href="/markets"
          className="px-6 py-2.5 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Browse Markets
        </Link>
      </div>
    </div>
  );
}
