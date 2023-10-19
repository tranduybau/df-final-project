import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/common/icon"
import SearchInput from "@/components/common/search-input"
import { Icons } from "@/components/icons"

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
              <SearchInput placeholder="Search component..." />
            </div>
          </div>

          <div className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-y-2 p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div className="flex items-center gap-x-8 ">
                    <button className="p-2 hover:cursor-pointer">
                      <Icon
                        name="chevron-right"
                        className="h-4 w-4 text-gray-500"
                      />
                    </button>

                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex items-center gap-x-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-green-400">
                          <span className="text-sm text-green-400">A</span>
                        </div>
                        <span className="cursor-pointer text-xs text-indigo-700 hover:underline">
                          tools\releaseBuild\vstsbuild.sh
                        </span>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-1 rounded-full bg-red-200 px-2 py-1 dark:bg-slate-500">
                          <Icon
                            name="circle-off"
                            className="h-3 w-3 text-red-500"
                          />
                          <span className="text-xs font-extrabold text-red-500">
                            8
                          </span>
                        </div>
                        <Button variant="ghost">
                          <Icon
                            name="bot"
                            className="mr-2 h-4 w-4 text-gray-500"
                          />
                          Chat with AI
                        </Button>
                      </div>
                    </div>
                  </div>
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
