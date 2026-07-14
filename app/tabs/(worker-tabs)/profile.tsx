import React, { useState, type ComponentType } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  User,
  Clock,
  Lock,
  AlertCircle,
  Star,
  BellRing,
  FileText,
  HelpCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import ScreenHeader from "@/components/layout/ScreenHeader";

type MenuItem = {
  icon: ComponentType<{ size?: number; color?: string }>;
  label: string;
  onPress?: () => void;
  type?: "switch";
};

function AvailabilityToggle({ value }: { value: boolean }) {
  return (
    <View
      pointerEvents="none"
      className={`h-7 w-[44px] rounded-full p-[3px] ${value ? "items-end bg-neutral-200" : "items-start bg-neutral-200"}`}
    >
      <View
        style={{ backgroundColor: value ? Colors.common.BRAND : "#FFFFFF" }}
        className="h-[20px] w-[20px] rounded-full shadow-sm"
      />
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);

  const menuItems: { account: MenuItem[]; more: MenuItem[] } = {
    account: [
      {
        icon: User,
        label: "Profile",
        onPress: () => router.push("/screens/profile/edit" as any),
      },
      { icon: Clock, label: "Available time", type: "switch" },
      {
        icon: Lock,
        label: "Change Password",
        onPress: () => router.push("/screens/profile/change-password" as any),
      },
      {
        icon: AlertCircle,
        label: "Dispute",
        onPress: () => router.push("/screens/profile/disputes" as any),
      },
      {
        icon: Star,
        label: "Rating & Feedback",
        onPress: () => router.push("/screens/profile/rating-feedback" as any),
      },
      { icon: BellRing, label: "Notification Settings", onPress: () => {} },
    ],
    more: [
      {
        icon: FileText,
        label: "Terms & Conditions",
        onPress: () => router.push("/screens/profile/terms" as any),
      },
      { icon: HelpCircle, label: "Privacy Policy", onPress: () => {} },
      { icon: MessageSquare, label: "Contact Site Source", onPress: () => {} },
      {
        icon: LogOut,
        label: "Log out",
        onPress: () => {
          return router.replace("/auth/login" as any);
        },
      },
    ],
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <ScreenHeader />

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Account Section */}
        <View className="mt-8">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight mb-4">
            Account
          </Text>
          <View className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden">
            {menuItems.account.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={
                  item.type === "switch"
                    ? () => setAvailable((value) => !value)
                    : item.onPress
                }
                className="flex-row items-center justify-between px-5 py-4 border-b border-neutral-50 last:border-b-0 active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  <item.icon
                    size={20}
                    color={
                      item.label === "Log out" ? Colors.common.BRAND : "#525252"
                    }
                  />
                  <Text className="text-neutral-900 font-semibold text-base">
                    {item.label}
                  </Text>
                </View>
                {item.type === "switch" ? (
                  <AvailabilityToggle value={available} />
                ) : (
                  <ChevronRight size={20} color="#737373" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Section */}
        <View className="mt-8">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight mb-4">
            More
          </Text>
          <View className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden">
            {menuItems.more.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                className="flex-row items-center justify-between px-5 py-4 border-b border-neutral-50 last:border-b-0 active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  <item.icon
                    size={20}
                    color={
                      item.label === "Log out" ? Colors.common.BRAND : "#525252"
                    }
                  />
                  <Text
                    className="font-semibold text-base"
                    style={
                      item.label === "Log out"
                        ? { color: Colors.common.BRAND }
                        : { color: "#171717" }
                    }
                  >
                    {item.label}
                  </Text>
                </View>
                <ChevronRight size={20} color="#737373" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
