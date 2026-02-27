import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/store/slices/user/initial-state";
import type { UserModel } from "@/store/slices/user/types";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: UserModel }>) => {
      state.email = action.payload.user.email;
    },
    logout: (state) => {
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
