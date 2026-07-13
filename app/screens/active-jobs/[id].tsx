import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  Bell,
  Bookmark,
  MapPin,
  Users,
  Calendar,
  Clock,
  Briefcase,
  Mail,
  Phone,
  Headphones,
  X,
  ChevronDown,
  Check,
  Info,
  ChevronRight,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const EMPLOYER_WORKERS = [
  { id: "1", name: "James Hartley", progress: "Day 3 of 20" },
  { id: "2", name: "James Hartley", progress: "Day 3 of 20" },
  { id: "3", name: "James Hartley", progress: "Day 3 of 20" },
];

const EMPLOYER_SCHEDULE = [
  { label: "Start Date", value: "3 Jun 2026" },
  { label: "End date", value: "28 Jun 2026" },
  { label: "Hours", value: "07:30 - 17:00" },
  { label: "Per Week", value: "5 Days" },
];

const EMPLOYER_JOB_DETAILS = {
  title: "Labourer",
  company: "Tech Innovators Inc.",
  statusBadge: "Day 3 of 20",
  location: "Shoreditch - 1.2 mi away",
  team: "2 developers, 1 designer",
  duration: "12 Jun - 1 month",
};

const EMPLOYER_UPCOMING_JOB_DETAILS = {
  title: "Labourer",
  company: "Tech Innovators Inc.",
  rate: "$80 - $120/hour",
  marketRate: "Market Rate",
  location: "Shoreditch - 1.2 mi away",
  team: "2 developers, 1 designer",
  duration: "12 Jun - 1 month",
};

const EMPLOYER_UPCOMING_APPLICANTS = [
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
];

export default function ActiveJobDetailScreen() {
  const router = useRouter();
  const { id, origin, status } = useLocalSearchParams<{
    id?: string;
    origin?: string;
    status?: string;
  }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const statusRoute = Array.isArray(status) ? status[0] : status;
  const employerJobStatus = statusRoute === "upcoming" ? "upcoming" : "active";

  const [activeSubTab, setActiveSubTab] = useState<
    "schedule" | "summary" | "policy"
  >("schedule");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("Select Week");
  const [mondayHrs, setMondayHrs] = useState("");
  const [tuesdayHrs, setTuesdayHrs] = useState("");
  const [wednesdayHrs, setWednesdayHrs] = useState("");
  const [thursdayHrs, setThursdayHrs] = useState("");
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalState, setSupportModalState] = useState<
    "form" | "submitted"
  >("form");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportDescription, setSupportDescription] = useState("");

  const jobDetails = {
    title: "Labourer",
    company: "Tech Innovators Inc.",
    statusBadge: "Day 3 of 20",
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

  const mockWeeklyWork = [
    { week: "Week 1", dates: "12th - 16th July", status: "Completed" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
    { week: "Week 1", dates: "12th - 16th July", status: "Approved" },
  ];

  const openWorkerDetails = (workerId: string) => {
    router.push({
      pathname: "/screens/worker-details/[id]",
      params: { id: workerId, origin: "employer" },
    });
  };

  const handleNavigateBack = () => {
    if (originRoute === "employer") {
      router.push({
        pathname: "/tabs/(employer-tabs)/my-jobs",
      });
      return;
    }
    if (originRoute === "worker") {
      router.push({
        pathname: "/tabs/(worker-tabs)/my-jobs",
      });
      return;
    }
    router.back();
  };

  if (originRoute === "employer") {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#F8FAFC" }}
        edges={["top"]}
      >
        <View
          style={{ backgroundColor: Colors.common.BRAND }}
          className="pb-6 pt-4 px-5 rounded-b-[24px] shadow-lg shadow-orange-500/10"
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => handleNavigateBack()}
              className="flex-row items-center gap-1.5 active:opacity-75"
            >
              <ChevronLeft size={19} color="#FFFFFF" />
              <Text className="text-white text-[17px] font-extrabold">
                {employerJobStatus === "upcoming" ? "UpcomingJobs" : "Active Jobs"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/18 items-center justify-center border border-white/15 active:opacity-75">
              <Bell color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 bg-neutral-50"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="px-4 pt-4">
            {employerJobStatus === "active" ? (
              <>
                <View className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row items-center gap-3">
                      <View className="w-11 h-11 bg-blue-600 rounded-xl items-center justify-center">
                        <Briefcase size={20} color="#FFFFFF" />
                      </View>
                      <View>
                        <Text className="text-neutral-900 text-base font-extrabold">
                          {EMPLOYER_JOB_DETAILS.title}
                        </Text>
                        <Text className="text-neutral-500 text-xs font-medium">
                          {EMPLOYER_JOB_DETAILS.company}
                        </Text>
                      </View>
                    </View>

                    <View className="bg-orange-50 px-2.5 py-1 rounded-lg">
                      <Text
                        style={{ color: Colors.common.BRAND }}
                        className="text-[10px] font-bold"
                      >
                        {EMPLOYER_JOB_DETAILS.statusBadge}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-3 border-t border-neutral-100 gap-2.5">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={13} color="#C81E1E" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_JOB_DETAILS.location}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Users size={13} color="#737373" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_JOB_DETAILS.team}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Calendar size={13} color="#737373" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_JOB_DETAILS.duration}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-neutral-900 text-sm font-extrabold mb-3">
                    Workers
                  </Text>
                  <View className="gap-3">
                    {EMPLOYER_WORKERS.map((worker) => (
                      <TouchableOpacity
                        key={worker.id}
                        onPress={() => openWorkerDetails(worker.id)}
                        activeOpacity={0.9}
                        className="bg-white rounded-2xl border border-neutral-100 px-3 py-3.5 shadow-sm"
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center gap-3">
                            <Image
                              source={{
                                uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
                              }}
                              className="w-10 h-10 rounded-full"
                            />
                            <View>
                              <Text className="text-neutral-900 text-sm font-bold">
                                {worker.name}
                              </Text>
                              <Text className="text-neutral-400 text-xs mt-0.5">
                                {worker.progress}
                              </Text>
                            </View>
                          </View>

                          <View className="flex-row items-center gap-1">
                            <Text className="text-neutral-500 text-xs font-medium">
                              Update Timesheet
                            </Text>
                            <ChevronRight size={16} color="#737373" />
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mt-5">
                  <Text className="text-neutral-900 text-sm font-extrabold mb-3">
                    Project Schedule
                  </Text>
                  <View className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                    {EMPLOYER_SCHEDULE.map((item, index) => (
                      <View
                        key={item.label}
                        className={`flex-row items-center justify-between px-4 py-4 ${index < EMPLOYER_SCHEDULE.length - 1 ? "border-b border-neutral-100" : ""}`}
                      >
                        <Text className="text-neutral-400 text-sm">
                          {item.label}
                        </Text>
                        <Text className="text-neutral-700 text-sm font-medium">
                          {item.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            ) : (
              <>
                <View className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row items-center gap-3 flex-1 pr-3">
                      <View className="w-11 h-11 bg-blue-600 rounded-xl items-center justify-center">
                        <Briefcase size={20} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-900 text-base font-extrabold">
                          {EMPLOYER_UPCOMING_JOB_DETAILS.title}
                        </Text>
                        <Text className="text-neutral-500 text-xs font-medium">
                          {EMPLOYER_UPCOMING_JOB_DETAILS.company}
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-neutral-700 text-sm font-semibold">
                        {EMPLOYER_UPCOMING_JOB_DETAILS.rate}
                      </Text>
                      <Text
                        style={{ color: Colors.common.BRAND }}
                        className="text-xs font-medium mt-0.5"
                      >
                        {EMPLOYER_UPCOMING_JOB_DETAILS.marketRate}
                      </Text>
                    </View>
                  </View>

                  <View className="pt-3 border-t border-neutral-100 gap-2.5">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={13} color="#C81E1E" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_UPCOMING_JOB_DETAILS.location}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Users size={13} color="#737373" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_UPCOMING_JOB_DETAILS.team}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Calendar size={13} color="#737373" />
                      <Text className="text-neutral-500 text-xs">
                        {EMPLOYER_UPCOMING_JOB_DETAILS.duration}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mt-5">
                  <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-neutral-900 text-[18px] font-semibold">
                      Applicants
                    </Text>
                    <ChevronRight size={18} color="#111827" />
                  </View>

                  <View className="gap-4">
                    {EMPLOYER_UPCOMING_APPLICANTS.map((applicant) => (
                      <View
                        key={applicant.id}
                        className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
                      >
                        <View className="px-4 pt-4 pb-3">
                          <View className="flex-row items-start justify-between">
                            <View className="flex-row items-center gap-3 flex-1 pr-3">
                              <Image
                                source={{
                                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
                                }}
                                className="w-11 h-11 rounded-full"
                              />
                              <View className="flex-1">
                                <Text className="text-neutral-950 text-base font-bold">
                                  {applicant.name}
                                </Text>
                                <Text className="text-neutral-500 text-sm">
                                  {applicant.role}
                                </Text>
                              </View>
                            </View>

                            <TouchableOpacity className="p-1.5">
                              <Bookmark size={18} color="#737373" />
                            </TouchableOpacity>
                          </View>

                          <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                            <View className="flex-row items-center gap-2">
                              <MapPin size={14} color="#C81E1E" />
                              <Text className="text-neutral-500 text-xs">
                                {applicant.location}
                              </Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                              <Clock size={14} color="#737373" />
                              <Text className="text-neutral-500 text-xs">
                                {applicant.availability}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View className="flex-row items-center justify-between px-4 pb-4">
                          <View className="bg-orange-50 px-3 py-1.5 rounded-md">
                            <Text
                              style={{ color: Colors.common.BRAND }}
                              className="text-xs font-medium"
                            >
                              {applicant.experience}
                            </Text>
                          </View>

                          <View className="flex-row items-center gap-3">
                            <TouchableOpacity
                              onPress={() => openWorkerDetails(applicant.id)}
                            >
                              <Text className="text-neutral-700 text-xs font-medium">
                                View Details
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => openWorkerDetails(applicant.id)}
                              style={{ backgroundColor: Colors.common.GRAY_DARK }}
                              className="px-4 py-2 rounded-md active:opacity-90"
                            >
                              <Text className="text-white text-xs font-medium">
                                Accept
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {employerJobStatus === "active" && (
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-4 flex-row gap-3">
            <TouchableOpacity
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="flex-1 py-4 rounded-xl items-center justify-center active:opacity-90"
            >
              <Text className="text-white text-sm font-semibold">Cancel Job</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-4 rounded-xl border border-neutral-200 bg-white items-center justify-center active:opacity-75">
              <Text className="text-neutral-700 text-sm font-medium">
                Dispute
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pb-6 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-extrabold tracking-tight">
              Active Jobs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-neutral-50/50"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4 pb-20">
          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-6">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                  <Briefcase size={22} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-950 font-extrabold text-base">
                    {jobDetails.title}
                  </Text>
                  <Text className="text-neutral-500 text-xs font-semibold">
                    {jobDetails.company}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <View
                  style={{ backgroundColor: Colors.common.BRAND_LIGHT }}
                  className="px-2.5 py-1 rounded-full"
                >
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="text-[10px] font-extrabold"
                  >
                    {jobDetails.statusBadge}
                  </Text>
                </View>
              </View>
            </View>

            <View className="gap-2.5 pt-3 border-t border-neutral-50">
              <View className="flex-row items-center gap-2">
                <MapPin size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {jobDetails.location}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Users size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {jobDetails.team}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Calendar size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {jobDetails.duration}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-6">
            <Text className="text-neutral-900 font-extrabold text-base mb-4">
              Employer Contact
            </Text>

            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 justify-center items-center">
                <Text className="text-slate-700 font-extrabold text-sm">
                  JH
                </Text>
              </View>
              <View>
                <Text className="text-neutral-900 font-extrabold text-sm">
                  {jobDetails.contactName}
                </Text>
                <Text className="text-neutral-400 text-xs font-semibold">
                  {jobDetails.contactTitle}
                </Text>
              </View>
            </View>

            <View className="gap-2.5 pt-3 border-t border-neutral-50">
              <View className="flex-row items-center gap-2.5">
                <Mail size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {jobDetails.contactEmail}
                </Text>
              </View>
              <View className="flex-row items-center gap-2.5">
                <Phone size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {jobDetails.contactPhone}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2 mb-6">
            <TouchableOpacity
              onPress={() => setActiveSubTab("schedule")}
              style={
                activeSubTab === "schedule"
                  ? { backgroundColor: Colors.common.GRAY_DARK }
                  : { backgroundColor: "#E5E5E52B" }
              }
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === "schedule" ? "" : "border border-neutral-200/60"}`}
            >
              <Text
                className={`text-xs font-bold ${activeSubTab === "schedule" ? "text-white" : "text-neutral-500"}`}
              >
                Schedule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveSubTab("summary")}
              style={
                activeSubTab === "summary"
                  ? { backgroundColor: Colors.common.GRAY_DARK }
                  : { backgroundColor: "#E5E5E52B" }
              }
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === "summary" ? "" : "border border-neutral-200/60"}`}
            >
              <Text
                className={`text-xs font-bold ${activeSubTab === "summary" ? "text-white" : "text-neutral-500"}`}
              >
                Work Summary
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveSubTab("policy")}
              style={
                activeSubTab === "policy"
                  ? { backgroundColor: Colors.common.GRAY_DARK }
                  : { backgroundColor: "#E5E5E52B" }
              }
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === "policy" ? "" : "border border-neutral-200/60"}`}
            >
              <Text
                className={`text-xs font-bold ${activeSubTab === "policy" ? "text-white" : "text-neutral-500"}`}
              >
                Worker Policy
              </Text>
            </TouchableOpacity>
          </View>

          {activeSubTab === "schedule" && (
            <View>
              <Text className="text-neutral-900 font-extrabold text-base mb-3.5">
                Project Schedule
              </Text>
              <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">
                    Start Date
                  </Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">
                    {jobDetails.startDate}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">
                    End date
                  </Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">
                    {jobDetails.endDate}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">
                    Hours
                  </Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">
                    {jobDetails.hours}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">
                    Per Week
                  </Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">
                    {jobDetails.daysPerWeek}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center p-4">
                  <Text className="text-neutral-400 text-sm font-semibold">
                    Next invoice
                  </Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">
                    {jobDetails.nextInvoice}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {activeSubTab === "summary" && (
            <View>
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-neutral-900 font-extrabold text-base">
                  Work Summary
                </Text>
                <TouchableOpacity
                  onPress={() => setShowApprovalModal(true)}
                  style={{ borderColor: Colors.common.BRAND }}
                  className="border px-3 py-1.5 rounded-xl active:opacity-75 bg-white"
                >
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="text-xs font-bold"
                  >
                    Request Approval
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden divide-y divide-neutral-50">
                {mockWeeklyWork.map((item, idx) => (
                  <View
                    key={idx}
                    className="flex-row justify-between items-center p-4"
                  >
                    <View>
                      <Text className="text-neutral-800 font-extrabold text-sm">
                        {item.week}
                      </Text>
                      <Text className="text-neutral-400 text-xs font-semibold mt-0.5">
                        {item.dates}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${item.status === "Approved" ? "bg-green-50" : "bg-neutral-100"}`}
                    >
                      <Text
                        className={`text-[10px] font-extrabold ${item.status === "Approved" ? "text-green-600" : "text-neutral-500"}`}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeSubTab === "policy" && (
            <View>
              <Text className="text-neutral-900 font-extrabold text-base mb-3.5">
                Work Summary
              </Text>

              <View className="gap-3.5">
                <View className="bg-emerald-50/60 border border-emerald-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5" />
                  <View>
                    <Text className="text-emerald-850 font-extrabold text-sm">
                      Free cancellation
                    </Text>
                    <Text className="text-emerald-600 text-xs font-semibold mt-0.5">
                      More than 48 hours before start
                    </Text>
                  </View>
                </View>

                <View className="bg-amber-50/60 border border-amber-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5" />
                  <View>
                    <Text className="text-amber-850 font-extrabold text-sm">
                      50% charge
                    </Text>
                    <Text className="text-amber-600 text-xs font-semibold mt-0.5">
                      Between 48-24 hours before start
                    </Text>
                  </View>
                </View>

                <View className="bg-red-50/60 border border-red-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5" />
                  <View>
                    <Text className="text-red-855 font-extrabold text-sm">
                      Full charge
                    </Text>
                    <Text className="text-red-600 text-xs font-semibold mt-0.5">
                      Within 24 hours of start
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setSupportModalState("form");
          setShowSupportModal(true);
        }}
        style={{ backgroundColor: Colors.common.BRAND }}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-orange-500/25 active:opacity-90 z-20"
      >
        <Headphones size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSupportModal}
        onRequestClose={() => setShowSupportModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          {supportModalState === "form" ? (
            <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
                  Message Support
                </Text>
                <TouchableOpacity
                  onPress={() => setShowSupportModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
                >
                  <X size={16} color="#333333" />
                </TouchableOpacity>
              </View>

              <ScrollView
                className="max-h-[450px] mb-6"
                showsVerticalScrollIndicator={false}
              >
                <View className="gap-5 pr-1">
                  <View className="border border-dashed border-neutral-300 rounded-3xl p-6 bg-neutral-50/50 items-center justify-center">
                    <Text className="text-neutral-400 text-[10px] font-extrabold tracking-wider uppercase mb-1">
                      Upload PDF or Photo
                    </Text>
                    <Text className="text-neutral-400 text-[9px] font-semibold mb-4">
                      JPG - PNG - PDF - MAX 10MB
                    </Text>
                    <TouchableOpacity className="bg-neutral-950 px-5 py-2.5 rounded-full active:opacity-85 shadow-sm">
                      <Text className="text-white text-xs font-extrabold">
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                      Subject
                    </Text>
                    <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3">
                      <TextInput
                        className="text-neutral-800 text-sm font-semibold py-0"
                        placeholder="Enter your subject"
                        placeholderTextColor="#A3A3A3"
                        value={supportSubject}
                        onChangeText={setSupportSubject}
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                      Description
                    </Text>
                    <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3">
                      <TextInput
                        className="text-neutral-800 text-sm font-semibold py-0"
                        placeholder="Describe the issue"
                        placeholderTextColor="#A3A3A3"
                        value={supportDescription}
                        onChangeText={setSupportDescription}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={() => setSupportModalState("submitted")}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
              >
                <Text className="text-white font-extrabold text-sm">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100 items-center">
              <View className="w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6 border border-green-100">
                <View className="w-14 h-14 bg-green-500 rounded-full items-center justify-center shadow-lg shadow-green-500/25">
                  <Check size={28} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>

              <Text className="text-neutral-950 font-extrabold text-xl tracking-tight mb-1.5">
                Submitted
              </Text>
              <Text className="text-neutral-400 text-xs font-semibold mb-6">
                Ticket ID: #SUP-2045
              </Text>

              <View className="bg-orange-50/80 border border-orange-100/50 rounded-2xl p-4 flex-row items-center gap-3 w-full mb-8">
                <View className="w-7 h-7 bg-orange-500/10 rounded-full justify-center items-center">
                  <Info size={14} color="#F97316" />
                </View>
                <Text className="flex-1 text-orange-800 text-xs font-semibold leading-relaxed">
                  Our admin team will review your issue and respond shortly.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowSupportModal(false)}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md"
              >
                <Text className="text-white font-extrabold text-sm">
                  Go to dashboard
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showApprovalModal}
        onRequestClose={() => setShowApprovalModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
                Request approval
              </Text>
              <TouchableOpacity
                onPress={() => setShowApprovalModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
              >
                <X size={16} color="#333333" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="max-h-[400px] mb-6"
              showsVerticalScrollIndicator={false}
            >
              <View className="gap-4.5 pr-1">
                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                    Week
                  </Text>
                  <TouchableOpacity className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85">
                    <Text className="text-neutral-800 text-sm font-semibold">
                      {selectedWeek}
                    </Text>
                    <ChevronDown size={18} color="#737373" />
                  </TouchableOpacity>
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
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
            >
              <Text className="text-white font-extrabold text-sm">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
