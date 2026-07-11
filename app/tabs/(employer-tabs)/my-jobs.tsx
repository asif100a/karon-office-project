import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Bell, Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const JOBS = [
  { id: "1", title: "Site renovation", status: "Active", location: "Dhaka", team: "6 workers", date: "Today" },
  { id: "2", title: "Warehouse cleanup", status: "Pending", location: "Savar", team: "4 workers", date: "Tomorrow" },
];

export default function EmployerMyJobsScreen() {
  return (
    <View className="flex-1 bg-neutral-50">
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold tracking-tight">My Jobs</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="gap-4">
          {JOBS.map((job) => (
            <View key={job.id} className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                  <Briefcase size={20} color="#FFFFFF" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-950 font-extrabold text-base">{job.title}</Text>
                  <Text className="text-neutral-500 text-xs font-semibold">{job.status}</Text>
                </View>
              </View>

              <View className="gap-2.5 py-3 border-y border-neutral-50 my-4">
                <View className="flex-row items-center gap-2">
                  <MapPin size={15} color="#858585" />
                  <Text className="text-neutral-500 text-xs font-semibold">{job.location}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Users size={15} color="#858585" />
                  <Text className="text-neutral-500 text-xs font-semibold">{job.team}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Calendar size={15} color="#858585" />
                  <Text className="text-neutral-500 text-xs font-semibold">{job.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
