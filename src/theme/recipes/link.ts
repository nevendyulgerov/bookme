import { defineRecipe } from "@chakra-ui/react";

export const linkRecipe = defineRecipe({
  base: {
    fontSize: "sm",
    color: "gray.400",
  },
  variants: {
    variant: {
      plain: {
        color: {
          base: "gray.900",
          _dark: "gray.100",
        },
        _hover: {
          textDecoration: "none",
          color: "orange.400",
        },
      },
      underline: {
        color: "orange.400",
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});
