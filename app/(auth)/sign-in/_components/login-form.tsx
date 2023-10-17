"use client"

import React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import getErrorMessage from "@/lib/get-error-message"
import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useToast} from "@/components/ui/use-toast"
import {Icons} from "@/components/icons"

const LoginFormSchema = z.object({
  username: z.string().nonempty({
    message: "Please enter your username.",
  }),

  password: z.string().nonempty({
    message: "Please enter your password.",
  }),
})

export type LoginFormType = z.infer<typeof LoginFormSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void
}

export function LoginForm({onSubmit}: LoginFormProps) {
  const {toast} = useToast()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  function handleSocialLogin() {
    toast({
      variant: "default",
      title: "This feature is not available yet. Please try again later.",
    })
  }

  async function handleFormSubmit(data: LoginFormType) {
    try {
      setIsLoading(true)
      await onSubmit?.(data)
    } catch (error) {
      const errorMsg = getErrorMessage(error)
      toast({
        variant: "destructive",
        title: errorMsg,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <Card>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleSocialLogin}
              >
                <Icons.gitHub className="mr-2 h-4 w-4"/>
                Github
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSocialLogin}
              >
                <Icons.google className="mr-2 h-4 w-4"/>
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"/>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
              )}
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  )
}
