'use client';

import React from 'react';
import { Github, Twitter, MessageSquare, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-950/80 text-gray-600 dark:text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-keploy-500 flex items-center justify-center text-white font-bold text-sm">
            K
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-gray-100">Keploy DevRel Candidate Assignment</div>
            <div className="text-[11px] text-gray-500">
              Built with Next.js 14, MDX, and Tailwind CSS.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://keploy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-keploy-500 transition-colors"
          >
            <span>Keploy Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/keploy/keploy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-keploy-500 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://join.slack.com/t/keploy/shared_invite/zt-275sn9p68-52x9e12056~r004c_t7uWg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-keploy-500 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Slack</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
