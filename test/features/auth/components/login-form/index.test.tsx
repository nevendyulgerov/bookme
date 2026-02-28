import { afterEach, beforeEach, describe, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "@/features/auth/components/login-form";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";
import { useAppDispatch } from "@/store/store";

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

const Component = withChakraTheme(LoginForm);

describe("LoginForm", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display label for email field", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("should display error for invalid email", async () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const placeholder = "Enter your email address...";
    await waitFor(() => screen.findByPlaceholderText(placeholder));
    const loginField = screen.getByPlaceholderText(placeholder);
    fireEvent.change(loginField, { target: { value: "email@email" } });

    const submitButton = screen.getByText("Log In");
    fireEvent.click(submitButton);

    await waitFor(() => screen.findByText("Valid email is required"));
    expect(screen.getByText("Valid email is required")).toBeInTheDocument();
  });

  it("should prevent form submission for invalid email", async () => {
    const mockedDispatch = vi.fn();
    useAppDispatchMock.mockReturnValue(mockedDispatch);
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const placeholder = "Enter your email address...";
    await waitFor(() => screen.findByPlaceholderText(placeholder));
    const loginField = screen.getByPlaceholderText(placeholder);
    fireEvent.change(loginField, { target: { value: "john@doe" } });

    const submitButton = screen.getByText("Log In");
    fireEvent.click(submitButton);

    await waitFor(() => screen.findByText("Valid email is required"));
    expect(screen.getByText("Valid email is required")).toBeInTheDocument();

    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it("should allow form submission for valid email", async () => {
    const mockedDispatch = vi.fn();
    useAppDispatchMock.mockReturnValue(mockedDispatch);
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const placeholder = "Enter your email address...";
    await waitFor(() => screen.findByPlaceholderText(placeholder));
    const loginField = screen.getByPlaceholderText(placeholder);

    const email = "john@doe.com";
    fireEvent.change(loginField, { target: { value: email } });

    const submitButton = screen.getByText("Log In");
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(() => screen.getByText("Valid email is required")).toThrow(
        "Unable to find an element with the text: Valid email is required",
      ),
    );

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: "user/login",
      payload: {
        user: {
          email,
        },
      },
    });
  });
});
