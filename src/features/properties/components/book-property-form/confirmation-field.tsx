import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Field } from "@chakra-ui/react";

export const ConfirmationField: FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="confirmation"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Field.Root required invalid={!!error} width="auto" marginTop={6}>
            <Checkbox.Root
              colorPalette="orange"
              checked={value}
              onCheckedChange={({ checked }) => onChange(checked)}
            >
              <Checkbox.HiddenInput data-testid="confirmation-field" />
              <Checkbox.Control />
              <Checkbox.Label>I confirm this reservation.</Checkbox.Label>
            </Checkbox.Root>
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
