import type { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface AppNameProps {
  size?: "medium" | "large";
}

export const AppName: FC<AppNameProps> = ({ size = "medium" }) => {
  return (
    <Flex alignItems="flex-end" gap={size === "medium" ? 1 : 2}>
      <Text
        fontSize={size === "medium" ? "2xl" : "5xl"}
        fontWeight="700"
        fontFamily="montserrat"
        lineHeight="1"
      >
        Book
      </Text>
      <Box
        width={size === "medium" ? 1.5 : 2.5}
        height={size === "medium" ? 1.5 : 2.5}
        backgroundColor="electricOrange"
        marginBottom={size === "medium" ? "0.25rem" : "0.425rem"}
      />
      <Text
        fontSize={size === "medium" ? "2xl" : "5xl"}
        fontWeight="700"
        fontFamily="montserrat"
        lineHeight="1"
      >
        Me
      </Text>
    </Flex>
  );
};
