import type { PropertyModel } from "@/store/slices/properties/types";
import { useBookings } from "@/features/bookings/hooks/use-bookings";

export const usePropertyBookings = (property: PropertyModel) => {
  const bookings = useBookings();
  return bookings.filter((b) => b.propertyId === property.id);
};
