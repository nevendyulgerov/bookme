import { describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProperties } from "@/features/properties/hooks/use-properties";
import { useAppSelector } from "@/store/store";
import type { PropertyModel } from "@/store/slices/properties/types";
import { v4 as uuid } from "uuid";
import imageA from "../../../../public/properties/image-a.webp";
import imageB from "../../../../public/properties/image-b.webp";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

const propertyA: PropertyModel = {
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

const propertyB: PropertyModel = {
  id: uuid(),
  name: "Aether & Ivy",
  description:
    "A chic, modern hotel blending natural elements with sleek design.",
  location: "The Laneways, Castelle",
  type: ["hotel"],
  facilities: ["free-wifi", "fitness-center", "spa", "parking", "restaurant"],
  rating: 5,
  reviewScore: 9.2,
  reviewsCount: 1520,
  price: {
    adult: 400,
    child: 150,
  },
  imageUrl: imageB,
};

const properties = [propertyA, propertyB];

describe("useProperties", () => {
  it("should return properties data", () => {
    useAppSelectorMock.mockReturnValue({
      properties,
    });
    const { result } = renderHook(() => useProperties());
    expect(result.current.length).toBe(properties.length);
    expect(result.current[0].name).toBe(propertyA.name);
  });
});
