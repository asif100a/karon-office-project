import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Briefcase, ChevronRight, Star } from "lucide-react-native";

export default function WorkerDetailsWorkHistory({ worker }: { worker: any }) {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="flex-1 text-neutral-900 text-base font-extrabold">
          Work History
        </Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-neutral-900 text-xs font-bold">View All</Text>
          <ChevronRight size={16} color="#111827" />
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-xl border border-neutral-200/80 divide-y divide-neutral-100">
        {worker.workHistory.map((item: any) => (
          <View
            key={item.id}
            className="px-4 py-4 flex-row items-start justify-between"
          >
            <View className="flex-row items-start gap-3 flex-1 pr-3">
              <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
                <Briefcase size={18} color="#64748B" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-900 font-bold text-sm">
                  {item.title}
                </Text>
                <Text className="text-neutral-500 text-xs mt-0.5">
                  {item.company} • {item.duration}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1">
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Text className="text-neutral-900 font-extrabold text-sm">
                {item.rating}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
