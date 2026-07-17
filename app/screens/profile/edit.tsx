import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { ChevronDown, Upload } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import StandardInputField from '@/components/standard_ui/form_fields/StandardInputField';
import { Avatar, FileChip, profilePhoto, ScreenShell } from './_components';

type EditProfileFormValues = {
  fullName: string;
  email: string;
};

export default function EditProfileScreen() {
  const { control } = useForm<EditProfileFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  return (
    <ScreenShell
      title="Profile"
      footer={
        <View className="px-5 pb-8 pt-4 bg-neutral-50">
          <TouchableOpacity style={{ backgroundColor: '#1E2933' }} className="h-14 rounded-lg items-center justify-center">
            <Text className="text-white font-extrabold text-sm">Save Changes</Text>
          </TouchableOpacity>
        </View>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-3">
            <Avatar uri={profilePhoto} size={44} />
            <View>
              <Text className="text-slate-900 text-base font-extrabold">Wade Warren</Text>
              <Text className="text-neutral-500 text-sm">tan@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity className="h-11 px-5 rounded-lg bg-slate-950 flex-row items-center gap-2 justify-center">
            <Upload size={15} color="#FFFFFF" />
            <Text className="text-white text-xs font-extrabold">Upload Image</Text>
          </TouchableOpacity>
        </View>

        <View className="h-32 border border-dashed border-neutral-300 rounded-2xl bg-neutral-50 items-center justify-center mb-6">
          <Text className="text-neutral-400 text-[10px] font-extrabold tracking-[2px] uppercase">Upload Photo</Text>
          <Text className="text-neutral-400 text-[10px] font-bold mt-2 mb-3">JPG . PNG . MAX 10MB</Text>
          <TouchableOpacity className="bg-neutral-800 px-5 py-2.5 rounded-full flex-row items-center gap-2">
            <Upload size={14} color="#FFFFFF" />
            <Text className="text-white text-xs font-extrabold">Upload</Text>
          </TouchableOpacity>
        </View>

        <StandardInputField<EditProfileFormValues>
          label="Full Name"
          id="fullName"
          control={control}
          placeholder="Enter Your Full Name"
          textInputProps={{ className: 'text-neutral-900 text-sm font-semibold' }}
        />

        <StandardInputField<EditProfileFormValues>
          label="Email Address"
          id="email"
          type="email"
          control={control}
          placeholder="Enter Your Email"
          textInputProps={{ className: 'text-neutral-900 text-sm font-semibold' }}
        />

        <View className="mb-5">
          <Text className="text-neutral-500 text-xs font-semibold mb-2">Trade / Skill</Text>
          <View className="h-14 rounded-xl bg-white border border-neutral-200 px-4 flex-row items-center justify-between">
            <Text className="text-neutral-400 text-sm font-semibold">Groundworker</Text>
            <ChevronDown size={17} color="#171717" />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 20 }}>
          <FileChip />
          <FileChip />
          <FileChip />
        </ScrollView>
      </ScrollView>
    </ScreenShell>
  );
}
