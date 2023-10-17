import React from "react"
import { fireEvent, render } from "@testing-library/react"
import LoginForm from "app/auth/sign-in/_components/login-form"

describe("LoginForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<LoginForm />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("calls onSubmit with the form state on form submission", () => {
    const mockSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <LoginForm onSubmit={mockSubmit} />
    )

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "testUser" },
    })
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "testPass" },
    })

    fireEvent.click(getByText(/submit/i))

    expect(mockSubmit).toHaveBeenCalledWith({
      username: "testUser",
      password: "testPass",
    })
  })

  it("updates the form state when inputs change", () => {
    const { getByLabelText } = render(<LoginForm />)

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "newUser" },
    })
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "newPass" },
    })

    expect(getByLabelText(/username/i).value).toBe("newUser")
    expect(getByLabelText(/password/i).value).toBe("newPass")
  })
})
