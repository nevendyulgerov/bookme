import { type FC, type ReactNode } from "react";
import { Button, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { useColorModeValue } from "@/common/hooks/ui/use-color-mode-value";

interface SidebarLinkProps {
  to: string;
  icon?: ReactNode;
  label: string;
  isActive: boolean;
}

export const SidebarLink: FC<SidebarLinkProps> = (props) => {
  const { to, icon = null, label, isActive } = props;
  const activeBackgroundColor = useColorModeValue("gray.100", "gray.800");
  const activeBorderColor = useColorModeValue("gray.200/40", "gray.700/40");
  const activeColor = useColorModeValue("gray.900", "gray.100");
  const hoverColor = useColorModeValue("gray.900", "gray.100");

  return (
    <Button
      asChild
      colorPalette={isActive ? "blue" : undefined}
      variant={isActive ? "solid" : "ghost"}
      width="100%"
      backgroundColor={isActive ? activeBackgroundColor : "card"}
      color={isActive ? activeColor : "gray.400"}
      _hover={{
        color: hoverColor,
      }}
      borderColor={isActive ? activeBorderColor : "transparent"}
      position="relative"
      _before={{
        content: "''",
        position: "absolute",
        left: "-0.25rem",
        height: "100%",
        width: "0.25rem",
        backgroundColor: isActive ? "orange.400" : "transparent",
      }}
      borderLeftWidth="0.25rem"
      borderLeftColor="transparent"
      paddingY={2}
      paddingX={4}
      paddingLeft={3}
      borderRadius={0}
      textDecoration="none"
      justifyContent="flex-start"
      gap={2}
    >
      <RouterLink to={to}>
        {icon}
        <Text fontSize="md" fontWeight="semibold">
          {label}
        </Text>
      </RouterLink>
    </Button>
  );
};