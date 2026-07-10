import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { DisputeLogo, ScreenShell, StatusPill } from './_components';

export default function DisputesScreen() {
  const router = useRouter();
  const items = Array.from({ length: 6 });

  return (
    <ScreenShell title="My Disputes">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <View className="flex-row gap-3 mb-5">
          <View className="flex-1 h-12 rounded-lg bg-white border border-neutral-200 flex-row items-center px-3">
            <Search size={18} color="#65717C" />
            <TextInput
              className="flex-1 text-sm text-neutral-900 ml-2 py-0"
              placeholder="Search Offers"
              placeholderTextColor="#8D98A4"
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white border border-neutral-200 rounded-lg items-center justify-center">
            <SlidersHorizontal size={19} color="#1F2933" />
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/screens/profile/dispute-detail?status=${index === 5 ? 'resolved' : 'review'}` as any)}
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
