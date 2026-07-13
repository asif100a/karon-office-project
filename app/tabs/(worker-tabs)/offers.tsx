import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {
  ChevronRight,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import ScreenHeader from "@/components/layout/ScreenHeader";
import TappableSearchTriggerBar from "@/components/modules/worker/offers/TappableSearchTriggerBar";
import CategoryToggles from "@/components/modules/worker/offers/CategoryToggles";
import VerticalJobListings from "@/components/modules/worker/offers/VerticalJobListings";
import ScreenWrapper from "@/components/layout/ScreenWrapper";

export default function WorkerOffersTabLanding() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<"browse" | "offers">(
    "browse",
  );

  const handleOpenSearch = () => {
    router.push("/screens/search/SearchEmployer" as any);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/screens/employer-details/${id}` as any);
  };

  return (
    <ScreenWrapper>
      {/* Screen Header */}
      <ScreenHeader />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Tappable Search Trigger Bar */}
        <TappableSearchTriggerBar handleOpenSearch={handleOpenSearch} />

        {/* Category Toggles (navigates/triggers search view) */}
        <CategoryToggles
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Featured Listings Header */}
        <View className="flex-row justify-between items-center mt-8 mb-4">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
            Active Opportunities
          </Text>
          <TouchableOpacity
            onPress={handleOpenSearch}
            className="flex-row items-center"
          >
            <Text
              style={{ color: Colors.common.BRAND }}
              className="text-xs font-extrabold mr-1"
            >
              See All
            </Text>
            <ChevronRight size={16} color={Colors.common.BRAND} />
          </TouchableOpacity>
        </View>

        {/* Vertical Job Listings */}
        <VerticalJobListings handleViewDetails={handleViewDetails} />
      </ScrollView>
    </ScreenWrapper>
  );
}
