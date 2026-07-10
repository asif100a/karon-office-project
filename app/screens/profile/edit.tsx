import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronDown, Upload } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Avatar, FileChip, profilePhoto, ScreenShell } from './_components';

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <View className="mb-5">
      <Text className="text-neutral-500 text-xs font-semibold mb-2">{label}</Text>
      <View className="h-14 rounded-xl bg-white border border-neutral-200 px-4 justify-center">
        <TextInput
          className="text-neutral-900 text-sm font-semibold py-0"
          placeholder={placeholder}
          placeholderTextColor="#A8A8A8"
        />
      </View>
    </View>
  );
}

export default function EditProfileScreen() {
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
          <Text className="text-neutral-400 text-[10px] font-extrabold tracking-[2px] uppercase">Upload PDF or Photo</Text>
          <Text className="text-neutral-400 text-[10px] font-bold mt-2 mb-3">JPG . PNG . PDF . MAX 10MB</Text>
          <TouchableOpacity className="bg-neutral-800 px-5 py-2.5 rounded-full flex-row items-center gap-2">
            <Upload size={14} color="#FFFFFF" />
            <Text className="text-white text-xs font-extrabold">Upload</Text>
          </TouchableOpacity>
        </View>

        <Field label="Full Name" placeholder="Enter Your Full Name" />
        <Field label="Email Address" placeholder="Enter Your Email" />

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
