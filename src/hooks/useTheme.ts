import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { NAV_THEME, THEME_COLORS } from "@/lib/constants";

export const useTheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  const actualColorScheme = colorScheme ?? "light";
  const isDarkColorScheme = actualColorScheme === "dark";

  const themeKey = isDarkColorScheme ? "dark" : "light";

  const colors = {
    // Navigation theme colors from constants
    navigation: NAV_THEME[themeKey],

    // Component theme colors from constants
    ...THEME_COLORS[themeKey],
  };

  return {
    isDarkColorScheme,
    colorScheme: actualColorScheme,
    setColorScheme,
    toggleColorScheme,
    colors,
    // Navigation theme object for react-navigation
    navigationTheme: {
      dark: isDarkColorScheme,
      colors: colors.navigation,
    },
  };
};
