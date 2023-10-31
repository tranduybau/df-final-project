'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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

import chatGptImage from '@/assets/images/chatgpt.webp';
import { cn } from '@/lib/utils';
import { OpenAIMessage } from '@/services';
import { useGPTMessageDialog } from '@/zustand/useModal';

const Message = dynamic(() => import('@/components/common/message'), {
  loading: () => <MessageSkeleton />,
});

const gradeColor = (gradeValue: string) => {
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

function extractCodeQuality(input: string) {
  const codeQualityMatch = input.match(/=== (A|B|C|D) ===|\((A|B|C|D)\)|(A|B|C|D)(?:\.|$|\*)/);

  if (!codeQualityMatch) return null;

  const codeQuality = codeQualityMatch[1] ?? codeQualityMatch[2] ?? codeQualityMatch[3];
  return codeQuality;
}

export interface ReviewCardProps {
  fileName: string;
  content: OpenAIMessage[];
  isLoadingReview: boolean;
}

export default function ReviewCard({
  fileName,
  content,
  isLoadingReview,
}: ReviewCardProps) {
  const { selectedFile, actionSelectedFileChange } = useGPTMessageDialog();

  const [open, setOpen] = React.useState(false);

  const showSkeleton = !content?.[1]?.content;
  const showReview = content?.[1]?.content;
  const hasNoReview = !isLoadingReview && !content?.[1]?.content;

  const handleToggle = async () => {
    const newOpen = !open;
    setOpen(newOpen);
  };

  const handlePopupChatGPT = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!selectedFile) {
      actionSelectedFileChange(fileName);
    } else {
      actionSelectedFileChange('');
    }
  };

  return (
    <div className="flex flex-col">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
       jsx-a11y/no-static-element-interactions */}
      <div
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
            {showSkeleton && (
              <div>
                <Skeleton className="h-7 w-7 rounded-full" />
              </div>
            )}

            {showReview && (
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border text-sm font-extrabold',
                  gradeColor(
                    extractCodeQuality(content?.[1]?.content) ?? '',
                  ),
                )}
              >
                {extractCodeQuality(content?.[1]?.content) ? (
                  <span>
                    {extractCodeQuality(content?.[1]?.content)}
                  </span>
                )
                  : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-red-400 bg-red-100 text-sm font-extrabold text-red-400 dark:bg-red-500 dark:text-white">
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

          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handlePopupChatGPT}
          >
            <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
              <Image src={chatGptImage} alt="chat-gpt-image" />
            </div>
            Chat with GPT
          </Button>

        </div>
      </div>

      {open && (
        <div className="mt-2 h-96 overflow-hidden rounded-md border border-slate-100 p-4 dark:border-slate-900">
          <div className="h-full overflow-y-auto">

            {showSkeleton && <MessageSkeleton /> }

            {showReview && <Message markdownText={content[1].content} hiddenShadow /> }

            {hasNoReview && (
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
