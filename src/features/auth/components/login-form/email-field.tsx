import { type FC } from "react";
import { Field, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Tooltip } from "@/common/components/ui/tooltip";

export const EmailField: FC = () => {
  const { register, formState } = useFormContext();

  return (
    <Field.Root required invalid={!!formState.errors.email}>
      <Tooltip content="You can access the application with any valid email. There's no need to register first.">
        <Field.Label>
          Email Address <Field.RequiredIndicator />
        </Field.Label>
      </Tooltip>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email address..."
        autoComplete="email"
        autoFocus
        _autofill={{
          boxShadow: "0 0 0px",
        }}
        {...register("email")}
      />
      <Field.ErrorText>
        {formState.errors.email?.message as string}
      </Field.ErrorText>
    </Field.Root>
  );
};
