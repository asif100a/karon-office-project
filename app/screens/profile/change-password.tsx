import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import StandardInputField from '@/components/standard_ui/form_fields/StandardInputField';
import { ScreenShell } from './_components';

type ChangePasswordFormValues = {
  previousPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const { control } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      previousPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  return (
    <ScreenShell
      title="Change Password"
      footer={
        <View className="px-5 pb-16 pt-4 bg-neutral-50">
          <TouchableOpacity style={{ backgroundColor: '#1E2933' }} className="h-14 rounded-lg items-center justify-center">
            <Text className="text-white font-extrabold text-sm">Save Changes</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <StandardInputField<ChangePasswordFormValues>
          label="Previous Password"
          id="previousPassword"
          type="password"
          control={control}
          placeholder="Enter your previous password"
          textInputProps={{ className: 'text-neutral-900 text-sm font-semibold' }}
        />

        <StandardInputField<ChangePasswordFormValues>
          label="New Password"
          id="newPassword"
          type="password"
          control={control}
          placeholder="Enter your new password"
          textInputProps={{ className: 'text-neutral-900 text-sm font-semibold' }}
        />

        <StandardInputField<ChangePasswordFormValues>
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          control={control}
          placeholder="Confirm your new password"
          textInputProps={{ className: 'text-neutral-900 text-sm font-semibold' }}
        />
      </ScrollView>
    </ScreenShell>
  );
}
