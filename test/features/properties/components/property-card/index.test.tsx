import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";
import { propertyA as property } from "../../mocks";

const Component = withChakraTheme(PropertyCard);

describe("PropertyCard", () => {
  it("should display property name", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByText(property.name));
    expect(screen.getByText(property.name)).toBeInTheDocument();
  });

  it("should display property location", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByText(property.location));
    expect(screen.getByText(property.location)).toBeInTheDocument();
  });

  it("should display property links", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    const href = `/properties/${property.id}`;

    await waitFor(() => screen.findByTestId("image-link"));
    const imageLink = screen.getByTestId("image-link");
    expect(imageLink.getAttribute("href")).toBe(href);

    await waitFor(() => screen.findByTestId("name-link"));
    const nameLink = screen.getByTestId("name-link");
    expect(nameLink.getAttribute("href")).toBe(href);

    await waitFor(() => screen.findByTestId("reserve-link"));
    const reserveLink = screen.getByTestId("reserve-link");
    expect(reserveLink.getAttribute("href")).toBe(href);
  });
});
