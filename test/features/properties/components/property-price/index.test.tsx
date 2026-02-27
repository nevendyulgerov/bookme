import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { PropertyPrice } from "@/features/properties/components/property-price";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(PropertyPrice);

describe("PropertyPrice", () => {
  it("should display labels", () => {
    const price: PropertyModel["price"] = {
      adult: 200,
      child: 100,
    };

    render(<Component price={price} />);
    expect(screen.getByText("Price per night:")).toBeInTheDocument();
    expect(screen.getByText("Adult:")).toBeInTheDocument();
    expect(screen.getByText("Child:")).toBeInTheDocument();
  });

  it("should display price", () => {
    const price: PropertyModel["price"] = {
      adult: 200,
      child: 100,
    };

    render(<Component price={price} />);
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });
});
