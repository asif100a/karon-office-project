import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const TABS = [
  { key: "schedule", label: "Schedule", minWidth: 64 },
  { key: "timesheet", label: "Timesheet", minWidth: 104 },
  { key: "policy", label: "Worker Policy", minWidth: 104 },
] as const;

export default function WorkerToggleChips({
  activeSubTab,
  setActiveSubTab,
}: {
  activeSubTab: "schedule" | "timesheet" | "policy";
  setActiveSubTab: React.Dispatch<React.SetStateAction<"schedule" | "timesheet" | "policy">>;
}) {
  return (
    <View className="flex-row gap-2 mb-6">
      {TABS.map((tab) => {
        const isActive = activeSubTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveSubTab(tab.key)}
            style={[
              { minWidth: tab.minWidth },
              isActive
                ? { backgroundColor: Colors.common.GRAY_DARK }
                : { backgroundColor: "#FFFFFF" },
            ]}
            className={`px-3 py-2 rounded-lg items-center justify-center ${isActive ? "" : "border border-neutral-200/60"}`}
          >
            <Text
              numberOfLines={1}
              className={`text-xs leading-4 font-bold ${isActive ? "text-white" : "text-neutral-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
