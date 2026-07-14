import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const MOCK_MY_JOBS = [
  {
    id: 'job-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-completed-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-completed-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-completed-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-cancelled-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-4',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
];

export default function JobsList({
  handleOpenJobDetails,
  activeTab
}: {
  handleOpenJobDetails: (id: string, status: string) => void;
  activeTab: 'active' | 'completed' | 'cancelled';
}) {
      const filteredJobs = MOCK_MY_JOBS.filter(job => job.status === activeTab);

  return (
    <View className="gap-4">
      {filteredJobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          onPress={() => handleOpenJobDetails(job.id, job.status)}
          activeOpacity={0.9}
          className="bg-white rounded-xl p-5 border border-neutral-100/80"
        >
          {/* Header info */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                <Briefcase size={22} color="#FFFFFF" />
              </View>
              <View>
                <Text className="text-neutral-955 font-extrabold text-base">
                  {job.title}
                </Text>
                <Text className="text-neutral-500 text-xs font-semibold">
                  {job.company}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <View
                style={
                  job.status === "completed"
                    ? { backgroundColor: "#E0F2FE" }
                    : job.status === "cancelled"
                      ? { backgroundColor: "#FEE2E2" }
                      : { backgroundColor: Colors.common.BRAND_LIGHT }
                }
                className="px-2.5 py-1 rounded-full"
              >
                <Text
                  style={
                    job.status === "completed"
                      ? { color: "#0284C7" }
                      : job.status === "cancelled"
                        ? { color: "#EF4444" }
                        : { color: Colors.common.BRAND }
                  }
                  className="text-[10px] font-extrabold"
                >
                  {job.statusBadge}
                </Text>
              </View>
            </View>
          </View>

          {/* Details layout */}
          <View className="gap-2.5 pt-3 border-t border-neutral-50">
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
        </TouchableOpacity>
      ))}
    </View>
  );
}
