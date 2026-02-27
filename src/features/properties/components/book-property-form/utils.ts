import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  isEqual,
  startOfDay,
} from "date-fns";
import type { BookingModel } from "@/store/slices/bookings/types";
import { isObject } from "lodash";

interface Duration {
  from: Date;
  to: Date;
}

export const getDifferenceInDays = (duration: Duration) => {
  const hasFromDate = isObject(duration.from);
  const hasToDate = isObject(duration.to);

  return !hasFromDate && !hasToDate
    ? 0
    : hasFromDate && !hasToDate
      ? 1
      : differenceInDays(addDays(duration.to, 1), startOfDay(duration.from));
};

export const getAlreadyBookedDaysForOtherPropertyBookings = (
  propertyBookings: BookingModel[],
  booking?: BookingModel,
): Date[] => {
  const bookingDates = booking
    ? eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      })
    : [];

  return propertyBookings
    .reduce((acc: Date[], booking) => {
      const bookedDates = eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });

      return [...acc, ...bookedDates];
    }, [])
    .filter((date) => !bookingDates.some((d) => isEqual(d, date)));
};
