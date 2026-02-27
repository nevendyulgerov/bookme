import { ChakraProvider } from "@chakra-ui/react";
import type { FC, JSX } from "react";
import theme from "@/theme/theme";

/**
 * A HOC for tests where the component uses any of our custom theme properties e.g. color grey. support
 * @param Component A functional component
 */
export const withChakraTheme =
  <T,>(Component: FC<T>): FC<T> =>
  (props: T) => (
    <ChakraProvider value={theme}>
      <Component {...(props as JSX.IntrinsicAttributes & T)} />
    </ChakraProvider>
  );

type ReturnOf<T> = T extends (...a: never) => infer R ? R : never;

export type { ReturnOf };
