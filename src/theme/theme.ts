import { createSystem, defaultConfig } from "@chakra-ui/react";
import { fonts } from "./foundations/fonts";
import { zIndices } from "./foundations/zIndices";
import { buttonRecipe } from "./recipes/button";
import { semanticColors } from "./foundations/semantic-colors";
import { fieldRecipe } from "./recipes/field";
import { inputRecipe } from "./recipes/input";
import { linkRecipe } from "./recipes/link";
import { nativeSelectRecipe } from "./recipes/native-select";
import { badgeRecipe } from "./recipes/badge";
import { dialogRecipe } from "./recipes/dialog";

const theme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      fontSize: "md",
      color: {
        base: "gray.800",
        _dark: "white",
      },
    },
  },
  theme: {
    tokens: {
      fonts,
      zIndex: zIndices,
    },
    semanticTokens: {
      colors: semanticColors,
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      link: linkRecipe,
      badge: badgeRecipe,
    },
    slotRecipes: {
      nativeSelect: nativeSelectRecipe,
      field: fieldRecipe,
      dialog: dialogRecipe,
    },
  },
});

export default theme;
