import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const WEEK_OPTIONS = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

export default function RequestApprovalModal({
  showApprovalModal,
  setShowApprovalModal,
}: {
  showApprovalModal: boolean;
  setShowApprovalModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mondayHrs, setMondayHrs] = useState("");
  const [tuesdayHrs, setTuesdayHrs] = useState("");
  const [wednesdayHrs, setWednesdayHrs] = useState("");
  const [thursdayHrs, setThursdayHrs] = useState("");

  const handleSelectWeek = (value: string) => {
    setSelectedWeek(value);
    setOpenDropdown(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showApprovalModal}
      onRequestClose={() => setShowApprovalModal(false)}
    >
      <View className="flex-1 bg-neutral-500/50 justify-end">
        <View className="bg-white rounded-t-4xl p-6 pb-12 shadow-2xl border-t border-neutral-100">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
              Submit Timesheet
            </Text>
            <TouchableOpacity
              onPress={() => setShowApprovalModal(false)}
              className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
            >
              <X size={16} color="#333333" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="max-h-100 mb-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-4.5 pr-1">
              <View className="relative z-20">
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Week
                </Text>
                <TouchableOpacity
                  onPress={() => setOpenDropdown((current) => !current)}
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                >
                  <Text className="text-neutral-800 text-sm font-semibold">
                    {selectedWeek || "Select Week"}
                  </Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
                {openDropdown ? (
                  <View className="mt-2 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                    {WEEK_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => handleSelectWeek(option.label)}
                        className={`px-4 py-3.5 active:bg-neutral-50 ${
                          selectedWeek === option.label
                            ? "bg-neutral-100"
                            : "bg-white"
                        }`}
                      >
                        <Text className="text-neutral-800 text-sm font-semibold">
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </View>

              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Monday
                </Text>
                <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                  <TextInput
                    className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                    placeholder="Enter total working hours"
                    placeholderTextColor="#A3A3A3"
                    keyboardType="numeric"
                    value={mondayHrs}
                    onChangeText={setMondayHrs}
                  />
                </View>
              </View>

              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Tuesday
                </Text>
                <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                  <TextInput
                    className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                    placeholder="Enter total working hours"
                    placeholderTextColor="#A3A3A3"
                    keyboardType="numeric"
                    value={tuesdayHrs}
                    onChangeText={setTuesdayHrs}
                  />
                </View>
              </View>

              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Wednesday
                </Text>
                <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                  <TextInput
                    className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                    placeholder="Enter total working hours"
                    placeholderTextColor="#A3A3A3"
                    keyboardType="numeric"
                    value={wednesdayHrs}
                    onChangeText={setWednesdayHrs}
                  />
                </View>
              </View>

              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Thursday
                </Text>
                <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                  <TextInput
                    className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                    placeholder="Enter total working hours"
                    placeholderTextColor="#A3A3A3"
                    keyboardType="numeric"
                    value={thursdayHrs}
                    onChangeText={setThursdayHrs}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => setShowApprovalModal(false)}
            style={{ backgroundColor: Colors.common.GRAY_DARK }}
            className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 mb-3"
          >
            <Text className="text-white font-extrabold text-sm">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
