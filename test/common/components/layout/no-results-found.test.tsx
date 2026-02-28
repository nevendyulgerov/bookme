import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NoResultsFound } from "@/common/components/layout/no-results-found";
import { withChakraTheme } from "../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";

const Component = withChakraTheme(NoResultsFound);

describe("NoResultsFound", () => {
  it("should display correct texts", () => {
    const title = "No results found";
    const subtitle = "No results for the current search";
    const redirectTo = "/";
    const redirectText = "Go to the home page";
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          <Component
            title={title}
            subtitle={subtitle}
            redirectText={redirectText}
            redirectTo={redirectTo}
          />
        ),
      },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText(redirectText)).toBeInTheDocument();
  });

  it("should display link", async () => {
    const title = "No results found";
    const subtitle = "No results for the current search";
    const redirectTo = "/";
    const redirectText = "Go to the home page";
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          <Component
            title={title}
            subtitle={subtitle}
            redirectText={redirectText}
            redirectTo={redirectTo}
          />
        ),
      },
    ]);

    render(<RouterProvider router={router} />);

    const goHomeLink = screen.getByText(redirectText);
    expect(goHomeLink.getAttribute("href")).toBe(redirectTo);
  });
});
