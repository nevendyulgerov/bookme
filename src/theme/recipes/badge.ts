import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  base: {
    borderRadius: "xl",
    fontWeight: "400",
  },
  variants: {
    size: {
      sm: {
        fontSize: "sm",
        paddingX: 2,
        paddingY: 1,
      },
    },
    variant: {
      solid: {},
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorPalette: "blue",
      css: {
        color: {
          base: "infoForeground",
        },
        backgroundColor: {
          base: "infoBackground",
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "green",
      css: {
        color: {
          base: "successForeground",
        },
        backgroundColor: {
          base: "successBackground",
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "red",
      css: {
        color: {
          base: "errorForeground",
        },
        backgroundColor: {
          base: "errorBackground",
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "orange",
      css: {
        color: {
          base: "warningForeground",
        },
        backgroundColor: {
          base: "warningBackground",
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "gray",
      css: {
        color: {
          base: "neutralForeground",
        },
        backgroundColor: {
          base: "neutralBackground",
        },
      },
    },
  ],
});
