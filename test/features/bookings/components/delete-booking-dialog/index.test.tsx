import { afterEach, beforeEach, describe, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DeleteBookingDialog } from "@/features/bookings/components/delete-booking-dialog";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/store";
import { propertyA } from "../../../properties/mocks";
import { bookingA } from "../../mocks";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("../../../../../src/features/bookings/hooks/use-user-bookings");
const useUserBookingsMock = vi.mocked(useUserBookings, true);

const Component = withChakraTheme(DeleteBookingDialog);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("DeleteBookingDialog", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useNavigateMock.mockReturnValue(vi.fn());
    useUserBookingsMock.mockReturnValue(userBookings);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display dialog texts", () => {
    render(<Component booking={bookingA} isActive onChangeActive={vi.fn()} />);

    expect(
      screen.getByText("Are you sure you want to delete this booking?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete Booking")).toBeInTheDocument();
  });

  it("should close dialog when Cancel button is clicked", async () => {
    const onChangeActiveMock = vi.fn();
    render(
      <Component
        booking={bookingA}
        isActive
        onChangeActive={onChangeActiveMock}
      />,
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => expect(onChangeActiveMock).toHaveBeenCalledWith(false));
  });

  it("should delete button when Delete Booking button is clicked", async () => {
    const onChangeActiveMock = vi.fn();
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    useAppDispatchMock.mockReturnValue(dispatchMock);
    render(
      <Component
        booking={bookingA}
        isActive
        onChangeActive={onChangeActiveMock}
      />,
    );

    const deleteBookingButton = screen.getByText("Delete Booking");
    fireEvent.click(deleteBookingButton);

    await waitFor(() => expect(onChangeActiveMock).toHaveBeenCalled());

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "bookings/deleteBooking",
      payload: {
        booking: bookingA,
      },
    });
    expect(navigateMock).toHaveBeenCalledWith("/properties");
  });
});
