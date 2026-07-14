import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function MyJobToggleChips({
    activeTab,
    setActiveTab
}: {
    activeTab: "active" | "completed" | "cancelled";
    setActiveTab: React.Dispatch<React.SetStateAction<"active" | "completed" | "cancelled">>;
}) {
  return (
    <View className="flex-row gap-2.5 mb-6">
      <TouchableOpacity
        onPress={() => setActiveTab("active")}
        style={
          activeTab === "active"
            ? { backgroundColor: Colors.common.GRAY_DARK }
            : { backgroundColor: "#FFFFFF" }
        }
        className={`px-4 py-2 rounded-lg ${activeTab === "active" ? "" : "border border-neutral-200/60"}`}
      >
        <Text
          className={`text-xs font-bold ${activeTab === "active" ? "text-white" : "text-neutral-500"}`}
        >
          Active jobs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("completed")}
        style={
          activeTab === "completed"
            ? { backgroundColor: Colors.common.GRAY_DARK }
            : { backgroundColor: "#FFFFFF" }
        }
        className={`px-4 py-2 rounded-lg ${activeTab === "completed" ? "" : "border border-neutral-200/60"}`}
      >
        <Text
          className={`text-xs font-bold ${activeTab === "completed" ? "text-white" : "text-neutral-500"}`}
        >
          Completed
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveTab("cancelled")}
        style={
          activeTab === "cancelled"
            ? { backgroundColor: Colors.common.GRAY_DARK }
            : { backgroundColor: "#FFFFFF" }
        }
        className={`px-4 py-2 rounded-lg ${activeTab === "cancelled" ? "" : "border border-neutral-200/60"}`}
      >
        <Text
          className={`text-xs font-bold ${activeTab === "cancelled" ? "text-white" : "text-neutral-500"}`}
        >
          Cancelled
        </Text>
      </TouchableOpacity>
    </View>
  );
}
