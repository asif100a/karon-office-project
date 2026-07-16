import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Search,
  Map,
  List,
  SlidersHorizontal,
  MapPin,
  Clock,
  Briefcase,
  X,
  ChevronLeft,
  Bookmark,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import StandardSelectField from "@/components/standard_ui/form_fields/StandardSelectField";

type WorkerCard = {
  id: string;
  name: string;
  role: string;
  location: string;
  availability: string;
  experience: string;
};

type FilterValues = {
  tradeSkill: string;
  radius: string;
  availableTime: string;
};

const WORKERS: WorkerCard[] = [
  {
    id: "1",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
  },
  {
    id: "2",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
  },
  {
    id: "3",
    name: "Michael Turner",
    role: "Labour",
    location: "Shoreditch • 1.2 mi away",
    availability: "Available 8am - 5pm",
    experience: "8 Years Experience",
  },
];

const TRADE_OPTIONS = [
  { label: "Groundworker", value: "groundworker" },
  { label: "Labourer", value: "labourer" },
  { label: "Electrician", value: "electrician" },
  { label: "Carpenter", value: "carpenter" },
];

const RADIUS_OPTIONS = [
  { label: "1 - 10 miles", value: "1-10" },
  { label: "11 - 20 miles", value: "11-20" },
  { label: "21 - 50 miles", value: "21-50" },
];

const TIME_OPTIONS = [
  { label: "8 am - 5 pm", value: "8-5" },
  { label: "9 am - 6 pm", value: "9-6" },
  { label: "Night shift", value: "night" },
];

function WorkerCardRow({
  worker,
  onPress,
}: {
  worker: WorkerCard;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
    >
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-3 flex-1 pr-3">
            <View className="w-11 h-11 rounded-full bg-blue-600 items-center justify-center">
              <Briefcase size={20} color="#FFFFFF" />
            </View>
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
            {worker.experience}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={{ backgroundColor: Colors.common.GRAY_DARK }}
          className="px-4 py-2 rounded-xl active:opacity-90"
        >
          <Text className="text-white text-xs font-medium">View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function SearchWorkerScreen() {
  const router = useRouter();
  const { origin } = useLocalSearchParams<{ origin?: string | string[] }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const [viewType, setViewType] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { control } = useForm<FilterValues>({
    defaultValues: {
      tradeSkill: "groundworker",
      radius: "1-10",
      availableTime: "8-5",
    },
  });

  const openWorkerDetails = (id: string) => {
    router.push({
      pathname: "/screens/worker-details/[id]",
      params: { id, origin: "employer" },
    } as any);
  };

  const goBackToOrigin = () => {
    if (originRoute === "employer") {
      router.replace("/tabs/(employer-tabs)/workers" as any);
      return;
    }

    if (originRoute === "worker") {
      router.replace("/tabs/(worker-tabs)/offers" as any);
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pb-6 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={goBackToOrigin}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-xl font-extrabold tracking-tight">Search Workers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setViewType(viewType === "list" ? "map" : "list")}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75"
          >
            {viewType === "list" ? <Map color="#FFFFFF" size={18} /> : <List color="#FFFFFF" size={18} />}
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5 pt-4 pb-2 bg-neutral-50 flex-row gap-3 items-center z-10">
        <View className="flex-1 flex-row items-center bg-white border border-neutral-200/90 rounded-2xl px-4 py-2.5 shadow-sm">
          <Search size={18} color="#A3A3A3" className="mr-2" />
          <TextInput
            className="flex-1 text-neutral-800 text-sm font-medium py-0"
            placeholder="Search Offers"
            placeholderTextColor="#A3A3A3"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          className="w-12 h-12 bg-white border border-neutral-200/90 rounded-2xl items-center justify-center shadow-sm active:opacity-80"
        >
          <SlidersHorizontal size={18} color="#333333" />
        </TouchableOpacity>
      </View>

      {viewType === "list" ? (
        <ScrollView
          className="flex-1 px-5 pt-2 bg-neutral-50"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-neutral-900 font-extrabold text-base tracking-tight">Search Result</Text>
            <Text style={{ color: Colors.common.BRAND }} className="text-xs font-extrabold">
              28 Results
            </Text>
          </View>

          <View className="gap-4">
            {WORKERS.map((worker) => (
              <WorkerCardRow key={worker.id} worker={worker} onPress={() => openWorkerDetails(worker.id)} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 bg-neutral-100 relative overflow-hidden">
          <View className="absolute inset-0">
            <View className="absolute top-[12%] left-0 w-full h-[3px] bg-white rotate-6" />
            <View className="absolute top-[28%] left-0 w-full h-[3.5px] bg-white -rotate-12" />
            <View className="absolute top-[46%] left-0 w-full h-[3px] bg-white rotate-3" />
            <View className="absolute bottom-[26%] left-0 w-full h-[4px] bg-white -rotate-6" />
            <View className="absolute left-[26%] top-0 w-[3px] h-full bg-white rotate-[35deg]" />
            <View className="absolute left-[60%] top-0 w-[3.5px] h-full bg-white -rotate-[25deg]" />
            <View className="absolute left-[84%] top-0 w-[3px] h-full bg-white rotate-[40deg]" />

            <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-6 top-[10%] left-[8%]">Weston Dr</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-12 top-[26%] left-[45%]">Kenton Ln</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-3 top-[44%] right-[15%]">Newton Ln</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-6 bottom-[28%] left-[30%]">Culver Grove</Text>

            <View className="absolute top-[18%] left-[20%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
            <View className="absolute top-[44%] left-[72%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
            <View className="absolute bottom-[30%] left-[28%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />

            <View className="absolute top-[22%] left-[58%] items-center">
              <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
                <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
                  <Briefcase size={14} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-900 font-extrabold text-[10px]">Michael Turner</Text>
                  <Text className="text-neutral-500 text-[8px] font-semibold">Labour</Text>
                  <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">1.2 mi away</Text>
                </View>
              </View>
            </View>

            <View className="absolute top-[56%] left-[24%] items-center">
              <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
                <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
                  <Briefcase size={14} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-900 font-extrabold text-[10px]">Michael Turner</Text>
                  <Text className="text-neutral-500 text-[8px] font-semibold">Labour</Text>
                  <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">1.2 mi away</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="absolute bottom-6 left-5 right-5">
          <WorkerCardRow worker={WORKERS[0]} onPress={() => openWorkerDetails(WORKERS[0].id)} />
        </View>
      </View>
      )}

      <Modal visible={showFilters} transparent animationType="slide" onRequestClose={() => setShowFilters(false)}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">FILTERS</Text>
              <TouchableOpacity
                onPress={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
              >
                <X size={16} color="#333333" />
              </TouchableOpacity>
            </View>

            <View className="gap-3 mb-8">
              <StandardSelectField<FilterValues>
                label="Trade / Skill"
                id="tradeSkill"
                control={control}
                options={TRADE_OPTIONS}
                placeholder="Groundworker"
              />

              <StandardSelectField<FilterValues>
                label="Radius"
                id="radius"
                control={control}
                options={RADIUS_OPTIONS}
                placeholder="1 - 10 miles"
              />

              <StandardSelectField<FilterValues>
                label="Available time"
                id="availableTime"
                control={control}
                options={TIME_OPTIONS}
                placeholder="8 am - 5 pm"
              />
            </View>

            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
            >
              <Text className="text-white font-extrabold text-sm">Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
