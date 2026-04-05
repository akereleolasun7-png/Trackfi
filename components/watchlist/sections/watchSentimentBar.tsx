export function SentimentBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-primary bg-clip-text text-transparent">
        {label}
      </span>
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden max-w-[120px]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-400 to-primary transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-white/60 text-sm font-medium">{score}</span>
    </div>
  )
}