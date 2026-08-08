import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Headphones,
  Search,
  ShieldCheck,
  Star,
  XCircle,
} from "lucide-react-native";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "@/components/layout/ScreenHeader";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import JobsList from "@/components/modules/worker/my-jobs/JobsList";
import MessageSupportModal from "@/components/modules/common/MessageSupportModal";
import { Colors } from "@/constants/Colors";

type JobTab = "active" | "completed";

const SUMMARY_CARDS = [
  {
    id: "active",
    label: "Active jobs",
    value: "3",
    note: "1 updated today",
    icon: <BriefcaseBusiness size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "completed",
    label: "Completed",
    value: "6",
    note: "2 this month",
    icon: <CheckCircle2 size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "avg",
    label: "Avg. response",
    value: "12 min",
    note: "Fastest this week",
    icon: <Clock3 size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "rating",
    label: "Rating",
    value: "4.9/5",
    note: "From 18 reviews",
    icon: <Star size={18} color={Colors.common.BRAND} />,
  },
];

function StatusCard({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string;
  note: string;
  icon: ReactNode;
}) {
  return (
    <View className="flex-1 min-w-[170px] rounded-2xl border border-neutral-200 bg-white p-4">
      <View className="flex-row items-center justify-between gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
          {icon}
        </View>
        <Text className="text-xs font-medium text-emerald-600">{note}</Text>
      </View>
      <Text className="mt-3 text-2xl font-black tracking-tight text-neutral-950">
        {value}
      </Text>
      <Text className="mt-1 text-sm font-medium text-neutral-500">{label}</Text>
    </View>
  );
}

function TabButton({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      className={`rounded-full px-4 py-2.5 ${active ? "bg-neutral-950" : "bg-white"}`}
      style={{ borderWidth: 1, borderColor: active ? "#111827" : "#E5E7EB" }}
    >
      <Text className={`text-sm font-semibold ${active ? "text-white" : "text-neutral-600"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function MyJobsWebScreen() {
  const router = useRouter();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<JobTab>("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalState, setSupportModalState] = useState<"form" | "submitted">("form");

  useEffect(() => {
    const requestedTab = Array.isArray(tab) ? tab[0] : tab;
    if (requestedTab === "active" || requestedTab === "completed" || requestedTab === "cancelled") {
      setActiveTab(requestedTab === "cancelled" ? "completed" : requestedTab);
    }
  }, [tab]);

  const handleOpenJobDetails = (id: string, status: string) => {
    if (status === "completed") {
      router.push({
        pathname: "/screens/completed-jobs/[id]",
        params: { id, origin: "worker", status },
      });
      return;
    }

    if (status === "cancelled") {
      router.push({
        pathname: "/screens/cancelled-jobs/[id]",
        params: { id, origin: "worker", status },
      });
      return;
    }

    router.push({
      pathname: "/screens/active-jobs/[id]",
      params: { id, origin: "worker", status },
    });
  };

  const searchHint = useMemo(
    () => (activeTab === "active" ? "Search active jobs" : "Search completed jobs"),
    [activeTab],
  );

  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 108 }}
      >
        <View className="px-6 pt-6 md:px-10 xl:px-12 md:pt-8">
          <View className="mx-auto w-full max-w-7xl gap-6">
            {/* Top Section */}
            <View className="rounded-[28px] border border-neutral-200 bg-white p-6 md:p-8">
              <View className="flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <View className="max-w-3xl gap-4">
                  <View className="flex-row flex-wrap items-center gap-2">
                    <View className="flex-row items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
                      <ShieldCheck size={14} color={Colors.common.BRAND} />
                      <Text className="text-xs font-bold uppercase tracking-[0px] text-neutral-900">
                        My jobs
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5">
                      <View className="h-2 w-2 rounded-full bg-emerald-500" />
                      <Text className="text-xs font-semibold text-neutral-600">
                        2 tasks need attention
                      </Text>
                    </View>
                  </View>

                  <View className="gap-2">
                    <Text className="text-3xl md:text-4xl font-black tracking-tight text-neutral-950">
                      Track every job in one place.
                    </Text>
                    <Text className="max-w-2xl text-sm md:text-base leading-6 text-neutral-600">
                      Review active work, completed jobs, and cancellations from a
                      clean desktop layout while keeping the mobile screen exactly
                      the same.
                    </Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap gap-3">
                  <TouchableOpacity
                    onPress={() => setShowSupportModal(true)}
                    activeOpacity={0.9}
                    className="flex-row items-center gap-2 rounded-2xl bg-neutral-950 px-5 py-3.5"
                  >
                    <Headphones size={18} color="#FFFFFF" />
                    <Text className="text-sm font-semibold text-white">
                      Message support
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push("/tabs/(worker-tabs)/jobs" as any)}
                    activeOpacity={0.88}
                    className="flex-row items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3.5"
                  >
                    <Search size={18} color="#111827" />
                    <Text className="text-sm font-semibold text-neutral-900">
                      Browse jobs
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {SUMMARY_CARDS.map((card) => (
                <StatusCard
                  key={card.id}
                  label={card.label}
                  value={card.value}
                  note={card.note}
                  icon={card.icon}
                />
              ))}
            </View>

            <View className="flex-col gap-6 xl:flex-row">
              <View className="flex-[1.6] gap-5">
                <View className="rounded-[24px] border border-neutral-200 bg-white p-5 md:p-6">
                  <View className="flex-col gap-3 lg:flex-row lg:items-center">
                    <View className="flex-1 flex-row items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
                      <Search size={18} color="#A3A3A3" />
                      <TextInput
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder={searchHint}
                        placeholderTextColor="#A3A3A3"
                        className="flex-1 text-sm text-neutral-900"
                      />
                    </View>

                    <TouchableOpacity
                      onPress={() => setShowSupportModal(true)}
                      className="flex-row items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3.5"
                    >
                      <CalendarDays size={16} color="#737373" />
                      <Text className="text-sm font-semibold text-neutral-700">
                        Request help
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-5 flex-row flex-wrap gap-2.5">
                    <TabButton
                      label="Active jobs"
                      active={activeTab === "active"}
                      onPress={() => setActiveTab("active")}
                    />
                    <TabButton
                      label="Completed"
                      active={activeTab === "completed"}
                      onPress={() => setActiveTab("completed")}
                    />
                  </View>
                </View>

                <View className="gap-4">
                  <View className="flex-row items-center justify-between gap-4">
                    <Text className="text-[18px] font-extrabold tracking-tight text-neutral-950">
                      {activeTab === "active" ? "Active jobs" : "Completed jobs"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/tabs/(worker-tabs)/jobs" as any)}
                      activeOpacity={0.8}
                      className="flex-row items-center gap-1.5"
                    >
                      <Text className="text-sm font-medium text-neutral-500">
                        Back to search
                      </Text>
                      <ArrowRight size={16} color="#737373" />
                    </TouchableOpacity>
                  </View>

                  <JobsList
                    handleOpenJobDetails={handleOpenJobDetails}
                    activeTab={activeTab}
                  />
                </View>
              </View>

              <View className="flex-1 gap-4">
                <View className="rounded-[24px] border border-neutral-200 bg-white p-5">
                  <View className="flex-row items-center justify-between gap-3">
                    <View>
                      <Text className="text-xs font-bold uppercase tracking-[0px] text-neutral-500">
                        Today
                      </Text>
                      <Text className="mt-1 text-2xl font-black tracking-tight text-neutral-950">
                        3 active tasks
                      </Text>
                    </View>
                    <View className="h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                      <Clock3 size={20} color={Colors.common.BRAND} />
                    </View>
                  </View>

                  <View className="mt-4 gap-3">
                    <View className="rounded-2xl bg-neutral-100 p-4">
                      <Text className="text-sm font-semibold text-neutral-900">
                        Keep availability updated
                      </Text>
                      <Text className="mt-1 text-sm leading-6 text-neutral-600">
                        Employers respond faster when your schedule is current.
                      </Text>
                    </View>

                    <View className="rounded-2xl bg-neutral-100 p-4">
                      <Text className="text-sm font-semibold text-neutral-900">
                        Review completed work
                      </Text>
                      <Text className="mt-1 text-sm leading-6 text-neutral-600">
                        Check notes and ratings after each finished job.
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setShowSupportModal(true)}
                  activeOpacity={0.9}
                  className="flex-row items-center justify-between rounded-[24px] bg-neutral-950 px-5 py-5"
                >
                  <View className="flex-1 pr-3">
                    <Text className="text-xs font-bold uppercase tracking-[0px] text-white/60">
                      Need support?
                    </Text>
                    <Text className="mt-2 text-lg font-black tracking-tight text-white">
                      Open a support ticket
                    </Text>
                  </View>
                  <XCircle size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setShowSupportModal(true)}
        style={{ backgroundColor: Colors.common.BRAND }}
        className="absolute bottom-8 right-6 h-14 w-14 items-center justify-center rounded-full active:opacity-90 z-20"
      >
        <Headphones size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <MessageSupportModal
        showSupportModal={showSupportModal}
        setShowSupportModal={setShowSupportModal}
        supportModalState={supportModalState}
        setSupportModalState={setSupportModalState}
      />
    </ScreenWrapper>
  );
}
