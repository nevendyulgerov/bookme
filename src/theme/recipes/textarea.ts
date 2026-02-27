import { defineRecipe } from "@chakra-ui/react";

const borderRadius = 10;

export const textareaRecipe = defineRecipe({
  base: {
    borderRadius,
    _disabled: {
      bg: {
        base: "dark.gray.200",
        _dark: "dark.border.secondary",
      },
    },
    _focus: {
      boxShadow: "none",
    },
    _placeholder: {
      fontSize: "md",
    },
    fontFamily: "heading",
  },
  variants: {
    variant: {
      outline: {
        bg: "gray.800",
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
      filled: {
        borderRadius,
        _disabled: {
          opacity: 1,
        },
      },
      flushed: {
        borderRadius,
        _disabled: {
          opacity: 1,
        },
      },
      unstyled: {
        borderRadius,
        _disabled: {
          opacity: 1,
        },
      },
    },
  },
});
