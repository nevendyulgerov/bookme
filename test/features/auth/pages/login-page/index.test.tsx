import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginPage } from "@/features/auth/pages/login-page";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";
import { useAppDispatch } from "@/store/store";

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

const Component = withChakraTheme(LoginPage);

describe("LoginPage", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(document.title).toBe("Login | Book Me");
  });

  it("should display page texts", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    expect(
      screen.getByText("Log in to your account to continue"),
    ).toBeInTheDocument();
  });

  it("should display meta title", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(document.title).toBe("Login | Book Me");
  });
});
