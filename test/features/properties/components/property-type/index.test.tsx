import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { PropertyType } from "@/features/properties/components/property-type";
import { withChakraTheme } from "../../../../with-chakra-theme";

const Component = withChakraTheme(PropertyType);

describe("Features/Properties/Components/PropertyType", () => {
  it("should display property types", () => {
    const propertyTypes: PropertyModel["type"] = ["hotel", "apartments"];

    render(<Component type={propertyTypes} />);
    expect(screen.getByText("Hotel, Apartments")).toBeInTheDocument();
  });
});
