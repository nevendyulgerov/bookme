import { useAppSelector } from "@/store/store";

export const useBookings = () => {
  const { bookings } = useAppSelector((store) => store.bookings);
  return bookings;
};
