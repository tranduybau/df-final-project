import React from "react"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { LoginForm } from "app/(auth)/sign-in/_components/login-form.tsx"

describe("LoginForm", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onSubmit={jest.fn()} />
    )

    expect(getByPlaceholderText("Username")).toBeInTheDocument()
    expect(getByPlaceholderText("Password")).toBeInTheDocument()
    expect(getByText("Sign In")).toBeInTheDocument()
  })

  it("validates form fields", async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onSubmit={jest.fn()} />
    )

    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "" },
    })
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "" },
    })

    await waitFor(() => {
      expect(getByText("Please enter your username.")).toBeInTheDocument()
      expect(getByText("Please enter your password.")).toBeInTheDocument()
    })

    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    })
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    })

    await waitFor(() => {
      expect(getByText("Please enter your username.")).not.toBeInTheDocument()
      expect(getByText("Please enter your password.")).not.toBeInTheDocument()
    })
  })

  it("handles form submission", async () => {
    const mockSubmit = jest.fn()
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onSubmit={mockSubmit} />
    )

    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    })
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    })
    fireEvent.click(getByText("Sign In"))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        username: "testuser",
        password: "testpassword",
      })
    })
  })

  it("handles social login", () => {
    const mockToast = jest.fn()
    jest.mock("@/components/ui/use-toast", () => ({
      useToast: () => ({
        toast: mockToast,
      }),
    }))

    const { getByText } = render(<LoginForm onSubmit={jest.fn()} />)

    fireEvent.click(getByText("Github"))
    fireEvent.click(getByText("Google"))

    expect(mockToast).toHaveBeenCalledTimes(2)
    expect(mockToast).toHaveBeenCalledWith({
      variant: "default",
      title: "This feature is not available yet. Please try again later.",
    })
  })
})
