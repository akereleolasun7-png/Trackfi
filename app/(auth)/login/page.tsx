import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLoadingProvider } from "@/context/AuthLoadingContext";
import {UserPlus  , CircleDollarSign , BellRing} from 'lucide-react'
export default function Page() {
  const listItems=  [
      {
        icon: UserPlus,
        head: "Create your account",
        text: "Join our  ecosystem in seconds with secure auth."
      },
      {
        icon: CircleDollarSign,
        head: "Add coins to watchlist",
        text: "Monitor performance across multiple charts."
      },

       {
        icon: BellRing,
        head: "Set alerts & track P&L",
        text: "Never miss a market move with smart notifications."
      }
  ]
  return (
    <AuthLoadingProvider>
      <div className="w-full min-h-screen flex">
          {/* Left: Branding */}
        <div className="hidden md:flex md:w-[45%] flex-col justify-center px-16 text-white">
          <h1 className="text-4xl font-bold text-primary mb-3">Trackfi</h1>
          <p className="text-xl font-semibold text-gray-400">Track Your Crypto.</p>
          <p className="text-xl font-bold mb-10">Own Your Finances.</p>

          <div className="flex flex-col gap-6">
            {listItems.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full  ${i===0 ? 'bg-[#2a1a0a]' : 'bg-[#7977752c]'} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${i === 0 ? 'text-[#FF9062]' : 'text-white/30'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.head}</p>
                    <p className="text-sm text-gray-400">{item.text}</p>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>

        {/* right: Form */}
        <div className="w-full md:w-[55%] relative bg-background">
          <div className="w-full h-full flex items-center justify-center px-4 py-10">
             <div className="absolute bottom-1/2 right-0 w-[250px] h-[250px] rounded-full bg-[#ff9062]/8 blur-[90px] pointer-events-none" />
  
              <LoginForm />
          </div>
        </div>
      </div>
    </AuthLoadingProvider>
  );
}
