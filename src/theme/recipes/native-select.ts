import { defineSlotRecipe } from "@chakra-ui/react";
import { nativeSelectAnatomy } from "@chakra-ui/react/anatomy";

const borderRadius = 10;

export const nativeSelectRecipe = defineSlotRecipe({
  slots: nativeSelectAnatomy.keys(),
  base: {
    root: {
      backgroundColor: {
        base: "gray.100",
        _dark: "gray.800",
      },
      borderRadius,
      borderWidth: 1,
      borderColor: "gray.700",
    },
    field: {
      borderRadius,
      color: "gray.400",
      fontFamily: "heading",
    },
  },
  variants: {
    variant: {
      outline: {
        field: {
          fontSize: "md",
        },
      },
    },
  },
});
