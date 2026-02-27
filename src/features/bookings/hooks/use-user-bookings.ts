import { useUser } from "@/features/auth/hooks/use-user";
import { useBookings } from "@/features/bookings/hooks/use-bookings";

export const useUserBookings = () => {
  const user = useUser();
  const bookings = useBookings();
  return bookings.filter((b) => b.email === user.email);
};
