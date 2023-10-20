import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Icon from "@/components/common/icon"
import ChatWithGPTDialog from "@/components/dialog/chat-with-gpt-dialog"

export interface ReviewCardProps {
  fileName: string
  grade: string
  issueCount?: number
}

const gradeColor = (gradeValue: string) => {
  switch (gradeValue) {
    case "A":
      return "bg-green-100 text-green-400 border-green-400"
    case "B":
      return "bg-yellow-100 text-yellow-400 border-yellow-400"
    case "C":
      return "bg-orange-100 text-orange-400 border-orange-400"
    case "D":
      return "bg-red-100 text-red-400 border-red-400"
    default:
      return "bg-gray-100 text-gray-400 border-gray-400"
  }
}

export default function ReviewCard({
  fileName,
  grade,
  issueCount,
}: ReviewCardProps) {
  return (
    <div className="flex items-center gap-x-8 ">
      <button className="p-2 hover:cursor-pointer">
        <Icon name="chevron-right" className="h-4 w-4 text-gray-500" />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border text-sm font-extrabold",
              gradeColor(grade)
            )}
          >
            <span>{grade}</span>
          </div>
          <span className="cursor-pointer text-xs text-indigo-700 hover:underline dark:text-indigo-300">
            {fileName}
          </span>
        </div>

        <div className="flex items-center gap-x-4">
          {issueCount && (
            <div className="light:bg-red-200 flex items-center gap-1 rounded-full px-2 py-1 dark:bg-red-100">
              <Icon name="circle-off" className="h-3 w-3 text-red-500" />
              <span className="text-xs font-semibold text-red-500">
                {issueCount}
              </span>
            </div>
          )}
          <ChatWithGPTDialog />
        </div>
      </div>
    </div>
  )
}
