import * as React from 'react';

import Message from '@/components/common/message';

import { OpenAIMessage } from '@/services';
import { ReviewMessageRole } from '@/types/chatGPT';

export interface MessageListProps {
  messageList: OpenAIMessage[]
}

function MessageList({ messageList }: MessageListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {messageList.map((message) => (
        <Message
          key={message.content}
          isUser={message.role === ReviewMessageRole.USER}
          markdownText={message.content}
        />
      ))}
    </div>
  );
}

export default React.memo(MessageList);
