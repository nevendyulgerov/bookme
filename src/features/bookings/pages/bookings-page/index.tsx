import { type FC } from "react";
import { Page } from "@/common/components/layout/page";
import { PageHeader } from "@/common/components/layout/page-header";
import { LuLuggage } from "react-icons/lu";
import { useUserBookings } from "@/features/bookings/hooks/use-user-bookings";
import { Grid, GridItem } from "@chakra-ui/react";
import { BookingCard } from "@/features/bookings/components/booking-card";
import { NoResultsFound } from "@/common/components/layout/no-results-found";
import { Title } from "@/common/components/meta/title";

export const BookingsPage: FC = () => {
  const userBookings = useUserBookings();

  return (
    <Page>
      <Title title="My Bookings" />

      <PageHeader
        title={`My Bookings (${userBookings.length})`}
        icon={LuLuggage}
      />

      {userBookings.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {userBookings.map((booking) => {
            return (
              <GridItem key={booking.id} colSpan={{ base: 4, xl: 2 }}>
                <BookingCard booking={booking} />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <NoResultsFound
          title="No bookings found"
          subtitle="Please reserve a property first to see your booking here"
          redirectTo="/properties"
          redirectText="Go to Home Page"
        />
      )}
    </Page>
  );
};
