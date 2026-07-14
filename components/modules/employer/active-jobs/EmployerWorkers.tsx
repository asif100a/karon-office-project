import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";

const EMPLOYER_WORKERS = [
  { id: "1", name: "James Hartley", progress: "Day 3 of 20" },
  { id: "2", name: "James Hartley", progress: "Day 3 of 20" },
  { id: "3", name: "James Hartley", progress: "Day 3 of 20" },
];

export default function EmployerWorkers({ openWorkerDetails }: {
  openWorkerDetails: (id: string) => void
}) {
  return (
    <View className="mt-4">
      <Text className="text-neutral-900 text-sm font-extrabold mb-3">
        Workers
      </Text>
      <View className="gap-3">
        {EMPLOYER_WORKERS.map((worker) => (
          <TouchableOpacity
            key={worker.id}
            onPress={() => openWorkerDetails(worker.id)}
            activeOpacity={0.9}
            className="bg-white rounded-2xl border border-neutral-100 px-3 py-3.5 shadow-sm"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
                  }}
                  className="w-10 h-10 rounded-full"
                />
                <View>
                  <Text className="text-neutral-900 text-sm font-bold">
                    {worker.name}
                  </Text>
                  <Text className="text-neutral-400 text-xs mt-0.5">
                    {worker.progress}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-1">
                <Text className="text-neutral-500 text-xs font-medium">
                  Update Timesheet
                </Text>
                <ChevronRight size={16} color="#737373" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
