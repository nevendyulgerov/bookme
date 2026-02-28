import { type FC } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";
import { BigLogo } from "@/common/components/layout/big-logo";
import { Page } from "@/common/components/layout/page";
import { Title } from "@/common/components/meta/title";

export const NotFoundPage: FC = () => {
  return (
    <Page>
      <Title title="404 Not Found" />

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
            gap={2}
          >
            <BigLogo />
          </Flex>

          <Flex width="100%" height="100%" justify="center" align="center">
            <Flex direction="column" justify="center" align="center">
              <Text fontSize="xl" fontWeight="bold" marginBottom={2}>
                404 Not Found
              </Text>
              <Text fontSize="md" fontWeight="semibold" marginBottom={4}>
                Could not find the requested resource.
              </Text>
              <Button colorPalette="orange" variant="solid" asChild>
                <RouterLink to="/">Go to Home Page</RouterLink>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Page>
  );
};
