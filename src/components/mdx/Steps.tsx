'use client';

import React from 'react';

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="my-8 space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-200 dark:before:bg-gray-800">
      {children}
    </div>
  );
};

interface StepProps {
  number: number | string;
  title: string;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ number, title, children }) => {
  return (
    <div className="relative flex items-start gap-4 group">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-keploy-500 text-white font-bold text-sm shadow-md shrink-0 ring-4 ring-white dark:ring-gray-950 z-10">
        {number}
      </div>
      <div className="flex-1 pt-1.5 pb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight group-hover:text-keploy-500 transition-colors">
          {title}
        </h3>
        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
