import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Search,
  Map,
  List,
  SlidersHorizontal,
  ChevronLeft,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchEmployerListView from "@/components/modules/employer/search-employer/SearchEmployerListView";
import SearchEmployerMapView from "@/components/modules/employer/search-employer/SearchEmployerMapView";
import SearchEmployerFilterModal from "@/components/modules/employer/search-employer/SearchEmployerFilterModal";

export default function WorkerSearchScreen() {
  const router = useRouter();
  const { origin } = useLocalSearchParams<{ origin?: string | string[] }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const [viewType, setViewType] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter States
  const [rateEmail, setRateEmail] = useState("");
  const [tradeSkill, setTradeSkill] = useState("Groundworker");
  const [radius, setRadius] = useState("1 - 10 miles");

  const handleViewDetails = (id: string) => {
    router.push(`/screens/employer-details/${id}`);
  };

  const goBackToOrigin = () => {
    if (originRoute === "worker") {
      router.replace("/tabs/(worker-tabs)/jobs");
      return;
    }

    if (originRoute === "employer") {
      router.replace("/tabs/(employer-tabs)/workers");
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={[]}>
      {/* Search Header */}
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pb-4 pt-14 px-6 z-10"
      >
        <View className="flex-row justify-between items-center">
          {/* Back button and title */}
          <TouchableOpacity
            onPress={goBackToOrigin}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-xl font-extrabold tracking-tight">
              Search Jobs
            </Text>
          </TouchableOpacity>

          {/* Map/List View Toggle */}
          <TouchableOpacity
            onPress={() => setViewType(viewType === "list" ? "map" : "list")}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75"
          >
            {viewType === "list" ? (
              <Map color="#FFFFFF" size={18} />
            ) : (
              <List color="#FFFFFF" size={18} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter Section (Static subheader) */}
      <View className="px-5 pt-4 pb-2 bg-neutral-50 flex-row gap-3 items-center z-10">
        <View className="flex-1 flex-row items-center bg-white border border-neutral-200/80 rounded-xl px-4 py-1">
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
          className="p-4 bg-white border border-neutral-200/80 rounded-xl items-center justify-center active:opacity-80"
        >
          <SlidersHorizontal size={18} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Content render based on toggle */}
      {viewType === "list" ? (
        /* LIST VIEW */
        <SearchEmployerListView handleViewDetails={handleViewDetails} />
      ) : (
        /* MAP VIEW */
        <SearchEmployerMapView handleViewDetails={handleViewDetails} />
      )}

      {/* FILTERS MODAL (Bottom Sheet style) */}
      <SearchEmployerFilterModal
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        rateEmail={rateEmail}
        setRateEmail={setRateEmail}
        radius={radius}
        setRadius={setRadius}
        tradeSkill={tradeSkill}
        setTradeSkill={setTradeSkill}
      />
    </SafeAreaView>
  );
}
