import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import SearchWorkerHeader from "@/components/modules/worker/search-workers/SearchWorkerHeader";
import WorkerSearchCardRow from "@/components/modules/worker/search-workers/WorkerSearchCardRow";
import SearchWorkerSearchBar from "@/components/modules/worker/search-workers/SearchWorkerSearchBar";
import SearchWorkerMapView from "@/components/modules/worker/search-workers/SearchWorkerMapView";
import SearchWorkerModal from "@/components/modules/worker/search-workers/SearchWorkerModal";

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
    });
  };

  const goBackToOrigin = () => {
    if (originRoute === "employer") {
      router.replace("/tabs/(employer-tabs)/workers");
      return;
    }

    if (originRoute === "worker") {
      router.replace("/tabs/(worker-tabs)/jobs");
      return;
    }

    router.back();
  };

  return (
    <ScreenWrapper>
      <SearchWorkerHeader
        goBackToOrigin={goBackToOrigin}
        setViewType={setViewType}
        viewType={viewType}
      />

      {/* Search Bar */}
      <SearchWorkerSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowFilters={setShowFilters}
      />

      {viewType === "list" ? (
        <ScrollView
          className="flex-1 px-5 pt-2 bg-neutral-50"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-neutral-900 font-extrabold text-base tracking-tight">
              Search Result
            </Text>
            <Text
              style={{ color: Colors.common.BRAND }}
              className="text-xs font-extrabold"
            >
              28 Results
            </Text>
          </View>

          <View className="gap-4">
            {WORKERS.map((worker) => (
              <WorkerSearchCardRow
                key={worker.id}
                worker={worker}
                onPress={() => openWorkerDetails(worker.id)}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <SearchWorkerMapView
          WORKERS={WORKERS}
          openWorkerDetails={openWorkerDetails}
        />
      )}

      <SearchWorkerModal
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        control={control}
      />
    </ScreenWrapper>
  );
}
