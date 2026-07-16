import { useEffect, useState } from "react";
import {
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchAndFilterInput from "@/components/modules/common/job/SearchAndFilterInput";
import MyJobToggleChips from "@/components/modules/worker/my-jobs/MyJobToggleChips";
import JobsList from "@/components/modules/worker/my-jobs/JobsList";
import CommonHeader from "@/components/modules/common/CommonHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

export default function MyJobsScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<
    "active" | "completed" | "cancelled"
  >("active");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const requestedTab = Array.isArray(tab) ? tab[0] : tab;
    if (
      requestedTab === "active" ||
      requestedTab === "completed" ||
      requestedTab === "cancelled"
    ) {
      setActiveTab(requestedTab);
    }
  }, [tab]);

  const handleOpenJobDetails = (id: string, status: string) => {
    if (status === "completed") {
      router.push({
        pathname: "/screens/completed-jobs/[id]",
        params: { id, origin: "worker", status: activeTab },
      });
    } else if (status === "cancelled") {
      router.push({
        pathname: "/screens/cancelled-jobs/[id]",
        params: { id, origin: "worker", status: activeTab },
      });
    } else {
      router.push({
        pathname: "/screens/active-jobs/[id]",
        params: { id, origin: "worker", status: activeTab },
      });
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
