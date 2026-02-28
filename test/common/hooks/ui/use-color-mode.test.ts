import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useColorMode } from "@/common/hooks/ui/use-color-mode";
import { useTheme } from "next-themes";
import { act } from "react";

vi.mock("next-themes");
const useThemeMock = vi.mocked(useTheme, true);

describe("useColorMode", () => {
  beforeEach(() => {
    useThemeMock.mockReturnValue({
      resolvedTheme: "dark",
      setTheme: vi.fn(),
      forcedTheme: "dark",
    } as never);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return color mode", () => {
    const colorMode = "dark";
    useThemeMock.mockReturnValue({
      resolvedTheme: colorMode,
      setTheme: vi.fn(),
      forcedTheme: colorMode,
    } as never);
    const { result } = renderHook(() => useColorMode());
    expect(result.current.colorMode).toBe(colorMode);
  });

  it("should set theme", () => {
    const colorMode = "dark";
    const setThemeMock = vi.fn();
    useThemeMock.mockReturnValue({
      resolvedTheme: colorMode,
      setTheme: setThemeMock,
      forcedTheme: colorMode,
    } as never);
    const { result } = renderHook(() => useColorMode());

    const nextColorMode = "light";
    act(() => {
      result.current.setColorMode(nextColorMode);
    });
    expect(setThemeMock).toHaveBeenCalledWith(nextColorMode);
  });

  it("should toggle color mode", () => {
    const colorMode = "dark";
    const setThemeMock = vi.fn();
    useThemeMock.mockReturnValue({
      resolvedTheme: colorMode,
      setTheme: setThemeMock,
      forcedTheme: colorMode,
    } as never);
    const { result } = renderHook(() => useColorMode());

    act(() => {
      result.current.toggleColorMode();
    });
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
