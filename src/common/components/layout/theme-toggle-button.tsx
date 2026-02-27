import type { FC } from "react";
import { useColorMode } from "@/common/hooks/ui/use-color-mode";
import { IconButton, Icon } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";

export const ThemeToggleButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="sm"
      bg="transparent"
      rounded="full"
      mx={2}
      _hover={{
        backgroundColor: "muted",
      }}
      aria-label="Toggle dark mode"
      data-testid="theme-toggle-button"
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? (
        <Icon as={LuMoon} color="gray.900" width={5} height={5} />
      ) : (
        <Icon as={LuSun} color="white" width={5} height={5} />
      )}
    </IconButton>
  );
};
