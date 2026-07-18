import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import LabourerCard from "@/components/card/LabourerCard";

const MOCK_FEATURED_JOBS = [
  {
    id: "3",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    payRate: "80",
    tag: "Market Rate",
    location: "Shoreditch • 1.2 mi away",
    team: "2 developers, 1 designer",
    duration: "12 Jun • 1 month",
    time: "2 hours ago",
  },
  {
    id: "5",
    title: "Graphic Designer",
    company: "Creative Studios",
    payRate: "60",
    tag: "Competitive Rate",
    location: "Soho • 2.5 mi away",
    team: "1 designer",
    duration: "15 Jun • 2 weeks",
    time: "4 hours ago",
  },
];

export default function VerticalJobListings({
  handleViewDetails,
}: {
  handleViewDetails: (id: string) => void;
}) {
  return (
    <View className="gap-4">
      {MOCK_FEATURED_JOBS.map((job) => (
        <LabourerCard
          key={job.id}
          job={job}
          handleViewDetails={handleViewDetails}
        />
      ))}
    </View>
  );
}
