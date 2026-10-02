'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeedbackWidget: React.FC = () => {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);

  const handleVote = (vote: 'yes' | 'no') => {
    setVoted(vote);
    if (vote === 'yes') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {}
    }
  };

  return (
    <div className="my-12 p-6 rounded-2xl bg-gradient-to-r from-keploy-500/10 via-gray-100 dark:via-gray-900 to-cyan-500/10 border border-gray-200 dark:border-gray-800 text-center shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-keploy-500" />
        Was this Keploy tutorial helpful?
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 max-w-md mx-auto">
        Your feedback helps improve Keploy's documentation and developer resources.
      </p>

      {voted ? (
        <div className="mt-4 p-3 rounded-xl bg-white dark:bg-gray-800 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold text-xs inline-flex items-center gap-2">
          <Check className="w-4 h-4" />
          Thank you for your feedback!
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => handleVote('yes')}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-keploy-500 hover:text-white dark:hover:bg-keploy-500 font-bold text-xs text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm transition-all"
          >
            <ThumbsUp className="w-4 h-4 text-keploy-500 group-hover:text-white" />
            Yes, super clear!
          </button>
          <button
            onClick={() => handleVote('no')}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 shadow-sm transition-all"
          >
            <ThumbsDown className="w-4 h-4 text-gray-400" />
            Could be improved
          </button>
        </div>
      )}
    </div>
  );
};
