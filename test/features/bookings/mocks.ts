import type { BookingModel } from "@/store/slices/bookings/types";

export const bookingA: BookingModel = {
  id: "5bdf2dac-89d6-461e-a9ec-fec0e13ce7e1",
  propertyId: "1ab41a7a-89a3-4cdb-80a2-a41827d854f5",
  startDate: "2026-03-01",
  endDate: "2026-03-05",
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  country: "BG",
  phoneNumber: "0886858048",
  numberAdults: 1,
  numberChildren: 1,
};

export const bookingB: BookingModel = {
  id: "0b5c2eff-b639-4b9a-a8e9-c4dcc306d4f1",
  propertyId: "3c17bed8-e63b-42fc-a572-535223cb9a80",
  startDate: "2026-03-03",
  endDate: "2026-03-05",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
  country: "BG",
  phoneNumber: "0886858048",
  numberAdults: 1,
  numberChildren: 1,
};

export const bookings = [bookingA, bookingB];
