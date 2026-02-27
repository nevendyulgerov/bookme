import { type FC } from "react";
import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { ThemeToggleButton } from "@/common/components/layout/theme-toggle-button";
import { Logo } from "@/common/components/layout/logo";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface HeaderProps {
  onClick: () => void;
}

export const Header: FC<HeaderProps> = ({ onClick }) => {
  const isSmallScreen = useBreakpointValue({ base: true, xl: false });
  const backgroundColor = useColorModeValue("gray.50", "gray.800");
  const placeholderColor = useColorModeValue("gray.900", "gray.100");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="card"
      paddingY={3}
      paddingX={4}
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor="border"
      height="80px"
    >
      <Flex alignItems="center" gap={2}>
        <IconButton
          variant="ghost"
          display={isSmallScreen ? "block" : "none"}
          _hover={{
            backgroundColor: "muted",
          }}
          borderRadius="50%"
          aria-label="Toggle sidebar"
          onClick={onClick}
        >
          <Flex justifyContent="center" alignItems="center">
            <Logo />
          </Flex>
        </IconButton>

        <InputGroup
          startElement={<Icon as={LuSearch} color={placeholderColor} />}
        >
          <Input
            placeholder="Search properties..."
            height="30px"
            borderRadius="2xl"
            width={{ base: "500px", xl: "600px" }}
            maxWidth="calc(100vw - 94px)"
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            _placeholder={{
              color: placeholderColor,
            }}
          />
        </InputGroup>
      </Flex>

      <HStack alignItems="center" flexWrap="wrap" gap={1}>
        <ThemeToggleButton />
      </HStack>
    </Flex>
  );
};
