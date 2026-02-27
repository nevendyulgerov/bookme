import { defineSlotRecipe } from "@chakra-ui/react";
import { fieldAnatomy } from "@chakra-ui/react/anatomy";

export const fieldRecipe = defineSlotRecipe({
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      _focus: {
        boxShadow: "none",
      },
    },
    label: {
      fontSize: "md",
      fontFamily: "heading",
      fontWeight: "700",
    },
    helperText: {
      fontSize: "xs",
      color: "gray.400",
      fontFamily: "heading",
    },
    errorText: {
      fontFamily: "heading",
      fontSize: "sm",
    },
  },
});
