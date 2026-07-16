import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { X } from "lucide-react-native";
import StandardSelectField from "@/components/standard_ui/form_fields/StandardSelectField";
import { Colors } from "@/constants/Colors";

const TRADE_OPTIONS = [
  { label: "Groundworker", value: "groundworker" },
  { label: "Labourer", value: "labourer" },
  { label: "Electrician", value: "electrician" },
  { label: "Carpenter", value: "carpenter" },
];

const RADIUS_OPTIONS = [
  { label: "1 - 10 miles", value: "1-10" },
  { label: "11 - 20 miles", value: "11-20" },
  { label: "21 - 50 miles", value: "21-50" },
];

const TIME_OPTIONS = [
  { label: "8 am - 5 pm", value: "8-5" },
  { label: "9 am - 6 pm", value: "9-6" },
  { label: "Night shift", value: "night" },
];

export default function SearchWorkerModal({
  showFilters,
  setShowFilters,
  control,
}: {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  control: any;
}) {
  return (
    <Modal
      visible={showFilters}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilters(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
              FILTERS
            </Text>
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
            >
              <X size={16} color="#333333" />
            </TouchableOpacity>
          </View>

          <View className="gap-3 mb-8">
            <StandardSelectField
              label="Trade / Skill"
              id="tradeSkill"
              control={control}
              options={TRADE_OPTIONS}
              placeholder="Groundworker"
            />

            <StandardSelectField
              label="Radius"
              id="radius"
              control={control}
              options={RADIUS_OPTIONS}
              placeholder="1 - 10 miles"
            />

            <StandardSelectField
              label="Available time"
              id="availableTime"
              control={control}
              options={TIME_OPTIONS}
              placeholder="8 am - 5 pm"
            />
          </View>

          <TouchableOpacity
            onPress={() => setShowFilters(false)}
            style={{ backgroundColor: Colors.common.GRAY_DARK }}
            className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
          >
            <Text className="text-white font-extrabold text-sm">
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
