import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/store/slices/bookings/initial-state";
import type { BookingModel } from "@/store/slices/bookings/types";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    createBooking: (
      state,
      action: PayloadAction<{ booking: BookingModel }>,
    ) => {
      state.push(action.payload.booking);
    },
    updateBooking: (
      state,
      action: PayloadAction<{ booking: BookingModel }>,
    ) => {
      const bookingIndex = state.findIndex(
        (b) => b.id === action.payload.booking.id,
      );

      console.log("updateBooking::", bookingIndex, action.payload.booking);

      state[bookingIndex] = action.payload.booking;

      console.log("state::", state[bookingIndex]);
    },
    deleteBooking: (
      state,
      action: PayloadAction<{ booking: BookingModel }>,
    ) => {
      const bookingIndex = state.findIndex(
        (b) => b.id === action.payload.booking.id,
      );
      state.splice(bookingIndex, 1);
    },
  },
});

export const { createBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
