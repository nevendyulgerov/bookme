import { Field, NativeSelect } from "@chakra-ui/react";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import { countries } from "@/features/properties/components/book-property-form/country-field/constants";

export const CountryField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.country}>
      <Field.Label>
        Country/Region <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          required
          placeholder="Select country"
          data-testid="country-field"
          {...register("country")}
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>
        {formState.errors.country?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
