'use client';

import React, { useEffect, useState } from 'react';
import { AlignLeft, Link, Share2, Check, ArrowUp, ThumbsUp } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('main h2, main h3')
    ).map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '',
      text: elem.textContent || '',
      level: Number(elem.tagName.substring(1)),
    }));

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -40% 0px' }
    );

    elements.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="w-64 shrink-0 hidden xl:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-6 pb-12 border-l border-gray-200 dark:border-gray-800 text-xs">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            <AlignLeft className="w-3.5 h-3.5" />
            On This Page
          </div>
          <nav className="space-y-2">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block transition-all line-clamp-1 ${
                    item.level === 3 ? 'pl-3 text-[11px]' : 'font-medium'
                  } ${
                    isActive
                      ? 'text-keploy-600 dark:text-keploy-400 font-bold border-l-2 border-keploy-500 pl-2'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {item.text}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-keploy-500" />
              Copy Tutorial Link
            </span>
            {copied && <Check className="w-3.5 h-3.5 text-emerald-500" />}
          </button>

          <button
            onClick={scrollToTop}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowUp className="w-3.5 h-3.5" />
              Back to Top
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
