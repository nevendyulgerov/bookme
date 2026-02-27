import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import { Fonts } from "@/common/components/ui/fonts";
import theme from "@/theme/theme";
import type { FC } from "react";

export const UiProvider: FC<ThemeProviderProps> = (props) => {
  return (
    <ChakraProvider value={theme}>
      <Fonts />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        {...props}
      />
    </ChakraProvider>
  );
};
