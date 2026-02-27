import { type FC, useCallback, useState } from "react";
import { Button, Flex, Icon, Image, Link, Stack, Text } from "@chakra-ui/react";
import type { PropertyModel } from "@/store/slices/properties/types";
import { Card } from "@/common/components/ui/card";
import { PropertyReviewScore } from "@/features/properties/components/property-review-score";
import { LuMapPin } from "react-icons/lu";
import { PropertyFacilities } from "@/features/properties/components/property-facilities";
import { PropertyType } from "@/features/properties/components/property-type";
import { PropertyPrice } from "@/features/properties/components/property-price";
import { PropertyRating } from "@/features/properties/components/property-rating";
import { Link as RouterLink } from "react-router";
import type { BookingModel } from "@/store/slices/bookings/types";
import { useProperty } from "@/features/properties/hooks/use-property";
import { DeleteBookingDialog } from "@/features/bookings/components/delete-booking-dialog";

interface BookingCardProps {
  booking: BookingModel;
  imageSize?: "small" | "medium" | "large";
}

export const BookingCard: FC<BookingCardProps> = (props) => {
  const { booking, imageSize = "small" } = props;
  const property = useProperty(booking.propertyId) as PropertyModel;
  const pathToProperty = `/bookings/${booking.id}`;
  const [isDeleteBookingDialogActive, setDeleteBookingDialogActive] =
    useState(false);

  const onDeleteBooking = useCallback(() => {
    setDeleteBookingDialogActive(true);
  }, []);

  return (
    <>
      <DeleteBookingDialog
        booking={booking}
        isActive={isDeleteBookingDialogActive}
        onChangeActive={setDeleteBookingDialogActive}
      />

      <Card height="100%">
        <Flex gap={4}>
          <Flex gap={4}>
            <RouterLink to={pathToProperty}>
              <Image
                src={property.imageUrl}
                loading="lazy"
                boxSize={
                  imageSize === "small"
                    ? "240px"
                    : imageSize === "medium"
                      ? "480px"
                      : "100%"
                }
                objectFit="cover"
                borderRadius="xl"
              />
            </RouterLink>
          </Flex>
          <Stack gap={4} flex={1}>
            <Flex justifyContent="space-between" gap={1} flexWrap="wrap">
              <Stack gap={2}>
                <Flex flexWrap="wrap" gap={2}>
                  <Link asChild>
                    <RouterLink to={pathToProperty}>
                      <Text fontSize="xl" fontWeight="700">
                        {property.name}
                      </Text>
                    </RouterLink>
                  </Link>

                  <PropertyRating rating={property.rating} />
                </Flex>

                <Flex alignItems="center" gap={1}>
                  <Icon as={LuMapPin} />
                  <Text fontSize="xs" fontWeight="700">
                    {property.location}
                  </Text>
                </Flex>
              </Stack>

              <PropertyReviewScore
                reviewScore={property.reviewScore}
                reviewsCount={property.reviewsCount}
              />
            </Flex>

            <Stack gap={2} flex={1}>
              <PropertyType type={property.type} />
              <PropertyFacilities facilities={property.facilities} />
            </Stack>

            <Stack gap={2} flex={1} alignItems="flex-end">
              <PropertyPrice price={property.price} />

              <Flex alignItems="center" gap={2}>
                <Button
                  colorPalette="orange"
                  variant="solid"
                  borderColor="errorForeground"
                  backgroundColor="errorBackground/10"
                  _hover={{
                    backgroundColor: "errorBackground/40",
                  }}
                  onClick={onDeleteBooking}
                >
                  Delete Booking
                </Button>

                <Button colorPalette="orange" variant="solid" asChild>
                  <RouterLink to={pathToProperty}>Edit Booking</RouterLink>
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Card>
    </>
  );
};
