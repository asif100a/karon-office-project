import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, MapPin, Users, Calendar, Briefcase, ChevronRight, Sparkles } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const MOCK_JOB_OFFERS = [
  {
    id: '1',
    title: 'Labourer',
    company: 'London builder limited',
    payRate: '$100 - $120/hour',
    tag: 'Market Rate',
  },
  {
    id: '2',
    title: 'Labourer',
    company: 'London builder limited',
    payRate: '$100 - $120/hour',
    tag: 'Market Rate',
  },
];

const MOCK_RECOMMENDED = [
  {
    id: '3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    time: '2 hours ago',
  },
  {
    id: '4',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    payRate: '$80 - $120/hour',
    tag: 'Market Rate',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    time: '2 hours ago',
  },
];

export default function WorkerHomeScreen() {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/screens/employer-details/${id}` as any);
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Brand Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          {/* User Info */}
          <View className="flex-row items-center gap-3">
            {/* Initials Avatar */}
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center border border-white/35">
              <Text className="text-white font-extrabold text-base">TH</Text>
            </View>
            <View>
              <Text className="text-white/85 text-xs font-semibold">Welcome Back 👋</Text>
              <Text className="text-white text-base font-extrabold tracking-tight">Hello, Thom Haye</Text>
            </View>
          </View>

          {/* Header Action Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
              <Search color="#FFFFFF" size={18} />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75 relative">
              <Bell color="#FFFFFF" size={18} />
              <View className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border border-orange-500" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Job Offer Horizontal Carousel */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center gap-2">
              <Sparkles size={18} color={Colors.common.BRAND} />
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">Job Offer</Text>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <ChevronRight size={20} color="#737373" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5"
          >
            {MOCK_JOB_OFFERS.map((job) => (
              <TouchableOpacity 
                key={job.id}
                onPress={() => handleViewDetails(job.id)}
                activeOpacity={0.9}
                className="bg-white rounded-2xl p-4 mr-4 shadow-sm border border-neutral-100/80 w-64"
              >
                <View className="flex-row items-center gap-3 mb-4">
                  {/* Custom Job Icon Logo */}
                  <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                    <Briefcase size={20} color="#FFFFFF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-900 font-extrabold text-base" numberOfLines={1}>
                      {job.title}
                    </Text>
                    <Text className="text-neutral-500 text-xs font-semibold" numberOfLines={1}>
                      {job.company}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center pt-2 border-t border-neutral-50/80">
                  <Text className="text-neutral-800 font-bold text-sm">
                    {job.payRate}
                  </Text>
                  <View 
                    style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                    className="px-2.5 py-1 rounded-full"
                  >
                    <Text 
                      style={{ color: Colors.common.BRAND }} 
                      className="text-[10px] font-extrabold"
                    >
                      {job.tag}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Vertical List */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">Recommended</Text>
            <TouchableOpacity className="flex-row items-center">
              <ChevronRight size={20} color="#737373" />
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {MOCK_RECOMMENDED.map((job) => (
              <View 
                key={job.id} 
                className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm"
              >
                {/* Header info */}
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-row items-center gap-3">
                    <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                      <Briefcase size={22} color="#FFFFFF" />
                    </View>
                    <View>
                      <Text className="text-neutral-950 font-extrabold text-base">{job.title}</Text>
                      <Text className="text-neutral-500 text-xs font-semibold">{job.company}</Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="text-neutral-900 font-extrabold text-sm">{job.payRate}</Text>
                    <View 
                      style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                      className="px-2.5 py-0.5 rounded-full mt-1.5"
                    >
                      <Text 
                        style={{ color: Colors.common.BRAND }} 
                        className="text-[10px] font-extrabold"
                      >
                        {job.tag}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Details layout */}
                <View className="gap-2.5 py-3 border-y border-neutral-50 mb-4">
                  <View className="flex-row items-center gap-2">
                    <MapPin size={15} color="#858585" />
                    <Text className="text-neutral-500 text-xs font-semibold">{job.location}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Users size={15} color="#858585" />
                    <Text className="text-neutral-500 text-xs font-semibold">{job.team}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Calendar size={15} color="#858585" />
                    <Text className="text-neutral-500 text-xs font-semibold">{job.duration}</Text>
                  </View>
                </View>

                {/* Action buttons */}
                <View className="flex-row justify-between items-center">
                  <Text className="text-neutral-400 text-xs font-medium">{job.time}</Text>

                  <View className="flex-row gap-2">
                    <TouchableOpacity 
                      onPress={() => handleViewDetails(job.id)}
                      className="px-4 py-2 bg-neutral-100 rounded-xl active:opacity-70"
                    >
                      <Text className="text-neutral-600 font-bold text-xs">View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => handleViewDetails(job.id)}
                      style={{ backgroundColor: Colors.common.GRAY_DARK }}
                      className="px-4 py-2 rounded-xl active:opacity-90 shadow-sm"
                    >
                      <Text className="text-white font-bold text-xs">Send Request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}