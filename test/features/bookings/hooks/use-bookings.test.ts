import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { useAppSelector } from "@/store/store";
import { bookingA, bookings } from "../mocks";

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

describe("useBookings", () => {
  beforeEach(() => {
    useAppSelectorMock.mockReturnValue({
      bookings,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return bookings data", () => {
    const { result } = renderHook(() => useBookings());
    expect(result.current.length).toBe(bookings.length);
    expect(result.current[0].id).toBe(bookingA.id);
  });
});
