import { Colors } from "@/constants/Colors";
import { Text, TouchableOpacity, View } from "react-native";

export default function StickyActions({
  onPrimaryPress,
  onSecondaryPress,
}: {
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
}) {
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-neutral-100 bg-white px-6 pb-16 pt-4">
      <TouchableOpacity
        onPress={onPrimaryPress}
        style={{ backgroundColor: Colors.common.GRAY_DARK }}
        className="flex-1 items-center justify-center rounded-2xl py-4 active:opacity-90 shadow-sm shadow-black/10"
      >
        <Text className="text-sm font-extrabold text-white">Apply</Text>
      </TouchableOpacity>
    </View>
  );
}
