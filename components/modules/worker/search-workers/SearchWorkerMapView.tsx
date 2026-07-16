import { View, Text } from "react-native";
import React from "react";
import { Briefcase } from "lucide-react-native";
import WorkerSearchCardRow from "./WorkerSearchCardRow";

export default function SearchWorkerMapView({
  WORKERS,
  openWorkerDetails,
}: {
  WORKERS: any[];
  openWorkerDetails: (id: string) => void;
}) {
  return (
    <View className="flex-1 bg-neutral-100 relative overflow-hidden">
      <View className="absolute inset-0">
        <View className="absolute top-[12%] left-0 w-full h-[3px] bg-white rotate-6" />
        <View className="absolute top-[28%] left-0 w-full h-[3.5px] bg-white -rotate-12" />
        <View className="absolute top-[46%] left-0 w-full h-[3px] bg-white rotate-3" />
        <View className="absolute bottom-[26%] left-0 w-full h-[4px] bg-white -rotate-6" />
        <View className="absolute left-[26%] top-0 w-[3px] h-full bg-white rotate-[35deg]" />
        <View className="absolute left-[60%] top-0 w-[3.5px] h-full bg-white -rotate-[25deg]" />
        <View className="absolute left-[84%] top-0 w-[3px] h-full bg-white rotate-[40deg]" />

        <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-6 top-[10%] left-[8%]">
          Weston Dr
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-12 top-[26%] left-[45%]">
          Kenton Ln
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-3 top-[44%] right-[15%]">
          Newton Ln
        </Text>
        <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-6 bottom-[28%] left-[30%]">
          Culver Grove
        </Text>

        <View className="absolute top-[18%] left-[20%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
        <View className="absolute top-[44%] left-[72%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
        <View className="absolute bottom-[30%] left-[28%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />

        <View className="absolute top-[22%] left-[58%] items-center">
          <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
            <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
              <Briefcase size={14} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-neutral-900 font-extrabold text-[10px]">
                Michael Turner
              </Text>
              <Text className="text-neutral-500 text-[8px] font-semibold">
                Labour
              </Text>
              <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">
                1.2 mi away
              </Text>
            </View>
          </View>
        </View>

        <View className="absolute top-[56%] left-[24%] items-center">
          <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
            <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
              <Briefcase size={14} color="#FFFFFF" />
            </View>
            <View>
              <Text className="text-neutral-900 font-extrabold text-[10px]">
                Michael Turner
              </Text>
              <Text className="text-neutral-500 text-[8px] font-semibold">
                Labour
              </Text>
              <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">
                1.2 mi away
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute bottom-6 left-5 right-5">
        <WorkerSearchCardRow
          worker={WORKERS[0]}
          onPress={() => openWorkerDetails(WORKERS[0].id)}
        />
      </View>
    </View>
  );
}
