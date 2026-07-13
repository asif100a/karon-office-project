import { View, ViewStyle } from "react-native";
import React from "react";

export default function ScreenWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View className="flex-1 bg-neutral-50" style={{ ...style }}>
      {children}
    </View>
  );
}
