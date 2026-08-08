import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Headphones,
  MessageSquareMore,
  Search,
  Send,
  UsersRound,
  Clock3,
  Star,
} from "lucide-react-native";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "@/components/layout/ScreenWrapper";
import MessageSupportModal from "@/components/modules/common/MessageSupportModal";
import { Colors } from "@/constants/Colors";

type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  status: string;
};

const MOCK_CHATS: ChatItem[] = [
  {
    id: "sarah",
    name: "Sarah Mitchell",
    lastMessage: "You: Did you see the proposal? I ma...",
    time: "4:30 PM",
    unread: true,
    initials: "SM",
    avatarBg: "#E0F2FE",
    avatarColor: "#0369A1",
    status: "Awaiting your reply",
  },
  {
    id: "james-1",
    name: "James Thornton",
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: "3:15 PM",
    unread: false,
    initials: "JT",
    avatarBg: "#FEE2E2",
    avatarColor: "#B91C1C",
    status: "Recent conversation",
  },
  {
    id: "james-2",
    name: "James Thornton",
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: "3:15 PM",
    unread: false,
    initials: "JT",
    avatarBg: "#F3E8FF",
    avatarColor: "#6B21A8",
    status: "Support follow-up",
  },
  {
    id: "james-3",
    name: "James Thornton",
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: "3:15 PM",
    unread: false,
    initials: "JT",
    avatarBg: "#ECFDF5",
    avatarColor: "#047857",
    status: "Interview details",
  },
  {
    id: "james-4",
    name: "James Thornton",
    lastMessage: "James: Let's grab coffee tomorrow,...",
    time: "3:15 PM",
    unread: false,
    initials: "JT",
    avatarBg: "#FEF3C7",
    avatarColor: "#B45309",
    status: "Shift update",
  },
];

const CHAT_SUMMARY = [
  {
    id: "unread",
    label: "Unread",
    value: "1",
    note: "Needs response",
    icon: <MessageSquareMore size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "response",
    label: "Avg. reply",
    value: "12 min",
    note: "Today",
    icon: <Clock3 size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "connections",
    label: "Open threads",
    value: "6",
    note: "Across jobs",
    icon: <UsersRound size={18} color={Colors.common.BRAND} />,
  },
  {
    id: "rating",
    label: "Conversation rating",
    value: "4.9/5",
    note: "From recent feedback",
    icon: <Star size={18} color={Colors.common.BRAND} />,
  },
];

function SummaryCard({
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

function ChatRow({
  chat,
  onPress,
  active,
}: {
  chat: ChatItem;
  onPress: () => void;
  active: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      className={`rounded-2xl border px-4 py-4 ${active ? "border-neutral-950 bg-neutral-50" : "border-neutral-200 bg-white"}`}
    >
      <View className="flex-row items-start gap-4">
        <View
          style={{ backgroundColor: chat.avatarBg }}
          className="h-12 w-12 items-center justify-center rounded-full border border-neutral-100"
        >
          <Text style={{ color: chat.avatarColor }} className="text-sm font-bold">
            {chat.initials}
          </Text>
        </View>

        <View className="min-w-0 flex-1">
          <View className="flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-extrabold text-neutral-950">
                  {chat.name}
                </Text>
                {chat.unread ? (
                  <View className="h-2.5 w-2.5 rounded-full bg-[#FF5500]" />
                ) : null}
              </View>
              <Text className="mt-1 text-xs font-medium text-neutral-500">
                {chat.status}
              </Text>
            </View>

            <Text className="text-xs font-semibold text-neutral-400">
              {chat.time}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={chat.unread ? { color: Colors.common.BRAND } : undefined}
            className={`mt-3 text-xs font-semibold ${chat.unread ? "" : "text-neutral-400"}`}
          >
            {chat.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function WorkerChatsWebScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("sarah");
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalState, setSupportModalState] = useState<"form" | "submitted">("form");

  useEffect(() => {
    if (!MOCK_CHATS.some((chat) => chat.id === selectedChatId)) {
      setSelectedChatId(MOCK_CHATS[0]?.id ?? "sarah");
    }
  }, [selectedChatId]);

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_CHATS;

    return MOCK_CHATS.filter(
      (chat) =>
        chat.name.toLowerCase().includes(query) ||
        chat.lastMessage.toLowerCase().includes(query) ||
        chat.status.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const selectedChat = useMemo(
    () => filteredChats.find((chat) => chat.id === selectedChatId) ?? filteredChats[0] ?? MOCK_CHATS[0],
    [filteredChats, selectedChatId],
  );

  const openChat = (id: string) => {
    router.push({
      pathname: "/screens/chats/[id]",
      params: { id, origin: "worker" },
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 112 }}
      >
        <View className="px-6 pt-6 md:px-10 xl:px-12 md:pt-8">
          <View className="mx-auto w-full max-w-7xl gap-6">
            <View className="rounded-[28px] border border-neutral-200 bg-white p-6 md:p-8">
              <View className="flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <View className="max-w-3xl gap-4">
                  <View className="flex-row flex-wrap items-center gap-2">
                    <View className="flex-row items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
                      <MessageSquareMore size={14} color={Colors.common.BRAND} />
                      <Text className="text-xs font-bold uppercase tracking-[0px] text-neutral-900">
                        Chats
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5">
                      <View className="h-2 w-2 rounded-full bg-emerald-500" />
                      <Text className="text-xs font-semibold text-neutral-600">
                        1 unread thread
                      </Text>
                    </View>
                  </View>

                  <View className="gap-2">
                    <Text className="text-3xl md:text-4xl font-black tracking-tight text-neutral-950">
                      Keep every worker conversation in one place.
                    </Text>
                    <Text className="max-w-2xl text-sm md:text-base leading-6 text-neutral-600">
                      Review conversations, jump into active threads, and open the
                      existing chat screen without changing the mobile behavior.
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
                    onPress={() => openChat(selectedChat?.id ?? "sarah")}
                    activeOpacity={0.88}
                    className="flex-row items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3.5"
                  >
                    <Send size={18} color="#111827" />
                    <Text className="text-sm font-semibold text-neutral-900">
                      Open chat
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {CHAT_SUMMARY.map((card) => (
                <SummaryCard
                  key={card.id}
                  label={card.label}
                  value={card.value}
                  note={card.note}
                  icon={card.icon}
                />
              ))}
            </View>

            <View className="flex-col gap-6 xl:flex-row">
              <View className="flex-[1.05] gap-4">
                <View className="rounded-[24px] border border-neutral-200 bg-white p-5 md:p-6">
                  <View className="flex-row items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3">
                    <Search size={18} color="#A3A3A3" />
                    <TextInput
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Search chats"
                      placeholderTextColor="#A3A3A3"
                      className="flex-1 text-sm text-neutral-900"
                    />
                  </View>
                </View>

                <View className="gap-3">
                  {filteredChats.map((chat) => (
                    <ChatRow
                      key={chat.id}
                      chat={chat}
                      active={chat.id === selectedChat?.id}
                      onPress={() => setSelectedChatId(chat.id)}
                    />
                  ))}
                </View>
              </View>

              <View className="flex-1 gap-4">
                <View className="rounded-[24px] border border-neutral-200 bg-white p-5 md:p-6">
                  <View className="flex-row items-center justify-between gap-3">
                    <View className="flex-1">
                      <Text className="text-xs font-bold uppercase tracking-[0px] text-neutral-500">
                        Selected thread
                      </Text>
                      <Text className="mt-1 text-2xl font-black tracking-tight text-neutral-950">
                        {selectedChat?.name ?? "No chat selected"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => openChat(selectedChat?.id ?? "sarah")}
                      activeOpacity={0.88}
                      className="flex-row items-center gap-1.5 rounded-2xl bg-neutral-950 px-4 py-3"
                    >
                      <Text className="text-sm font-semibold text-white">
                        Open
                      </Text>
                      <ArrowRight size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <View className="mt-5 rounded-2xl bg-neutral-50 p-4">
                    <Text className="text-sm font-semibold text-neutral-900">
                      {selectedChat?.lastMessage}
                    </Text>
                    <Text className="mt-2 text-sm leading-6 text-neutral-600">
                      This preview stays lightweight on web. The full conversation
                      still opens in the shared chat detail route.
                    </Text>
                  </View>

                  <View className="mt-4 gap-3">
                    <View className="rounded-2xl bg-neutral-100 p-4">
                      <Text className="text-sm font-semibold text-neutral-900">
                        Reply quickly
                      </Text>
                      <Text className="mt-1 text-sm leading-6 text-neutral-600">
                        Web users can review the thread here and jump into the
                        detail screen when they need the full exchange.
                      </Text>
                    </View>

                    <View className="rounded-2xl bg-neutral-100 p-4">
                      <Text className="text-sm font-semibold text-neutral-900">
                        Keep context visible
                      </Text>
                      <Text className="mt-1 text-sm leading-6 text-neutral-600">
                        The inbox stays on the left so the selected conversation
                        never disappears while you work.
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
                      Need help?
                    </Text>
                    <Text className="mt-2 text-lg font-black tracking-tight text-white">
                      Open a support ticket
                    </Text>
                  </View>
                  <Headphones size={20} color="#FFFFFF" />
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
