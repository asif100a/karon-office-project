import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Plus, Search, MapPin, Clock, Bookmark, ChevronRight } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const MARKET_RATES = [
  {
    id: "1",
    title: "Labourer",
    rate: "$100 - $120/hour",
    tag: "Market Rate",
  },
  {
    id: "2",
    title: "Labourer",
    rate: "$100 - $120/hour",
    tag: "Market Rate",
  },
];

const JOB_REQUESTS = [
  {
    id: "1",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    badge: "8 Years Experience",
  },
  {
    id: "2",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    badge: "8 Years Experience",
  },
];

export default function EmployerHomeScreen() {
  const router = useRouter();

  const openWorkerDetails = (workerId: string) => {
    router.push({
      pathname: "/screens/worker-details/[id]",
      params: { id: workerId, origin: "employer" },
    } as any);
  };

  const handleCreateJobPost = () => {
    router.push({
      pathname: "/screens/job/CreateJobPost",
      params: { origin: "employer" },
    });
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pt-14 pb-6 px-6 rounded-b-[34px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" }}
              className="w-12 h-12 rounded-full border-2 border-white/35"
            />
            <View className="flex-1">
              <Text className="text-white/90 text-xs font-semibold">Welcome Back</Text>
              <Text className="text-white/95 text-xs font-medium mt-0.5">Hello, Thom Haye</Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => router.push("/screens/search/SearchWorker" as any)}
              className="w-11 h-11 rounded-full bg-white/14 items-center justify-center border border-white/10 active:opacity-75"
            >
              <Search color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity className="w-11 h-11 rounded-full bg-white/14 items-center justify-center border border-white/10 active:opacity-75">
              <Bell color="#FFFFFF" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 110 }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleCreateJobPost}
          className="flex-row items-center justify-center bg-slate-900 rounded-2xl py-4 px-5 shadow-sm"
        >
          <Plus size={20} color="#FFFFFF" />
          <Text className="text-white text-base font-medium ml-2">Create a Job Post</Text>
        </TouchableOpacity>

        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-neutral-950 text-[18px] font-semibold">Market Rate</Text>
            <ChevronRight size={22} color="#1F2937" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
            {MARKET_RATES.map((job, index) => (
              <View
                key={job.id}
                className={`bg-white rounded-2xl px-4 py-4 border border-neutral-100 shadow-sm w-56 ${index === 0 ? "mr-3" : "mr-3"}`}
              >
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-neutral-900 font-bold text-base">{job.title}</Text>
                    <Text className="text-neutral-500 text-sm mt-0.5">{job.rate}</Text>
                  </View>
                  <View className="bg-orange-50 px-2.5 py-1 rounded-md">
                    <Text style={{ color: Colors.common.BRAND }} className="text-[10px] font-semibold">
                      {job.tag}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-neutral-950 text-[18px] font-semibold">Job Requests</Text>
            <ChevronRight size={22} color="#1F2937" />
          </View>

          <View className="gap-4">
            {JOB_REQUESTS.map((job) => (
              <TouchableOpacity
                key={job.id}
                onPress={() => openWorkerDetails(job.id)}
                activeOpacity={0.9}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                <View className="px-4 pt-4 pb-3">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row items-center gap-3 flex-1 pr-3">
                      <Image
                        source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop" }}
                        className="w-11 h-11 rounded-full"
                      />
                      <View className="flex-1">
                        <Text className="text-neutral-950 text-base font-bold">{job.name}</Text>
                        <Text className="text-neutral-500 text-sm">{job.role}</Text>
                      </View>
                    </View>

                    <TouchableOpacity className="p-1.5">
                      <Bookmark size={20} color="#737373" />
                    </TouchableOpacity>
                  </View>

                  <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                    <View className="flex-row items-center gap-2">
                      <MapPin size={14} color="#C81E1E" />
                      <Text className="text-neutral-500 text-xs">{job.location}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Clock size={14} color="#737373" />
                      <Text className="text-neutral-500 text-xs">{job.availability}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between px-4 pb-4">
                  <View className="bg-orange-50 px-3 py-1.5 rounded-md">
                    <Text style={{ color: Colors.common.BRAND }} className="text-xs font-medium">
                      {job.badge}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <TouchableOpacity>
                      <Text className="text-neutral-700 text-xs font-medium">View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-slate-900 px-4 py-2 rounded-md active:opacity-90">
                      <Text className="text-white text-xs font-medium">Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
