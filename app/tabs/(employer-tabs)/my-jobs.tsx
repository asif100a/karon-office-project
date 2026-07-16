import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Bell,
  Briefcase,
  Calendar,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import ScreenHeader from "@/components/layout/ScreenHeader";
import CommonHeader from "@/components/modules/common/CommonHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SearchAndFilterInput from "@/components/modules/common/job/SearchAndFilterInput";
import MyJobToggleChips from "@/components/modules/employer/my-jobs/MyJobToggleChips";
import MyJobActiveCards from "@/components/modules/employer/my-jobs/MyJobActiveCards";
import AvatarStack from "@/components/modules/employer/my-jobs/_ui/AvatarStack";
import MyJobUpcomingCards from "@/components/modules/employer/my-jobs/MyJobUpcomingCards";
import MyJobCompletedOrCanceledCards from "@/components/modules/employer/my-jobs/MyJobCompletedOrCanceledCards";

type JobStatus = "active" | "upcoming" | "completed" | "cancelled";

type JobCard = {
  id: string;
  title: string;
  company: string;
  badge: string;
  location: string;
  team: string;
  duration: string;
  status: JobStatus;
  rate?: string;
  applications?: string;
  applicants?: Array<{
    id: string;
    name: string;
    role: string;
    location: string;
    availability: string;
    experience: string;
  }>;
};

const ACTIVE_JOBS: JobCard[] = [
  {
    id: "active-1",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Day 3 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "active",
    applications: "+ 21 Application",
  },
  {
    id: "active-2",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Day 3 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "active",
    applications: "+ 21 Application",
  },
  {
    id: "active-3",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Day 3 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "active",
    applications: "+ 21 Application",
  },
];

const UPCOMING_JOBS: JobCard[] = [
  {
    id: "upcoming-1",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "$80 - $120/hour",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "upcoming",
    rate: "Market Rate",
    applicants: [
      {
        id: "1",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
      {
        id: "2",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
      {
        id: "3",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
    ],
  },
  {
    id: "upcoming-2",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "$80 - $120/hour",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "upcoming",
    rate: "Market Rate",
    applicants: [
      {
        id: "1",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
      {
        id: "2",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
      {
        id: "3",
        name: "Michael Turner",
        role: "Labour",
        location: "Shoreditch - 1.2 mi away",
        availability: "Available 8am - 5pm",
        experience: "8 Years Experience",
      },
    ],
  },
];

const COMPLETED_JOBS: JobCard[] = [
  {
    id: "completed-1",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Day 20 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "completed",
  },
  {
    id: "completed-2",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Day 20 of 20",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "completed",
  },
];

const CANCELLED_JOBS: JobCard[] = [
  {
    id: "cancelled-1",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    badge: "Cancelled",
    location: "Shoreditch - 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun - 1 month",
    status: "cancelled",
  },
];

export default function EmployerMyJobsScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<JobStatus>("active");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const requestedTab = Array.isArray(tab) ? tab[0] : tab;
    if (
      requestedTab === "active" ||
      requestedTab === "upcoming" ||
      requestedTab === "completed" ||
      requestedTab === "cancelled"
    ) {
      setActiveTab(requestedTab);
    }
  }, [tab]);

  const jobsByTab: Record<JobStatus, JobCard[]> = {
    active: ACTIVE_JOBS,
    upcoming: UPCOMING_JOBS,
    completed: COMPLETED_JOBS,
    cancelled: CANCELLED_JOBS,
  };

  const filteredJobs = jobsByTab[activeTab].filter((job) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }

    const haystack = [
      job.title,
      job.company,
      job.location,
      job.team,
      job.duration,
      job.badge,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  const openJobDetails = (jobId: string) => {
    if (activeTab === "completed") {
      router.push({
        pathname: "/screens/completed-jobs/[id]",
        params: { id: jobId, origin: "employer", status: activeTab },
      });
      return;
    }

    if (activeTab === "cancelled") {
      router.push({
        pathname: "/screens/cancelled-jobs/[id]",
        params: { id: jobId, origin: "employer", status: activeTab },
      });
      return;
    }

    router.push({
      pathname: "/screens/active-jobs/[id]",
      params: { id: jobId, origin: "employer", status: activeTab },
    });
  };

  return (
    <ScreenWrapper>
      <CommonHeader headerTitle="My Jobs" />

      <ScrollView
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Search & Filter Input */}
        <SearchAndFilterInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <MyJobToggleChips activeTab={activeTab} setActiveTab={setActiveTab} />

        <View className="mt-6 gap-4">
          {activeTab === "active" && (
            <MyJobActiveCards
              filteredJobs={filteredJobs}
              openJobDetails={openJobDetails}
            />
          )}

          {activeTab === "upcoming" && (
            <MyJobUpcomingCards
              filteredJobs={filteredJobs}
              openJobDetails={openJobDetails}
            />
          )}

          {(activeTab === "completed" || activeTab === "cancelled") && (
            <MyJobCompletedOrCanceledCards
              filteredJobs={filteredJobs}
              openJobDetails={openJobDetails}
              activeTab={activeTab}
            />
          )}

          {filteredJobs.length === 0 && (
            <View className="bg-white rounded-2xl border border-neutral-100 shadow-sm px-5 py-8 items-center">
              <Text className="text-neutral-900 text-base font-bold">
                No jobs found
              </Text>
              <Text className="text-neutral-500 text-sm mt-2 text-center">
                Try a different search or switch tabs.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
