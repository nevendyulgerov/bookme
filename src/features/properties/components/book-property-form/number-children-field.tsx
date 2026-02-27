import { Field, NativeSelect } from "@chakra-ui/react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

const options = [
  {
    value: "1",
    label: "1 Child",
  },
  {
    value: "2",
    label: "2 Children",
  },
  {
    value: "3",
    label: "3 Children",
  },
  {
    value: "4",
    label: "4 Children",
  },
  {
    value: "5",
    label: "5 Children",
  },
];

export const NumberChildrenField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.numberChildren}>
      <Field.Label>
        Number of Children <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder="Select country"
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
