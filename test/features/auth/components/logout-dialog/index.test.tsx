import { afterEach, beforeEach, describe, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LogoutDialog } from "@/features/auth/components/logout-dialog";
import { withChakraTheme } from "../../../../with-chakra-theme";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/store";

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);

vi.mock("../../../../../src/store/store");
const useAppDispatchMock = vi.mocked(useAppDispatch, true);

const Component = withChakraTheme(LogoutDialog);

describe("LogoutDialog", () => {
  beforeEach(() => {
    useAppDispatchMock.mockReturnValue(vi.fn());
    useNavigateMock.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should display dialog texts", () => {
    render(<Component isActive onChangeActive={vi.fn()} />);

    expect(
      screen.getByText("Are you sure you want to log out?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("should close dialog when Cancel button is clicked", async () => {
    const onChangeActiveMock = vi.fn();
    render(<Component isActive onChangeActive={onChangeActiveMock} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => expect(onChangeActiveMock).toHaveBeenCalledWith(false));
  });

  it("should logout when Log Out button is clicked", async () => {
    const onChangeActiveMock = vi.fn();
    const dispatchMock = vi.fn();
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);
    useAppDispatchMock.mockReturnValue(dispatchMock);
    render(<Component isActive onChangeActive={onChangeActiveMock} />);

    const logoutButton = screen.getByText("Log Out");
    fireEvent.click(logoutButton);

    await waitFor(() => expect(onChangeActiveMock).toHaveBeenCalled());

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: undefined,
      type: "user/logout",
    });
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
