import { afterEach, beforeEach, describe, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";
import { useColorMode } from "@/common/hooks/ui/use-color-mode";

vi.mock("../../../../src/common/hooks/ui/use-color-mode");
const useColorModeMock = vi.mocked(useColorMode, true);

describe("useColorModeValue", () => {
  beforeEach(() => {
    useColorModeMock.mockReturnValue({
      colorMode: "dark",
      setColorMode: vi.fn(),
      toggleColorMode: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return value based on color mode", () => {
    useColorModeMock.mockReturnValue({
      colorMode: "dark",
      setColorMode: vi.fn(),
      toggleColorMode: vi.fn(),
    });
    const lightValue = "light-value";
    const darkValue = "dark-value";
    const { result, rerender } = renderHook(() =>
      useColorModeValue(lightValue, darkValue),
    );
    expect(result.current).toBe(darkValue);

    useColorModeMock.mockReturnValue({
      colorMode: "light",
      setColorMode: vi.fn(),
      toggleColorMode: vi.fn(),
    });

    rerender();
    expect(result.current).toBe(lightValue);
  });
});
