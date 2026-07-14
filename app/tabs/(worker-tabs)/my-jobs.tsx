import { useState } from "react";
import {
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import SearchAndFilterInput from "@/components/modules/worker/my-jobs/SearchAndFilterInput";
import MyJobToggleChips from "@/components/modules/worker/my-jobs/MyJobToggleChips";
import JobsList from "@/components/modules/worker/my-jobs/JobsList";
import CommonHeader from "@/components/modules/common/CommonHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

export default function MyJobsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "active" | "completed" | "cancelled"
  >("active");
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenJobDetails = (id: string, status: string) => {
    if (status === "completed") {
      router.push(`/screens/completed-jobs/${id}` as any);
    } else if (status === "cancelled") {
      router.push(`/screens/cancelled-jobs/${id}` as any);
    } else {
      router.push(`/screens/active-jobs/${id}` as any);
    }
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <CommonHeader headerTitle="My Jobs" />

      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search / Filter Input */}
        <SearchAndFilterInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Toggle Chips */}
        <MyJobToggleChips activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Jobs List */}
        <JobsList
          handleOpenJobDetails={handleOpenJobDetails}
          activeTab={activeTab}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}
