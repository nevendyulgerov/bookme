import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Sidebar } from "@/common/components/layout/sidebar";
import { withChakraTheme } from "../../../with-chakra-theme";
import { useLocation } from "react-router";
import { useAppDispatch } from "@/store/store";

vi.mock("react-router");
const useLocationMock = vi.mocked(useLocation, true);

vi.mock("../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

const Component = withChakraTheme(Sidebar);

describe("Sidebar", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useLocationMock.mockReturnValue({
      pathname: "/properties",
    } as never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display logout button", () => {
    render(<Component />);
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("should display logout dialog when logout button is clicked", async () => {
    render(<Component />);

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    await waitFor(() =>
      expect(() => screen.findByText("Are you sure you want to log out?")),
    );
  });
});
