import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Bookmark, ChevronRight, Clock, MapPin } from "lucide-react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";

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

export default function EmployerUpcomingApplicants({
  openWorkerDetails,
}: {
  openWorkerDetails: (id: string) => void;
}) {
  return (
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
                  style={{
                    backgroundColor: Colors.common.GRAY_DARK,
                  }}
                  className="px-4 py-2 rounded-md active:opacity-90"
                >
                  <Text className="text-white text-xs font-medium">Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
