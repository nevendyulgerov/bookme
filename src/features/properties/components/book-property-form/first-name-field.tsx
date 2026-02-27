import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";

export const FirstNameField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.firstName}>
      <Field.Label>
        First Name <Field.RequiredIndicator />
      </Field.Label>
      <Input
        id="firstName"
        required
        padding="1em"
        placeholder="First Name"
        {...register("firstName")}
        _placeholder={{
          color: "gray.400",
        }}
      />
      <Field.ErrorText>
        {formState.errors.firstName?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
