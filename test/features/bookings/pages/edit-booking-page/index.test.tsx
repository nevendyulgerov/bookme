import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EditBookingPage } from "@/features/bookings/pages/edit-booking-page";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate, useParams } from "react-router";
import { propertyA } from "../../../properties/mocks";
import { bookingA } from "../../mocks";
import { useProperty } from "@/features/properties/hooks/use-property";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";
import { useBooking } from "@/features/bookings/hooks/use-booking";
import { useAppDispatch } from "@/store/store";
import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { useUser } from "@/features/auth/hooks/use-user";
import { user } from "../../../auth/mocks";

vi.mock("../../../../../src/features/properties/hooks/use-property");
const usePropertyMock = vi.mocked(useProperty, true);

vi.mock("../../../../../src/features/bookings/hooks/use-bookings");
const useBookingsMock = vi.mocked(useBookings, true);

vi.mock("../../../../../src/features/bookings/hooks/use-booking");
const useBookingMock = vi.mocked(useBooking, true);

vi.mock("../../../../../src/features/bookings/hooks/use-user-bookings");
const useUserBookingsMock = vi.mocked(useUserBookings, true);

vi.mock("../../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);
const useParamsMock = vi.mocked(useParams, true);

const Component = withChakraTheme(EditBookingPage);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("EditBookingPage", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useBookingsMock.mockReturnValue(userBookings);
    useUserBookingsMock.mockReturnValue(userBookings);
    useBookingMock.mockReturnValue(booking);
    usePropertyMock.mockReturnValue(propertyA);
    useNavigateMock.mockReturnValue(vi.fn());
    useUserMock.mockReturnValue(user);
    useParamsMock.mockReturnValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    render(<Component />);
    expect(document.title).toBe("Edit Booking | Book Me");
  });

  it("should display page title", () => {
    render(<Component />);

    const title = `Edit Booking for "${propertyA.name}"`;
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should display reserve property card", async () => {
    render(<Component />);
    expect(screen.getByTestId("reserve-property-card")).toBeInTheDocument();
  });

  it("should display book property form", async () => {
    render(<Component />);
    expect(screen.getByTestId("book-property-form")).toBeInTheDocument();
  });
});
