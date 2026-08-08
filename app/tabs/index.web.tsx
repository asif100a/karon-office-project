import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { getDashboardRouteForRole, normalizeUserRole } from "@/constants/Routes";

const WEB_ROLE_STORAGE_KEY = "site-source.active-role";

export default function TabsIndexWeb() {
  const router = useRouter();

  useEffect(() => {
    const storedRole =
      typeof window !== "undefined"
        ? normalizeUserRole(window.localStorage.getItem(WEB_ROLE_STORAGE_KEY) ?? undefined)
        : "worker";

    router.replace(getDashboardRouteForRole(storedRole) as any);
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-neutral-50">
      <ActivityIndicator size="large" color="#111827" />
    </View>
  );
}
