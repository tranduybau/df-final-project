import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/common/icon"

import ReviewCard from "./_components/review-card"
import ReviewHeader from "./_components/review-header"

export default function DynamicPage() {
  return (
    <section className="container mt-10">
      <Card>
        <CardContent className="px-4 py-6">
          <ReviewHeader name="Freecodecamp" branch="master" />

          <div className="mt-4">
            <Card>
              <CardContent className="flex flex-col gap-y-2 p-4">
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="A"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="B"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="C"
                />
                <ReviewCard
                  fileName="tools\releaseBuild\vstsbuild.sh"
                  suggestionCount={8}
                  warningCount={2}
                  grade="D"
                />
                {/* {Array.from({ length: 10 }).map((_, i) => (
                  <ReviewCard
                    key={i}
                    fileName="tools\releaseBuild\vstsbuild.sh"
                    suggestionCount={8}
                    warningCount={2}
                    grade=""
                  />
                ))} */}
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
