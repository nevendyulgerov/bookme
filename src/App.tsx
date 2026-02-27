import type { FC, PropsWithChildren } from "react";
import { UiProvider } from "@/common/components/ui/ui-provider";
import { Toaster } from "@/common/components/ui/toaster";
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
          <ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
          <Toaster />
        </UiProvider>
      </PersistGate>
    </Provider>
  );
};
