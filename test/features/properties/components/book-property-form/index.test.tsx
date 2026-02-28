import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BookPropertyForm } from "@/features/properties/components/book-property-form";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate } from "react-router";
import { propertyA } from "../../mocks";
import { useAppDispatch } from "@/store/store";
import { useUser } from "@/features/auth/hooks/use-user";
import { user } from "../../../auth/mocks";
import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { bookingA } from "../../../bookings/mocks";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import { v4 } from "uuid";
import { format } from "date-fns";

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("../../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

vi.mock("../../../../../src/features/bookings/hooks/use-bookings");
const useBookingsMock = vi.mocked(useBookings, true);

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);

vi.mock("uuid");
const v4Mock = vi.mocked(v4, true);

const Component = withChakraTheme(BookPropertyForm);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("BookPropertyPage", () => {
  beforeEach(() => {
    v4Mock.mockReturnValue("some-id" as never);
    useBookingsMock.mockReturnValue(userBookings);
    useAppDispatchMock.mockReturnValue(vi.fn());
    useNavigateMock.mockReturnValue(vi.fn());
    useUserMock.mockReturnValue(user);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display error for duration", async () => {
    render(<Component property={propertyA} />);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() => screen.findByText("At least one day is required"), {
      timeout: 100,
    });
  });

  it("should continue to second step when duration is valid", async () => {
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() =>
      expect(() => screen.getByText("At least one day is required")).toThrow(
        "Unable to find an element with the text: At least one day is required",
      ),
    );

    await waitFor(() => screen.findByText("Fill your details"));
  });

  it("should be able to go back to first step", async () => {
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() =>
      expect(() => screen.getByText("At least one day is required")).toThrow(
        "Unable to find an element with the text: At least one day is required",
      ),
    );

    await waitFor(() => screen.findByText("Fill your details"));

    const backButton = screen.getByTestId("back-button");
    act(() => {
      backButton.click();
    });

    await waitFor(() => screen.findByText("Choose dates"));
  });

  it("should display required field information when attempting to continue without filling all contact information", async () => {
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() =>
      expect(() => screen.getByText("At least one day is required")).toThrow(
        "Unable to find an element with the text: At least one day is required",
      ),
    );

    await waitFor(() => screen.findByText("First Name"));

    continueButton.click();

    await waitFor(() =>
      expect(() => screen.getByText("Reservation Summary")).toThrow(
        "Unable to find an element with the text: Reservation Summary",
      ),
    );
  });

  it("should continue to third step when contact information is valid", async () => {
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() => screen.findByText("First Name"), {
      timeout: 100,
    });

    const firstNameField = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameField, {
      target: {
        value: "John",
      },
    });

    const lastNameField = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameField, {
      target: {
        value: "Doe",
      },
    });

    const phoneNumberField = screen.getByPlaceholderText(
      "Enter your phone number...",
    );
    fireEvent.change(phoneNumberField, {
      target: {
        value: "0888123123",
      },
    });

    const user = userEvent.setup();

    const countrySelect = screen.getByTestId("country-field");
    await user.selectOptions(countrySelect, "BG");

    const numberAdultsSelect = screen.getByTestId("number-adults-field");
    await user.selectOptions(numberAdultsSelect, "1");

    const numberChildrenSelect = screen.getByTestId("number-children-field");
    await user.selectOptions(numberChildrenSelect, "1");

    continueButton.click();
    await waitFor(() => screen.findByText("Reservation Summary"));
  });

  it("should display required field information when attempting to continue without confirming the reservation", async () => {
    const dispatchMock = vi.fn();
    useAppDispatchMock.mockReturnValue(dispatchMock);
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() => screen.findByText("First Name"), {
      timeout: 100,
    });

    const firstNameField = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameField, {
      target: {
        value: "John",
      },
    });

    const lastNameField = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameField, {
      target: {
        value: "Doe",
      },
    });

    const phoneNumberField = screen.getByPlaceholderText(
      "Enter your phone number...",
    );
    fireEvent.change(phoneNumberField, {
      target: {
        value: "0888123123",
      },
    });

    const user = userEvent.setup();

    const countrySelect = screen.getByTestId("country-field");
    await user.selectOptions(countrySelect, "BG");

    const numberAdultsSelect = screen.getByTestId("number-adults-field");
    await user.selectOptions(numberAdultsSelect, "1");

    const numberChildrenSelect = screen.getByTestId("number-children-field");
    await user.selectOptions(numberChildrenSelect, "1");

    continueButton.click();
    await waitFor(() => screen.findByText("Reservation Summary"));

    continueButton.click();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("should book property when confirmation is checked", async () => {
    const bookingId = "some-id";
    v4Mock.mockReturnValue(bookingId as never);
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    useAppDispatchMock.mockReturnValue(dispatchMock);
    const { container } = render(<Component property={propertyA} />);

    const todayButton = container.querySelector(
      '[data-today="true"] button',
    ) as HTMLButtonElement;
    fireEvent.click(todayButton);

    const continueButton = screen.getByTestId("submit-button");
    continueButton.click();

    await waitFor(() => screen.findByText("Fill your details"), {
      timeout: 100,
    });

    const firstName = "John";
    const firstNameField = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstNameField, {
      target: {
        value: firstName,
      },
    });

    const lastName = "Doe";
    const lastNameField = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameField, {
      target: {
        value: lastName,
      },
    });

    const phoneNumber = "0888123123";
    const phoneNumberField = screen.getByPlaceholderText(
      "Enter your phone number...",
    );
    fireEvent.change(phoneNumberField, {
      target: {
        value: phoneNumber,
      },
    });

    const event = userEvent.setup();

    const country = "BG";
    const countrySelect = screen.getByTestId("country-field");
    await event.selectOptions(countrySelect, country);

    const numberAdults = "1";
    const numberAdultsSelect = screen.getByTestId("number-adults-field");
    await event.selectOptions(numberAdultsSelect, numberAdults);

    const numberChildren = "1";
    const numberChildrenSelect = screen.getByTestId("number-children-field");
    await event.selectOptions(numberChildrenSelect, numberChildren);

    continueButton.click();
    await waitFor(() => screen.findByText("Reservation Summary"));

    const confirmationCheckbox = screen.getByTestId("confirmation-field");
    await userEvent.click(confirmationCheckbox);

    await waitFor(() =>
      expect(confirmationCheckbox).toHaveAttribute("checked", ""),
    );

    continueButton.click();

    await waitFor(() => expect(dispatchMock).toHaveBeenCalled());
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "bookings/createBooking",
      payload: {
        booking: {
          id: bookingId,
          propertyId: propertyA.id,
          startDate: format(new Date(), "yyyy-MM-dd"),
          endDate: format(new Date(), "yyyy-MM-dd"),
          firstName,
          lastName,
          email: user.email,
          country,
          phoneNumber,
          numberAdults: Number(numberAdults),
          numberChildren: Number(numberChildren),
        },
      },
    });
  });
});
