import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Field, Input } from "@chakra-ui/react";

export const LastNameField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.lastName}>
      <Field.Label>
        Last Name <Field.RequiredIndicator />
      </Field.Label>
      <Input
        id="lastName"
        required
        padding="1em"
        placeholder="Last Name"
        {...register("lastName")}
        _placeholder={{
          color: "gray.400",
        }}
      />
      <Field.ErrorText>
        {formState.errors.lastName?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
