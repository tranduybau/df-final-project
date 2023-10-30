'use client';

import React from 'react';
import * as DOMPurify from 'dompurify';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { OpenAIMessage } from '@/services';

import AppTextArea from '../common/app-textarea';
import Icon from '../common/icon';
import MessageList from '../common/message-list';
import MessageSkeleton from '../common/message-skeleton';

export interface ChatWithGPTDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: any) => void;
  content: OpenAIMessage[];
  isLoading: boolean;
  onSubmitMessage: (message: string) => void;
}

export default function ChatWithGPTDialog(props: ChatWithGPTDialogProps) {
  const {
    isOpen, setIsOpen, isLoading, content, onSubmitMessage,
  } = props;

  const [message, setMessage] = React.useState('');

  const contentWithoutPrompt = React.useMemo(
    () => {
      if (!content) return [];

      if (content?.length > 1) {
        return content.slice(1);
      }
      return content;
    },
    [content],
  );

  const handleSubmitChat = () => {
    const newMessage = DOMPurify.sanitize(message);
    if (newMessage) {
      onSubmitMessage(newMessage);
      setMessage('');
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitChat();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            {contentWithoutPrompt
            && <MessageList messageList={contentWithoutPrompt} />}
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
            <form onSubmit={handleSubmitChat}>
              <AppTextArea
                leftIcon="message-square"
                placeholder="Send a message..."
                className="w-full resize-none pr-12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleEnterPress}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
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
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
