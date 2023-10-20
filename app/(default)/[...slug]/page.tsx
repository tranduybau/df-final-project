import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/common/icon"
import InputWithIcon from "@/components/common/input-with-icon"
import { Icons } from "@/components/icons"

import ReviewCard from "./_components/review-card"

export default function DynamicPage() {
  return (
    <section className="container mt-10">
      <Card>
        <CardContent className="px-4 py-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full bg-slate-100 p-1 dark:bg-slate-500">
                <Icons.global className="h-5 w-5" />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-500">
                <Icons.branch className="h-5 w-5" />
                <span className="text-xs font-extrabold">MASTER</span>
              </div>

              <div className="text-lg font-extrabold">PowerShell</div>
            </div>

            <div>
              <InputWithIcon
                nameIcon="search"
                placeholder="Search component..."
              />
            </div>
          </div>

          <div className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-y-2 p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <ReviewCard
                    key={i}
                    fileName="tools\releaseBuild\vstsbuild.sh"
                    suggestionCount={8}
                    warningCount={2}
                    grade="A"
                  />
                ))}
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
              <Button variant="ghost">
                <Icon name="move-left" className="mr-2 h-4 w-4 text-gray-500" />
                Previous page
              </Button>

              <Button variant="ghost">
                Next page
                <Icon
                  name="move-right"
                  className="ml-2 h-4 w-4 text-gray-500"
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
