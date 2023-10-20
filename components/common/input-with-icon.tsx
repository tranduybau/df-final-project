import * as React from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import Icon from "./icon"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  nameIcon: keyof typeof dynamicIconImports
  fullWidth?: boolean
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, nameIcon, fullWidth = false, ...props }, ref) => {
    return (
      <div
        className={cn("relative", {
          "w-full": fullWidth,
        })}
      >
        <Icon
          name={nameIcon}
          className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500"
        />
        <Input
          type={type}
          className={cn("pl-11", className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
InputWithIcon.displayName = "InputWithIcon"

export default InputWithIcon