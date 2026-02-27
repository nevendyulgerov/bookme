import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertyFacilities } from "@/features/properties/components/property-facilities";
import { withChakraTheme } from "../../../../with-chakra-theme";
import type { FacilityType } from "@/store/slices/properties/types";

const Component = withChakraTheme(PropertyFacilities);

describe("PropertyFacilities", () => {
  it("should display property facilities", () => {
    const facilities: FacilityType[] = ["spa", "restaurant"];

    render(<Component facilities={facilities} />);
    expect(screen.getByText("Spa")).toBeInTheDocument();
    expect(screen.getByText("Restaurant")).toBeInTheDocument();
  });

  it("should display property facility icons", () => {
    const facilities: FacilityType[] = ["spa", "restaurant"];

    render(<Component facilities={facilities} />);

    const facilityIcons = screen.getAllByTestId("facility-icon");
    expect(facilityIcons.length).toBe(facilityIcons.length);
  });
});
