import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Bookmark,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Avatar, Card, ScreenShell } from "./_components";

type SavedWorker = {
  id: string;
  name: string;
  role: string;
  location: string;
  availability: string;
  experience: string;
  avatar: string;
};

const SAVED_WORKERS: SavedWorker[] = [
  {
    id: "1",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch - 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop",
  },
  {
    id: "2",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch - 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop",
  },
  {
    id: "3",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch - 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop",
  },
];

export default function SavedWorkers() {
  const router = useRouter();

  const openWorkerDetails = (workerId: string) => {
    router.push({
      pathname: "/screens/worker-details/[id]",
      params: { id: workerId, origin: "employer" },
    });
  };

  return (
    <ScreenShell title="Saved Worker">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 34 }}
      >
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 h-12 rounded-2xl bg-white border border-neutral-200/80 px-4 flex-row items-center shadow-sm">
            <Search size={18} color="#7B8794" />
            <Text className="ml-2 text-sm text-neutral-400 font-medium">
              Search Offers
            </Text>
          </View>

          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/80 items-center justify-center shadow-sm active:opacity-80">
            <SlidersHorizontal size={18} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-neutral-950 text-[28px] font-extrabold tracking-tight">
            Saved Workers
          </Text>
          <View className="rounded-xl bg-orange-50 px-3 py-2">
            <Text
              style={{ color: Colors.common.BRAND }}
              className="text-xs font-extrabold"
            >
              {SAVED_WORKERS.length} Results
            </Text>
          </View>
        </View>

        <View className="gap-4">
          {SAVED_WORKERS.map((worker) => (
            <Card key={worker.id} className="p-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-center gap-3 flex-1 pr-3">
                  <Avatar uri={worker.avatar} size={42} />
                  <View className="flex-1">
                    <Text className="text-neutral-950 text-[22px] font-extrabold leading-6">
                      {worker.name}
                    </Text>
                    <Text className="text-neutral-500 text-sm mt-1">
                      {worker.role}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity className="pt-1 active:opacity-70">
                  <Bookmark size={20} color="#737373" />
                </TouchableOpacity>
              </View>

              <View className="mt-4 pt-4 border-t border-neutral-100 gap-3">
                <View className="flex-row items-center gap-2">
                  <MapPin size={14} color="#DC2626" />
                  <Text className="text-neutral-500 text-sm">
                    {worker.location}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Clock3 size={14} color="#6B7280" />
                  <Text className="text-neutral-500 text-sm">
                    {worker.availability}
                  </Text>
                </View>
              </View>

              <View className="mt-5 flex-row items-center justify-between">
                <View className="rounded-xl bg-orange-50 px-3 py-2">
                  <Text
                    style={{ color: Colors.common.BRAND }}
                    className="text-xs font-bold"
                  >
                    {worker.experience}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => openWorkerDetails(worker.id)}
                  style={{ backgroundColor: Colors.common.GRAY_DARK }}
                  className="rounded-xl px-5 py-3 active:opacity-90"
                >
                  <Text className="text-white text-xs font-bold">
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
