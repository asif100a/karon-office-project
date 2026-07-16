import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";

export default function MyJobCompletedOrCanceledCards({
  filteredJobs,
  openJobDetails,
  activeTab,
}: {
  filteredJobs: any[];
  openJobDetails: (id: string) => void;
  activeTab: "active" | "completed" | "cancelled" | "upcoming";
}) {
  return filteredJobs.map((job) => {
    const isCompleted = activeTab === "completed";
    const isCancelled = activeTab === "cancelled";

    return (
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
                <Text className="text-neutral-950 text-base font-bold">
                  {job.title}
                </Text>
                <Text className="text-neutral-500 text-sm">{job.company}</Text>
              </View>
            </View>

            <View className="items-end">
              <View
                className={`px-2.5 py-1 rounded-md border ${
                  isCompleted
                    ? "bg-emerald-50 border-emerald-100"
                    : isCancelled
                      ? "bg-red-50 border-red-100"
                      : "bg-orange-50 border-orange-100"
                }`}
              >
                <Text
                  className={`text-[10px] font-extrabold ${
                    isCompleted
                      ? "text-emerald-500"
                      : isCancelled
                        ? "text-red-500"
                        : "text-orange-500"
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
  });
}
