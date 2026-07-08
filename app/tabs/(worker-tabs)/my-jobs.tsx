import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Bell, MapPin, Users, Calendar, Briefcase, SlidersHorizontal } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const MOCK_MY_JOBS = [
  {
    id: 'job-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'active',
  },
  {
    id: 'job-completed-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-completed-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-completed-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 20 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'completed',
  },
  {
    id: 'job-cancelled-1',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-2',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-3',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
  {
    id: 'job-cancelled-4',
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Cancelled',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    status: 'cancelled',
  },
];

export default function MyJobsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenJobDetails = (id: string, status: string) => {
    if (status === 'completed') {
      router.push(`/screens/completed-jobs/${id}` as any);
    } else if (status === 'cancelled') {
      router.push(`/screens/cancelled-jobs/${id}` as any);
    } else {
      router.push(`/screens/active-jobs/${id}` as any);
    }
  };

  const filteredJobs = MOCK_MY_JOBS.filter(job => job.status === activeTab);

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-extrabold tracking-tight">My Jobs</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-5 pt-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search / Filter Input */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 flex-row items-center bg-white border border-neutral-200/90 rounded-2xl px-4 py-2.5 shadow-sm">
            <Search size={18} color="#A3A3A3" className="mr-2" />
            <TextInput
              className="flex-1 text-neutral-800 text-sm font-medium py-0"
              placeholder="Search Offers"
              placeholderTextColor="#A3A3A3"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white border border-neutral-200/90 rounded-2xl items-center justify-center shadow-sm active:opacity-85">
            <SlidersHorizontal size={18} color="#333333" />
          </TouchableOpacity>
        </View>

        {/* Toggle Chips */}
        <View className="flex-row gap-2.5 mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('active')}
            style={activeTab === 'active' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
            className={`px-4 py-2 rounded-xl shadow-sm ${activeTab === 'active' ? '' : 'border border-neutral-200/60'}`}
          >
            <Text className={`text-xs font-bold ${activeTab === 'active' ? 'text-white' : 'text-neutral-500'}`}>
              Active jobs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('completed')}
            style={activeTab === 'completed' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
            className={`px-4 py-2 rounded-xl shadow-sm ${activeTab === 'completed' ? '' : 'border border-neutral-200/60'}`}
          >
            <Text className={`text-xs font-bold ${activeTab === 'completed' ? 'text-white' : 'text-neutral-500'}`}>
              Completed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('cancelled')}
            style={activeTab === 'cancelled' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
            className={`px-4 py-2 rounded-xl shadow-sm ${activeTab === 'cancelled' ? '' : 'border border-neutral-200/60'}`}
          >
            <Text className={`text-xs font-bold ${activeTab === 'cancelled' ? 'text-white' : 'text-neutral-500'}`}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

        {/* Jobs List */}
        <View className="gap-4">
          {filteredJobs.map((job) => (
            <TouchableOpacity 
              key={job.id} 
              onPress={() => handleOpenJobDetails(job.id, job.status)}
              activeOpacity={0.9}
              className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm"
            >
              {/* Header info */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-blue-600 rounded-xl items-center justify-center">
                    <Briefcase size={22} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text className="text-neutral-955 font-extrabold text-base">{job.title}</Text>
                    <Text className="text-neutral-500 text-xs font-semibold">{job.company}</Text>
                  </View>
                </View>

                <View className="items-end">
                  <View 
                    style={job.status === 'completed' ? { backgroundColor: '#E0F2FE' } : job.status === 'cancelled' ? { backgroundColor: '#FEE2E2' } : { backgroundColor: Colors.common.BRAND_LIGHT }} 
                    className="px-2.5 py-1 rounded-full"
                  >
                    <Text 
                      style={job.status === 'completed' ? { color: '#0284C7' } : job.status === 'cancelled' ? { color: '#EF4444' } : { color: Colors.common.BRAND }} 
                      className="text-[10px] font-extrabold"
                    >
                      {job.statusBadge}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Details layout */}
              <View className="gap-2.5 pt-3 border-t border-neutral-50">
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}