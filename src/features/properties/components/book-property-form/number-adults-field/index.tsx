import { Field, NativeSelect } from "@chakra-ui/react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { options } from "@/features/properties/components/book-property-form/number-adults-field/constants";

export const NumberAdultsField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.numberAdults}>
      <Field.Label>
        Number of Adults <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select number of adults"
          data-testid="number-adults-field"
          {...register("numberAdults")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>
        {formState.errors.numberAdults?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
