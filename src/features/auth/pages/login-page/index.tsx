import type { FC } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { BigLogo } from "@/common/components/layout/big-logo";
import { LoginForm } from "@/features/auth/components/login-form";
import { Page } from "@/common/components/layout/page";
import { Title } from "@/common/components/meta/title";
import { AppName } from "@/common/components/layout/app-name";

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
          <Flex direction="column" alignItems="center" gap={6} paddingX={4}>
            <BigLogo />
            <AppName size="large" />
            <Text fontFamily="heading">Log in to your account to continue</Text>
          </Flex>

          <LoginForm />
        </Flex>
      </Stack>
    </Page>
  );
};
