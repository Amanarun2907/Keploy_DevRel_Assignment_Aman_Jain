'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
  children?: React.ReactNode;
  code?: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  code: directCode,
  language = 'bash',
  filename,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract raw text if children is passed from MDX pre/code tags or custom components
  const extractCode = (node: any): string => {
    if (node === null || node === undefined) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractCode).join('');
    if (typeof node === 'object') {
      if (node.props?.children) return extractCode(node.props.children);
      if (node.props?.code) return extractCode(node.props.code);
      if (node.value) return String(node.value);
    }
    return '';
  };

  const rawCode =
    (typeof directCode === 'string' ? directCode : extractCode(directCode)) ||
    extractCode(children);

  const copyToClipboard = async () => {
    try {
      const textToCopy = rawCode.trim() || extractCode(children);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const displayContent = rawCode && rawCode.trim() ? rawCode.trim() : children;

  return (
    <div className="my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-900 text-gray-100 overflow-hidden shadow-lg group">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/80 border-b border-gray-800 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          {filename ? (
            <span className="ml-2 font-medium text-gray-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-keploy-400" />
              {filename}
            </span>
          ) : (
            <span className="uppercase tracking-wider font-semibold text-gray-400">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-all text-xs border border-gray-700/50"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-200" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-gray-200 selection:bg-keploy-500/30 selection:text-keploy-200">
        <pre className="m-0">
          <code>{displayContent}</code>
        </pre>
      </div>
    </div>
  );
};
