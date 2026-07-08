import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, MapPin, Users, Calendar, Briefcase, ChevronRight, SlidersHorizontal } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const MOCK_FEATURED_JOBS = [
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
    id: '5',
    title: 'Graphic Designer',
    company: 'Creative Studios',
    payRate: '$60 - $90/hour',
    tag: 'Competitive Rate',
    location: 'Soho • 2.5 mi away',
    team: '1 designer',
    duration: '15 Jun • 2 weeks',
    time: '4 hours ago',
  },
];

export default function WorkerOffersTabLanding() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'browse' | 'offers'>('browse');

  const handleOpenSearch = () => {
    router.push('/screens/search/SearchEmployer' as any);
  };

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
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center border border-white/35">
              <Text className="text-white font-extrabold text-base">TH</Text>
            </View>
            <View>
              <Text className="text-white/85 text-xs font-semibold">Welcome Back 👋</Text>
              <Text className="text-white text-base font-extrabold tracking-tight">Thom Haye</Text>
            </View>
          </View>
          
          <View className="flex-row gap-2">
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
        {/* Tappable Search Trigger Bar */}
        <TouchableOpacity 
          onPress={handleOpenSearch}
          activeOpacity={0.9}
          className="mt-6 flex-row items-center bg-white border border-neutral-200/95 rounded-2xl px-4 py-3.5 shadow-sm"
        >
          <Search size={18} color="#A3A3A3" className="mr-3" />
          <Text className="flex-1 text-neutral-400 text-sm font-medium">Search Offers</Text>
          <View className="w-8 h-8 bg-neutral-50 rounded-xl items-center justify-center border border-neutral-100">
            <SlidersHorizontal size={14} color="#737373" />
          </View>
        </TouchableOpacity>

        {/* Category Toggles (navigates/triggers search view) */}
        <View className="flex-row gap-3 mt-6">
          <TouchableOpacity 
            onPress={() => {
              setActiveCategory('browse');
              handleOpenSearch();
            }}
            style={activeCategory === 'browse' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
            className={`px-5 py-3.5 rounded-2xl shadow-sm ${activeCategory === 'browse' ? '' : 'border border-neutral-200/60'}`}
          >
            <Text className={`text-xs font-bold ${activeCategory === 'browse' ? 'text-white' : 'text-neutral-500'}`}>
              Browse Opportunities
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => {
              setActiveCategory('offers');
              handleOpenSearch();
            }}
            style={activeCategory === 'offers' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
            className={`px-5 py-3.5 rounded-2xl shadow-sm ${activeCategory === 'offers' ? '' : 'border border-neutral-200/60'}`}
          >
            <Text className={`text-xs font-bold ${activeCategory === 'offers' ? 'text-white' : 'text-neutral-500'}`}>
              Offers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Featured Listings Header */}
        <View className="flex-row justify-between items-center mt-8 mb-4">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">Active Opportunities</Text>
          <TouchableOpacity onPress={handleOpenSearch} className="flex-row items-center">
            <Text style={{ color: Colors.common.BRAND }} className="text-xs font-extrabold mr-1">See All</Text>
            <ChevronRight size={16} color={Colors.common.BRAND} />
          </TouchableOpacity>
        </View>

        {/* Vertical Job Listings */}
        <View className="gap-4">
          {MOCK_FEATURED_JOBS.map((job) => (
            <View 
              key={job.id} 
              className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm"
            >
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
      </ScrollView>
    </View>
  );
}