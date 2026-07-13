import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Bell } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import BackButton from "@/components/standard_ui/buttons/BackButton";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "2",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "3",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "4",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "5",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "6",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
  {
    id: "7",
    title: "New Job Nearby",
    description: "A plumbing job is available within your selected radius.",
    time: "5 hours ago",
  },
];

function NotificationItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <View className="bg-white rounded-[18px] px-4 py-4 flex-row items-start border border-neutral-100 shadow-sm">
      <View className="w-7 h-7 rounded-full bg-orange-500 items-center justify-center mt-0.5">
        <Bell size={14} color="#FFFFFF" />
      </View>

      <View className="flex-1 pr-2 ml-3">
        <View className="flex-row items-start justify-between">
          <Text className="text-neutral-900 text-sm font-semibold flex-1 pr-3">
            {title}
          </Text>
          <Text className="text-neutral-500 text-[11px] font-medium">
            {time}
          </Text>
        </View>
        <Text className="text-neutral-400 text-xs leading-5 mt-1">
          {description}
        </Text>
      </View>
    </View>
  );
}

export default function Notifications() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} edges={[]}>
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="px-6 pt-16 pb-7"
      >
        <BackButton />
        <Text className="text-white text-[17px] font-semibold mt-10">
          Notifications
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 28 }}
      >
        <View>
          {NOTIFICATIONS.map((notification, index) => (
            <View
              key={notification.id}
              style={{ marginBottom: index === NOTIFICATIONS.length - 1 ? 0 : 12 }}
            >
              <NotificationItem
                title={notification.title}
                description={notification.description}
                time={notification.time}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
