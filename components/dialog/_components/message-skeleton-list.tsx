import React from "react"

import MessageSkeleton from "@/components/common/message-skeleton"

const MessageSkeletonList = () => {
  return (
    <div className="w-full">
      <MessageSkeleton />
      <MessageSkeleton isHumanMess />
      <MessageSkeleton />
      <MessageSkeleton isHumanMess />
    </div>
  )
}

export default MessageSkeletonList
