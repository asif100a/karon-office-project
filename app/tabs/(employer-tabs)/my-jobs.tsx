import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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

function AvatarStack() {
  return (
    <View className="flex-row items-center">
      <View className="w-6 h-6 rounded-full border-2 border-white bg-slate-300 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-slate-700">K</Text>
      </View>
      <View className="-ml-2 w-6 h-6 rounded-full border-2 border-white bg-slate-600 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-white">K</Text>
      </View>
      <View className="-ml-2 w-6 h-6 rounded-full border-2 border-white bg-slate-800 items-center justify-center">
        <Text className="text-[10px] font-extrabold text-white">K</Text>
      </View>
    </View>
  );
}

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

    const haystack = [job.title, job.company, job.location, job.team, job.duration, job.badge]
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

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-white border border-neutral-200/80 rounded-xl px-4 py-0">
            <Search size={18} color="#A3A3A3" className="mr-2" />
            <TextInput
              className="flex-1 text-neutral-800 text-sm font-medium py-0"
              placeholder="Search Offers"
              placeholderTextColor="#A3A3A3"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white border border-neutral-200/80 rounded-xl items-center justify-center active:opacity-85">
            <SlidersHorizontal size={18} color="#333333" />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2.5 mt-5">
          {([
            { key: "active", label: "Active Jobs" },
            { key: "upcoming", label: "Upcoming" },
            { key: "completed", label: "Completed" },
            { key: "cancelled", label: "Cancelled" },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={isActive ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: "#FFFFFF" }}
                className={`px-4 py-2.5 rounded-lg ${isActive ? "" : "border border-neutral-200/80"}`}
              >
                <Text className={`text-xs font-bold ${isActive ? "text-white" : "text-neutral-500"}`}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="mt-6 gap-4">
          {activeTab === "active" &&
            filteredJobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                onPress={() => openJobDetails(job.id)}
                activeOpacity={0.9}
                className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden"
              >
                <View className="px-4 pt-4 pb-3">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row items-center gap-3 flex-1 pr-3">
                      <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                        <Briefcase size={22} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-950 text-base font-bold">{job.title}</Text>
                        <Text className="text-neutral-500 text-sm">{job.company}</Text>
                      </View>
                    </View>

                    <View className="bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-md">
                      <Text style={{ color: Colors.common.BRAND }} className="text-[10px] font-extrabold">
                        {job.badge}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={14} color="#C81E1E" />
                      <Text className="text-neutral-500 text-xs">{job.location}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Users size={14} color="#737373" />
                      <Text className="text-neutral-500 text-xs">{job.team}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Calendar size={14} color="#737373" />
                      <Text className="text-neutral-500 text-xs">{job.duration}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between px-4 pb-4">
                  <View className="flex-row items-center gap-2">
                    <AvatarStack />
                    <Text className="text-neutral-500 text-xs font-medium">{job.applications}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => openJobDetails(job.id)}
                    style={{ backgroundColor: Colors.common.GRAY_DARK }}
                    className="px-4 py-2 rounded-md active:opacity-90"
                  >
                    <Text className="text-white text-xs font-medium">View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

          {activeTab === "upcoming" &&
            filteredJobs.map((job) => (
              <TouchableOpacity
                key={job.id}
                onPress={() => openJobDetails(job.id)}
                activeOpacity={0.9}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                <View className="px-4 pt-4 pb-3">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row items-center gap-3 flex-1 pr-3">
                      <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                        <Briefcase size={22} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-950 text-base font-bold">{job.title}</Text>
                        <Text className="text-neutral-500 text-sm">{job.company}</Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-neutral-700 text-sm font-semibold">{job.badge}</Text>
                      <Text style={{ color: Colors.common.BRAND }} className="text-xs font-semibold mt-0.5">
                        {job.rate}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={14} color="#C81E1E" />
                      <Text className="text-neutral-500 text-xs">{job.location}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Users size={14} color="#737373" />
                      <Text className="text-neutral-500 text-xs">{job.team}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Calendar size={14} color="#737373" />
                      <Text className="text-neutral-500 text-xs">{job.duration}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between px-4 pb-4">
                  <View className="flex-row items-center gap-2">
                    <AvatarStack />
                    <Text className="text-neutral-500 text-xs font-medium">+ 21 Application</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => openJobDetails(job.id)}
                    style={{ backgroundColor: Colors.common.GRAY_DARK }}
                    className="px-4 py-2 rounded-md active:opacity-90"
                  >
                    <Text className="text-white text-xs font-medium">View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}

          {(activeTab === "completed" || activeTab === "cancelled") &&
            filteredJobs.map((job) => {
              const isCompleted = activeTab === "completed";
              const isCancelled = activeTab === "cancelled";

              return (
                <TouchableOpacity
                  key={job.id}
                  onPress={() => openJobDetails(job.id)}
                  activeOpacity={0.9}
                  className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
                >
                  <View className="px-4 pt-4 pb-3">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-row items-center gap-3 flex-1 pr-3">
                        <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                          <Briefcase size={22} color="#FFFFFF" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-neutral-950 text-base font-bold">{job.title}</Text>
                          <Text className="text-neutral-500 text-sm">{job.company}</Text>
                        </View>
                      </View>

                      <View className="items-end">
                        <View
                          className={`px-2.5 py-1 rounded-full border ${
                            isCompleted
                              ? "bg-emerald-50 border-emerald-100"
                              : isCancelled
                                ? "bg-red-50 border-red-100"
                                : "bg-orange-50 border-orange-100"
                          }`}
                        >
                          <Text
                            className={`text-[10px] font-extrabold ${
                              isCompleted ? "text-emerald-500" : isCancelled ? "text-red-500" : "text-orange-500"
                            }`}
                          >
                            {job.badge}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                      <View className="flex-row items-center gap-2">
                        <MapPin size={14} color="#C81E1E" />
                        <Text className="text-neutral-500 text-xs">{job.location}</Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <Users size={14} color="#737373" />
                        <Text className="text-neutral-500 text-xs">{job.team}</Text>
                      </View>
                      <View className="flex-row items-center gap-2">
                        <Calendar size={14} color="#737373" />
                        <Text className="text-neutral-500 text-xs">{job.duration}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

          {filteredJobs.length === 0 && (
            <View className="bg-white rounded-2xl border border-neutral-100 shadow-sm px-5 py-8 items-center">
              <Text className="text-neutral-900 text-base font-bold">No jobs found</Text>
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
