import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function MyJobToggleChips({
  activeTab,
  setActiveTab,
}: {
  activeTab: "active" | "completed" | "cancelled" | "upcoming";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"active" | "completed" | "cancelled" | "upcoming">
  >;
}) {
  return (
    <View className="flex-row gap-2.5 mt-5">
      {(
        [
          { key: "active", label: "Active Jobs" },
          { key: "upcoming", label: "Upcoming" },
          { key: "completed", label: "Completed" },
          { key: "cancelled", label: "Cancelled" },
        ] as const
      ).map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={
              isActive
                ? { backgroundColor: Colors.common.GRAY_DARK }
                : { backgroundColor: "#FFFFFF" }
            }
            className={`px-4 py-2.5 rounded-lg ${isActive ? "" : "border border-neutral-200/80"}`}
          >
            <Text
              className={`text-xs font-bold ${isActive ? "text-white" : "text-neutral-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
