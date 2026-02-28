import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/features/properties/components/book-property-form/schema";
import { Steps } from "@/common/components/ui/steps";
import { type FC, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuArrowRight, LuLuggage } from "react-icons/lu";
import type { z } from "zod";
import {
  Button,
  chakra,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FirstNameField } from "@/features/properties/components/book-property-form/first-name-field";
import { LastNameField } from "@/features/properties/components/book-property-form/last-name-field";
import { Card } from "@/common/components/ui/card";
import { EmailField } from "@/features/properties/components/book-property-form/email-field";
import { PhoneField } from "@/features/properties/components/book-property-form/phone-field";
import { CountryField } from "@/features/properties/components/book-property-form/country-field";
import { DurationField } from "@/features/properties/components/book-property-form/duration-field";
import { NumberAdultsField } from "@/features/properties/components/book-property-form/number-adults-field";
import { NumberChildrenField } from "@/features/properties/components/book-property-form/number-children-field";
import { Summary } from "@/features/properties/components/book-property-form/summary";
import { useAppDispatch } from "@/store/store";
import { toaster } from "@/common/components/ui/toaster/toaster";
import { useNavigate } from "react-router";
import type { PropertyModel } from "@/store/slices/properties/types";
import type { BookingModel } from "@/store/slices/bookings/types";
import { format } from "date-fns";
import { createBooking, updateBooking } from "@/store/slices/bookings";
import { v4 as uuid } from "uuid";
import { useUser } from "@/features/auth/hooks/use-user";
import type { UserModel } from "@/store/slices/user/types";
import { isNumber, isObject, isString } from "lodash";
import { ConfirmationField } from "@/features/properties/components/book-property-form/confirmation-field";

const steps = 3;

export type FormValues = z.infer<typeof schema>;

type BookPropertyForm = {
  booking?: BookingModel;
  property: PropertyModel;
};

export const BookPropertyForm: FC<BookPropertyForm> = (props) => {
  const { property, booking } = props;
  const {
    id,
    startDate,
    endDate,
    firstName = "",
    lastName = "",
    country = "",
    phoneNumber = "",
    numberAdults: initialNumberAdults,
    numberChildren: initialNumberChildren,
  } = booking ?? {};
  const duration = {
    from: isString(startDate) ? new Date(startDate) : undefined,
    to: isString(endDate) ? new Date(endDate) : undefined,
  };
  const numberAdults = isNumber(initialNumberAdults)
    ? String(initialNumberAdults)
    : "";
  const numberChildren = isNumber(initialNumberChildren)
    ? String(initialNumberChildren)
    : "";
  const isExistingBooking =
    isObject(duration.from) &&
    isObject(duration.to) &&
    firstName !== "" &&
    lastName !== "" &&
    country !== "" &&
    phoneNumber !== "" &&
    numberAdults !== "" &&
    numberChildren !== "";
  const user = useUser() as UserModel;
  const form = useForm<FormValues>({
    defaultValues: {
      duration,
      firstName,
      lastName,
      email: user.email as string,
      country,
      phoneNumber,
      numberAdults,
      numberChildren,
      confirmation: false,
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset, clearErrors } = form;
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const booking: BookingModel = {
          id: isExistingBooking ? (id as string) : uuid(),
          propertyId: property.id,
          startDate: format(data.duration.from as Date, "yyyy-MM-dd"),
          endDate: format(data.duration.to as Date, "yyyy-MM-dd"),
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          phoneNumber: data.phoneNumber,
          numberAdults: Number(data.numberAdults),
          numberChildren: Number(data.numberChildren),
        };

        const action = isExistingBooking ? updateBooking : createBooking;
        dispatch(action({ booking }));

        toaster.create({
          title: isExistingBooking
            ? "Reservation updated successfully!"
            : "Reservation created successfully!",
          type: "success",
        });
        navigate("/");
        reset();
      } catch {
        toaster.create({
          title:
            "Error while making the reservation. Please try again or contact support.",
          type: "error",
        });
      }
    },
    (errors) => {
      if (step < steps) {
        if (step === 1 && !errors.duration) {
          clearErrors();
          setStep(2);
        } else if (
          step === 2 &&
          !errors.firstName &&
          !errors.lastName &&
          !errors.email &&
          !errors.country &&
          !errors.phoneNumber
        ) {
          clearErrors();
          setStep(3);
        } else if (step === 3) {
          clearErrors();
          setStep(4);
        }
      }
    },
  );

  const onCancel = useCallback(() => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  return (
    <Card
      padding={10}
      gap={10}
      width="100%"
      height="100%"
      contentProps={{
        height: "100%",
        gap: 8,
      }}
      data-testid="book-property-form"
    >
      <Flex direction="column" alignItems="center" gap={2}>
        <Heading
          fontSize="32px"
          fontWeight="medium"
          textAlign="center"
          lineHeight="normal"
        >
          {step === 1
            ? "Choose dates"
            : step === 2
              ? "Fill your details"
              : "Reservation Summary"}
        </Heading>
        <Text>
          {step === 1
            ? "Choose the period for your reservation"
            : step === 2
              ? "Fill the contact details for your reservation"
              : "Review reservation details and complete your booking"}
        </Text>
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        <Steps stepsCount={steps} currentStep={step} />
      </Flex>

      <chakra.form flex={1} paddingTop={8} onSubmit={onSubmit}>
        <Flex direction="column" gap={10} height="100%">
          <FormProvider {...form}>
            <Flex direction="column" gap={5}>
              {step === 1 ? (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(4, 1fr)",
                  }}
                  gapX={4}
                  gapY={8}
                >
                  <GridItem colSpan={{ base: 4 }}>
                    <Flex justifyContent="center" width="100%">
                      <DurationField
                        booking={booking}
                        property={property}
                        isExistingBooking={isExistingBooking}
                      />
                    </Flex>
                  </GridItem>
                </Grid>
              ) : step === 2 ? (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(4, 1fr)",
                  }}
                  gapX={4}
                  gapY={8}
                >
                  <GridItem colSpan={{ base: 4, lg: 2 }}>
                    <FirstNameField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4, md: 2 }}>
                    <LastNameField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4, lg: 2 }}>
                    <EmailField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4, md: 2 }}>
                    <PhoneField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4 }}>
                    <CountryField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4, md: 2 }}>
                    <NumberAdultsField />
                  </GridItem>
                  <GridItem colSpan={{ base: 4, md: 2 }}>
                    <NumberChildrenField />
                  </GridItem>
                </Grid>
              ) : step === 3 ? (
                <Stack alignItems="center">
                  <Summary property={property} />
                  <ConfirmationField />
                </Stack>
              ) : null}
            </Flex>
          </FormProvider>

          <Flex
            justifyContent="center"
            alignItems="center"
            gap={4}
            marginTop="auto"
          >
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              size="sm"
              variant="solid"
              colorPalette="orange"
            >
              <Flex alignItems="center" gap={2}>
                {step === steps
                  ? isExistingBooking
                    ? "Update Reservation"
                    : "Reserve"
                  : "Continue"}{" "}
                <Icon
                  as={step === steps ? LuLuggage : LuArrowRight}
                  width={4}
                  height={4}
                />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </chakra.form>
    </Card>
  );
};
