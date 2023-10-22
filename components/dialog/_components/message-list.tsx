import * as React from 'react';

import Message, { testMarkdownText } from '@/components/common/message';

export interface MessageListProps {
  messageList: string[]
}

function MessageList({ messageList }: MessageListProps) {
  return (
    <div className="flex flex-col gap-y-2">
      {messageList.map((message, index) => (
        <Message
          key={message}
          me={index % 2 === 0 ? 'K' : undefined}
          markdownText={index % 2 === 0 ? 'Thanks!!!' : testMarkdownText}
        />
      ))}
    </div>
  );
}

export default React.memo(MessageList);
