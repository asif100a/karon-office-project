import React from "react";
import { Link, Slot, usePathname, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import Logo from "@/assets/images/app-logo.png";

const NAV_LINKS = [
  { href: "/tabs/(worker-tabs)", label: "Home" },
  { href: "/tabs/(worker-tabs)/jobs", label: "Jobs" },
  { href: "/tabs/(worker-tabs)/my-jobs", label: "My Jobs" },
  { href: "/tabs/(worker-tabs)/chats", label: "Chats" },
  { href: "/tabs/(worker-tabs)/profile", label: "Profile" },
];

function WorkerWebNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="border-b border-neutral-200 bg-white/95 backdrop-blur">
      <View className="mx-auto flex w-full max-w-7xl flex-row items-center gap-6 px-6 py-3 lg:px-0">
        <Pressable
          onPress={() => router.push("/tabs/(worker-tabs)" as any)}
          className="shrink-0 active:opacity-80"
        >
          <Image source={Logo} style={{ width: 130, height: 70 }} />
        </Pressable>

        <View className="hidden flex-1 flex-row items-center justify-center gap-2 md:flex">
          {NAV_LINKS.map((link) => {
            const isProfileScreen = pathname.startsWith("/screens/profile");
            const isActive =
              pathname === link.href ||
              (link.href !== "/tabs/(worker-tabs)" && pathname.startsWith(link.href)) ||
              (link.href === "/tabs/(worker-tabs)/profile" && isProfileScreen);

            return (
              <Link
                key={link.href}
                href={link.href as any}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </View>

        <View className="ml-auto">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/auth",
                params: { step: "login" },
              })
            }
            className="flex-row items-center gap-2 rounded-full bg-neutral-950 px-4 py-2.5 active:opacity-90"
          >
            <Text className="text-sm font-semibold text-white">Login</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function ProfileWebLayout() {
  return (
    <View className="flex-1 bg-neutral-50">
      <WorkerWebNavbar />
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}
