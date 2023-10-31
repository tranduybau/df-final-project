import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import rehypeDomStringify from 'rehype-dom-stringify';
import rehypeFormat from 'rehype-format';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';

import chatGptImage from '@/assets/images/chatgpt.webp';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback } from '../ui/avatar';

function CodeCopyBtn({ children }: React.PropsWithChildren) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = () => {
    // @ts-ignore
    navigator.clipboard.writeText(children?.props?.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <button
      type="button"
      className="absolute right-3 top-3 z-10 rounded-md bg-slate-500 p-2 text-white hover:bg-slate-300"
      onClick={handleClick}
    >
      {copyOk ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-copy"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}

function PreMarkdown({ children }: React.PropsWithChildren) {
  return (
    <pre className="relative">
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  );
}

function CodeMarkdown({
  children, className, node, ...rest
}: any) {
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    <SyntaxHighlighter
      {...rest}
      style={oneDark}
      language={match[1]}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

export interface MessageProps {
  isUser?: boolean
  markdownText: string
  hiddenShadow?: boolean
  userName?: string
}

export default function Message({
  isUser = false,
  markdownText,
  hiddenShadow = false,
  userName,
}:MessageProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-3',
        isUser ? 'ml-auto min-w-fit max-w-[70%]' : 'min-w-fit max-w-full',
      )}
    >
      <div
        className={cn('flex items-start', isUser ? 'flex-row-reverse' : 'flex-row')}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-400">
          {isUser ? (
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {userName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : <Image src={chatGptImage} alt="chat-gpt-image" />}
        </div>
        <div
          className={cn(
            'relative w-full overflow-x-auto rounded-md px-4 py-2 text-sm leading-8',
            isUser
              ? 'mr-3 bg-indigo-100 dark:bg-indigo-900'
              : 'ml-3 bg-white dark:bg-slate-800',
            !hiddenShadow && 'shadow',
          )}
        >
          <Markdown
            rehypePlugins={[rehypeFormat, rehypeDomStringify]}
            remarkPlugins={[remarkParse, remarkToc, remarkGfm, remarkRehype]}
            components={{
              // @ts-ignore
              pre: PreMarkdown,
              code: CodeMarkdown,
            }}
          >
            {markdownText}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
