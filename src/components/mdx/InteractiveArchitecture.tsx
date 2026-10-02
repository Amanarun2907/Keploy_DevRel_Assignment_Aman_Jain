'use client';

import React, { useState } from 'react';
import { Play, Database, Server, User, ArrowRight, ShieldCheck, FileCode, Activity } from 'lucide-react';

export const InteractiveArchitecture: React.FC = () => {
  const [mode, setMode] = useState<'record' | 'test'>('record');

  return (
    <div className="my-8 border border-gray-200 dark:border-gray-800 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-keploy-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-keploy-400 tracking-wider uppercase mb-1">
            <Activity className="w-4 h-4 animate-pulse text-keploy-500" />
            Keploy eBPF Architecture Visualizer
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            How Keploy Works Under The Hood
          </h3>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1 bg-gray-900 border border-gray-800 rounded-xl">
          <button
            onClick={() => setMode('record')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              mode === 'record'
                ? 'bg-keploy-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            1. Record Mode
          </button>
          <button
            onClick={() => setMode('test')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              mode === 'test'
                ? 'bg-cyan-500 text-gray-950 font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            2. Test Mode (Replay)
          </button>
        </div>
      </div>

      {/* Mode Description Banner */}
      <div className="my-4 p-3 rounded-lg bg-gray-900/80 border border-gray-800/80 text-xs text-gray-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-keploy-400 animate-ping shrink-0" />
        {mode === 'record' ? (
          <span>
            <strong>Record Mode (<code className="text-keploy-400">keploy record</code>):</strong> Keploy attaches eBPF probes to intercept incoming API calls and outgoing Mongo queries, automatically saving them as YAML test cases and mocks.
          </span>
        ) : (
          <span>
            <strong>Test Mode (<code className="text-cyan-400">keploy test</code>):</strong> Keploy replays recorded HTTP requests into the Go app while mocking external dependencies (like Mongo DB) automatically without touching database state!
          </span>
        )}
      </div>

      {/* Flowchart Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6 relative">
        {/* Node 1: Client */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/90 border border-gray-800 shadow-md text-center hover:border-gray-700 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 border border-blue-500/30">
            <User className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-gray-300">Client / Postman</span>
          <span className="text-[10px] text-gray-500 mt-1 font-mono">POST /url</span>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center text-gray-600">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-keploy-400 font-mono mb-1">
              {mode === 'record' ? 'HTTP Request' : 'Replay HTTP'}
            </span>
            <ArrowRight className="w-6 h-6 text-keploy-500 animate-pulse" />
          </div>
        </div>

        {/* Node 2: Go App + eBPF Hook */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-keploy-950/40 to-gray-900 border border-keploy-500/40 shadow-glow text-center relative group">
          <div className="absolute -top-2 px-2 py-0.5 rounded-full bg-keploy-500 text-[9px] font-bold uppercase tracking-wider text-white">
            eBPF Kernel Hooks
          </div>
          <div className="w-12 h-12 rounded-xl bg-keploy-500/20 text-keploy-400 flex items-center justify-center mb-2 border border-keploy-500/30 mt-1">
            <Server className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-white">Go Gin Application</span>
          <span className="text-[10px] text-keploy-300 mt-1 font-mono">Port 8080</span>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center text-gray-600">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-cyan-400 font-mono mb-1">
              {mode === 'record' ? 'Capture Wire Query' : 'Serve Mocks'}
            </span>
            <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Node 3: Database / Mocks */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/90 border border-gray-800 shadow-md text-center hover:border-gray-700 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/30">
            {mode === 'record' ? <Database className="w-6 h-6" /> : <FileCode className="w-6 h-6 text-cyan-400" />}
          </div>
          <span className="text-xs font-semibold text-gray-300">
            {mode === 'record' ? 'MongoDB Instance' : 'Keploy Mock Engine'}
          </span>
          <span className="text-[10px] text-gray-500 mt-1 font-mono">
            {mode === 'record' ? 'Port 27017' : 'keploy/mocks/*.yaml'}
          </span>
        </div>
      </div>

      {/* Artifacts Created Footer */}
      <div className="mt-4 p-4 rounded-xl bg-gray-950 border border-gray-800/90 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-keploy-500/20 border border-keploy-500/30 flex items-center justify-center text-keploy-400 shrink-0">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-gray-200">Test File Generated</div>
            <div className="text-gray-400 font-mono text-[11px]">keploy/tests/test-1.yaml</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-gray-200">Mock Data Recorded</div>
            <div className="text-gray-400 font-mono text-[11px]">keploy/mocks/mock-1.yaml</div>
          </div>
        </div>
      </div>
    </div>
  );
};
