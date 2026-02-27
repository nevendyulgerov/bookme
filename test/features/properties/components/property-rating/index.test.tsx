import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertyRating } from "@/features/properties/components/property-rating";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(PropertyRating);

describe("PropertyRating", () => {
  it("should display property rating", () => {
    const rating = 3;

    render(<Component rating={rating} />);

    const ratingIcons = screen.getAllByTestId("rating-icon");
    expect(ratingIcons.length).toBe(rating);
  });
});
