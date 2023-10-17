import {PropsWithChildren} from "react"
import {SiteHeader} from "@/components/site-header"

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader/>
      <div className="flex-1">{children}</div>
    </div>
  )
}
