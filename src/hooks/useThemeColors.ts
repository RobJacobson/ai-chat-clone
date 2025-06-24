import { useColorScheme } from "./useColorScheme";

export const useThemeColors = () => {
  const { isDarkColorScheme } = useColorScheme();

  return {
    // Background text colors
    foreground: isDarkColorScheme ? "hsl(0 0% 98%)" : "hsl(240 10% 3.9%)",

    // Button text colors
    primaryForeground: isDarkColorScheme
      ? "hsl(240 5.9% 10%)"
      : "hsl(0 0% 98%)",

    // Additional useful colors for future use
    muted: isDarkColorScheme ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
    mutedForeground: isDarkColorScheme
      ? "hsl(240 5% 64.9%)"
      : "hsl(240 3.8% 46.1%)",
    accent: isDarkColorScheme ? "hsl(240 3.7% 15.9%)" : "hsl(240 4.8% 95.9%)",
    accentForeground: isDarkColorScheme ? "hsl(0 0% 98%)" : "hsl(240 5.9% 10%)",
  };
};
