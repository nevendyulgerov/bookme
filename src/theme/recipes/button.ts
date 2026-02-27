import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderRadius: "3xl",
        borderColor: "gray.700",
      },
      solid: {},
      subtle: {
        borderRadius: "3xl",
        backgroundColor: "gray.700",
        _hover: {
          backgroundColor: "gray.600",
        },
        _pressed: {
          backgroundColor: "gray.700",
        },
        _focus: {
          backgroundColor: "gray.600",
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      colorPalette: "orange",
      css: {
        color: {
          base: {
            base: "gray.800",
            _dark: "gray.300",
          },
        },
        backgroundColor: {
          base: "electricOrange/10",
        },
        borderWidth: 1,
        borderRadius: "3xl",
        borderColor: "orange.400",
        _hover: {
          backgroundColor: {
            base: "orange.400/20",
          },
        },
        _active: {
          backgroundColor: {
            base: "orange.400/20",
          },
        },
        _disabled: {
          backgroundColor: {
            base: "orange.300/10",
          },
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "muted",
      css: {
        color: {
          base: "gray.300",
        },
        backgroundColor: {
          base: "gray.300/10",
        },
        borderRadius: "3xl",
        _hover: {
          backgroundColor: {
            base: "orange.400/20",
          },
        },
        _active: {
          backgroundColor: {
            base: "orange.400/20",
          },
        },
        _disabled: {
          backgroundColor: {
            base: "orange.300/10",
          },
        },
      },
    },
    {
      variant: "solid",
      colorPalette: "red",
      css: {
        color: {
          base: "gray.300",
        },
        backgroundColor: {
          base: "errorForeground/30",
        },
        borderRadius: "3xl",
        _hover: {
          backgroundColor: {
            base: "errorForeground/40",
          },
        },
        _active: {
          backgroundColor: {
            base: "errorForeground/40",
          },
        },
        _disabled: {
          backgroundColor: {
            base: "errorForeground/10",
          },
        },
      },
    },
  ],
});
