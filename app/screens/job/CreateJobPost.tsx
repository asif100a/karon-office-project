import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CreateJobHeader from "@/components/modules/employer/create-job/CreateJobHeader";
import CreateJobForm from "@/components/modules/employer/create-job/CreateJobForm";
import type { JobFormValues } from "@/components/modules/employer/create-job/CreateJobForm";
import WorkersRequiredModal from "@/components/modules/employer/create-job/WorkersRequiredModal";

const TRADE_OPTIONS = [
  { label: "Groundworker", value: "groundworker" },
  { label: "Labourer", value: "labourer" },
  { label: "Carpenter", value: "carpenter" },
  { label: "Electrician", value: "electrician" },
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
  const [applicationDeadline, setApplicationDeadline] = useState<Date | null>(
    null,
  );
  const [showWorkersModal, setShowWorkersModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState("groundworker");
  const [workersNeeded, setWorkersNeeded] = useState(3);

  const { origin } = useLocalSearchParams();

  const submitJob = handleSubmit(() => {
    router.replace("/tabs/(employer-tabs)" as any);
  });

  const closeWorkersModal = () => setShowWorkersModal(false);

  const publishWorkers = () => {
    closeWorkersModal();
  };

  const onBackPress = () => {
    if (origin === "worker") {
      router.replace("/tabs/(worker-tabs)" as any);
      return;
    }
    if (origin === "employer") {
      router.replace("/tabs/(employer-tabs)" as any);
      return;
    }

    router.back();
  };

  return (
    <ScreenWrapper style={{
      marginBottom: 40
    }}>
      <StatusBar style="dark" />

      {/* Header */}
      <CreateJobHeader onBackPress={onBackPress} />

      {/* Form */}
      <CreateJobForm
        control={control}
        setShowWorkersModal={setShowWorkersModal}
        tradeOptions={TRADE_OPTIONS}
        workersNeeded={workersNeeded}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        applicationDeadline={applicationDeadline}
        setApplicationDeadline={setApplicationDeadline}
      />

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
          <Text className="text-neutral-900 font-extrabold text-sm">
            Discard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Workers Required Modal */}
      <WorkersRequiredModal
        showWorkersModal={showWorkersModal}
        closeWorkersModal={closeWorkersModal}
        selectedTrade={selectedTrade}
        setSelectedTrade={setSelectedTrade}
        workersNeeded={workersNeeded}
        setWorkersNeeded={setWorkersNeeded}
        publishWorkers={publishWorkers}
        TRADE_OPTIONS={TRADE_OPTIONS}
      />
    </ScreenWrapper>
  );
}
