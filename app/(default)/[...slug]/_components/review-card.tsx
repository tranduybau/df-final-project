"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Icon from "@/components/common/icon"
import ChatWithGPTDialog from "@/components/dialog/chat-with-gpt-dialog"

export interface ReviewCardProps {
  fileName: string
  grade: string
  warningCount?: number
  suggestionCount?: number
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
  warningCount,
  suggestionCount,
}: ReviewCardProps) {
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="flex items-center gap-x-4">
      <Button
        variant="ghost"
        className={cn("rounded-full transition duration-300 ease-in-out", {
          "rotate-90": open,
        })}
        size="icon"
        onClick={handleToggle}
      >
        <Icon name="chevron-right" className="h-4 w-4 text-gray-500" />
      </Button>

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

          <div className="flex items-center gap-x-2">
            {suggestionCount && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center gap-1 rounded-full bg-blue-400 dark:bg-blue-100">
                      <span className="text-xs font-semibold text-white">
                        {suggestionCount}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of suggestion in this file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {warningCount && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center gap-1 rounded-full bg-yellow-400 p-2 dark:bg-yellow-100">
                      <span className="text-xs font-semibold text-white">
                        {warningCount}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Number of warning in this file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <ChatWithGPTDialog />
        </div>
      </div>
    </div>
  )
}
