import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Routes } from "@/constants/Routes";
import LogoWhite from "@/assets/icons/LogoWhite";

export default function ScreenHeader() {
  const router = useRouter();

  const handleNotificationPress = () => {
    router.push(Routes.CommonRoutes.NOTIFICATIONS);
  };

  return (
    <View
      style={{ backgroundColor: Colors.common.BRAND }}
      className="px-6 pt-12 pb-3"
    >
      <View className="flex-row items-end justify-between">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
          }}
          className="w-14 h-14 rounded-full border-2 border-white/30"
        />

        <View className="-mb-3">
          <LogoWhite size={{ width: "100", height: "72" }} />
        </View>

        <View className="flex-row items-center gap-3">
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
