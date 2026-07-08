import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Logo from "@/assets/icons/Logo";
import { useRouter } from "expo-router";

export default function ScreenHeader() {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push("/screens/common/notifications");
  };

  return (
    <View className="flex-row items-center justify-between px-5 pt-20 pb-4 bg-white">
      <View className="flex-row items-center gap-3">
        <View className="w-auto h-auto p-2 rounded-full bg-blue-600 items-center justify-center">
          <Logo width={36} height={36} />
        </View>
        <View>
          <Text className="text-sm text-gray-400">Welcome back</Text>
          <Text className="text-xl font-bold text-gray-900">Samiul</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleNotificationPress}
        className="relative w-auto h-auto p-3.5 items-center justify-center"
        style={{
          backgroundColor: Colors.common.GRAY_LIGHT,
          borderRadius: 9999,
        }}
      >
        <Feather name="bell" size={24} color="#111827" />
        <View className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 items-center justify-center">
          <Text className="text-white text-base">2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
