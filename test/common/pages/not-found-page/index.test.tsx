import { afterEach, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NotFoundPage } from "@/common/pages/not-found-page";
import { withChakraTheme } from "../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";

const Component = withChakraTheme(NotFoundPage);

describe("NotFoundPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);
    expect(document.title).toBe("404 Not Found | Book Me");
  });

  it("should display page texts", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Could not find the requested resource."),
    ).toBeInTheDocument();
  });

  it("should display go home link", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const goHomeLink = screen.getByText("Go to Home Page");
    expect(goHomeLink.getAttribute("href")).toBe("/");
  });
});
