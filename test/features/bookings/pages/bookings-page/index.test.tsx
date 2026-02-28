import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookingsPage } from "@/features/bookings/pages/bookings-page";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate } from "react-router";
import { propertyA } from "../../../properties/mocks";
import { bookingA } from "../../mocks";
import { useProperty } from "@/features/properties/hooks/use-property";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";
import { useAppDispatch } from "@/store/store";

vi.mock("../../../../../src/features/properties/hooks/use-property");
const usePropertyMock = vi.mocked(useProperty, true);

vi.mock("../../../../../src/features/bookings/hooks/use-user-bookings");
const useUserBookingsMock = vi.mocked(useUserBookings, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);

const Component = withChakraTheme(BookingsPage);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("BookingsPage", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useUserBookingsMock.mockReturnValue(userBookings);
    usePropertyMock.mockReturnValue(propertyA);
    useNavigateMock.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    render(<Component />);
    expect(document.title).toBe("My Bookings | Book Me");
  });

  it("should display page title", () => {
    render(<Component />);

    const title = `My Bookings (${userBookings.length})`;
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("should display booking cards", () => {
    render(<Component />);

    const bookingCards = screen.getAllByTestId("booking-card");
    expect(bookingCards.length).toBe(userBookings.length);
  });

  it("should display no results found when no user bookings are available", () => {
    useUserBookingsMock.mockReturnValue([]);
    render(<Component />);

    const noResultsTitle = "No bookings found";
    expect(screen.getByText(noResultsTitle)).toBeInTheDocument();
  });
});
