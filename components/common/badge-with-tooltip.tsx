import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

export interface BadgeWithTooltipProps {
  value: number | string
  tooltip: string
  className: string
}

function BadgeWithTooltip({
  value,
  tooltip,
  className = '',
}: BadgeWithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex h-4 w-4 cursor-pointer items-center justify-center gap-1 rounded-full',
              className,
              !className && 'bg-slate-900 text-white dark:bg-slate-300',
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
  );
}

export default BadgeWithTooltip;
