import { PropsWithChildren } from "react"
import { AuthContextProvider } from "@/context/auth"

export default function AuthLayout({ children }: PropsWithChildren) {
  return <>
    <head>
      <title>AuthLayout</title>
    </head>
    <AuthContextProvider>{children}</AuthContextProvider>
  </>
}
