import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";

// Mock listings data
const MOCK_JOBS = [
  {
    id: '3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    time: '2 hours ago',
  },
  {
    id: '4',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    time: '2 hours ago',
  },
  {
    id: '5',
    title: 'Graphic Designer',
    company: 'Creative Studios',
    payRate: '$60 - $90/hour',
    tag: 'Competitive Rate',
    location: 'Soho • 2.5 mi away',
    team: '1 designer',
    duration: '15 Jun • 2 weeks',
    time: '4 hours ago',
  },
];

export default function SearchEmployerListView({
  handleViewDetails,
}: {
  handleViewDetails: (id: string) => void;
}) {
  return (
    <ScrollView
      className="flex-1 px-5 pt-2 bg-neutral-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Results Count */}
      <View className="flex-row justify-between items-center my-4">
        <Text className="text-neutral-900 font-extrabold text-base tracking-tight">
          Search Result
        </Text>
        <Text
          style={{ color: Colors.common.BRAND }}
          className="text-xs font-extrabold"
        >
          28 Results
        </Text>
      </View>

      {/* Job Listings */}
      <View className="gap-4">
        {MOCK_JOBS.map((job) => (
          <View
            key={job.id}
            className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm"
          >
            {/* Job Header */}
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                  <Briefcase size={22} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-950 font-extrabold text-base">
                    {job.title}
                  </Text>
                  <Text className="text-neutral-500 text-xs font-semibold">
                    {job.company}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-neutral-900 font-extrabold text-sm">
                  {job.payRate}
                </Text>
                <View
                  style={{ backgroundColor: Colors.common.BRAND_LIGHT }}
                  className="px-2.5 py-0.5 rounded-full mt-1.5"
                >
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="text-[10px] font-extrabold"
                  >
                    {job.tag}
                  </Text>
                </View>
              </View>
            </View>

            {/* Specs */}
            <View className="gap-2.5 py-3 border-y border-neutral-50 mb-4">
              <View className="flex-row items-center gap-2">
                <MapPin size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {job.location}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Users size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {job.team}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Calendar size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">
                  {job.duration}
                </Text>
              </View>
            </View>

            {/* Footer and Buttons */}
            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-400 text-xs font-medium">
                {job.time}
              </Text>

              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleViewDetails(job.id)}
                  className="px-4 py-2 bg-neutral-100 rounded-xl active:opacity-70"
                >
                  <Text className="text-neutral-600 font-bold text-xs">
                    View Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewDetails(job.id)}
                  style={{ backgroundColor: Colors.common.GRAY_DARK }}
                  className="px-4 py-2 rounded-xl active:opacity-90 shadow-sm"
                >
                  <Text className="text-white font-bold text-xs">
                    Send Request
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
