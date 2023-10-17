import { PropsWithChildren } from "react"
import { AuthContextProvider } from "@/context/auth"

export default function AuthLayout({ children }: PropsWithChildren) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
