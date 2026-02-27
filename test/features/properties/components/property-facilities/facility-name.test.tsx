import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FacilityName } from "@/features/properties/components/property-facilities/facility-name";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(FacilityName);

describe("FacilityName", () => {
  it("should display facility label", () => {
    const { rerender } = render(<Component facility="spa" />);
    expect(screen.getByText("Spa")).toBeInTheDocument();

    rerender(<Component facility="restaurant" />);
    expect(screen.getByText("Restaurant")).toBeInTheDocument();

    rerender(<Component facility="free-wifi" />);
    expect(screen.getByText("WiFi")).toBeInTheDocument();

    rerender(<Component facility="parking" />);
    expect(screen.getByText("Parking")).toBeInTheDocument();

    rerender(<Component facility="restaurant" />);
    expect(screen.getByText("Restaurant")).toBeInTheDocument();

    rerender(<Component facility="fitness-center" />);
    expect(screen.getByText("Fitness")).toBeInTheDocument();

    rerender(<Component facility="room-service" />);
    expect(screen.getByText("Room service")).toBeInTheDocument();

    rerender(<Component facility="kids-playground" />);
    expect(screen.getByText("Kids playground")).toBeInTheDocument();
  });
});
