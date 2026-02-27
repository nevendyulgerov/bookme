import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@chakra-ui/react";
import { DurationPicker } from "@/common/components/ui/duration-picker";
import { isObject } from "lodash";

interface DurationFieldProps {
  isExistingBooking: boolean;
}

export const DurationField: FC<DurationFieldProps> = ({
  isExistingBooking,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="duration"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Field.Root required invalid={!!error} width="auto">
            <DurationPicker
              range={value}
              defaultMonth={isExistingBooking ? value.from : new Date()}
              // disabledDates={[new Date(2026, 1, 11), new Date(2026, 1, 12)]}
              onChangeRange={(val) => {
                const nextVal = isObject(val)
                  ? val
                  : { from: undefined, to: undefined };
                onChange(nextVal);
              }}
            />
            <Field.ErrorText>{error?.message as string}</Field.ErrorText>
          </Field.Root>
        );
      }}
    />
  );
};
