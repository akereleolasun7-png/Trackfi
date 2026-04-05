import React from "react";
import { AuthLoadingProvider } from "@/context/AuthLoadingContext";
import { SignUpForm } from "@/components/auth/Signupform";
export default function Page() {
  const listItems = [
    {
      icon: 1,
      head: "Create your account",
      text: "Start your journey with secure, encrypted access to your portfolio.",
    },
    {
      icon: 2,
      head: "Add coins to watchlist",
      text: "Monitor over 10,000+ assets with real-time price feeds.",
    },

    {
      icon: 3,
      head: "Set alerts & track P&L",
      text: "Receive instant push notifications and visualize growth.",
    },
  ];
  return (
    <AuthLoadingProvider>
      <div className="w-full min-h-screen flex">
        {/* Left: Branding */}
        <div className="hidden md:flex md:w-[45%] flex-col justify-center px-16 text-white">
          <h1 className="text-4xl font-bold text-primary mb-2">Trackfi</h1>
          <p className="text-xl font-semibold">
            Track Your <span className="text-primary">Crypto.</span>
          </p>
          <p className="text-xl font-bold mb-10">
            Own Your <span className="text-[#BF81FF]">Finances.</span>
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {listItems.map((item, i) => {
                return (
                  <div key={i} className="flex gap-4">
                    {/* Number + vertical line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${i === 0 ? "border-primary text-primary bg-[#2a1a0a]" : "border-white/20 text-white/30"}`}
                      >
                        <span className="text-sm font-bold">{i + 1}</span>
                      </div>
                      {/* vertical line — hide on last item */}
                      {i < listItems.length - 1 && (
                        <div className="w-px flex-1 bg-white/10 my-1" />
                      )}
                    </div>
                    <div className="pb-10">
                      <p className="font-semibold text-white">{item.head}</p>
                      <p className="text-sm text-gray-400">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* right: Form */}
        <div className="w-full md:w-[55%] relative bg-background">
          <div className="w-full h-full flex items-center justify-center px-4 py-10">
            <div className="absolute bottom-1/2 right-0 w-[250px] h-[250px] rounded-full bg-[#ff9062]/8 blur-[90px] pointer-events-none" />
            <SignUpForm />
          </div>
        </div>
      </div>
    </AuthLoadingProvider>
  );
}
