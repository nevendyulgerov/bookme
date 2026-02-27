import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import userSlice from "@/store/slices/user";
import propertiesSlice from "@/store/slices/properties";
import bookingsSlice from "@/store/slices/bookings";
import {
  type TypedUseSelectorHook,
  useDispatch as useGenericDispatch,
  useSelector as useGenericSelector,
} from "react-redux";
import { persistReducer, persistStore } from "redux-persist";

const userConfig = {
  keyPrefix: "bookMe_",
  key: "user",
  storage,
};

const propertiesConfig = {
  keyPrefix: "bookMe_",
  key: "properties",
  storage,
};

const bookingsConfig = {
  keyPrefix: "bookMe_",
  key: "bookings",
  storage,
};

const combinedUserReducer = combineReducers({
  user: userSlice,
});

const combinedPropertiesReducer = combineReducers({
  properties: propertiesSlice,
});

const combinedBookingsReducer = combineReducers({
  bookings: bookingsSlice,
});

const userReducer = persistReducer(userConfig, combinedUserReducer);

const propertiesReducer = persistReducer(
  propertiesConfig,
  combinedPropertiesReducer,
);

const bookingsReducer = persistReducer(bookingsConfig, combinedBookingsReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    bookings: bookingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    });
  },
  preloadedState: {},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useGenericSelector;

export const useAppDispatch: () => AppDispatch = useGenericDispatch;
