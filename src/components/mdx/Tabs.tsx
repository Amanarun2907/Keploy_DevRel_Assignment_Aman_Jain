'use client';

import React, { useState, ReactElement } from 'react';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="pt-4">{children}</div>;
};

interface TabsProps {
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const tabList = React.Children.toArray(children) as ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(0);

  if (!tabList.length) return null;

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 shadow-sm">
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-100/80 dark:bg-gray-950/80 px-2 pt-2 gap-1 overflow-x-auto">
        {tabList.map((tab, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'bg-white dark:bg-gray-900 text-keploy-600 dark:text-keploy-400 border-keploy-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border-transparent hover:bg-white/50 dark:hover:bg-gray-800/50'
              }`}
            >
              {tab.props.title}
            </button>
          );
        })}
      </div>
      <div className="p-4 bg-white dark:bg-gray-900">
        {tabList[activeTab]}
      </div>
    </div>
  );
};
