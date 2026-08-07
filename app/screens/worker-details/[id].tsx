import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import {
  getDashboardRouteForRole,
  normalizeUserRole,
} from "@/constants/Routes";
import { StatusBar } from "expo-status-bar";
import WorkerDetailsHeader from "@/components/modules/worker/worker-details/WorkerDetailsHeader";
import WorkerDetailsEmptyState from "@/components/modules/worker/worker-details/WorkerDetailsEmptyState";
import WorkerInfo from "@/components/modules/worker/worker-details/WorkerInfo";
import ReviewComposer from "@/components/modules/worker/worker-details/ReviewComposer";
import WorkerDetailsStats from "@/components/modules/worker/worker-details/WorkerDetailsStats";
import WorkerDetailsDocuments from "@/components/modules/worker/worker-details/WorkerDetailsDocuments";
import WorkerDetailsWorkHistory from "@/components/modules/worker/worker-details/WorkerDetailsWorkHistory";
import WorkerDetailsRatingAndFeedback from "@/components/modules/worker/worker-details/WorkerDetailsRatingAndFeedback";
import WorkerDetailsReviews from "@/components/modules/worker/worker-details/WorkerDetailsReviews";
import WorkerRatingStars from "@/components/modules/worker/worker-details/_ui/WorkerRatingStars";
import { Image } from "expo-image";
import PLACEHOLDER_USER from "@/assets/images/placeholder/placeholder-user.png";
import { MapPin } from "lucide-react-native";
import WorkerApproveModal from "@/components/modules/employer/worker-details/WorkerApproveModal";

type WorkerDetail = {
  name: string;
  role: string;
  status: string;
  rating: string;
  reviews: string;
  location: string;
  stats: Array<{ label: string; value: string }>;
  about: string;
  documents: Array<{ id: string; name: string; size: string }>;
  workHistory: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    rating: string;
  }>;
  feedback: Array<{
    id: string;
    name: string;
    date: string;
    text: string;
    rating: string;
  }>;
};

const WORKER_DETAILS: Record<string, WorkerDetail> = {
  "1": {
    name: "James Mitchell",
    role: "Groundworker",
    status: "Available Now",
    rating: "4.8",
    reviews: "142 reviews",
    location: "Shoreditch • 2.4 mi away",
    stats: [
      { label: "Jobs Completed", value: "87" },
      { label: "Reliability", value: "98%" },
      { label: "Repeat Hires", value: "34" },
    ],
    about:
      "Highly experienced groundworker with over 8 years in the industry. Specialized in site preparation, drainage systems, and structural foundations. Known for punctuality and a focus on safety standards.",
    documents: [
      { id: "doc-1", name: "CSCS Gold Card", size: "1.1 MB" },
      { id: "doc-2", name: "CSCS Gold Card", size: "1.1 MB" },
      { id: "doc-3", name: "CSCS Gold Card", size: "1.1 MB" },
    ],
    workHistory: [
      {
        id: "wh-1",
        title: "Lead Groundworker",
        company: "BuildRight Group",
        duration: "3 months",
        rating: "5.0",
      },
      {
        id: "wh-2",
        title: "Groundworker",
        company: "Northline Builders",
        duration: "1 year",
        rating: "4.9",
      },
    ],
    feedback: [
      {
        id: "fb-1",
        name: "Jane Cooper",
        date: "20 Apr 2026",
        text: "Very professional and always arrived on time.",
        rating: "5.00",
      },
      {
        id: "fb-2",
        name: "Esther Howard",
        date: "20 Apr 2026",
        text: "Very professional and always arrived on time.",
        rating: "5.00",
      },
    ],
  },
  empty: {
    name: "",
    role: "",
    status: "",
    rating: "",
    reviews: "",
    location: "",
    stats: [],
    about: "",
    documents: [],
    workHistory: [],
    feedback: [],
  },
};

WORKER_DETAILS["2"] = WORKER_DETAILS["1"];
WORKER_DETAILS["3"] = WORKER_DETAILS["1"];

const TIMESHEET_WEEKS = [
  { id: "week-1", title: "Week 1", range: "12th - 16th July" },
  { id: "week-2", title: "Week 1", range: "12th - 16th July" },
  { id: "week-3", title: "Week 1", range: "12th - 16th July" },
  { id: "week-4", title: "Week 1", range: "12th - 16th July" },
];

function EmployerWorkerCard({ worker }: { worker: WorkerDetail }) {
  return (
    <View className="rounded-2xl bg-white px-4 py-5">
      <View className="items-center">
        <View className="relative">
          <Image
            source={PLACEHOLDER_USER}
            style={{ width: 88, height: 88 }}
            className="rounded-full"
          />
          <View className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1">
            <Text className="text-[10px] font-bold text-emerald-700">
              {worker.status}
            </Text>
          </View>
        </View>

        <Text className="mt-6 text-center text-[22px] font-extrabold text-neutral-900">
          {worker.name}
        </Text>
        <Text className="mt-1 text-base text-neutral-500">{worker.role}</Text>

        <View className="mt-3 flex-row items-center gap-2">
          <View className="flex-row">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-[#FF7A00]">
              <Text className="text-xs font-bold text-white">K</Text>
            </View>
            <View className="-ml-1.5 h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED]">
              <Text className="text-xs font-bold text-white">C</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1.5">
            <WorkerRatingStars rating={worker.rating} />
            <Text className="text-sm font-medium text-neutral-700">
              <Text className="font-extrabold">{worker.rating}</Text> (
              {worker.reviews})
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center gap-2">
          <MapPin size={14} color="#C81E1E" />
          <Text className="text-sm font-medium text-neutral-500">
            {worker.location}
          </Text>
        </View>
      </View>
    </View>
  );
}

function EmployerTimesheetCard({
  onApprovePress,
}: {
  onApprovePress: () => void;
}) {
  return (
    <View className="mt-4 rounded-2xl bg-white px-4 py-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-medium text-neutral-900">
          Update Timesheet
        </Text>
        <View className="rounded-full bg-[#FFF1E9] px-2.5 py-1">
          <Text
            style={{ color: Colors.common.BRAND }}
            className="text-xs font-medium"
          >
            Day 3 of 20
          </Text>
        </View>
      </View>

      {TIMESHEET_WEEKS.map((week, index) => (
        <View
          key={week.id}
          className={`flex-row items-center justify-between py-3 ${
            index < TIMESHEET_WEEKS.length - 1
              ? "border-b border-neutral-100"
              : ""
          }`}
        >
          <View className="flex-1 pr-3">
            <Text className="text-base font-semibold text-neutral-900">
              {week.title}
            </Text>
            <Text className="mt-0.5 text-sm text-neutral-500">
              {week.range}
            </Text>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="px-1 py-2 active:opacity-70">
              <Text className="text-sm font-medium text-neutral-600">View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onApprovePress}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 active:opacity-80"
            >
              <Text className="text-xs font-medium text-neutral-500">
                Approve
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function WorkerDetailsScreen() {
  const router = useRouter();
  const { id, origin } = useLocalSearchParams<{
    id?: string;
    origin?: string;
  }>();
  const workerId = Array.isArray(id) ? id[0] : id;
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const worker = workerId ? WORKER_DETAILS[workerId] : undefined;
  const showEmptyState = !worker || !worker.name;
  const isEmployerView = normalizeUserRole(originRoute) === "employer";

  const [showReviewComposer, setShowReviewComposer] = useState(false);
  const [reviewRating, setReviewRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("Select Week");
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);

  const goBackToOrigin = () => {
    // if (originRoute === "worker" || originRoute === "employer") {
    //   router.replace(getDashboardRouteForRole(normalizeUserRole(originRoute)));
    //   return;
    // }

    router.back();
  };

  const closeReviewComposer = () => {
    setShowReviewComposer(false);
    setReviewText("");
    setReviewRating(4);
  };

  const handleHeaderBack = () => {
    if (showApprovalModal) {
      setShowApprovalModal(false);
      setIsWeekDropdownOpen(false);
      return;
    }

    if (showReviewComposer) {
      closeReviewComposer();
      return;
    }

    goBackToOrigin();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      edges={["top"]}
    >
      <StatusBar style="dark" />

      <WorkerDetailsHeader handleHeaderBack={handleHeaderBack} />

      {showEmptyState ? (
        <WorkerDetailsEmptyState />
      ) : isEmployerView ? (
        <>
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 12, paddingBottom: 40 }}
          >
            <EmployerWorkerCard worker={worker} />
            <EmployerTimesheetCard
              onApprovePress={() => setShowApprovalModal(true)}
            />
          </ScrollView>

          <WorkerApproveModal
            visible={showApprovalModal}
            selectedWeek={selectedWeek}
            isWeekDropdownOpen={isWeekDropdownOpen}
            onToggleWeekDropdown={() =>
              setIsWeekDropdownOpen((current) => !current)
            }
            onSelectWeek={(weekDay) => {
              setSelectedWeek(weekDay);
              setIsWeekDropdownOpen(false);
            }}
            onClose={() => {
              setShowApprovalModal(false);
              setIsWeekDropdownOpen(false);
            }}
          />
        </>
      ) : (
        <>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="pt-6 pb-40">
              {/* Worker Info */}
              <WorkerInfo worker={worker} />

              <View className="px-5">
                {/* Review Composer */}
                {showReviewComposer ? (
                  <ReviewComposer
                    reviewRating={reviewRating}
                    setReviewRating={setReviewRating}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                  />
                ) : (
                  <>
                    <WorkerDetailsStats worker={worker} />

                    <View className="bg-white rounded-xl p-4 border border-neutral-200/80 mt-4">
                      <Text className="text-neutral-900 text-base font-extrabold mb-3">
                        About
                      </Text>
                      <Text className="text-neutral-600 text-sm leading-6">
                        {worker.about}
                      </Text>
                    </View>

                    {/* Documents */}
                    <WorkerDetailsDocuments worker={worker} />

                    {/* Work History */}
                    <WorkerDetailsWorkHistory worker={worker} />

                    {/* Rating & Feedback */}
                    <WorkerDetailsRatingAndFeedback
                      worker={worker}
                      setShowReviewComposer={setShowReviewComposer}
                    />

                    {/* Reviews */}
                    <WorkerDetailsReviews worker={worker} />
                  </>
                )}
              </View>
            </View>
          </ScrollView>

          {showReviewComposer ? (
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-4 flex-row gap-3">
              <TouchableOpacity
                onPress={closeReviewComposer}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
              >
                <Text className="text-white font-extrabold text-sm">
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeReviewComposer}
                className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
              >
                <Text className="text-neutral-900 font-extrabold text-sm">
                  Discard
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 pt-4 pb-16 flex-row gap-3">
              <TouchableOpacity
                onPress={goBackToOrigin}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
              >
                <Text className="text-white font-extrabold text-sm">
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goBackToOrigin}
                className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
              >
                <Text className="text-neutral-900 font-extrabold text-sm">
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
