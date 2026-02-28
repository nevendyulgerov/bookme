import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Page } from "@/common/components/layout/page";
import { withChakraTheme } from "../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";

const Component = withChakraTheme(Page);

describe("NoResultsFound", () => {
  it("should display spinner while loading", async () => {
    const content = "Content";
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Component isLoading>{content}</Component>,
      },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("page-spinner")).toBeInTheDocument();

    await waitFor(() =>
      expect(() => screen.getByText(content)).toThrow(
        `Unable to find an element with the text: ${content}`,
      ),
    );
  });

  it("should display error", async () => {
    const content = "Content";
    const router = createMemoryRouter([
      {
        path: "/",
        element: <Component isError>{content}</Component>,
      },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId("page-error")).toBeInTheDocument();

    await waitFor(() =>
      expect(() => screen.getByText(content)).toThrow(
        `Unable to find an element with the text: ${content}`,
      ),
    );
  });

  it("should display content", () => {
    const content = "Content";
    const router = createMemoryRouter([
      {
        path: "/",
        element: (
          <Component isLoading={false} isError={false}>
            {content}
          </Component>
        ),
      },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
