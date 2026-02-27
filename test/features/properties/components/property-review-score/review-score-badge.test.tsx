import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReviewScoreBadge } from "@/features/properties/components/property-review-score/review-score-badge";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(ReviewScoreBadge);

describe("ReviewScoreBadge", () => {
  it("should display review score", () => {
    const reviewScore = 8;

    render(<Component reviewScore={reviewScore} />);
    expect(screen.getByText("8.0")).toBeInTheDocument();
  });
});
