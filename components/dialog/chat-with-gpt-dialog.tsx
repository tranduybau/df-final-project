'use client';

import * as React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import chatGptImage from '@/assets/images/chatgpt.webp';
import { cn } from '@/lib/utils';
import { OpenAIMessage } from '@/services';

import AppTextArea from '../common/app-textarea';
import Icon from '../common/icon';
import MessageSkeleton from '../common/message-skeleton';

import MessageList from './_components/message-list';

export interface ChatWithGPTDialogProps {
  reviewMessages: OpenAIMessage[];
  isLoading: boolean;
  dialogOpen: boolean;
  onDialogOpenChange: () => void;
  onUserChatSubmit: (message: string) => void;
}

export default function ChatWithGPTDialog({
  reviewMessages, isLoading, dialogOpen, onDialogOpenChange, onUserChatSubmit,
}: ChatWithGPTDialogProps) {
  const [message, setMessage] = React.useState('');

  const reviewMessagesWithoutPrompt = React.useMemo(
    () => {
      if (reviewMessages.length > 1) {
        return reviewMessages.slice(1);
      }
      return reviewMessages;
    },
    [reviewMessages],
  );

  const handleSubmitChat = () => {
    if (message) {
      onUserChatSubmit(message);
      setMessage('');
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
          <div className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <Image src={chatGptImage} alt="chat-gpt-image" />
          </div>
          Chat with GPT
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-full sm:max-w-7xl"
        onInteractOutside={(e: any) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle>Chat with GPT</DialogTitle>
          <DialogDescription>
            This is a AI bot that will help you to find the best solution for
            your problem.
          </DialogDescription>
        </DialogHeader>

        <div className="h-[70vh] overflow-hidden py-4">
          <div className="h-full overflow-y-auto">
            {reviewMessagesWithoutPrompt
            && <MessageList messageList={reviewMessagesWithoutPrompt} />}
            {isLoading && <MessageSkeleton />}
            <div
              ref={(node) => {
                // When the node is available, scroll to the bottom.
                if (node) {
                  node.scrollIntoView();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="relative w-full">
            <AppTextArea
              leftIcon="message-square"
              placeholder="Send a message..."
              className="w-full resize-none pr-12"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
              onClick={handleSubmitChat}
            >
              <div className="relative">
                <Icon
                  name="send-horizontal"
                  className={cn(
                    'h-6 w-6',
                    message ? 'text-blue-500' : 'text-gray-500',
                  )}
                />
                <Icon
                  name="sparkle"
                  className={cn(
                    'absolute -right-1 -top-1 h-3 w-3',
                    message ? 'text-blue-500' : 'text-gray-500',
                  )}
                />
              </div>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
