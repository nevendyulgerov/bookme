import { useParams } from "react-router";
import { useBookings } from "@/features/bookings/hooks/use-bookings";

export const useBooking = (bookingId?: string) => {
  const { id: paramId } = useParams();
  const id = bookingId ?? paramId;
  const bookings = useBookings();
  return bookings.find((b) => b.id === id);
};
