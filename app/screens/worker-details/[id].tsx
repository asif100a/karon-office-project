import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  Star,
  FileText,
  Briefcase,
  ChevronRight,
  MessageCircle,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

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
  workHistory: Array<{ id: string; title: string; company: string; duration: string; rating: string }>;
  feedback: Array<{ id: string; name: string; date: string; text: string; rating: string }>;
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
      { id: "wh-1", title: "Lead Groundworker", company: "BuildRight Group", duration: "3 months", rating: "5.0" },
      { id: "wh-2", title: "Groundworker", company: "Northline Builders", duration: "1 year", rating: "4.9" },
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

function RatingStars({ rating }: { rating: string }) {
  const fullStars = Math.floor(Number(rating));
  return (
    <View className="flex-row items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          color={index < fullStars ? "#FBBF24" : "#D1D5DB"}
          fill={index < fullStars ? "#FBBF24" : "transparent"}
        />
      ))}
    </View>
  );
}

function ReviewComposer({
  reviewRating,
  setReviewRating,
  reviewText,
  setReviewText,
}: {
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
}) {
  return (
    <View className="flex-1">
      <View className="items-center justify-center flex-row gap-2 mt-4 mb-4">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;
          const active = value <= reviewRating;

          return (
            <TouchableOpacity
              key={value}
              onPress={() => setReviewRating(value)}
              className="p-1"
              activeOpacity={0.85}
            >
              <Star
                size={40}
                color={active ? "#FDBA3F" : "#D1D5DB"}
                fill={active ? "#FDBA3F" : "transparent"}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="bg-white border border-neutral-100 rounded-2xl shadow-sm px-4 py-3 min-h-[240px]">
        <TextInput
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="What Did You Think?....."
          placeholderTextColor="#6B7280"
          multiline
          textAlignVertical="top"
          className="text-neutral-900 text-sm leading-6 flex-1"
        />
      </View>
    </View>
  );
}

export default function WorkerDetailsScreen() {
  const router = useRouter();
  const { id, origin } = useLocalSearchParams<{ id?: string; origin?: string }>();
  const workerId = Array.isArray(id) ? id[0] : id;
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const worker = workerId ? WORKER_DETAILS[workerId] : undefined;
  const showEmptyState = !worker || !worker.name;

  const [showReviewComposer, setShowReviewComposer] = useState(false);
  const [reviewRating, setReviewRating] = useState(4);
  const [reviewText, setReviewText] = useState("");

  const goBackToOrigin = () => {
    if (originRoute === "worker") {
      router.replace("/tabs/(worker-tabs)" as any);
      return;
    }

    if (originRoute === "employer") {
      router.replace("/tabs/(employer-tabs)" as any);
      return;
    }

    router.back();
  };

  const closeReviewComposer = () => {
    setShowReviewComposer(false);
    setReviewText("");
    setReviewRating(4);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }} edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-neutral-100">
        <TouchableOpacity
          onPress={goBackToOrigin}
          className="w-10 h-10 rounded-full bg-neutral-50 items-center justify-center active:opacity-75"
        >
          <ArrowLeft size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-neutral-900 text-base font-extrabold">Worker Details</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-neutral-900 items-center justify-center active:opacity-85">
          <Bookmark size={18} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {showEmptyState ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm items-center w-full max-w-[320px]">
            <View className="w-20 h-20 rounded-full bg-orange-50 items-center justify-center mb-5">
              <MessageCircle size={34} color={Colors.common.BRAND} />
            </View>
            <Text className="text-neutral-900 text-xl font-extrabold">No reviews yet</Text>
            <Text className="text-neutral-500 text-sm text-center mt-3 leading-6">
              Be the first to share your thoughts and help others decide.
            </Text>
          </View>
        </View>
      ) : (
        <>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="px-4 pt-6 pb-28">
              <View className="items-center">
                <View className="relative">
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop" }}
                    className="w-24 h-24 rounded-full"
                  />
                  <View
                    style={{ left: "50%", transform: [{ translateX: -42 }] }}
                    className="absolute -bottom-2 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full"
                  >
                    <Text className="text-emerald-600 text-[10px] font-bold">{worker.status}</Text>
                  </View>
                </View>

                <Text className="text-neutral-900 text-3xl font-extrabold mt-6">{worker.name}</Text>
                <Text className="text-neutral-500 text-base mt-1">{worker.role}</Text>

                <View className="flex-row items-center gap-2 mt-2">
                  <RatingStars rating={worker.rating} />
                  <Text className="text-neutral-700 text-sm font-medium">
                    <Text className="font-extrabold">{worker.rating}</Text> ({worker.reviews})
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 mt-5">
                  <MapPin size={14} color="#C81E1E" />
                  <Text className="text-neutral-500 text-sm font-medium">{worker.location}</Text>
                </View>
              </View>

              {showReviewComposer ? (
                <ReviewComposer
                  reviewRating={reviewRating}
                  setReviewRating={setReviewRating}
                  reviewText={reviewText}
                  setReviewText={setReviewText}
                />
              ) : (
                <>
                  <View className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm mt-6">
                    <View className="flex-row">
                      {worker.stats.map((item, index) => (
                        <View
                          key={item.label}
                          className={`flex-1 items-center py-2 ${index < worker.stats.length - 1 ? "border-r border-neutral-100" : ""}`}
                        >
                          <Text className="text-neutral-900 text-3xl font-extrabold">{item.value}</Text>
                          <Text className="text-neutral-500 text-[11px] mt-1 text-center">{item.label}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm mt-4">
                    <Text className="text-neutral-900 text-base font-extrabold mb-3">About</Text>
                    <Text className="text-neutral-600 text-sm leading-6">{worker.about}</Text>
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="-mx-4 px-4 mt-4"
                    contentContainerStyle={{ gap: 10 }}
                  >
                    {worker.documents.map((document) => (
                      <View
                        key={document.id}
                        className="w-40 bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm"
                      >
                        <View className="w-9 h-9 rounded-xl bg-red-50 items-center justify-center mb-3">
                          <FileText size={18} color="#FB7185" />
                        </View>
                        <Text className="text-neutral-900 font-bold text-sm" numberOfLines={1}>
                          {document.name}
                        </Text>
                        <Text className="text-neutral-400 text-[11px] mt-1">{document.size}</Text>
                      </View>
                    ))}
                  </ScrollView>

                  <View className="mt-6">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-neutral-900 text-base font-extrabold">Work History</Text>
                      <TouchableOpacity className="flex-row items-center gap-1">
                        <Text className="text-neutral-900 text-xs font-bold">View All</Text>
                        <ChevronRight size={16} color="#111827" />
                      </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-3xl border border-neutral-100 shadow-sm divide-y divide-neutral-100">
                      {worker.workHistory.map((item) => (
                        <View key={item.id} className="px-4 py-4 flex-row items-start justify-between">
                          <View className="flex-row items-start gap-3 flex-1 pr-3">
                            <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
                              <Briefcase size={18} color="#64748B" />
                            </View>
                            <View className="flex-1">
                              <Text className="text-neutral-900 font-bold text-sm">{item.title}</Text>
                              <Text className="text-neutral-500 text-xs mt-0.5">
                                {item.company} • {item.duration}
                              </Text>
                            </View>
                          </View>
                          <View className="flex-row items-center gap-1">
                            <Star size={14} color="#FBBF24" fill="#FBBF24" />
                            <Text className="text-neutral-900 font-extrabold text-sm">{item.rating}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="mt-6">
                    <Text className="text-neutral-900 text-base font-extrabold mb-3">Rating & Feedback</Text>

                    <View className="bg-white rounded-3xl p-4 border border-neutral-100 shadow-sm">
                      <View className="flex-row items-center gap-4">
                        <View className="items-center">
                          <Text className="text-neutral-900 text-4xl font-extrabold">{worker.rating}</Text>
                          <Text className="text-neutral-400 text-xs">/5</Text>
                          <View className="mt-2">
                            <RatingStars rating={worker.rating} />
                          </View>
                          <Text className="text-neutral-400 text-xs mt-2">{worker.reviews}</Text>
                        </View>

                        <View className="flex-1 gap-2">
                          {[200, 40, 32, 19, 7].map((value, index) => (
                            <View key={`${value}-${index}`} className="flex-row items-center gap-2">
                              <Text className="text-neutral-400 text-xs w-4 text-right">{5 - index}</Text>
                              <View className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                <View
                                  className="h-full bg-slate-500 rounded-full"
                                  style={{ width: `${Math.max(15, value / 2)}%` }}
                                />
                              </View>
                              <Text className="text-neutral-400 text-xs w-8 text-right">{value}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => setShowReviewComposer(true)}
                      style={{ backgroundColor: Colors.common.GRAY_DARK }}
                      className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm mt-4"
                    >
                      <Text className="text-white font-extrabold text-sm">Write Review</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-4 gap-3">
                    {worker.feedback.map((item) => (
                      <View key={item.id} className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
                        <View className="flex-row items-start justify-between">
                          <View className="flex-row items-center gap-3 flex-1">
                            <View className="w-11 h-11 rounded-full bg-neutral-100 items-center justify-center">
                              <Text className="text-neutral-700 font-bold text-xs">
                                {item.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-neutral-900 font-bold text-sm">{item.name}</Text>
                              <View className="flex-row items-center gap-1 mt-1">
                                <Star size={13} color="#FBBF24" fill="#FBBF24" />
                                <Text className="text-neutral-900 font-bold text-xs">{item.rating}</Text>
                              </View>
                            </View>
                          </View>
                          <Text className="text-neutral-400 text-xs">{item.date}</Text>
                        </View>
                        <Text className="text-neutral-600 text-sm leading-6 mt-3">{item.text}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </ScrollView>

          {showReviewComposer ? (
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-4 flex-row gap-3">
              <TouchableOpacity
                onPress={closeReviewComposer}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
              >
                <Text className="text-white font-extrabold text-sm">Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeReviewComposer}
                className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
              >
                <Text className="text-neutral-900 font-extrabold text-sm">Discard</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-4 flex-row gap-3">
              <TouchableOpacity
                onPress={goBackToOrigin}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm"
              >
                <Text className="text-white font-extrabold text-sm">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goBackToOrigin}
                className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
              >
                <Text className="text-neutral-900 font-extrabold text-sm">Decline</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
