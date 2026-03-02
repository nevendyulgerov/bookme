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

      if (bookingIndex > -1) {
        state[bookingIndex] = action.payload.booking;
      }
    },
    deleteBooking: (
      state,
      action: PayloadAction<{ booking: BookingModel }>,
    ) => {
      const bookingIndex = state.findIndex(
        (b) => b.id === action.payload.booking.id,
      );

      if (bookingIndex > -1) {
        state.splice(bookingIndex, 1);
      }
    },
  },
});

export const { createBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
