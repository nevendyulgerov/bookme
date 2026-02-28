import { createBrowserRouter, Navigate, Route, Routes } from "react-router";
import { App } from "@/App";
import { Layout } from "@/common/components/layout/layout";
import { NotFoundPage } from "@/common/pages/not-found-page";
import { PropertiesPage } from "@/features/properties/pages/properties-page";
import { BookingsPage } from "@/features/bookings/pages/bookings-page";
import { BookPropertyPage } from "@/features/properties/pages/book-property-page";
import { PublicRoute } from "@/features/auth/components/public-route";
import { LoginPage } from "@/features/auth/pages/login-page";
import { PrivateRoute } from "@/features/auth/components/private-route";
import { EditBookingPage } from "@/features/bookings/pages/edit-booking-page";

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <App>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route path="/" element={<Navigate to="/properties" replace />} />
            <Route
              path="/properties"
              index
              element={
                <PrivateRoute>
                  <PropertiesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/properties/:id"
              element={
                <PrivateRoute>
                  <BookPropertyPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings/:id"
              element={
                <PrivateRoute>
                  <EditBookingPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </App>
    ),
  },
]);
