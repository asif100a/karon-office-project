import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { DisputeLogo, ScreenShell, StatusPill } from './_components';
import { Input, InputField } from '@/components/ui/input';

export default function DisputesScreen() {
  const router = useRouter();
  const { origin } = useLocalSearchParams<{ origin?: string | string[] }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const items = Array.from({ length: 6 });
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScreenShell title="My Disputes">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <View className="flex-row gap-3 mb-5">
          <Input
            size="2xl"
            variant="outline"
            className="flex-1 rounded-lg bg-white border-neutral-200 px-3"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Search size={18} color="#65717C" />
            <InputField
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-sm text-neutral-900 ml-2 py-0"
              placeholder="Search Offers"
              placeholderTextColor="#8D98A4"
            />
          </Input>
          <TouchableOpacity className="w-12 h-12 bg-white border border-neutral-200 rounded-lg items-center justify-center">
            <SlidersHorizontal size={19} color="#1F2933" />
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/screens/profile/dispute-detail",
                  params: {
                    status: index === 5 ? "resolved" : "review",
                    origin: originRoute,
                  },
                } as any)
              }
              className="bg-white rounded-xl border border-neutral-100 p-4 flex-row items-center justify-between"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center gap-3">
                <DisputeLogo />
                <View>
                  <Text className="text-neutral-950 font-extrabold text-base">Hartley Construction</Text>
                  <Text className="text-neutral-500 text-xs font-semibold mt-0.5">May 12 - May 16</Text>
                </View>
              </View>
              <StatusPill label="Under Review" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
