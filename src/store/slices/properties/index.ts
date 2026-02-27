import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/store/slices/properties/initial-state";

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export default propertiesSlice.reducer;
