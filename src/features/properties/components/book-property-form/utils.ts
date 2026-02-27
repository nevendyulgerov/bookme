import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
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

export const getAlreadyBookedDaysForPropertyBookings = (
  propertyBookings: BookingModel[],
): Date[] => {
  return propertyBookings.reduce((acc: Date[], booking) => {
    const bookedDates = eachDayOfInterval({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    });

    return [...acc, ...bookedDates];
  }, []);
};
