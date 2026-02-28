import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BookPropertyPage } from "@/features/properties/pages/book-property-page";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate, useSearchParams } from "react-router";
import { properties, propertyA } from "../../mocks";
import { useAppDispatch } from "@/store/store";
import { useProperties } from "@/features/properties/hooks/use-properties";
import { useProperty } from "@/features/properties/hooks/use-property";
import { useUser } from "@/features/auth/hooks/use-user";
import { user } from "../../../auth/mocks";
import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { bookingA } from "../../../bookings/mocks";

vi.mock("../../../../../src/features/properties/hooks/use-property");
const usePropertyMock = vi.mocked(useProperty, true);

vi.mock("../../../../../src/features/properties/hooks/use-properties");
const usePropertiesMock = vi.mocked(useProperties, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

vi.mock("../../../../../src/features/auth/hooks/use-user");
const useUserMock = vi.mocked(useUser, true);

vi.mock("../../../../../src/features/bookings/hooks/use-bookings");
const useBookingsMock = vi.mocked(useBookings, true);

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);
const useSearchParamsMock = vi.mocked(useSearchParams, true);

const Component = withChakraTheme(BookPropertyPage);

const booking = {
  ...bookingA,
  propertyA: propertyA,
};

const userBookings = [booking];

describe("BookPropertyPage", () => {
  let handler = vi.fn();

  beforeEach(() => {
    handler = vi.fn();
    document.addEventListener("visibilitychange", handler);
    useBookingsMock.mockReturnValue(userBookings);
    usePropertyMock.mockReturnValue(propertyA);
    usePropertiesMock.mockReturnValue(properties);
    useAppDispatchMock.mockReturnValue(vi.fn());
    useNavigateMock.mockReturnValue(vi.fn());
    useUserMock.mockReturnValue(user);
    useSearchParamsMock.mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  afterEach(() => {
    document.removeEventListener("visibilitychange", handler);
    // vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it("should display meta title", () => {
    render(<Component />);
    expect(document.title).toBe(`Reserve "${propertyA.name}" | Book Me`);
  });

  it("should display page title", () => {
    render(<Component />);

    const title = `Reserve "${propertyA.name}"`;
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

  it("should redirect to 404 when property is not found", async () => {
    usePropertyMock.mockReturnValue(undefined);
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    render(<Component />);

    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("/not-found"),
    );
  });

  // it("should change meta title based on document visibility", async () => {
  //   usePropertyMock.mockReturnValue(undefined);
  //   const navigateMock = vi.fn();
  //   useNavigateMock.mockReturnValue(navigateMock);
  //   render(<Component />);
  //
  //   await waitFor(() =>
  //     expect(navigateMock).toHaveBeenCalledWith("/not-found"),
  //   );
  // });
});
