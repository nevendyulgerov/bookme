import type { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { UiProvider } from "@/common/components/ui/ui-provider";
import { queryClient } from "@/query-client";
import { Toaster } from "@/common/components/ui/toaster";
import { IntlProvider } from "react-intl";
import { ErrorBoundary } from "@/common/components/layout/error-boundary";
import { PageError } from "@/common/components/layout/page-error";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <UiProvider>
          <QueryClientProvider client={queryClient}>
            <IntlProvider locale="en" defaultLocale="en">
              <ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
            </IntlProvider>
          </QueryClientProvider>
          <Toaster />
        </UiProvider>
      </PersistGate>
    </Provider>
  );
};
