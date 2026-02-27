import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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

  it("should display page texts", async () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const companyName = "Book Me";
    await waitFor(() => screen.findByText(companyName));
    expect(screen.getByText(companyName)).toBeInTheDocument();

    const description = "Log in to your account to continue";
    await waitFor(() => screen.findByText(description));
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("should display meta title", async () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(document.title).toBe("Login | Book Me");
  });
});
