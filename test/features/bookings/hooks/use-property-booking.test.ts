import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePropertyBookings } from "@/features/bookings/hooks/use-property-bookings";
import { useAppSelector } from "@/store/store";
import { bookings } from "../mocks";
import { propertyA } from "../../properties/mocks";

const propertyBookings = bookings.map((b) => ({
  ...b,
  propertyId: propertyA.id,
}));

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("usePropertyBookings", () => {
  beforeEach(() => {
    useAppSelectorMock.mockReturnValue({
      bookings: propertyBookings,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return booking data", () => {
    const { result } = renderHook(() => usePropertyBookings(propertyA));
    expect(result.current?.length).toBe(propertyBookings.length);
    expect(result.current[0].id).toBe(bookings[0].id);
  });
});
