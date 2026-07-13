import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  MapPin,
  Users,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import LabourerCard from "@/components/card/LabourerCard";

const MOCK_RECOMMENDED = [
  {
    id: "3",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    payRate: "$80 - $120/hour",
    tag: "Market Rate",
    location: "Shoreditch • 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun • 1 month",
    time: "2 hours ago",
  },
  {
    id: "4",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    payRate: "$80 - $120/hour",
    tag: "Market Rate",
    location: "Shoreditch • 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun • 1 month",
    time: "2 hours ago",
  },
];

export default function RecommendedVerticalList({
  handleViewDetails,
}: {
  handleViewDetails: (id: string) => void;
}) {
  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
          Recommended
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <ArrowRight size={20} color="#737373" />
        </TouchableOpacity>
      </View>

      {/* Labourer cards */}
      <View className="gap-4">
        {MOCK_RECOMMENDED.map((job) => (
         <LabourerCard key={job.id} job={job} handleViewDetails={handleViewDetails} />
        ))}
      </View>
    </View>
  );
}
