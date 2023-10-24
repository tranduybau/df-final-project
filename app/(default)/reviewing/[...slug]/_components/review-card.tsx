'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

import Icon from '@/components/common/icon';
import MessageSkeleton from '@/components/common/message-skeleton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { OpenAIMessage } from '@/services';

const Message = dynamic(() => import('@/components/common/message'), {
  loading: () => <MessageSkeleton />,
});

const ChatWithGPTDialog = dynamic(
  () => import('@/components/dialog/chat-with-gpt-dialog'),
  {
    loading: () => <Skeleton className="h-9 w-[158px] rounded-md" />,
  },
);

const gradeColor = (gradeValue: string | -1) => {
  const colorMap = {
    A: 'bg-green-100 dark:bg-green-500 text-green-400 dark:text-white border-green-400',
    B: 'bg-yellow-100 dark:bg-yellow-500 text-yellow-400 dark:text-white border-yellow-400',
    C: 'bg-orange-100 dark:bg-orange-500 text-orange-400 dark:text-white border-orange-400',
    D: 'bg-red-100 dark:bg-red-500 text-red-400 dark:text-white border-red-400',
    default: 'bg-slate-200 dark:bg-slate-500',
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
  reviewMessages: OpenAIMessage[];
  onReviewMessageChange: (fileName: string) => void;
  onUserChat: (message:string, fileName: string) => void;
}

function extractCodeQuality(input: string) {
  const codeQualityMatch = input.match(/=== (A|B|C|D) ===/);

  if (codeQualityMatch) {
    const codeQuality = codeQualityMatch[1];
    return codeQuality;
  }

  return -1;
}

export default function ReviewCard({
  fileName,
  reviewMessages,
  onReviewMessageChange,
  onUserChat,
}: ReviewCardProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openChatGPTDialog, setOpenChatGPTDialog] = React.useState(false);

  const handleFetchReviewMessages = async () => {
    // Prevent fetch review messages if loading
    if (isLoading) return;

    setIsLoading(true);
    await onReviewMessageChange(fileName);
    setIsLoading(false);
  };

  const handleToggle = async () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      handleFetchReviewMessages();
    }
  };

  const handleOpenChatGPTDialog = async () => {
    const newOpenChatGPTDialog = !openChatGPTDialog;
    setOpenChatGPTDialog(newOpenChatGPTDialog);

    if (newOpenChatGPTDialog) {
      handleFetchReviewMessages();
    }
  };

  const handleUserChatSubmit = async (message: string) => {
    // Prevent fetch review messages if loading
    if (isLoading) return;

    setIsLoading(true);
    await onUserChat(message, fileName);
    setIsLoading(false);
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
            {!reviewMessages?.[1]?.content && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-slate-200 text-sm font-extrabold dark:bg-slate-500">
                      <Icon name="loader" className="h-4 w-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Code Quality score will be visible after your review is completed.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {reviewMessages?.[1]?.content && (
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border text-sm font-extrabold',
                  gradeColor(
                    extractCodeQuality(reviewMessages?.[1]?.content || ''),
                  ),
                )}
              >
                {typeof extractCodeQuality(reviewMessages?.[1]?.content) === 'string' ? (
                  <span>
                    {extractCodeQuality(reviewMessages?.[1]?.content || '')}
                  </span>
                )
                  : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-slate-200 text-sm font-extrabold dark:bg-slate-500">
                            <Icon name="x" className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Something went wrong. Please try again.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
              </div>
            )}

            <span className="cursor-pointer text-xs text-indigo-700 dark:text-white">
              {fileName}
            </span>
          </div>

          <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
            }}
          >
            <ChatWithGPTDialog
              reviewMessages={reviewMessages}
              isLoading={isLoading}
              dialogOpen={openChatGPTDialog}
              onDialogOpenChange={handleOpenChatGPTDialog}
              onUserChatSubmit={handleUserChatSubmit}
            />
          </button>
        </div>
      </button>

      {open && (
        <div className="mt-2 h-96 overflow-hidden rounded-md border border-slate-100 p-4 dark:border-slate-900">
          <div className="h-full overflow-y-auto">
            {/* eslint-disable-next-line max-len */}
            {isLoading && <MessageSkeleton />}
            {!isLoading && reviewMessages?.[1]?.content && (
              <Message markdownText={reviewMessages[1].content} hiddenShadow />
            )}

            {!isLoading && !reviewMessages?.[1]?.content && (
              <div className="flex h-full flex-col items-center justify-center">
                <Icon name="inbox" className="text-gray-500 dark:text-gray-400" size={30} />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  No review messages yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
