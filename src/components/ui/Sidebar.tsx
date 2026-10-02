'use client';

import React from 'react';
import {
  BookOpen,
  CheckCircle,
  Terminal,
  Zap,
  Play,
  RotateCcw,
  HelpCircle,
  Code2,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { title: 'Overview & eBPF Magic', href: '#1-understanding-keploy-the-magic-of-ebpf', icon: Zap },
  { title: 'Prerequisites', href: '#2-prerequisites', icon: CheckCircle },
  { title: 'Setup Go + Gin App', href: '#3-setting-up-the-go-gin--mongodb-application', icon: Code2 },
  { title: 'Record Test Cases', href: '#4-recording-your-first-test-case', icon: Play },
  { title: 'Replay & Test Suite', href: '#5-replaying--testing-with-keploy', icon: RotateCcw },
  { title: 'Troubleshooting & FAQ', href: '#6-troubleshooting--pro-tips', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-6 pb-12 border-r border-gray-200 dark:border-gray-800">
      <div className="space-y-6">
        {/* Quickstart Category */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-keploy-600 dark:text-keploy-400 mb-3 px-2">
            <Sparkles className="w-3.5 h-3.5" />
            Go Quickstarts
          </div>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold bg-keploy-500/10 text-keploy-600 dark:text-keploy-400 border border-keploy-500/30 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-keploy-500 animate-pulse" />
                Gin + MongoDB (This Guide)
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://keploy.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
            >
              <span>Echo + PostgreSQL</span>
              <span className="text-[10px] text-gray-400 font-mono">External</span>
            </a>
            <a
              href="https://keploy.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
            >
              <span>Go Fiber + gRPC</span>
              <span className="text-[10px] text-gray-400 font-mono">External</span>
            </a>
          </div>
        </div>

        {/* Section Navigation */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 px-2">
            Tutorial Sections
          </div>
          <nav className="space-y-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-keploy-500 dark:hover:text-keploy-400 transition-all group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-keploy-500 transition-colors" />
                  <span>{item.title}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* DevRel Author Badge */}
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-keploy-500 text-white font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">DevRel Candidate</div>
              <div className="text-[10px] text-gray-500">Keploy Assignment</div>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug">
            Written with ❤️ for developers exploring zero-code test generation with eBPF.
          </p>
        </div>
      </div>
    </aside>
  );
};
