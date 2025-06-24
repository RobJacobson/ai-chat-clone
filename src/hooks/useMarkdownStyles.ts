import { useTheme } from "./useTheme";

// Define markdown styles based on current theme
export const useMarkdownStyles = () => {
  const { colors } = useTheme();

  const markdownStyles = {
    body: {
      color: colors.foreground,
    },
    heading1: {
      color: colors.foreground,
      fontSize: 24,
      fontWeight: "bold" as const,
      marginBottom: 8,
    },
    heading2: {
      color: colors.foreground,
      fontSize: 20,
      fontWeight: "bold" as const,
      marginBottom: 6,
    },
    heading3: {
      color: colors.foreground,
      fontSize: 18,
      fontWeight: "bold" as const,
      marginBottom: 4,
    },
    paragraph: {
      color: colors.foreground,
      marginBottom: 8,
    },
    text: {
      color: colors.foreground,
    },
    strong: {
      color: colors.foreground,
      fontWeight: "bold" as const,
    },
    em: {
      color: colors.foreground,
      fontStyle: "italic" as const,
    },
    code_inline: {
      color: colors.foreground,
      backgroundColor: colors.muted,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
      fontFamily: "monospace",
    },
    code_block: {
      color: colors.foreground,
      backgroundColor: colors.muted,
      padding: 12,
      borderRadius: 8,
      fontFamily: "monospace",
      marginVertical: 8,
    },
    fence: {
      color: colors.foreground,
      backgroundColor: colors.muted,
      padding: 12,
      borderRadius: 8,
      fontFamily: "monospace",
      marginVertical: 8,
    },
    blockquote: {
      backgroundColor: colors.accent,
      borderLeftWidth: 4,
      borderLeftColor: colors.accentForeground,
      paddingLeft: 12,
      paddingVertical: 8,
      marginVertical: 8,
    },
    list_item: {
      color: colors.foreground,
      marginBottom: 4,
    },
    bullet_list_icon: {
      color: colors.foreground,
    },
    ordered_list_icon: {
      color: colors.foreground,
    },
    link: {
      color: colors.primaryForeground,
      textDecorationLine: "underline" as const,
    },
    table: {
      borderWidth: 1,
      borderColor: colors.mutedForeground,
      marginVertical: 8,
    },
    th: {
      backgroundColor: colors.accent,
      color: colors.accentForeground,
      fontWeight: "bold" as const,
      padding: 8,
      borderWidth: 1,
      borderColor: colors.mutedForeground,
    },
    td: {
      color: colors.foreground,
      padding: 8,
      borderWidth: 1,
      borderColor: colors.mutedForeground,
    },
    hr: {
      backgroundColor: colors.mutedForeground,
      height: 1,
      marginVertical: 16,
    },
  };

  return { markdownStyles };
};
