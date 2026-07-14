import { View, Text } from "react-native";
import React from "react";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const EMPLOYER_UPCOMING_JOB_DETAILS = {
  title: "Labourer",
  company: "Tech Innovators Inc.",
  rate: "$80 - $120/hour",
  marketRate: "Market Rate",
  location: "Shoreditch - 1.2 mi away",
  team: "2 developers, 1 designer",
  duration: "12 Jun - 1 month",
};

export default function EmployerUpcomingJobDetails() {
  return (
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
  );
}
