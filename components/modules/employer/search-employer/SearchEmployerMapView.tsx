import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

// Map view mockup data
const MOCK_MAP_JOBS = [
  {
    id: '6',
    title: 'Labourer',
    company: 'London builder limited',
    payRate: '$100 - $120/hour',
    tag: 'Market Rate',
    location: 'Stratford • 2.4 mi away',
    team: '1 labor, 2 electricians',
    duration: '10 Jun • 3 weeks',
    time: '2 hours ago',
  }
];

export default function SearchEmployerMapView({
  handleViewDetails,
}: {
  handleViewDetails: (id: string) => void;
}) {
  return (
    <View className="flex-1 bg-neutral-100 relative overflow-hidden">
      {/* Custom vector layout mockup map */}
      <View className="absolute inset-0">
        {/* Street Grid Lines */}
        <View className="absolute top-[15%] left-0 w-full h-[3px] bg-white rotate-6" />
        <View className="absolute top-[35%] left-0 w-full h-[3.5px] bg-white -rotate-12" />
        <View className="absolute top-[60%] left-0 w-full h-[3px] bg-white rotate-3" />
        <View className="absolute bottom-[20%] left-0 w-full h-[4px] bg-white -rotate-6" />
        <View className="absolute left-[30%] top-0 w-[3px] h-full bg-white rotate-[35deg]" />
        <View className="absolute left-[65%] top-0 w-[3.5px] h-full bg-white -rotate-[25deg]" />
        <View className="absolute left-[85%] top-0 w-[3px] h-full bg-white rotate-[40deg]" />

        {/* Street labels */}
        <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-6 top-[13%] left-[10%]">
          Weston Dr
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-12 top-[32%] left-[45%]">
          Kenton Ln
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-3 top-[58%] right-[15%]">
          Newton Ln
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-6 bottom-[22%] left-[30%] font-medium">
          Culver Grove
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-[25deg] top-[75%] left-[78%]">
          Stratford
        </Text>

        {/* Random orange map pin markers */}
        <View className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
        <View className="absolute top-[50%] left-[75%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
        <View className="absolute bottom-[35%] left-[25%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />

        {/* Pin 1 (Active/Selected Marker in mock) */}
        <View className="absolute top-[30%] left-[55%] items-center">
          {/* Map Popover Card */}
          <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
            <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
              <Briefcase size={14} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-neutral-900 font-extrabold text-[10px]">
                Labourer
              </Text>
              <Text className="text-neutral-500 text-[8px] font-semibold">
                London builder limited
              </Text>
              <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">
                $100 - $120/hour
              </Text>
            </View>
            <View
              style={{ backgroundColor: Colors.common.BRAND_LIGHT }}
              className="px-1.5 py-0.5 rounded"
            >
              <Text
                style={{ color: Colors.common.BRAND }}
                className="text-[7px] font-extrabold"
              >
                Market
              </Text>
            </View>
          </View>
          {/* Pulsing ring */}
          <View className="w-8 h-8 rounded-full bg-blue-600/20 absolute -bottom-4 justify-center items-center">
            <View className="w-4 h-4 rounded-full bg-blue-600 border border-white shadow" />
          </View>
        </View>
      </View>

      {/* Floating Card at the Bottom */}
      <View className="absolute bottom-6 left-5 right-5">
        {MOCK_MAP_JOBS.map((job) => (
          <View
            key={job.id}
            className="bg-white rounded-3xl p-5 border border-neutral-100/90 shadow-xl"
          >
            {/* Header */}
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
    </View>
  );
}
