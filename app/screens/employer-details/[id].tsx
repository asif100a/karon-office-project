import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Bookmark, MapPin, Users, Calendar, Briefcase, Clock } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmployerDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Simple static data lookup based on id parameter (mock)
  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    time: '2 hours ago',
    tradeSkill: 'Groundworker',
    tradeCount: '1 labor',
    employmentType: 'Full-time',
    jobDuration: '4 week',
    requirements: 'CIS registration required. CSCS Gold card preferred. Site induction on day one.',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* Navigation Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-neutral-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-neutral-50 items-center justify-center border border-neutral-100 active:opacity-75"
        >
          <ArrowLeft size={20} color="#171717" />
        </TouchableOpacity>
        <Text className="text-neutral-900 font-extrabold text-base">Employer Details</Text>
        <TouchableOpacity 
          className="w-10 h-10 rounded-xl bg-neutral-900 items-center justify-center active:opacity-85"
        >
          <Bookmark size={18} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Mock Map Banner */}
        <View className="h-48 w-full bg-slate-50 overflow-hidden relative border-b border-neutral-100">
          {/* Visual representations of grid lines / streets */}
          <View className="absolute top-1/4 left-0 w-full h-[1.5px] bg-neutral-200/50 rotate-6" />
          <View className="absolute top-2/3 left-0 w-full h-[1.5px] bg-neutral-200/50 -rotate-[8deg]" />
          <View className="absolute left-1/3 top-0 w-[1.5px] h-full bg-neutral-200/50 rotate-45" />
          <View className="absolute left-2/3 top-0 w-[1.5px] h-full bg-neutral-200/50 -rotate-[35deg]" />

          {/* Street labels */}
          <Text className="absolute text-[9px] text-neutral-400 font-bold rotate-6 top-[22%] left-[15%]">Weston Dr</Text>
          <Text className="absolute text-[9px] text-neutral-400 font-bold -rotate-[8deg] top-[60%] right-[20%]">St Andrews Dr</Text>
          <Text className="absolute text-[9px] text-neutral-400 font-bold rotate-45 bottom-[25%] left-[30%]">Wemborough Rd</Text>

          {/* Centered Map Pin indicator */}
          <View className="absolute top-1/2 left-1/2 -mt-7 -ml-6 items-center justify-center">
            {/* Pulsing ring */}
            <View className="w-12 h-12 rounded-full bg-orange-500/10 absolute justify-center items-center" />
            <View className="w-9 h-9 rounded-full bg-white items-center justify-center shadow-lg border border-neutral-100">
              <MapPin size={20} color={Colors.common.BRAND} />
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="px-6 pb-24">
          {/* Overlapping Info Card */}
          <View className="bg-white rounded-3xl p-5 border border-neutral-100/90 shadow-sm -mt-10 mb-6">
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
                  className="px-2.5 py-0.5 rounded-full mt-1.5"
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
            <View className="bg-neutral-50 border border-neutral-100 rounded-2xl px-4 py-3.5">
              <Text className="text-neutral-800 text-sm font-semibold">{jobDetails.tradeSkill}</Text>
            </View>
          </View>

          {/* Job Overview Specifications Grid */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-900 font-extrabold text-base">Job overview</Text>
              <View className="flex-row items-center gap-1.5">
                <Clock size={14} color="#A3A3A3" />
                <Text className="text-neutral-400 text-xs font-medium">{jobDetails.time}</Text>
              </View>
            </View>

            <View className="border border-neutral-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Trade</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.tradeCount}</Text>
              </View>
              
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Employment</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.employmentType}</Text>
              </View>

              <View className="flex-row justify-between items-center p-4 border-b border-neutral-50">
                <Text className="text-neutral-500 text-sm font-semibold">Duration</Text>
                <Text className="text-neutral-900 text-sm font-extrabold">{jobDetails.jobDuration}</Text>
              </View>

              <View className="flex-row justify-between items-center p-4">
                <Text className="text-neutral-500 text-sm font-semibold">Pay range</Text>
                <View className="flex-row items-center gap-2">
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
          <View className="mb-6">
            <Text className="text-neutral-900 font-extrabold text-base mb-3">Requirements</Text>
            <View className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
              <Text className="text-neutral-600 text-sm leading-relaxed font-medium">
                {jobDetails.requirements}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-6 py-4 flex-row gap-3">
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
