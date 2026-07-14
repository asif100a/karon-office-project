import { View, Text, TouchableOpacity } from "react-native";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

export default function LabourerCard({ job, handleViewDetails }: { job: any; handleViewDetails: (id: string) => void }) {
  return (
    <View
      key={job.id}
      className="bg-white rounded-2xl p-5 border border-neutral-100/85"
    >
      {/* Header info */}
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
            className="px-2.5 py-0.5 rounded-md mt-1.5"
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

      {/* Details layout */}
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

      {/* Action buttons */}
      <View className="flex-row gap-2 justify-between items-center">
        <Text
          className="text-neutral-400 text-xs font-medium"
          numberOfLines={1}
        >
          {job.time}
        </Text>

        <View className="flex-row gap-2 justify-end">
          <TouchableOpacity
            onPress={() => handleViewDetails(job.id)}
            className="px-4 py-2 bg-neutral-100 rounded-md active:opacity-70"
            style={{ minWidth: 82 }}
          >
            <Text
              className="text-neutral-600 font-bold text-xs text-center"
              numberOfLines={1}
            >
              View Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleViewDetails(job.id)}
            style={{ backgroundColor: Colors.common.GRAY_DARK, minWidth: 132 }}
            className="px-4 py-2 rounded-md active:opacity-90 shadow-sm"
          >
            <Text
              className="text-white font-bold text-xs text-center"
              numberOfLines={1}
            >
              Send Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
