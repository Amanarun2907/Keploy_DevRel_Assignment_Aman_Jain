'use client';

import React from 'react';
import { Info, AlertTriangle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'tip' | 'warning' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-500/10 dark:bg-blue-950/30',
      border: 'border-blue-500/40 dark:border-blue-500/30',
      text: 'text-blue-900 dark:text-blue-200',
      titleColor: 'text-blue-700 dark:text-blue-400',
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    },
    tip: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
      border: 'border-emerald-500/40 dark:border-emerald-500/30',
      text: 'text-emerald-900 dark:text-emerald-200',
      titleColor: 'text-emerald-700 dark:text-emerald-400',
      icon: <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-amber-500/10 dark:bg-amber-950/30',
      border: 'border-amber-500/40 dark:border-amber-500/30',
      text: 'text-amber-900 dark:text-amber-200',
      titleColor: 'text-amber-700 dark:text-amber-400',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-red-500/10 dark:bg-red-950/30',
      border: 'border-red-500/40 dark:border-red-500/30',
      text: 'text-red-900 dark:text-red-200',
      titleColor: 'text-red-700 dark:text-red-400',
      icon: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-keploy-500/10 dark:bg-keploy-950/30',
      border: 'border-keploy-500/40 dark:border-keploy-500/30',
      text: 'text-keploy-900 dark:text-keploy-200',
      titleColor: 'text-keploy-700 dark:text-keploy-400',
      icon: <CheckCircle2 className="w-5 h-5 text-keploy-500 shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`my-6 p-4 rounded-xl border ${current.bg} ${current.border} shadow-sm flex items-start gap-3.5 transition-all hover:shadow-md`}
    >
      {current.icon}
      <div className="flex-1 text-sm leading-relaxed overflow-hidden">
        {title && (
          <h4 className={`font-semibold mb-1 ${current.titleColor}`}>
            {title}
          </h4>
        )}
        <div className={current.text}>{children}</div>
      </div>
    </div>
  );
};
