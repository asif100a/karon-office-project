import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import StandardToggle from '@/components/standard_ui/StandardToggle';
import { ScreenShell } from './_components';

type NotificationOption = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

const notificationOptions: NotificationOption[] = [
  {
    id: 'job-alerts',
    title: 'Job Alerts',
    description: 'Get notified when new matching jobs are posted',
    enabled: true,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Receive updates for new chats and replies',
    enabled: true,
  },
  {
    id: 'booking-updates',
    title: 'Booking Updates',
    description: 'Know when a job is accepted, changed, or cancelled',
    enabled: true,
  },
  {
    id: 'payment-updates',
    title: 'Payment Updates',
    description: 'Receive payment, invoice, and payout notifications',
    enabled: true,
  },
  {
    id: 'reminders',
    title: 'Shift Reminders',
    description: 'Get reminders before upcoming work starts',
    enabled: true,
  },
];

export default function NotificationSettings() {
  const [settings, setSettings] = useState(notificationOptions);

  const toggleSetting = (id: string) => {
    setSettings((currentSettings) =>
      currentSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <ScreenShell title="Notification Settings">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32 }}
      >
        {settings.map((setting) => (
          <View
            key={setting.id}
            className="flex-row items-center justify-between border-b border-neutral-100 px-6 py-4"
          >
            <View className="mr-4 flex-1">
              <Text className="text-base font-semibold text-neutral-950">{setting.title}</Text>
              <Text className="mt-1 text-xs text-neutral-400">{setting.description}</Text>
            </View>

            <StandardToggle
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: '#D4D4D4', true: Colors.common.BRAND }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D4D4D4"
              accessibilityRole="switch"
              accessibilityLabel={setting.title}
              accessibilityHint={setting.description}
            />
          </View>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
