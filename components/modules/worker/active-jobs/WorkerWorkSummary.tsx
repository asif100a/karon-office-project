import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const mockWeeklyWork = [
  { week: "Week 1", dates: "12th - 16th July", status: "Completed" },
  { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
  { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
  { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
  { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
];

export default function WorkerWorkSummary({
  setShowApprovalModal,
}: {
  setShowApprovalModal: (show: boolean) => void;
}) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-neutral-900 font-extrabold text-base">
          Timesheet
        </Text>
      </View>

      <View className="border border-neutral-200/80 rounded-2xl bg-white overflow-hidden divide-y divide-neutral-50">
        {mockWeeklyWork.map((item, idx) => (
          <View key={idx} className="flex-row justify-between items-center p-4">
            <View>
              <Text className="text-neutral-800 font-extrabold text-sm">
                {item.week}
              </Text>
              <Text className="text-neutral-400 text-xs font-semibold mt-0.5">
                {item.dates}
              </Text>
            </View>
            {item.status === "Approved" ? (
              <View className="px-3 py-1 rounded-full bg-green-50">
                <Text className="text-[10px] font-extrabold text-green-600">
                  Approved
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowApprovalModal(true)}
                style={{ borderColor: Colors.common.BRAND }}
                className="border px-3 py-1 rounded-full active:opacity-75 bg-white"
              >
                <Text
                  style={{ color: Colors.common.BRAND }}
                  className="text-[10px] font-extrabold"
                >
                  Submit Timesheet
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
