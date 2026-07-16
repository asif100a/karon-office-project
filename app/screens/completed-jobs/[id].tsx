import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CommonHeader from "@/components/modules/common/CommonHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import CompletedJobDetails from "@/components/modules/common/completed-jobs/CompletedJobDetails";
import CompletedEmployerContact from "@/components/modules/common/completed-jobs/CompletedEmployerContact";
import CompletedToggleChips from "@/components/modules/common/completed-jobs/CompletedToggleChips";
import CompletedSchedule from "@/components/modules/common/completed-jobs/CompletedSchedule";
import CompletedWorkSummary from "@/components/modules/common/completed-jobs/CompletedWorkSummary";
import {
  getDashboardRouteForRole,
  normalizeUserRole,
} from "@/constants/Routes";

export default function CompletedJobDetailScreen() {
  const router = useRouter();
  const { id, origin, status } = useLocalSearchParams<{
    id?: string;
    origin?: string;
    status?: string;
  }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const statusRoute = Array.isArray(status) ? status[0] : status;

  const [activeSubTab, setActiveSubTab] = useState<"schedule" | "summary">(
    "schedule",
  );

  const jobDetails = {
    title: "Labourer",
    company: "Tech Innovators Inc.",
    statusBadge: "Day 20 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    contactName: "James Hartley",
    contactTitle: "Director - Hartley Construction",
    contactEmail: "olivia@untitledui.com",
    contactPhone: "+44 723 456 7891",
    startDate: "3 Jun 2026",
    endDate: "28 Jun 2026",
    hours: "07:30 - 17:00",
    daysPerWeek: "5 Days",
    nextInvoice: "Friday 7 Jun",
  };

  const handleNavigateBack = () => {
    if (originRoute === "employer") {
      router.replace({
        pathname: "/tabs/(employer-tabs)/my-jobs",
        params: { tab: statusRoute ?? "completed" },
      });
      return;
    }

    if (originRoute === "worker") {
      router.replace({
        pathname: "/tabs/(worker-tabs)/my-jobs",
        params: { tab: statusRoute ?? "completed" },
      });
      return;
    }

    if (originRoute) {
      router.replace(getDashboardRouteForRole(normalizeUserRole(originRoute)));
      return;
    }

    router.back();
  };

  return (
    <ScreenWrapper>
      <CommonHeader
        headerTitle="Completed Jobs"
        withBackButton
        onPress={handleNavigateBack}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-12">
          {/* Job Details */}
          <CompletedJobDetails jobDetails={jobDetails} />

          {/* Employer Contact */}
          <CompletedEmployerContact jobDetails={jobDetails} />

          {/* Toggle Chips */}
          <CompletedToggleChips activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />

          {activeSubTab === "schedule" && (
            <CompletedSchedule  jobDetails={jobDetails} />
          )}

          {activeSubTab === "summary" && (
            <CompletedWorkSummary />
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
