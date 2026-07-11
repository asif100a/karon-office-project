import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, X, ChevronDown, Minus, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import StandardInputField from "@/components/standard_ui/form_fields/StandardInputField";
import StandardSelectField from "@/components/standard_ui/form_fields/StandardSelectField";
import StandardDateInput from "@/components/standard_ui/form_fields/StandardDateInput";
import StandardTextAreaField from "@/components/standard_ui/form_fields/StandardTextAreaField";

type JobFormValues = {
  jobTitle: string;
  tradeSkill: string;
  address: string;
  radius: string;
  workBrief: string;
};

const TRADE_OPTIONS = [
  { label: "Groundworker", value: "groundworker" },
  { label: "Labourer", value: "labourer" },
  { label: "Carpenter", value: "carpenter" },
  { label: "Electrician", value: "electrician" },
];

const RADIUS_OPTIONS = [
  { label: "1-10 Km", value: "1-10" },
  { label: "11-20 Km", value: "11-20" },
  { label: "21-50 Km", value: "21-50" },
];

export default function CreateJobPostScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<JobFormValues>({
    defaultValues: {
      jobTitle: "",
      tradeSkill: "groundworker",
      address: "",
      radius: "1-10",
      workBrief: "",
    },
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [applicationDeadline, setApplicationDeadline] = useState<Date | null>(null);
  const [showWorkersModal, setShowWorkersModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState("groundworker");
  const [workersNeeded, setWorkersNeeded] = useState(3);

  const {origin} = useLocalSearchParams();

  const submitJob = handleSubmit(() => {
    router.replace("/tabs/(employer-tabs)" as any);
  });

  const closeWorkersModal = () => setShowWorkersModal(false);

  const publishWorkers = () => {
    closeWorkersModal();
  };

  const onBackPress = () => {
    if(origin === "worker") {
      router.replace("/tabs/(worker-tabs)" as any);
      return;
    }  
    if(origin === "employer") {
      router.replace("/tabs/(employer-tabs)" as any);
      return;
    }
    
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-neutral-100">
        <TouchableOpacity
          onPress={onBackPress}
          className="w-10 h-10 rounded-full bg-neutral-50 items-center justify-center active:opacity-75"
        >
          <ArrowLeft size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-neutral-900 text-base font-extrabold">Create Job</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 130 }}
      >
        <StandardInputField<JobFormValues>
          label="Job Title"
          id="jobTitle"
          control={control}
          placeholder="Enter Job Title"
          required={true}
          textInputProps={{ className: "text-[#222]" }}
        />

        <StandardSelectField<JobFormValues>
          label="Trade / Skill"
          id="tradeSkill"
          control={control}
          options={TRADE_OPTIONS}
          placeholder="Select trade and number"
        />

        <StandardInputField<JobFormValues>
          label="Address"
          id="address"
          control={control}
          placeholder="2972 Westheimer Rd. Santa A..."
          required={true}
          textInputProps={{ className: "text-[#222]" }}
        />

        <StandardSelectField<JobFormValues>
          label="Radius"
          id="radius"
          control={control}
          options={RADIUS_OPTIONS}
          placeholder="1-10 Km"
        />

        <Pressable onPress={() => setShowWorkersModal(true)}>
          <View className="mb-5">
            <Text className="text-[#333] text-sm font-semibold mb-2">Workers Needed</Text>
            <View className="h-[52px] rounded-xl border border-[#e8e8e8] bg-transparent px-4 flex-row items-center justify-between">
              <Text className="text-sm text-[#222]">{workersNeeded}</Text>
              <ChevronDown size={18} color="#999999" />
            </View>
          </View>
        </Pressable>

        <StandardDateInput
          label="Start Date"
          date={startDate}
          onDateChange={(value) => setStartDate(value)}
          placeholder="dd/mm/yyyy"
        />

        <StandardDateInput
          label="End Date"
          date={endDate}
          onDateChange={(value) => setEndDate(value)}
          placeholder="dd/mm/yyyy"
        />

        <StandardDateInput
          label="Application Deadline"
          date={applicationDeadline}
          onDateChange={(value) => setApplicationDeadline(value)}
          placeholder="dd/mm/yyyy"
        />

        <StandardTextAreaField<JobFormValues>
          label="Work Brief"
          id="workBrief"
          control={control}
          placeholder="write here....."
          numberOfLines={8}
          required={true}
        />
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-4 flex-row gap-3">
        <TouchableOpacity
          onPress={submitJob}
          style={{ backgroundColor: Colors.common.GRAY_DARK }}
          className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
        >
          <Text className="text-white font-extrabold text-sm">Publish Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
        >
          <Text className="text-neutral-900 font-extrabold text-sm">Discard</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showWorkersModal} transparent animationType="fade" onRequestClose={closeWorkersModal}>
        <View className="flex-1 bg-black/45 justify-end">
          <View className="bg-white rounded-t-[28px] px-5 pt-4 pb-6">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-neutral-900 text-lg font-extrabold">Workers required</Text>
              <TouchableOpacity
                onPress={closeWorkersModal}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center"
              >
                <X size={16} color="#111827" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-[#333] text-sm font-semibold mb-2">Trade / Skill</Text>
              <TouchableOpacity
                onPress={() => {
                  const currentIndex = TRADE_OPTIONS.findIndex((item) => item.value === selectedTrade);
                  const nextIndex = (currentIndex + 1) % TRADE_OPTIONS.length;
                  setSelectedTrade(TRADE_OPTIONS[nextIndex].value);
                }}
                className="h-[52px] rounded-xl border border-[#e8e8e8] px-4 flex-row items-center justify-between"
              >
                <Text className="text-sm text-[#222]">
                  {TRADE_OPTIONS.find((item) => item.value === selectedTrade)?.label ?? "Groundworker"}
                </Text>
                <ChevronDown size={18} color="#999999" />
              </TouchableOpacity>
            </View>

            <View className="gap-3 mb-5">
              <View>
                <Text className="text-[#333] text-sm font-semibold mb-2">Groundworker</Text>
                <View className="h-[52px] rounded-xl border border-[#e8e8e8] px-4 flex-row items-center justify-between">
                  <Text className="text-sm text-[#222]">{workersNeeded}</Text>
                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity
                      onPress={() => setWorkersNeeded((value) => Math.max(1, value - 1))}
                      className="w-7 h-7 rounded-full items-center justify-center bg-neutral-100"
                    >
                      <Minus size={16} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setWorkersNeeded((value) => value + 1)}
                      className="w-7 h-7 rounded-full items-center justify-center bg-neutral-900"
                    >
                      <Plus size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View>
                <Text className="text-[#333] text-sm font-semibold mb-2">Groundworker</Text>
                <View className="h-[52px] rounded-xl border border-[#e8e8e8] px-4 flex-row items-center justify-between">
                  <Text className="text-sm text-[#222]">2</Text>
                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity className="w-7 h-7 rounded-full items-center justify-center bg-neutral-100">
                      <Minus size={16} color="#111827" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-7 h-7 rounded-full items-center justify-center bg-neutral-900">
                      <Plus size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={publishWorkers}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
            >
              <Text className="text-white font-extrabold text-sm">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
