import { defineSlotRecipe } from "@chakra-ui/react";
import { dialogAnatomy } from "@chakra-ui/react/anatomy";

export const dialogRecipe = defineSlotRecipe({
  slots: dialogAnatomy.keys(),
  base: {
    content: {
      borderRadius: "20px",
      background: {
        base: "linear-gradient(180deg, rgba(242, 243, 244, 0.05) 0%, rgba(242, 243, 244, 0.02) 100%), #161414",
      },
    },
  },
});
