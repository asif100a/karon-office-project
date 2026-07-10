import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EyeOff } from 'lucide-react-native';
import { ScreenShell } from './_components';

function PasswordField({ label }: { label: string }) {
  return (
    <View className="mb-6">
      <Text className="text-neutral-500 text-xs font-semibold mb-2">{label}</Text>
      <View className="h-14 rounded-xl bg-white border border-neutral-200 px-4 flex-row items-center">
        <TextInput
          value="********"
          secureTextEntry
          editable={false}
          className="flex-1 text-neutral-900 text-sm font-semibold py-0"
        />
        <EyeOff size={18} color="#A3ADB5" />
      </View>
    </View>
  );
}

export default function ChangePasswordScreen() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <ScreenShell
      title="Change Password"
      footer={
        <View className="px-5 pb-8 pt-4 bg-neutral-50">
          <TouchableOpacity style={{ backgroundColor: '#1E2933' }} className="h-14 rounded-lg items-center justify-center">
            <Text className="text-white font-extrabold text-sm">Save Changes</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <PasswordField label="Previous Password" />
        <PasswordField label="New Password" />
        <PasswordField label="Confirm Password" />

        <TouchableOpacity onPress={() => setRememberMe((value) => !value)} className="flex-row items-center gap-2">
          <View className={`w-4 h-4 rounded-sm border ${rememberMe ? 'bg-slate-900 border-slate-900' : 'border-neutral-500'}`} />
          <Text className="text-neutral-600 text-sm font-semibold">Remember me</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenShell>
  );
}
