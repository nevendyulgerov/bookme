import { describe, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeToggleButton } from "@/common/components/layout/theme-toggle-button";
import { useColorMode } from "@/common/hooks/ui/use-color-mode";
import { withChakraTheme } from "../../../with-chakra-theme";

vi.mock("../../../../src/common/hooks/ui/use-color-mode");
const useColorModeMock = vi.mocked(useColorMode, true);

const Component = withChakraTheme(ThemeToggleButton);

describe("ThemeToggleButton", () => {
  it("should toggle color mode", () => {
    const toggleColorModeMock = vi.fn();
    useColorModeMock.mockReturnValue({
      colorMode: "dark",
      setColorMode: vi.fn(),
      toggleColorMode: toggleColorModeMock,
    });
    render(<Component />);

    fireEvent.click(screen.getByTestId("theme-toggle-button"));
    expect(toggleColorModeMock).toHaveBeenCalled();
  });
});
