import type { FC } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const PageSpinner: FC = () => {
  return (
    <Flex w="100%" h="100%" justify="center" align="center" minHeight="inherit">
      <Spinner size="xl" />
    </Flex>
  );
};
