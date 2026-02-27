import { type FC } from "react";
import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const EmailField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root invalid={!!formState.errors.email}>
      <Field.Label>Email Address</Field.Label>
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
      <Field.ErrorText>
        {formState.errors.email?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
