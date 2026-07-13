import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Bell, MapPin, Users, Calendar, Briefcase, Mail, Phone } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CompletedJobDetailScreen() {
  const router = useRouter();
  const { id, origin, status } = useLocalSearchParams<{ id?: string; origin?: string; status?: string }>();
  const originRoute = Array.isArray(origin) ? origin[0] : origin;
  const statusRoute = Array.isArray(status) ? status[0] : status;

  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'summary'>('schedule');

  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch - 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun - 1 month',
    contactName: 'James Hartley',
    contactTitle: 'Director - Hartley Construction',
    contactEmail: 'olivia@untitledui.com',
    contactPhone: '+44 723 456 7891',
    startDate: '3 Jun 2026',
    endDate: '28 Jun 2026',
    hours: '07:30 - 17:00',
    daysPerWeek: '5 Days',
    nextInvoice: 'Friday 7 Jun',
  };

  const mockWeeklyWork = [
    { week: 'Week 1', dates: '12th - 16th July', status: 'Completed' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved' },
  ];

  const handleNavigateBack = () => {
    if (originRoute === 'employer') {
      router.replace({
        pathname: '/tabs/(employer-tabs)/my-jobs',
        params: { tab: statusRoute ?? 'completed' },
      });
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <View
        style={{ backgroundColor: Colors.common.BRAND }}
        className="pb-6 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleNavigateBack}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-extrabold tracking-tight">My Jobs</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 bg-neutral-50/50" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-12">
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
                <View className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                  <Text className="text-[10px] font-extrabold text-emerald-500">{jobDetails.statusBadge}</Text>
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

          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-6">
            <Text className="text-neutral-900 font-extrabold text-base mb-4">Employer Contact</Text>

            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 justify-center items-center">
                <Text className="text-slate-700 font-extrabold text-sm">JH</Text>
              </View>
              <View>
                <Text className="text-neutral-900 font-extrabold text-sm">{jobDetails.contactName}</Text>
                <Text className="text-neutral-400 text-xs font-semibold">{jobDetails.contactTitle}</Text>
              </View>
            </View>

            <View className="gap-2.5 pt-3 border-t border-neutral-50">
              <View className="flex-row items-center gap-2.5">
                <Mail size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.contactEmail}</Text>
              </View>
              <View className="flex-row items-center gap-2.5">
                <Phone size={15} color="#858585" />
                <Text className="text-neutral-500 text-xs font-semibold">{jobDetails.contactPhone}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2 mb-6">
            <TouchableOpacity
              onPress={() => setActiveSubTab('schedule')}
              style={activeSubTab === 'schedule' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === 'schedule' ? '' : 'border border-neutral-200/60'}`}
            >
              <Text className={`text-xs font-bold ${activeSubTab === 'schedule' ? 'text-white' : 'text-neutral-500'}`}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveSubTab('summary')}
              style={activeSubTab === 'summary' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === 'summary' ? '' : 'border border-neutral-200/60'}`}
            >
              <Text className={`text-xs font-bold ${activeSubTab === 'summary' ? 'text-white' : 'text-neutral-500'}`}>Work Summary</Text>
            </TouchableOpacity>
          </View>

          {activeSubTab === 'schedule' && (
            <View>
              <Text className="text-neutral-900 font-extrabold text-base mb-3.5">Project Schedule</Text>
              <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">Start Date</Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.startDate}</Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">End date</Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.endDate}</Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">Hours</Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.hours}</Text>
                </View>
                <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                  <Text className="text-neutral-400 text-sm font-semibold">Per Week</Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.daysPerWeek}</Text>
                </View>
                <View className="flex-row justify-between items-center p-4">
                  <Text className="text-neutral-400 text-sm font-semibold">Next invoice</Text>
                  <Text className="text-neutral-800 text-sm font-extrabold">{jobDetails.nextInvoice}</Text>
                </View>
              </View>
            </View>
          )}

          {activeSubTab === 'summary' && (
            <View>
              <Text className="text-neutral-900 font-extrabold text-base mb-4">Work Summary</Text>
              <View className="border border-neutral-100 rounded-2xl bg-white shadow-sm overflow-hidden divide-y divide-neutral-50">
                {mockWeeklyWork.map((item, idx) => (
                  <View key={idx} className="flex-row justify-between items-center p-4">
                    <View>
                      <Text className="text-neutral-800 font-extrabold text-sm">{item.week}</Text>
                      <Text className="text-neutral-400 text-xs font-semibold mt-0.5">{item.dates}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${item.status === 'Approved' ? 'bg-green-50' : 'bg-neutral-100'}`}>
                      <Text className={`text-[10px] font-extrabold ${item.status === 'Approved' ? 'text-green-600' : 'text-neutral-500'}`}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
