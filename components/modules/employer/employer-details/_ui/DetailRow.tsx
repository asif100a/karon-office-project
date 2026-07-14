import { ReactNode } from "react";
import { Text, View } from "react-native";

export default function DetailRow({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <View className="flex-row items-center gap-2">
      {icon}
      <Text className="text-xs font-semibold text-neutral-500">{value}</Text>
    </View>
  );
}