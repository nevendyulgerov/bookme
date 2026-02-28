import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/common/components/layout/header";
import { withChakraTheme } from "../../../with-chakra-theme";
import { useLocation, useNavigate, useSearchParams } from "react-router";

vi.mock("react-router");
const useNavigateMock = vi.mocked(useNavigate, true);
const useSearchParamsMock = vi.mocked(useSearchParams, true);
const useLocationMock = vi.mocked(useLocation, true);

const Component = withChakraTheme(Header);

describe("Header", () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(vi.fn());
    useSearchParamsMock.mockReturnValue([new URLSearchParams(), vi.fn()]);
    useLocationMock.mockReturnValue({
      pathname: "/properties",
    } as never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should navigate to properties page with search param", async () => {
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);

    render(<Component onClickLogo={vi.fn()} />);

    const searchField = screen.getByPlaceholderText(
      "Search properties by location...",
    );

    const search = "Location ABC";
    fireEvent.change(searchField, {
      target: {
        value: search,
      },
    });

    fireEvent.keyDown(searchField, {
      key: "Enter",
    });

    expect(navigateMock).toHaveBeenCalledWith(`/properties?search=${search}`);
  });

  it("should navigate to properties page with search param", async () => {
    const pathname = "/properties";
    useLocationMock.mockReturnValue({
      pathname,
    } as never);
    const navigateMock = vi.fn();
    useNavigateMock.mockReturnValue(navigateMock);

    render(<Component onClickLogo={vi.fn()} />);

    const searchField = screen.getByPlaceholderText(
      "Search properties by location...",
    );

    const search = "Location ABC";
    fireEvent.change(searchField, {
      target: {
        value: search,
      },
    });

    fireEvent.keyDown(searchField, {
      key: "Enter",
    });

    expect(navigateMock).toHaveBeenCalledWith(`/properties?search=${search}`);

    const clearSearchButton = screen.getByTestId("clear-search-button");
    fireEvent.click(clearSearchButton);

    expect(navigateMock).toHaveBeenCalledWith(pathname, { replace: true });
  });
});
