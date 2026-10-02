'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-3 transition-all bg-white dark:bg-gray-900/80 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 flex items-center justify-between text-left font-semibold text-sm text-gray-900 dark:text-gray-100 hover:text-keploy-500 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-keploy-500' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800/80 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="my-6">{children}</div>;
};
