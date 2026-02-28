import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBooking } from "@/features/bookings/hooks/use-booking";
import { useAppSelector } from "@/store/store";
import { bookingB, bookings } from "../mocks";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("useBooking", () => {
  beforeEach(() => {
    useAppSelectorMock.mockReturnValue({
      bookings,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return booking data", () => {
    const { result } = renderHook(() => useBooking(bookingB.id));
    expect(result.current?.id).toBe(bookingB.id);
  });
});
