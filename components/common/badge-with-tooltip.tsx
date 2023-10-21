import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface BadgeWithTooltipProps {
  value: number | string
  tooltip: string
  className?: string
}

export default function BadgeWithTooltip({
  value,
  tooltip,
  className = "",
}: BadgeWithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex h-4 w-4 cursor-pointer items-center justify-center gap-1 rounded-full",
              {
                "bg-slate-900 dark:bg-slate-300 text-white": !className,
                [className]: Boolean(className),
              }
            )}
          >
            <span className="text-xs font-semibold">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
