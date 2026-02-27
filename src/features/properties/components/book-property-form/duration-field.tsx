import { type FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { chakra, Field, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { DurationPicker } from "@/common/components/ui/duration-picker";
import { isObject } from "lodash";
import { format, isEqual } from "date-fns";
import {
  getAlreadyBookedDaysForPropertyBookings,
  getDifferenceInDays,
} from "@/features/properties/components/book-property-form/utils";
import type { PropertyModel } from "@/store/slices/properties/types";
import { usePropertyBookings } from "@/features/bookings/hooks/use-property-bookings";
import { LuInfo } from "react-icons/lu";
import { Tooltip } from "@/common/components/ui/tooltip";

interface DurationFieldProps {
  property: PropertyModel;
  isExistingBooking: boolean;
}

export const DurationField: FC<DurationFieldProps> = (props) => {
  const { property, isExistingBooking } = props;
  const propertyBookings = usePropertyBookings(property);
  const { control } = useFormContext();
  const alreadyBookedDates =
    getAlreadyBookedDaysForPropertyBookings(propertyBookings);

  return (
    <Controller
      control={control}
      name="duration"
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const isEndDateDifferentFromStartDate =
          isObject(value?.to) && !isEqual(value.from, value.to);

        return (
          <Stack>
            <Field.Root required invalid={!!error} width="auto">
              <DurationPicker
                range={value}
                defaultMonth={isExistingBooking ? value.from : new Date()}
                disabledDates={alreadyBookedDates}
                error={error?.message}
                onChangeRange={(val) => {
                  const nextVal = isObject(val)
                    ? val
                    : { from: undefined, to: undefined };
                  onChange(nextVal);
                }}
              />
              {alreadyBookedDates.length > 0 && (
                <Tooltip content="Already booked dates are taken and cannot be booked. Please choose dates that don't overlap with already booked dates.">
                  <Field.HelperText>
                    <Flex alignItems="center" gap={1}>
                      <Icon as={LuInfo} /> Dates marked with{" "}
                      <chakra.span color="orange.400/50">●</chakra.span> are
                      already booked.
                    </Flex>
                  </Field.HelperText>
                </Tooltip>
              )}
              <Field.ErrorText>{error?.message as string}</Field.ErrorText>
            </Field.Root>

            {value?.from && (
              <Stack alignItems="flex-start">
                <Flex justifyContent="space-between" gap={4}>
                  <Stack gap={2}>
                    <Text>From:</Text>
                    {isEndDateDifferentFromStartDate && <Text>To:</Text>}
                    <Text>Day(s):</Text>
                  </Stack>

                  <Stack gap={2} justifyContent="flex-end">
                    <Text fontWeight="700" textAlign="right">
                      {format(value.from, "dd/MM/yyyy")}
                    </Text>
                    {isEndDateDifferentFromStartDate && (
                      <Text fontWeight="700" textAlign="right">
                        {format(value.to, "dd/MM/yyyy")}
                      </Text>
                    )}
                    <Text fontWeight="700" textAlign="right">
                      {getDifferenceInDays(value)}
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            )}
          </Stack>
        );
      }}
    />
  );
};
