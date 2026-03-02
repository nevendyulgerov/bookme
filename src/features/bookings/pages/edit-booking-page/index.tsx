import { type FC, useCallback, useEffect } from "react";
import { Page } from "@/common/components/layout/page";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuLuggage } from "react-icons/lu";
import { useNavigate } from "react-router";
import { isObject } from "lodash";
import { ReservePropertyCard } from "@/features/properties/components/reserve-property-card";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { BookPropertyForm } from "@/features/properties/components/book-property-form";
import { useProperty } from "@/features/properties/hooks/use-property";
import { useBooking } from "@/features/bookings/hooks/use-booking";
import { Title } from "@/common/components/meta/title";

export const EditBookingPage: FC = () => {
  const booking = useBooking();
  const property = useProperty(booking?.propertyId);
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

      {isObject(property) && (
        <>
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
                <ReservePropertyCard property={property} />
              </GridItem>
              <GridItem colSpan={{ base: 4, xl: 2 }}>
                <BookPropertyForm property={property} booking={booking} />
              </GridItem>
            </Grid>
          </Flex>
        </>
      )}
    </Page>
  );
};
