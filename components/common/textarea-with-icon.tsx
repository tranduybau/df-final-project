import * as React from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

import { cn } from "@/lib/utils"

import { Textarea } from "../ui/textarea"
import Icon from "./icon"

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  nameIcon: keyof typeof dynamicIconImports
  fullWidth?: boolean
}

const TextAreaWithIcon = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, type, nameIcon, fullWidth = false, ...props }, ref) => {
    return (
      <div
        className={cn("relative", {
          "w-full": fullWidth,
        })}
      >
        <Icon
          name={nameIcon}
          className="absolute inset-y-0 left-3 mt-2 h-6 w-6 text-gray-500"
        />
        <Textarea className={cn("pl-11", className)} ref={ref} {...props} />
      </div>
    )
  }
)
TextAreaWithIcon.displayName = "TextAreaWithIcon"

export default TextAreaWithIcon
