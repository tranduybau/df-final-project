import * as React from "react"
import Image from "next/image"
import chatGptImage from "@/assets/images/chatgpt.webp"

import { cn } from "@/lib/utils"

export interface MessageProps {
  me?: string
  message: string
}

export default function Message({ me, message }: MessageProps) {
  return (
    <div
      className={cn("col-end-13 rounded-lg p-3", {
        "col-start-4": me,
        "col-start-1": !me,
      })}
    >
      <div
        className={cn("flex items-start", {
          "flex-row-reverse": me,
          "flex-row": !me,
        })}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-400">
          {me ? me : <Image src={chatGptImage} alt="chat-gpt-image" />}
        </div>
        <div
          className={cn("relative rounded-xl px-4 py-2 text-sm shadow", {
            "mr-3 bg-indigo-100": me,
            "ml-3 bg-white": !me,
          })}
        >
          <div>{message}</div>
        </div>
      </div>
    </div>
  )
}
