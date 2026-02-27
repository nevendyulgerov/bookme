import { defineSlotRecipe } from "@chakra-ui/react";
import { numberInputAnatomy } from "@chakra-ui/react/anatomy";

const borderRadius = 10;

export const numberInputRecipe = defineSlotRecipe({
  slots: numberInputAnatomy.keys(),
  variants: {
    variant: {
      outline: {
        input: {
          backgroundColor: "gray.800",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "gray.700",
          color: "gray.400",
          borderRadius,
          _disabled: {
            opacity: 1,
          },
          _autofill: {
            bg: {
              base: "red",
              _dark: "red",
            },
          },
        },
      },
      filled: {
        input: {
          borderRadius,
          _disabled: {
            opacity: 1,
          },
        },
      },
      flushed: {
        input: {
          borderRadius,
          _disabled: {
            opacity: 1,
          },
        },
      },
      unstyled: {
        input: {
          borderRadius,
          _disabled: {
            opacity: 1,
          },
        },
      },
    },
  },
});
