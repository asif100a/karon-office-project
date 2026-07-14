import { View } from "react-native";

export default function MapFallback() {
  return (
    <View className="flex-1 bg-[#E9EEF8]">
      <View className="absolute left-[-5%] top-[18%] h-3 w-[55%] rotate-[10deg] rounded-full bg-white/70" />
      <View className="absolute left-[12%] top-[34%] h-3 w-[75%] -rotate-[12deg] rounded-full bg-white/75" />
      <View className="absolute left-[-8%] top-[56%] h-3 w-[68%] rotate-[8deg] rounded-full bg-white/75" />
      <View className="absolute right-[-5%] top-[72%] h-3 w-[58%] -rotate-[14deg] rounded-full bg-white/70" />
      <View className="absolute left-[20%] top-[-6%] h-[45%] w-3 -rotate-[18deg] rounded-full bg-white/70" />
      <View className="absolute right-[24%] top-[8%] h-[62%] w-3 rotate-[14deg] rounded-full bg-white/75" />
      <View className="absolute right-[10%] top-[24%] h-[48%] w-3 -rotate-[10deg] rounded-full bg-white/70" />
    </View>
  );
}