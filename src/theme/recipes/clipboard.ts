import { defineSlotRecipe } from "@chakra-ui/react";
import { clipboardAnatomy } from "@chakra-ui/react/anatomy";

export const clipboardRecipe = defineSlotRecipe({
  slots: clipboardAnatomy.keys(),
  base: {
    label: {
      fontSize: "md",
      fontFamily: "heading",
      fontWeight: "700",
    },
    input: {
      marginTop: 1,
    },
  },
});
