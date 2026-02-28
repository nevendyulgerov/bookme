import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageError } from "@/common/components/layout/page-error";
import { withChakraTheme } from "../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";

const Component = withChakraTheme(PageError);

describe("PageError", () => {
  it("should display correct texts", () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Book Me")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(
      screen.getByText("Please go back to the home page or contact support."),
    ).toBeInTheDocument();
  });

  it("should display go home link", async () => {
    const router = createMemoryRouter([{ path: "/", element: <Component /> }]);

    render(<RouterProvider router={router} />);

    const goHomeLink = screen.getByText("Go to Home Page");
    expect(goHomeLink.getAttribute("href")).toBe("/");
  });
});
