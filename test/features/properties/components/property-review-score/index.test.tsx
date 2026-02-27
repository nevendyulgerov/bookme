import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertyReviewScore } from "@/features/properties/components/property-review-score";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(PropertyReviewScore);

describe("PropertyReviewScore", () => {
  it("should display reviews label", () => {
    const reviewScore = 8;
    const reviewsCount = 2521;

    render(<Component reviewScore={reviewScore} reviewsCount={reviewsCount} />);
    expect(screen.getByText("2,521 reviews")).toBeInTheDocument();
  });
});
