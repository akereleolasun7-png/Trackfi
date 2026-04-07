'use client'
import React, { useState } from 'react'
import { X, Link2, Upload, ChevronRight, Key, FileUp, CheckCircle2 } from 'lucide-react'

type Screen = 'picker' | 'binance' | 'csv'

interface ImportModalProps {
  onClose: () => void
}

export function ImportModal({ onClose }: ImportModalProps) {
  const [screen, setScreen] = useState<Screen>('picker')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="
        fixed z-50
        bottom-0 left-0 right-0 rounded-tl-2xl rounded-tr-2xl
        sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        sm:w-full sm:max-w-md sm:rounded-2xl
        bg-[#1a1919] border border-white/10 p-6
        animate-in fade-in slide-in-from-bottom duration-200
        sm:slide-in-from-bottom-0
      ">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {screen !== 'picker' && (
              <button
                onClick={() => setScreen('picker')}
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                ←
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-white">
                {screen === 'picker' && 'Import Data'}
                {screen === 'binance' && 'Connect Binance'}
                {screen === 'csv' && 'Upload CSV'}
              </h2>
              <p className="text-xs text-white/40 mt-0.5">
                {screen === 'picker' && 'Choose how to import your transaction history'}
                {screen === 'binance' && 'Enter your Binance API credentials'}
                {screen === 'csv' && 'Upload your transaction history file'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-white/40" />
          </button>
        </div>

        {/* Picker Screen */}
        {screen === 'picker' && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setScreen('binance')}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Link2 className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Connect Binance</p>
                  <p className="text-xs text-white/40 mt-0.5">Auto-sync via API keys</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
            </button>

            <button
              onClick={() => setScreen('csv')}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Upload CSV</p>
                  <p className="text-xs text-white/40 mt-0.5">Bulk import from any exchange</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
            </button>
          </div>
        )}

        {/* Binance Screen */}
        {screen === 'binance' && (
          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <p className="text-xs text-yellow-400/80 leading-relaxed">
                Your API keys are encrypted and never stored in plain text. Use read-only keys for security.
              </p>
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3 h-3" /> API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Enter your Binance API key"
                className="bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3 h-3" /> API Secret
              </label>
              <input
                type="password"
                value={apiSecret}
                onChange={e => setApiSecret(e.target.value)}
                placeholder="Enter your Binance API secret"
                className="bg-[#262626] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setScreen('picker')}
                className="flex-1 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!apiKey || !apiSecret}
                className="flex-1 py-3 rounded-full bg-primary text-black text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        )}

        {/* CSV Screen */}
        {screen === 'csv' && (
          <div className="flex flex-col gap-4">
            <div
              onClick={() => document.getElementById('csv-upload')?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
                ${file ? 'border-primary/40 bg-primary/5' : 'border-white/10 hover:border-white/20'}`}
            >
              {file ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-white/40">{(file.size / 1024).toFixed(1)} KB</p>
                </>
              ) : (
                <>
                  <FileUp className="w-8 h-8 text-white/20" />
                  <p className="text-sm text-white/60">Click to upload or drag and drop</p>
                  <p className="text-xs text-white/30">.CSV files only</p>
                </>
              )}
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setScreen('picker')}
                className="flex-1 py-3 rounded-full border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!file}
                className="flex-1 py-3 rounded-full bg-primary text-black text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Import
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}