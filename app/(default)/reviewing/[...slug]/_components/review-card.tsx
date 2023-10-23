'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

import Icon from '@/components/common/icon';
import MessageSkeleton from '@/components/common/message-skeleton';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { ReviewMessage } from '@/types/chatGPT';

const Message = dynamic(() => import('@/components/common/message'), {
  loading: () => <MessageSkeleton />,
});

const ChatWithGPTDialog = dynamic(
  () => import('@/components/dialog/chat-with-gpt-dialog'),
  {
    loading: () => <p>Loading...</p>,
  },
);

const gradeColor = (gradeValue: string) => {
  const colorMap = {
    A: 'bg-green-100 dark:bg-green-500 text-green-400 dark:text-white border-green-400',
    B: 'bg-yellow-100 dark:bg-yellow-500 text-yellow-400 dark:text-white border-yellow-400',
    C: 'bg-orange-100 dark:bg-orange-500 text-orange-400 dark:text-white border-orange-400',
    D: 'bg-red-100 dark:bg-red-500 text-red-400 dark:text-white border-red-400',
    default: 'bg-gray-100 text-gray-400 border-gray-400',
  };

  switch (gradeValue) {
    case 'A':
      return colorMap.A;
    case 'B':
      return colorMap.B;
    case 'C':
      return colorMap.C;
    case 'D':
      return colorMap.D;
    default:
      return colorMap.default;
  }
};

export interface ReviewCardProps {
  fileName: string;
  grade: string;
  reviewMessages: ReviewMessage[];
  onReviewMessageChange: (fileName: string) => void;
}

export default function ReviewCard({
  fileName,
  grade,
  reviewMessages,
  onReviewMessageChange,
}: ReviewCardProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFetchReviewMessages = async () => {
    setIsLoading(true);
    await onReviewMessageChange(fileName);
    setIsLoading(false);
  };

  const handleToggle = async () => {
    setOpen(!open);
    handleFetchReviewMessages();
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-x-4 p-1 hover:bg-slate-100 dark:hover:bg-indigo-900"
        onClick={handleToggle}
      >
        <Button
          variant="ghost"
          className={cn(
            'rounded-full transition duration-300 ease-in-out',
            open && 'rotate-90',
          )}
          size="icon"
          onClick={handleToggle}
        >
          <Icon name="chevron-right" className="h-4 w-4 text-gray-500" />
        </Button>

        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border text-sm font-extrabold',
                gradeColor(grade),
              )}
            >
              <span>{grade}</span>
            </div>

            <span className="cursor-pointer text-xs text-indigo-700 dark:text-white">
              {fileName}
            </span>
          </div>

          <button
            type="button"
            onClick={async (e) => {
              handleFetchReviewMessages();
              e.stopPropagation();
            }}
          >
            <ChatWithGPTDialog reviewMessages={reviewMessages} isLoading={isLoading} />
          </button>
        </div>
      </button>

      {open && (
        <div className="mt-2 h-96 overflow-hidden rounded-md border border-slate-100 p-4 dark:border-slate-900">
          <div className="h-full overflow-y-auto">
            {/* eslint-disable-next-line max-len */}
            {isLoading ? <MessageSkeleton /> : <Message markdownText={reviewMessages[0].message} hiddenShadow />}
          </div>
        </div>
      )}
    </div>
  );
}
