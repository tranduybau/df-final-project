import * as React from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

import { cn } from "@/lib/utils"

import { Textarea } from "../ui/textarea"
import Icon from "./icon"

export interface AppTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  leftIcon: keyof typeof dynamicIconImports
}

const AppTextArea = React.forwardRef<HTMLTextAreaElement, AppTextAreaProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <Icon
            name={leftIcon}
            className="absolute inset-y-0 left-3 mt-2 h-6 w-6 text-gray-500"
          />
        )}
        <Textarea className={cn("pl-11", className)} ref={ref} {...props} />
      </div>
    )
  }
)
AppTextArea.displayName = "AppTextArea"

export default AppTextArea
