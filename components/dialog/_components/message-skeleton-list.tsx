import React from "react"

import MessageSkeleton from "@/components/common/message-skeleton"

const MessageSkeletonList = () => {
  return (
    <div className="w-full">
      <MessageSkeleton />
      <MessageSkeleton isRight />
      <MessageSkeleton />
      <MessageSkeleton isRight />
    </div>
  )
}

export default MessageSkeletonList
