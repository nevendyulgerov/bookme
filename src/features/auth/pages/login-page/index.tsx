import type { FC } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { BigLogo } from "@/common/components/layout/big-logo";
import { LoginForm } from "@/features/auth/components/login-form";
import { Page } from "@/common/components/layout/page";
import { Title } from "@/common/components/meta/title";

export const LoginPage: FC = () => {
  return (
    <Page>
      <Title title="Login" />

      <Stack direction="column" paddingTop="100px">
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          direction="column"
          zIndex={10}
          gap={16}
        >
          <Flex direction="column" alignItems="center" gap={3} paddingX={4}>
            <BigLogo />
            <Text fontSize="5xl" fontWeight="700">
              Book Me
            </Text>
            <Text fontFamily="heading">Log in to your account to continue</Text>
          </Flex>

          <LoginForm />
        </Flex>
      </Stack>
    </Page>
  );
};
