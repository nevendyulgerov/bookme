import { Field, NativeSelect } from "@chakra-ui/react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { options } from "@/features/properties/components/book-property-form/number-children-field/constants";

export const NumberChildrenField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.numberChildren}>
      <Field.Label>
        Number of Children <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select number of children"
          data-testid="number-children-field"
          {...register("numberChildren")}
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
        {formState.errors.numberChildren?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
