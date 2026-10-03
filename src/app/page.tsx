import React from 'react';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Callout } from '@/components/mdx/Callout';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { Tabs, Tab } from '@/components/mdx/Tabs';
import { Steps, Step } from '@/components/mdx/Steps';
import { InteractiveArchitecture } from '@/components/mdx/InteractiveArchitecture';
import { InteractiveTestSimulator } from '@/components/mdx/InteractiveTestSimulator';
import { Accordion, AccordionItem } from '@/components/mdx/Accordion';
import { FeedbackWidget } from '@/components/ui/FeedbackWidget';

// Custom MDX component overrides for standard HTML tags
const components = {
  Callout,
  CodeBlock,
  Tabs,
  Tab,
  Steps,
  Step,
  InteractiveArchitecture,
  InteractiveTestSimulator,
  Accordion,
  AccordionItem,
  h1: ({ children, ...props }: any) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
    return (
      <h1
        id={id}
        className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: any) => {
    const text = children?.toString() || '';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return (
      <h2
        id={id}
        className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mt-10 mb-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 scroll-mt-24 flex items-center gap-2 group"
        {...props}
      >
        <span className="group-hover:text-keploy-500 transition-colors">{children}</span>
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const text = children?.toString() || '';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return (
      <h3
        id={id}
        className="text-lg font-bold text-gray-900 dark:text-gray-200 tracking-tight mt-6 mb-3 scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: ({ children }: any) => (
    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4 pl-2">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4 pl-2">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed">{children}</li>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-keploy-600 dark:text-keploy-400 font-semibold hover:underline decoration-keploy-500/40 underline-offset-2 transition-all"
    >
      {children}
    </a>
  ),
  code: ({ children, className }: any) => {
    if (className) {
      const language = className.replace('language-', '');
      return <CodeBlock code={children} language={language}>{children}</CodeBlock>;
    }
    return (
      <code className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-keploy-600 dark:text-keploy-400 text-xs font-mono border border-gray-200 dark:border-gray-700 font-medium">
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => {
    if (React.isValidElement(children)) {
      const childProps: any = children.props || {};
      if (childProps.className) {
        const language = childProps.className.replace('language-', '');
        const code = childProps.children;
        return <CodeBlock code={code} language={language}>{code}</CodeBlock>;
      }
    }
    return <>{children}</>;
  },
  hr: () => (
    <hr className="my-8 border-gray-200 dark:border-gray-800" />
  ),
};

export default function Page() {
  const filePath = path.join(process.cwd(), 'src/content/keploy-go-quickstart.mdx');
  const source = fs.readFileSync(filePath, 'utf8');

  return (
    <article className="prose dark:prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
      <FeedbackWidget />
    </article>
  );
}
