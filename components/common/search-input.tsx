import * as React from "react"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Input } from "../ui/input"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <Icons.search className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500" />
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
SearchInput.displayName = "SearchInput"

export default SearchInput
