import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PropertyImage } from "@/features/properties/components/property-image";
import { withChakraTheme } from "../../../../with-chakra-theme";
import imageA from "../../../../../public/properties/image-a.webp";

const Component = withChakraTheme(PropertyImage);

describe("PropertyImage", () => {
  it("should display property image", () => {
    const alt = "Hotel ABC";

    render(<Component src={imageA} alt={alt} />);

    const image = screen.getByAltText(alt);
    expect(image.getAttribute("src")).toBe("/public/properties/image-a.webp");
  });
});
