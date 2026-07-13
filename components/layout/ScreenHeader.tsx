import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";

export default function ScreenHeader() {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push(Routes.CommonRoutes.NOTIFICATIONS);
  };

  return (
    <View style={{ backgroundColor: Colors.common.BRAND }} className="px-6 pt-18 pb-8">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1 pr-4">
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" }}
            className="w-14 h-14 rounded-full border-2 border-white/30"
          />

          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">Welcome Back 👋</Text>
            <Text className="text-white/90 text-sm font-medium mt-0.5">Hello, Thom Haye</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          {/* <TouchableOpacity className="w-12 h-12 rounded-full bg-white/10 items-center justify-center active:opacity-85">
            <Feather name="search" size={22} color="#FFFFFF" />
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={handleNotificationPress}
            className="relative w-12 h-12 rounded-full bg-white/10 items-center justify-center active:opacity-85"
          >
            <Feather name="bell" size={22} color="#FFFFFF" />
            <View className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white/15 items-center justify-center border border-white/20">
              <Text className="text-white text-[10px] font-bold">2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
