import { type FC } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/features/auth/components/login-form/schema";
import { EmailField } from "@/features/auth/components/login-form/email-field";
import { toaster } from "@/common/components/ui/toaster/toaster";
import type { z } from "zod";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/store";
import { login } from "@/store/slices/user";
import type { UserModel } from "@/store/slices/user/types";
import { Card } from "@/common/components/ui/card";

type FormValues = z.infer<typeof schema>;

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = form;
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user: UserModel = { email: data.email };
      dispatch(
        login({
          user,
        }),
      );

      navigate("/", { replace: true });
      reset();
    } catch {
      toaster.create({
        title: "Unable to login. Please try again or contact support.",
        type: "error",
      });
    }
  });

  return (
    <Card
      borderRadius="3xl"
      padding={10}
      width="450px"
      maxWidth="calc(100vw - 2rem)"
    >
      <form onSubmit={onSubmit}>
        <Stack direction="column" gap={6}>
          <FormProvider {...form}>
            <EmailField />
          </FormProvider>
          <Stack direction="column" gap={8}>
            <Button type="submit" variant="solid" colorPalette="orange">
              Log In
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
};
