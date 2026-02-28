import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";
import { useAppSelector } from "@/store/store";
import { bookings } from "../mocks";
import { useUser } from "@/features/auth/hooks/use-user";
import { user } from "../../auth/mocks";

const propertyBookings = bookings.map((b) => ({
  ...b,
  email: user.email,
}));

vi.mock("../../../../src/store/store");
const useAppSelectorMock = vi.mocked(useAppSelector, true);

vi.mock("../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

describe("useUserBookings", () => {
  beforeEach(() => {
    useUserMock.mockReturnValue(user);
    useAppSelectorMock.mockReturnValue({
      bookings: propertyBookings,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return booking data", () => {
    const { result } = renderHook(() => useUserBookings());
    expect(result.current?.length).toBe(propertyBookings.length);
    expect(result.current[0].id).toBe(bookings[0].id);
  });
});
