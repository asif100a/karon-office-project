import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Bell, MapPin, Users, Calendar, Briefcase, Info, ShieldAlert } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '@/components/modules/common/CommonHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';

export default function CancelledJobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch - 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun - 1 month',
    policyText: 'You will be charged 50% of the job fee as you cancelled after the 48 window.',
    cancelledBy: 'Employer',
    cancellationDate: 'Cancellation Date',
    timeBeforeStart: '12 Hours',
    compensationStatus: 'Eligible',
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <CommonHeader headerTitle={'Cancelled Job'} withBackButton />

      <ScrollView className="flex-1 bg-neutral-50/50" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-12">
          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-4">
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
                <View className="px-2.5 py-1 rounded-lg bg-orange-50">
                  <Text className="text-[10px] font-extrabold text-orange-500">{jobDetails.statusBadge}</Text>
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

          <View className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-4 flex-row items-start gap-3 mb-4">
            <View className="w-8 h-8 rounded-full bg-orange-500/10 items-center justify-center">
              <Info size={16} color="#F97316" />
            </View>
            <Text className="flex-1 text-orange-900 text-sm font-medium leading-5">
              {jobDetails.policyText}
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm items-center mb-4">
            <View className="w-12 h-12 bg-red-50 rounded-full items-center justify-center mb-4 border border-red-100">
              <ShieldAlert size={24} color="#DC2626" />
            </View>
            <Text className="text-neutral-900 font-extrabold text-xl mb-2">This Job Was Cancelled</Text>
            <Text className="text-neutral-400 text-center text-sm font-medium leading-5 px-3">
              The Employer Cancelled This Job Before The Scheduled Start Date.
            </Text>
          </View>

          <View>
            <Text className="text-neutral-900 font-extrabold text-base mb-3.5">Cancellation Information</Text>
            <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden">
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-medium">Cancelled By</Text>
                <Text className="text-neutral-700 text-sm font-medium">{jobDetails.cancelledBy}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-medium">Cancellation Date</Text>
                <Text className="text-neutral-700 text-sm font-medium">{jobDetails.cancellationDate}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-medium">Time Before Start</Text>
                <Text className="text-neutral-700 text-sm font-medium">{jobDetails.timeBeforeStart}</Text>
              </View>
              <View className="flex-row justify-between items-center p-4">
                <Text className="text-neutral-500 text-sm font-medium">Compensation Status</Text>
                <Text className="text-neutral-700 text-sm font-medium">{jobDetails.compensationStatus}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
