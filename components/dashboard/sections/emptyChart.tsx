import { ChartNoAxesCombined } from "lucide-react"
export function EmptyChart() {
    return (
        <div className="h-52 flex flex-col items-center justify-center gap-3 text-center">
            <div className="text-3xl"><ChartNoAxesCombined fill=""/></div>
            <p className="text-white font-medium">Add coins to see portfolio</p>
            <p className="text-sm text-white/40 max-w-xs">Connect your wallet or search for assets to start visualizing your financial growth.</p>
            <button className="mt-2 px-5 py-2 border border-primary text-primary rounded-full text-sm hover:bg-primary hover:text-black transition-colors cursor-pointer">
                Import Wallet
            </button>
        </div>
    )
}