// Create a ProgressBarProvider component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client"

import { PropsWithChildren } from "react"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"

const ProgressBarProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#131313"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default ProgressBarProvider
