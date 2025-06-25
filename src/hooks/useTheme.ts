import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useMemo } from "react";

import { NAV_THEME, THEME_COLORS } from "@/lib/constants";

export const useTheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  const actualColorScheme = colorScheme ?? "light";
  const isDarkColorScheme = actualColorScheme === "dark";

  const themeKey = isDarkColorScheme ? "dark" : "light";

  const colors = useMemo(
    () => ({
      // Navigation theme colors from constants
      navigation: NAV_THEME[themeKey],

      // Component theme colors from constants
      ...THEME_COLORS[themeKey],
    }),
    [themeKey]
  );

  const navigationTheme = useMemo(
    () => ({
      dark: isDarkColorScheme,
      colors: colors.navigation,
    }),
    [isDarkColorScheme, colors.navigation]
  );

  return {
    isDarkColorScheme,
    colorScheme: actualColorScheme,
    setColorScheme,
    toggleColorScheme,
    colors,
    navigationTheme,
  };
};
