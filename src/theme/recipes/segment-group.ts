import { defineSlotRecipe } from "@chakra-ui/react";
import { segmentGroupAnatomy } from "@chakra-ui/react/anatomy";

export const segmentGroupRecipe = defineSlotRecipe({
  slots: segmentGroupAnatomy.keys(),
  base: {},
  variants: {
    variant: {
      blue: {
        root: {
          backgroundColor: "#0465F926",
          borderRadius: "3xl",
          padding: 2,
          fontFamily: "heading",
          height: "36px",
          width: "max-content",
        },
        indicator: {
          borderRadius: "2xl",
          padding: 0,
          backgroundColor: "electricBlue",
        },
        item: {
          borderRadius: "2xl",
          height: "20px",
          cursor: "pointer",
        },
      },
      orange: {
        root: {
          backgroundColor: "rgba(229, 126, 23, 0.15)",
          borderRadius: "3xl",
          padding: 2,
          fontFamily: "heading",
          height: "36px",
          width: "max-content",
        },
        indicator: {
          borderRadius: "2xl",
          padding: 0,
          backgroundColor: "electricOrange",
        },
        item: {
          borderRadius: "2xl",
          height: "20px",
          cursor: "pointer",
        },
      },
      green: {
        root: {
          backgroundColor: "rgba(50, 202, 91, 0.15)",
          borderRadius: "3xl",
          padding: 2,
          fontFamily: "heading",
          height: "36px",
          width: "max-content",
        },
        indicator: {
          borderRadius: "2xl",
          padding: 0,
          backgroundColor: "electricGreen",
        },
        item: {
          borderRadius: "2xl",
          height: "20px",
          cursor: "pointer",
        },
      },
      purple: {
        root: {
          backgroundColor: "rgba(119, 51, 255, 0.15)",
          borderRadius: "3xl",
          padding: 2,
          fontFamily: "heading",
          height: "36px",
          width: "max-content",
        },
        indicator: {
          borderRadius: "2xl",
          padding: 0,
          backgroundColor: "electricPurple",
        },
        item: {
          borderRadius: "2xl",
          height: "20px",
          cursor: "pointer",
        },
      },
    },
  },
});
