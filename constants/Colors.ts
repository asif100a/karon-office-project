/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  common: {
    BRAND: '#FF5500',
    BRAND_LIGHT: "#FEEEE6",
    ERROR: "#F0436F",
    SUCCESS: "#4CAF50",
    WARNING: "#FFC107",
    INFO: "#2196F3",
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    GRAY_LIGHT: "#F5F5F5",
    GRAY_DARK: "#333333",
    GRAY_NORMAL: "#858585",
    BORDER: "#E8E8E8",
  }
};
