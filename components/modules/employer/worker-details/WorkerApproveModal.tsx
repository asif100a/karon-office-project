import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronDown, X } from "lucide-react-native";

const APPROVAL_DAYS = [
  { day: "Saturday", hours: "8 Hours" },
  { day: "Sunday", hours: "8 Hours" },
  { day: "Monday", hours: "8 Hours" },
  { day: "Tuesday", hours: "8 Hours" },
];

const WEEK_DAY_OPTIONS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkerApproveModal({
  visible,
  selectedWeek,
  isWeekDropdownOpen,
  onToggleWeekDropdown,
  onSelectWeek,
  onClose,
}: {
  visible: boolean;
  selectedWeek: string;
  isWeekDropdownOpen: boolean;
  onToggleWeekDropdown: () => void;
  onSelectWeek: (weekDay: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end px-4 pb-8"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
      >
        <View className="absolute left-5 top-[42%] flex-row">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#FF7A00]">
            <Text className="text-sm font-bold text-white">K</Text>
          </View>
          <View className="-ml-1.5 h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]">
            <Text className="text-sm font-bold text-white">C</Text>
          </View>
        </View>

        <View className="max-h-[82vh] rounded-2xl bg-white">
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 20,
            }}
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-[28px] font-semibold text-neutral-900">
                Request approval
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="rounded-full p-1 active:opacity-70"
              >
                <X size={16} color="#111827" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="mb-2 text-xs font-medium text-neutral-500">
                Week
              </Text>
              <TouchableOpacity
                onPress={onToggleWeekDropdown}
                className="min-h-12 flex-row items-center justify-between rounded-xl border border-neutral-200 px-3 py-3 active:opacity-80"
              >
                <Text
                  className={`text-sm ${
                    selectedWeek === "Select Week"
                      ? "text-neutral-400"
                      : "text-neutral-800"
                  }`}
                >
                  {selectedWeek}
                </Text>
                <ChevronDown size={16} color="#737373" />
              </TouchableOpacity>

              {isWeekDropdownOpen ? (
                <View className="mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                  {WEEK_DAY_OPTIONS.map((weekDay, index) => (
                    <TouchableOpacity
                      key={weekDay}
                      onPress={() => onSelectWeek(weekDay)}
                      className={`px-3 py-3 active:bg-neutral-50 ${
                        index < WEEK_DAY_OPTIONS.length - 1
                          ? "border-b border-neutral-100"
                          : ""
                      }`}
                    >
                      <Text className="text-sm font-medium text-neutral-800">
                        {weekDay}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>

            <View className="gap-3">
              {APPROVAL_DAYS.map((item) => (
                <View
                  key={item.day}
                  className="flex-row items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3"
                >
                  <View className="flex-1 pr-3">
                    <Text className="text-base font-medium text-slate-800">
                      {item.day}
                    </Text>
                    <Text className="mt-0.5 text-sm text-slate-400">
                      {item.hours}
                    </Text>
                  </View>

                  <TouchableOpacity className="rounded-xl border border-neutral-200 px-4 py-2 active:opacity-80">
                    <Text className="text-xs font-medium text-neutral-500">
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={onClose}
              style={{ backgroundColor: "#1F2937" }}
              className="mt-5 min-h-12 items-center justify-center rounded-xl px-4 py-3 active:opacity-90"
            >
              <Text className="text-base font-medium text-white">Approve</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
