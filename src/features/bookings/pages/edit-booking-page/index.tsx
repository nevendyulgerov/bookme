import { type FC, useCallback, useEffect } from "react";
import { Page } from "@/common/components/layout/page";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuLuggage } from "react-icons/lu";
import { useNavigate } from "react-router";
import { isObject } from "lodash";
import type { PropertyModel } from "@/store/slices/properties/types";
import { ReservePropertyCard } from "@/features/properties/components/reserve-property-card";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { BookPropertyForm } from "@/features/properties/components/book-property-form";
import { useProperty } from "@/features/properties/hooks/use-property";
import { useBooking } from "@/features/bookings/hooks/use-booking";
import type { BookingModel } from "@/store/slices/bookings/types";
import { Title } from "@/common/components/meta/title";

export const EditBookingPage: FC = () => {
  const booking = useBooking() as BookingModel;
  const property = useProperty(booking.propertyId) as PropertyModel;
  const navigate = useNavigate();

  const redirectInvalidId = useCallback(() => {
    if (!booking) {
      navigate("/not-found");
    }
  }, [navigate, booking]);

  useEffect(() => {
    redirectInvalidId();
  }, [redirectInvalidId]);

  return (
    <Page isLoading={!isObject(booking)}>
      <Title title="Edit Booking" />

      <PageHeader
        title={`Edit Booking for "${property.name}"`}
        icon={LuLuggage}
      />

      <Flex justifyContent="center">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gridAutoRows="1fr"
          gap={4}
        >
          <GridItem colSpan={{ base: 4, xl: 2 }}>
            <ReservePropertyCard property={property as PropertyModel} />
          </GridItem>
          <GridItem colSpan={{ base: 4, xl: 2 }}>
            <BookPropertyForm property={property} booking={booking} />
          </GridItem>
        </Grid>
      </Flex>
    </Page>
  );
};
