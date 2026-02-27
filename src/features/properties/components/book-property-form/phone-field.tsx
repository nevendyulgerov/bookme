import { type FC } from "react";
import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export const PhoneField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.phoneNumber}>
      <Field.Label>
        Phone Number <Field.RequiredIndicator />
      </Field.Label>
      <Input
        id="phoneNumber"
        type="tel"
        placeholder="Enter your phone number..."
        autoComplete="tel-national"
        _autofill={{
          boxShadow: "0 0 0px",
        }}
        {...register("phoneNumber")}
      />
      <Field.ErrorText>
        {formState.errors.phoneNumber?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
