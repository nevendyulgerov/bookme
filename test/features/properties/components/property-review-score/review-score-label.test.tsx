import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReviewScoreLabel } from "@/features/properties/components/property-review-score/review-score-label";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(ReviewScoreLabel);

describe("ReviewScoreLabel", () => {
  it("should display score label", () => {
    const { rerender } = render(<Component reviewScore={9} />);
    expect(screen.getByText("Wonderful")).toBeInTheDocument();

    rerender(<Component reviewScore={8.5} />);
    expect(screen.getByText("Excellent")).toBeInTheDocument();

    rerender(<Component reviewScore={7.5} />);
    expect(screen.getByText("Very Good")).toBeInTheDocument();

    rerender(<Component reviewScore={6.5} />);
    expect(screen.getByText("Good")).toBeInTheDocument();

    rerender(<Component reviewScore={5.5} />);
    expect(screen.getByText("Pleasant")).toBeInTheDocument();

    rerender(<Component reviewScore={5.4} />);
    expect(screen.getByText("Decent")).toBeInTheDocument();
  });
});
