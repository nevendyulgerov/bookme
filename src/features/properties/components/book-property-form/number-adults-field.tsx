import { Field, NativeSelect } from "@chakra-ui/react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

const options = [
  {
    value: "1",
    label: "1 Adult",
  },
  {
    value: "2",
    label: "2 Adults",
  },
  {
    value: "3",
    label: "3 Adults",
  },
  {
    value: "4",
    label: "4 Adults",
  },
  {
    value: "5",
    label: "5 Adults",
  },
];

export const NumberAdultsField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.numberAdults}>
      <Field.Label>
        Number of Adults <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select country"
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
