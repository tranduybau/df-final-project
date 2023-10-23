import * as React from 'react';

import Message from '@/components/common/message';

import { ReviewMessage, ReviewMessageRole } from '@/types/chatGPT';

export interface MessageListProps {
  messageList: ReviewMessage[]
}

function MessageList({ messageList }: MessageListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {messageList.map((message) => (
        <Message
          key={message.id}
          isUser={message.role === ReviewMessageRole.USER}
          markdownText={message.message}
        />
      ))}
    </div>
  );
}

export default React.memo(MessageList);
