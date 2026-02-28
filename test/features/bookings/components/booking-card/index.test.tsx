import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BookingCard } from "@/features/bookings/components/booking-card";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { createMemoryRouter, RouterProvider } from "react-router";
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

const Component = withChakraTheme(BookingCard);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("BookingCard", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useUserBookingsMock.mockReturnValue(userBookings);
    usePropertyMock.mockReturnValue(propertyA);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display property name", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component booking={booking} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByText(propertyA.name));
    expect(screen.getByText(propertyA.name)).toBeInTheDocument();
  });

  it("should display property location", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component booking={booking} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByText(propertyA.location));
    expect(screen.getByText(propertyA.location)).toBeInTheDocument();
  });

  it("should display property links", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component booking={booking} /> },
    ]);

    render(<RouterProvider router={router} />);

    const href = `/bookings/${booking.id}`;

    await waitFor(() => screen.findByTestId("image-link"));
    const imageLink = screen.getByTestId("image-link");
    expect(imageLink.getAttribute("href")).toBe(href);

    await waitFor(() => screen.findByTestId("name-link"));
    const nameLink = screen.getByTestId("name-link");
    expect(nameLink.getAttribute("href")).toBe(href);

    await waitFor(() => screen.findByTestId("edit-booking-link"));
    const reserveLink = screen.getByTestId("edit-booking-link");
    expect(reserveLink.getAttribute("href")).toBe(href);
  });

  it("should open delete booking dialog", async () => {
    const router = createMemoryRouter([
      { path: "/", element: <Component booking={booking} /> },
    ]);

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.findByTestId("delete-booking-button"));
    const deleteBookingButton = screen.getByTestId("delete-booking-button");

    fireEvent.click(deleteBookingButton);

    await waitFor(() =>
      screen.findByText("Are you sure you want to delete this booking?"),
    );
    expect(
      screen.getByText("Are you sure you want to delete this booking?"),
    ).toBeInTheDocument();
  });
});
