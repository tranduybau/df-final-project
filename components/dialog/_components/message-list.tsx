import * as React from "react"

import Message, { testMarkdownText } from "@/components/common/message"

export interface MessageListProps {
  messageList: string[]
}

function MessageList({ messageList }: MessageListProps) {
  React.useEffect(() => {
    console.log("Im MessageList")
  }, [messageList])

  return (
    <div className="grid grid-cols-12 gap-y-2">
      {messageList.map((message, index) => (
        <Message
          key={index}
          me={index % 2 === 0 ? "K" : undefined}
          markdownText={index % 2 === 0 ? "Thanks!!!" : testMarkdownText}
        />
      ))}
    </div>
  )
}

export default React.memo(MessageList)
