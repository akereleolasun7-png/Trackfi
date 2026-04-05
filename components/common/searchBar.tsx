'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Search, X} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { fetchSearchResults } from '@/lib/api/search'

import { SearchResults } from './searchResults'
import { SearchBarResultsItem } from '@/types/search'
import { useDebounce } from '@/hooks/useDebounce'


export function GlobalSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchBarResultsItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(0) // keyboard nav index
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 220)


useEffect(() => {
   if (!debouncedQuery.trim()) {
      setResults(null)
      setOpen(false)
      setLoading(false)
      return
    }
  const fetch = async () => {
    setLoading(true)
    const r = await fetchSearchResults(debouncedQuery)
    setResults(r)
    setOpen(true)
    setFocused(0)
    setLoading(false)
  }
  fetch()
}, [debouncedQuery])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const totalResults = results
    ? results.coins.length + results.transactions.length + results.alerts.length
    : 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, totalResults - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)) }
    if (e.key === 'Escape')    { setOpen(false); inputRef.current?.blur() }
  }

  const clear = () => {
    setQuery('')
    setResults(null)
    setOpen(false)
    inputRef.current?.focus()
  }

  const hasResults = results &&
    (results.coins.length + results.transactions.length + results.alerts.length) > 0

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* ── input ── */}
      <div className={`flex items-center gap-2 h-10 px-3 rounded-xl  bg-white/5 border transition-all duration-200
          w-full md:min-w-[320px]
        ${open ? 'border-primary/60 bg-white/8 shadow-[0_0_0_3px_rgba(255,144,98,0.1)]' : 'border-white/10 hover:border-white/20'}`}
      >
        <Search className="w-4 h-4 text-white/40 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (results) setOpen(true) }}
          onKeyDown={handleKeyDown}
          placeholder="Search markets, assets..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
        />
          {loading ? (
          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-primary animate-spin shrink-0" />
        ) : query ? (
          <button onClick={clear} className="p-0.5 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-3.5 h-3.5 text-white/40" />
          </button>
        ) : null}
      </div>

      {/* ── dropdown ── */}
      {open && (
        <div className="absolute top-12 left-0 w-full md:min-w-[320px] bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
        {loading ? (
            <div className="px-4 py-8 flex justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-primary animate-spin" />
            </div>
          ) : !hasResults ? (
            <div className="px-4 py-8 text-center">
              <p className="text-white/30 text-sm">No results for <span className="text-white/50">&apos;{query}&apos;</span></p>
            </div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto search-scroll">
              <SearchResults
                results={results!}
                focused={focused}
                onSelect={(href) => {
                  setOpen(false)
                  setQuery('')
                  router.push(href)
                }}
              />
            </div>
          )}

          {/* footer */}
          <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-[10px] text-white/20">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </div>
      )}
    </div>
  )
}