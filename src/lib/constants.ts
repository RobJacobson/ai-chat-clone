export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const THEME_COLORS = {
  light: {
    foreground: "hsl(240 10% 3.9%)",
    primaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 4.8% 95.9%)",
    mutedForeground: "hsl(240 3.8% 46.1%)",
    accent: "hsl(240 4.8% 95.9%)",
    accentForeground: "hsl(240 5.9% 10%)",
  },
  dark: {
    foreground: "hsl(0 0% 98%)",
    primaryForeground: "hsl(240 5.9% 10%)",
    muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(240 5% 64.9%)",
    accent: "hsl(240 3.7% 15.9%)",
    accentForeground: "hsl(0 0% 98%)",
  },
};

export const UI_CONSTANTS = {
  CHAT_TITLE_MAX_LENGTH: 50,
  IMAGE_SIZE: 160,
  KEYBOARD_OFFSET_IOS: 65,
  KEYBOARD_OFFSET_ANDROID: 20,
  SCROLL_DELAY: 100,
  MESSAGE_INPUT_PLACEHOLDER: "Ask anything...",
  MAX_TOKENS: 1000,
} as const;
