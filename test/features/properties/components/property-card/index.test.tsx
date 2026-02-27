import { describe, it } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { PropertyCard } from "@/features/properties/components/property-card";
import { withChakraTheme } from "../../../../with-chakra-theme";
import type { PropertyModel } from "@/store/slices/properties/types";
import { v4 as uuid } from "uuid";
import { createMemoryRouter, RouterProvider } from "react-router";
import imageA from "../../../../../public/properties/image-a.webp";

const Component = withChakraTheme(PropertyCard);

const property: PropertyModel = {
  id: uuid(),
  name: "The Gilded Hourglass",
  description: "A luxury boutique hotel with a vintage, old-world theme.",
  location: "The Enclave, Port Silver",
  type: ["hotel"],
  facilities: ["free-wifi", "fitness-center", "spa", "parking"],
  rating: 5,
  reviewScore: 8.2,
  reviewsCount: 2539,
  price: {
    adult: 300,
    child: 100,
  },
  imageUrl: imageA,
};

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
