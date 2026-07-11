import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Search, SlidersHorizontal, Bookmark, MapPin, Clock } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

const WORKERS = [
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
  {
    id: "3",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    badge: "8 Years Experience",
  },
];

export default function EmployerWorkersScreen() {
  const router = useRouter();

  const openWorkerDetails = (workerId: string) => {
    router.push({
      pathname: "/screens/worker-details/[id]",
      params: { id: workerId, origin: "employer" },
    } as any);
  };

  const handleSearchWorkers = () => {
    router.push({
      pathname: "/screens/search/SearchWorker",
      params: { origin: "employer" },
    } as any);
  }

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
            <TouchableOpacity onPress={handleSearchWorkers} className="w-11 h-11 rounded-full bg-white/14 items-center justify-center border border-white/10 active:opacity-75">
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
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-white border border-neutral-200/90 rounded-2xl px-4 py-3.5 shadow-sm">
            <Search size={18} color="#A3A3A3" className="mr-2" />
            <Text className="flex-1 text-neutral-400 text-sm font-medium">Search Offers</Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white border border-neutral-200/90 rounded-2xl items-center justify-center shadow-sm active:opacity-85">
            <SlidersHorizontal size={18} color="#333333" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center mt-6 mb-4">
          <Text className="text-neutral-950 text-[18px] font-semibold">Search Result</Text>
          <View className="bg-orange-50 px-2.5 py-1.5 rounded-md">
            <Text style={{ color: Colors.common.BRAND }} className="text-xs font-medium">
              28 Results
            </Text>
          </View>
        </View>

        <View className="gap-4">
          {WORKERS.map((worker) => (
            <TouchableOpacity
              key={worker.id}
              onPress={() => openWorkerDetails(worker.id)}
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
                      <Text className="text-neutral-950 text-base font-bold">{worker.name}</Text>
                      <Text className="text-neutral-500 text-sm">{worker.role}</Text>
                    </View>
                  </View>

                  <TouchableOpacity className="p-1.5">
                    <Bookmark size={20} color="#737373" />
                  </TouchableOpacity>
                </View>

                <View className="pt-4 mt-4 border-t border-neutral-100 gap-2.5">
                  <View className="flex-row items-center gap-2">
                    <MapPin size={14} color="#C81E1E" />
                    <Text className="text-neutral-500 text-xs">{worker.location}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Clock size={14} color="#737373" />
                    <Text className="text-neutral-500 text-xs">{worker.availability}</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between px-4 pb-4">
                <View className="bg-orange-50 px-3 py-1.5 rounded-md">
                  <Text style={{ color: Colors.common.BRAND }} className="text-xs font-medium">
                    {worker.badge}
                  </Text>
                </View>

                <View className="flex-row items-center gap-3">
                  <TouchableOpacity>
                    <Text className="text-neutral-700 text-xs font-medium">View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-slate-900 px-4 py-2 rounded-md active:opacity-90">
                    <Text className="text-white text-xs font-medium">Send Offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
