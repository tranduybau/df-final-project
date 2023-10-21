import * as React from "react"

import InputWithIcon from "@/components/common/input-with-icon"
import { Icons } from "@/components/icons"

export interface IReviewHeaderProps {
  name: string
  branch?: string
}

export default function ReviewHeader({
  name,
  branch = "master",
}: IReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-full bg-slate-100 p-1 dark:bg-slate-500">
          <Icons.global className="h-5 w-5" />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-500">
          <Icons.branch className="h-5 w-5" />
          <span className="text-xs font-extrabold uppercase">{branch}</span>
        </div>

        <div className="text-lg font-extrabold">{name}</div>
      </div>

      <div>
        <InputWithIcon nameIcon="search" placeholder="Search component..." />
      </div>
    </div>
  )
}
