import { type FC } from "react";
import { Field, Flex, Icon, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { LuInfo } from "react-icons/lu";

export const EmailField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.email}>
      <Field.Label>
        Email Address <Field.RequiredIndicator />
      </Field.Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email address..."
        autoComplete="email"
        autoFocus
        _autofill={{
          boxShadow: "0 0 0px",
        }}
        {...register("email")}
      />
      <Field.HelperText>
        <Flex gap={1}>
          <Icon as={LuInfo} marginTop={0.5} />
          You can access the application with any valid email. There's no need
          to register first.
        </Flex>
      </Field.HelperText>
      <Field.ErrorText>
        {formState.errors.email?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
