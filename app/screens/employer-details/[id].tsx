import { useLocalSearchParams, useRouter } from "expo-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Bookmark,
} from "lucide-react-native";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import type { Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import StickyActions from "@/components/modules/employer/employer-details/StickyActions";
import JobSummaryCard from "@/components/modules/employer/employer-details/JobSummaryCard";
import JobOverviewSection from "@/components/modules/employer/employer-details/JobOverviewSection";
import MapFallback from "@/components/modules/employer/employer-details/_ui/MapFallback";
import { EmployerJobDetails } from "@/types";
import { StatusBar } from "expo-status-bar";

type NativeMapComponents = {
  MapView: typeof import("react-native-maps").default;
  Marker: typeof import("react-native-maps").Marker;
};

const JOB_COORDINATES: Region = {
  latitude: 51.5246,
  longitude: -0.0786,
  latitudeDelta: 0.014,
  longitudeDelta: 0.014,
};

const DEFAULT_JOB_DETAILS: EmployerJobDetails = {
  title: "Labourer",
  company: "Tech Innovators Inc.",
  payRate: "$80 - $120/hour",
  tag: "Market Rate",
  location: "Shoreditch \u2022 1.2 mi away",
  team: "2 developers, 1 designer",
  duration: "12 Jun \u2022 1 month",
  time: "2 hours ago",
  tradeSkill: "Groundworker",
  tradeCount: "1 labor",
  employmentType: "Full-time",
  jobDuration: "4 week",
  requirements:
    "CIS registration required. CSCS Gold card preferred. Site induction on day one.",
};

const JOB_DETAILS_BY_ID: Record<string, EmployerJobDetails> = {
  "3": DEFAULT_JOB_DETAILS,
  "4": DEFAULT_JOB_DETAILS,
  "5": {
    ...DEFAULT_JOB_DETAILS,
    title: "Graphic Designer",
    payRate: "$60 - $90/hour",
    tag: "Competitive Rate",
    location: "Soho \u2022 2.5 mi away",
    team: "1 designer",
    duration: "15 Jun \u2022 2 weeks",
    time: "4 hours ago",
    tradeSkill: "Creative Design",
    tradeCount: "1 designer",
    employmentType: "Contract",
    jobDuration: "2 week",
    requirements:
      "Portfolio required. Experience with Adobe Creative Suite and motion graphics preferred.",
  },
};

function getNativeMapComponents(): NativeMapComponents | null {
  const hasAndroidApiKey = Boolean(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

  if (Platform.OS === "web" || (Platform.OS === "android" && !hasAndroidApiKey)) {
    return null;
  }

  try {
    const maps = require("react-native-maps") as typeof import("react-native-maps");
    return { MapView: maps.default, Marker: maps.Marker };
  } catch {
    return null;
  }
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
      {children}
    </Text>
  );
}

function TradeSkillSection({ value }: { value: string }) {
  return (
    <View className="mb-6">
      <SectionLabel>Trade / Skill</SectionLabel>
      <View className="rounded-xl border border-neutral-200/80 bg-white px-4 py-3.5">
        <Text className="text-sm font-semibold text-neutral-800">{value}</Text>
      </View>
    </View>
  );
}

function RequirementsSection({ value }: { value: string }) {
  return (
    <View className="mb-6 rounded-2xl border border-neutral-200/80 bg-white p-4">
      <Text className="mb-3 text-base font-extrabold text-neutral-900">Requirements</Text>
      <Text className="text-sm font-medium leading-relaxed text-neutral-600">{value}</Text>
    </View>
  );
}

export default function EmployerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();

  const jobId = Array.isArray(id) ? id[0] : id;
  const jobDetails = (jobId && JOB_DETAILS_BY_ID[jobId]) || DEFAULT_JOB_DETAILS;

  const nativeMapComponents = getNativeMapComponents();
  const NativeMapView = nativeMapComponents?.MapView;
  const NativeMarker = nativeMapComponents?.Marker;

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["bottom"]}>      
      {/* Status Bar */}
      <StatusBar style="dark" />
      
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        {/* Map Header */}
        <View className="relative h-56 w-full overflow-hidden bg-slate-100">
          {NativeMapView && NativeMarker ? (
            <NativeMapView
              style={{ flex: 1 }}
              initialRegion={JOB_COORDINATES}
              region={JOB_COORDINATES}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
            >
              <NativeMarker coordinate={JOB_COORDINATES} />
            </NativeMapView>
          ) : (
            <MapFallback />
          )}

          <View className="absolute inset-x-0 top-8 px-6 pb-6 pt-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={handleBackPress}
                  className="h-11 w-11 items-center justify-center rounded-full bg-white/95 active:opacity-75"
                >
                  <ArrowLeft size={20} color="#171717" />
                </TouchableOpacity>

                <Text className="text-[18px] font-extrabold text-neutral-900">
                  Employer Details
                </Text>
              </View>

              <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 active:opacity-85">
                <Bookmark size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-6">
          <JobSummaryCard jobDetails={jobDetails} />
          <TradeSkillSection value={jobDetails.tradeSkill} />
          <JobOverviewSection jobDetails={jobDetails} />
          <RequirementsSection value={jobDetails.requirements} />
        </View>
      </ScrollView>

      <StickyActions
        onPrimaryPress={handleBackPress}
        onSecondaryPress={handleBackPress}
      />
    </SafeAreaView>
  );
}
