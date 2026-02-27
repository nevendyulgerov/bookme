import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import { BigLogo } from "@/common/components/layout/big-logo";

export const PageError: FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      zIndex={10}
      gap={10}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <BigLogo />
      </Flex>

      <Flex
        direction="column"
        justify="center"
        align="center"
        width="100%"
        gap={2}
      >
        <Text fontSize="xl" fontWeight="bold" marginBottom={2} color="white">
          Something went wrong!
        </Text>
        <Button colorPalette="orange" variant="solid" asChild>
          <RouterLink to="/">Go to Home Page</RouterLink>
        </Button>
      </Flex>
    </Flex>
  );
};
