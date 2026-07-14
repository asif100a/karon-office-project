import { View, Text } from "react-native";
import React from "react";

const EMPLOYER_SCHEDULE = [
  { label: "Start Date", value: "3 Jun 2026" },
  { label: "End date", value: "28 Jun 2026" },
  { label: "Hours", value: "07:30 - 17:00" },
  { label: "Per Week", value: "5 Days" },
];

export default function ProjectSchedule() {
  return (
    <View className="mt-5">
      <Text className="text-neutral-900 text-sm font-extrabold mb-3">
        Project Schedule
      </Text>
      <View className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {EMPLOYER_SCHEDULE.map((item, index) => (
          <View 
            key={item.label}
            className={`flex-row items-center justify-between px-4 py-4 ${index < EMPLOYER_SCHEDULE.length - 1 ? "border-b border-neutral-100" : ""}`}
          >
            <Text className="text-neutral-400 text-sm">{item.label}</Text>
            <Text className="text-neutral-700 text-sm font-medium">
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
