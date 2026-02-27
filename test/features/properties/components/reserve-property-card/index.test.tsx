import { describe, it } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { ReservePropertyCard } from "@/features/properties/components/reserve-property-card";
import { withChakraTheme } from "../../../../with-chakra-theme";
import type { PropertyModel } from "@/store/slices/properties/types";
import { v4 as uuid } from "uuid";
import { createMemoryRouter, RouterProvider } from "react-router";
import imageA from "../../../../../public/properties/image-a.webp";

const Component = withChakraTheme(ReservePropertyCard);

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

describe("ReservePropertyCard", () => {
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

  it("should display property description", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByText(property.description));
    expect(screen.getByText(property.description)).toBeInTheDocument();
  });

  it("should not display property links", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component property={property} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(() => screen.getByTestId("image-link")).toThrow(
        'Unable to find an element by: [data-testid="image-link"]',
      ),
    );

    await waitFor(() =>
      expect(() => screen.getByTestId("name-link")).toThrow(
        'Unable to find an element by: [data-testid="name-link"]',
      ),
    );

    await waitFor(() =>
      expect(() => screen.getByTestId("reserve-link")).toThrow(
        'Unable to find an element by: [data-testid="reserve-link"]',
      ),
    );
  });
});
