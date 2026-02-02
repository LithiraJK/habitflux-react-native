/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#818CF8";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // Additional light mode colors (can be customized later)
    primary: "#818CF8",
    success: "#22C55E",
    cardBackground: "#F3F4F6",
    border: "#E5E7EB",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF",
    disabled: "#D1D5DB",
    cardBackgroundSecondary: "#E5E7EB",
  },
  dark: {
    text: "#FFFFFF",
    background: "#121212",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    // App-specific colors
    primary: "#818CF8", // Main accent color (indigo)
    success: "#22C55E", // Green for completed/success
    cardBackground: "#1C1C1E", // Dark card background
    cardBackgroundSecondary: "#2C2C2E", // Slightly lighter card bg
    border: "#374151", // Border gray-700
    borderLight: "#4B5563", // Border gray-600
    textSecondary: "#9CA3AF", // Gray-400
    textTertiary: "#6B7280", // Gray-500
    disabled: "#1F2937", // Gray-800 for disabled
    disabledText: "#4B5563", // Gray-600 for disabled text
    defaultCategory: "#0891B2", // Default category color (cyan)
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
