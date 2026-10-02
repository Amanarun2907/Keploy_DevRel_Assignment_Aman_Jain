'use client';

import React, { useState } from 'react';
import { Search, X, BookOpen, ChevronRight, Terminal, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  {
    title: 'What is Keploy & Why eBPF?',
    anchor: '#1-understanding-keploy-the-magic-of-ebpf',
    category: 'Overview',
    snippet: 'Learn how Keploy captures network packets at kernel layer without SDKs.',
  },
  {
    title: 'Prerequisites & Setup',
    anchor: '#2-prerequisites',
    category: 'Setup',
    snippet: 'Go 1.21+, Docker Desktop, Linux Kernel requirements, and Keploy CLI.',
  },
  {
    title: 'Sample Application Code (Gin + Mongo)',
    anchor: '#3-setting-up-the-go-gin--mongodb-application',
    category: 'Code',
    snippet: 'Building a URL Shortener microservice with Gin framework and Mongo Go driver.',
  },
  {
    title: 'Recording Test Cases (keploy record)',
    anchor: '#4-recording-your-first-test-case',
    category: 'Tutorial Step',
    snippet: 'Run keploy record -c "go run main.go" and generate YAML test suites automatically.',
  },
  {
    title: 'Replaying Tests & Assertions (keploy test)',
    anchor: '#5-replaying--testing-with-keploy',
    category: 'Tutorial Step',
    snippet: 'Run keploy test to mock database calls and pass assertions in seconds.',
  },
  {
    title: 'Troubleshooting & FAQ',
    anchor: '#6-troubleshooting--pro-tips',
    category: 'Guide',
    snippet: 'Docker permission errors, eBPF kernel headers, MongoDB port binding fixes.',
  },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.snippet.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-5 h-5 text-keploy-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Keploy Go Quickstart..."
            autoFocus
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <a
                key={idx}
                href={item.anchor}
                onClick={onClose}
                className="flex items-start justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-keploy-500 font-semibold mb-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {item.category}
                  </div>
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-keploy-500 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {item.snippet}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-keploy-500 group-hover:translate-x-0.5 transition-all mt-2" />
              </a>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              No documentation results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-keploy-500" />
            Keploy Go Quickstart Documentation
          </span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
