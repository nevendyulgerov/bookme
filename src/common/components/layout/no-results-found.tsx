import { type FC } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { BigLogo } from "@/common/components/layout/big-logo";
import { AppName } from "@/common/components/layout/app-name";

interface NoResultsFoundProps {
  title: string;
  subtitle: string;
  redirectTo: string;
  redirectText: string;
}

export const NoResultsFound: FC<NoResultsFoundProps> = (props) => {
  const { title, subtitle, redirectTo, redirectText } = props;

  return (
    <Stack direction="column" paddingTop="100px">
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        direction="column"
        zIndex={10}
        gap={16}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={6}
        >
          <BigLogo />
          <AppName size="large" />
        </Flex>

        <Flex width="100%" height="100%" justify="center" align="center">
          <Flex direction="column" justify="center" align="center">
            <Text fontSize="xl" fontWeight="bold" marginBottom={2}>
              {title}
            </Text>
            <Text fontSize="md" fontWeight="semibold" marginBottom={4}>
              {subtitle}
            </Text>
            <Button colorPalette="orange" variant="solid" asChild>
              <RouterLink to={redirectTo}>{redirectText}</RouterLink>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
};
