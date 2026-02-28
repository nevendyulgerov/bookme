import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";
import { propertyA as property } from "../../mocks";

const Component = withChakraTheme(PropertyCard);

describe("PropertyCard", () => {
  it("should display property name", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByText(property.name)).toBeInTheDocument();
  });

  it("should display property location", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);
    expect(screen.getByText(property.location)).toBeInTheDocument();
  });

  it("should display property links", () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    const href = `/properties/${property.id}`;

    const imageLink = screen.getByTestId("image-link");
    expect(imageLink.getAttribute("href")).toBe(href);

    const nameLink = screen.getByTestId("name-link");
    expect(nameLink.getAttribute("href")).toBe(href);

    const reserveLink = screen.getByTestId("reserve-link");
    expect(reserveLink.getAttribute("href")).toBe(href);
  });
});
