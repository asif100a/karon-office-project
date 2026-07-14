import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function CompletedToggleChips({
  activeSubTab,
  setActiveSubTab,
}: {
  activeSubTab: "schedule" | "summary";
  setActiveSubTab: React.Dispatch<React.SetStateAction<"schedule" | "summary">>;
}) {
  return (
    <View className="flex-row gap-2 mb-6">
      <TouchableOpacity
        onPress={() => setActiveSubTab("schedule")}
        style={
          activeSubTab === "schedule"
            ? { backgroundColor: Colors.common.GRAY_DARK }
            : { backgroundColor: "#E5E5E52B" }
        }
        className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === "schedule" ? "" : "border border-neutral-200/60"}`}
      >
        <Text
          className={`text-xs font-bold ${activeSubTab === "schedule" ? "text-white" : "text-neutral-500"}`}
        >
          Schedule
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveSubTab("summary")}
        style={
          activeSubTab === "summary"
            ? { backgroundColor: Colors.common.GRAY_DARK }
            : { backgroundColor: "#E5E5E52B" }
        }
        className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === "summary" ? "" : "border border-neutral-200/60"}`}
      >
        <Text
          className={`text-xs font-bold ${activeSubTab === "summary" ? "text-white" : "text-neutral-500"}`}
        >
          Work Summary
        </Text>
      </TouchableOpacity>
    </View>
  );
}
