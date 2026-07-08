import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Bell, MapPin, Users, Calendar, Briefcase, Info, ShieldAlert } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CancelledJobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock static data for the cancelled job details
  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    policyText: 'According to platform policy, you will receive full compensation for this cancellation.',
    expectedPayment: 'Expected Payment: £900',
    cancelledBy: 'Employer',
    cancellationDate: '10 Jun 2026',
    timeBeforeStart: '12 Hours',
    compensationStatus: 'Eligible',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* Header (mockup shows "Active Jobs" title) */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pb-6 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-extrabold tracking-tight">Active Jobs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-neutral-50/50" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-12">
          
          {/* Cancelled Job Card */}
          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-6">
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
                <View className="px-2.5 py-1 rounded-full bg-red-50 border border-red-100">
                  <Text className="text-[10px] font-extrabold text-red-500">
                    {jobDetails.statusBadge}
                  </Text>
                </View>
              </View>
            </View>

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

          {/* Platform Policy Warning Banner */}
          <View className="bg-orange-50/80 border border-orange-100/50 rounded-2xl p-4 flex-row items-center gap-3 mb-6">
            <View className="w-8 h-8 bg-orange-500/10 rounded-full justify-center items-center">
              <Info size={16} color="#F97316" />
            </View>
            <View className="flex-1">
              <Text className="text-orange-900 text-xs font-semibold leading-relaxed">
                {jobDetails.policyText}
              </Text>
              <Text className="text-orange-955 text-xs font-extrabold mt-0.5 leading-relaxed">
                {jobDetails.expectedPayment}
              </Text>
            </View>
          </View>

          {/* Cancellation Center Status Card */}
          <View className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm items-center mb-6">
            <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-4 border border-red-100">
              <ShieldAlert size={24} color="#EF4444" />
            </View>
            <Text className="text-neutral-900 font-extrabold text-sm mb-1.5">This Job Was Cancelled</Text>
            <Text className="text-neutral-400 text-center text-xs font-semibold leading-relaxed px-2">
              The Employer Cancelled This Job Before The Scheduled Start Date.
            </Text>
          </View>

          {/* Cancellation Information Grid */}
          <View>
            <Text className="text-neutral-900 font-extrabold text-base mb-3.5">Cancellation Information</Text>
            <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden">
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-450 text-sm font-semibold">Cancelled By</Text>
                <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.cancelledBy}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-450 text-sm font-semibold">Cancellation Date</Text>
                <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.cancellationDate}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-450 text-sm font-semibold">Time Before Start</Text>
                <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.timeBeforeStart}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4">
                <Text className="text-neutral-450 text-sm font-semibold">Compensation Status</Text>
                <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.compensationStatus}</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
