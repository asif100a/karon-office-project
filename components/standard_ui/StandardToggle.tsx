import { Pressable, View } from "react-native";
import type { ColorValue, PressableProps } from "react-native";
import { Colors } from "@/constants/Colors";

type StandardToggleProps = Omit<PressableProps, "onPress"> & {
  value: boolean;
  onChange?: (value: boolean) => void;
  onValueChange?: (value: boolean) => void;
  trackColor?: {
    false?: ColorValue;
    true?: ColorValue;
  };
  thumbColor?: ColorValue;
  ios_backgroundColor?: ColorValue;
  className?: string;
};

export default function StandardToggle({
  value,
  onChange,
  onValueChange,
  trackColor,
  thumbColor = "#FFFFFF",
  ios_backgroundColor = "#D4D4D4",
  disabled,
  className = "",
  style,
  ...props
}: StandardToggleProps) {
  const nextValue = !value;
  const isDisabled = !!disabled;
  const activeTrackColor = trackColor?.true ?? Colors.common.BRAND;
  const inactiveTrackColor = trackColor?.false ?? ios_backgroundColor;

  const handlePress = () => {
    if (isDisabled) return;

    onChange?.(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      onPress={handlePress}
      accessibilityRole={props.accessibilityRole ?? "switch"}
      accessibilityState={{ checked: value, disabled: isDisabled, ...props.accessibilityState }}
      style={(state) => [
        {
          width: 52,
          height: 28,
          borderRadius: 999,
          padding: 2,
          backgroundColor: value ? activeTrackColor : inactiveTrackColor,
          alignItems: value ? "flex-end" : "flex-start",
          justifyContent: "center",
          opacity: isDisabled ? 0.5 : state.pressed ? 0.8 : 1,
        },
        typeof style === "function" ? style(state) : style,
      ]}
      className={className}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: thumbColor,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
          elevation: 1,
        }}
      />
    </Pressable>
  );
}
