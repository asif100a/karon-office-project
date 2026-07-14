import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Bookmark, MapPin, Users, Calendar, Briefcase, Clock } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Region } from 'react-native-maps';

const JOB_COORDINATES: Region = {
  latitude: 51.5246,
  longitude: -0.0786,
  latitudeDelta: 0.014,
  longitudeDelta: 0.014,
};

type NativeMapComponents = {
  MapView: typeof import('react-native-maps').default;
  Marker: typeof import('react-native-maps').Marker;
};

function getNativeMapComponents(): NativeMapComponents | null {
  const hasAndroidApiKey = Boolean(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

  if (Platform.OS === 'web' || (Platform.OS === 'android' && !hasAndroidApiKey)) {
    return null;
  }

  try {
    const maps = require('react-native-maps') as typeof import('react-native-maps');
    return { MapView: maps.default, Marker: maps.Marker };
  } catch {
    return null;
  }
}

function MapFallback() {
  return (
    <View className="flex-1 bg-[#E9EEF8]">
      <View className="absolute top-[18%] left-[-5%] w-[55%] h-3 rounded-full bg-white/70 rotate-[10deg]" />
      <View className="absolute top-[34%] left-[12%] w-[75%] h-3 rounded-full bg-white/75 -rotate-[12deg]" />
      <View className="absolute top-[56%] left-[-8%] w-[68%] h-3 rounded-full bg-white/75 rotate-[8deg]" />
      <View className="absolute top-[72%] right-[-5%] w-[58%] h-3 rounded-full bg-white/70 -rotate-[14deg]" />
      <View className="absolute left-[20%] top-[-6%] w-3 h-[45%] rounded-full bg-white/70 -rotate-[18deg]" />
      <View className="absolute right-[24%] top-[8%] w-3 h-[62%] rounded-full bg-white/75 rotate-[14deg]" />
      <View className="absolute right-[10%] top-[24%] w-3 h-[48%] rounded-full bg-white/70 -rotate-[10deg]" />
    </View>
  );
}

export default function EmployerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const nativeMapComponents = getNativeMapComponents();
  const NativeMapView = nativeMapComponents?.MapView;
  const NativeMarker = nativeMapComponents?.Marker;

  // Simple static data lookup based on id parameter (mock)
  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch \u2022 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun \u2022 1 month',
    time: '2 hours ago',
    tradeSkill: 'Groundworker',
    tradeCount: '1 labor',
    employmentType: 'Full-time',
    jobDuration: '4 week',
    requirements: 'CIS registration required. CSCS Gold card preferred. Site induction on day one.',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['bottom']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Map Header */}
        <View className="h-64 w-full overflow-hidden relative bg-slate-100">
          {NativeMapView && NativeMarker ? (
            <NativeMapView
              style={{ flex: 1 }}
              initialRegion={JOB_COORDINATES}
              region={JOB_COORDINATES}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
            >
              <NativeMarker coordinate={JOB_COORDINATES} />
            </NativeMapView>
          ) : (
            <MapFallback />
          )}

          <View className="absolute inset-x-0 top-12 px-6 pt-4 pb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="w-11 h-11 rounded-full bg-white/95 items-center justify-center active:opacity-75"
                >
                  <ArrowLeft size={20} color="#171717" />
                </TouchableOpacity>
                <Text className="text-neutral-900 font-extrabold text-[18px]">Employer Details</Text>
              </View>

              <TouchableOpacity
                className="w-11 h-11 rounded-2xl bg-neutral-900 items-center justify-center active:opacity-85"
              >
                <Bookmark size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-6 pb-24">
          {/* Overlapping Info Card */}
          <View className="mt-8 mb-6">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                  <Briefcase size={22} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-950 font-extrabold text-base">{jobDetails.title}</Text>
                  <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.company}</Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-neutral-900 font-extrabold text-sm">{jobDetails.payRate}</Text>
                <View 
                  style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                  className="px-2.5 py-0.5 rounded-md mt-1.5"
                >
                  <Text 
                    style={{ color: Colors.common.BRAND }} 
                    className="text-[10px] font-extrabold"
                  >
                    {jobDetails.tag}
                  </Text>
                </View>
              </View>
            </View>

            {/* Details layout */}
            <View className="gap-2.5 pt-3 border-t border-neutral-50">
              <View className="flex-row items-center gap-2">
                <MapPin size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.location}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Users size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.team}</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Calendar size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.duration}</Text>
              </View>
            </View>
          </View>

          {/* Trade / Skill Field */}
          <View className="mb-6">
            <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Trade / Skill</Text>
            <View className="bg-white border border-neutral-200/80 rounded-xl px-4 py-3.5">
              <Text className="text-neutral-800 text-sm font-semibold">{jobDetails.tradeSkill}</Text>
            </View>
          </View>

          {/* Job Overview Specifications Grid */}
          <View className="mb-6 p-4 border border-neutral-200/80 rounded-2xl overflow-hidden bg-white">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-900 font-extrabold text-base">Job overview</Text>
              <View className="flex-row items-center gap-1.5">
                <Clock size={14} color="#A3A3A3" />
                <Text className="text-neutral-400 text-xs font-medium">{jobDetails.time}</Text>
              </View>
            </View>

            <View className="">
              <View className="flex-row justify-between items-center py-2 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Trade</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.tradeCount}</Text>
              </View>
              
              <View className="flex-row justify-between items-center py-2 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Employment</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.employmentType}</Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Duration</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.jobDuration}</Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <Text className="text-neutral-500 text-sm font-semibold">Pay range</Text>
                <View className="items-end gap-2">
                  <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.payRate}</Text>
                  <View 
                    style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                    className="px-2 py-0.5 rounded"
                  >
                    <Text 
                      style={{ color: Colors.common.BRAND }} 
                      className="text-[9px] font-extrabold"
                    >
                      {jobDetails.tag}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Requirements Section */}
          <View className="mb-6 bg-white rounded-2xl p-4 border border-neutral-200/80">
            <Text className="text-neutral-900 font-extrabold text-base mb-3">Requirements</Text>
            <View className="">
              <Text className="text-neutral-600 text-sm leading-relaxed font-medium">
                {jobDetails.requirements}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-6 pt-4 pb-8 flex-row gap-3">
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ backgroundColor: Colors.common.GRAY_DARK }}
          className="flex-1 py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-sm shadow-black/10"
        >
          <Text className="text-white font-extrabold text-sm">Send Request</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-1 py-4 border border-neutral-200 rounded-2xl items-center justify-center bg-white active:opacity-75"
        >
          <Text className="text-neutral-900 font-extrabold text-sm">Accept</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
