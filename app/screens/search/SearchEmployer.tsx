import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Map, List, SlidersHorizontal, MapPin, Users, Calendar, Briefcase, Clock, X, ChevronDown, ChevronLeft } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock listings data
const MOCK_JOBS = [
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

// Map view mockup data
const MOCK_MAP_JOBS = [
  {
    id: '6',
    title: 'Labourer',
    company: 'London builder limited',
    payRate: '$100 - $120/hour',
    tag: 'Market Rate',
    location: 'Stratford • 2.4 mi away',
    team: '1 labor, 2 electricians',
    duration: '10 Jun • 3 weeks',
    time: '2 hours ago',
  }
];

export default function WorkerSearchScreen() {
  const router = useRouter();
  const [viewType, setViewType] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [rateEmail, setRateEmail] = useState('');
  const [tradeSkill, setTradeSkill] = useState('Groundworker');
  const [radius, setRadius] = useState('1 - 10 miles');

  const handleViewDetails = (id: string) => {
    router.push(`/screens/employer-details/${id}` as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* Search Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pb-6 pt-4 px-6 rounded-b-[24px] shadow-lg shadow-orange-500/10 z-10"
      >
        <View className="flex-row justify-between items-center">
          {/* Back button and title */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-row items-center gap-1 active:opacity-75"
          >
            <ChevronLeft size={20} color="#FFFFFF" />
            <Text className="text-white text-base font-extrabold tracking-tight">Search Jobs</Text>
          </TouchableOpacity>
          
          {/* Map/List View Toggle */}
          <TouchableOpacity 
            onPress={() => setViewType(viewType === 'list' ? 'map' : 'list')}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/25 active:opacity-75"
          >
            {viewType === 'list' ? (
              <Map color="#FFFFFF" size={18} />
            ) : (
              <List color="#FFFFFF" size={18} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter Section (Static subheader) */}
      <View className="px-5 pt-4 pb-2 bg-neutral-50 flex-row gap-3 items-center z-10">
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

        <TouchableOpacity 
          onPress={() => setShowFilters(true)}
          className="w-12 h-12 bg-white border border-neutral-200/90 rounded-2xl items-center justify-center shadow-sm active:opacity-80"
        >
          <SlidersHorizontal size={18} color="#333333" />
        </TouchableOpacity>
      </View>

      {/* Content render based on toggle */}
      {viewType === 'list' ? (
        /* LIST VIEW */
        <ScrollView 
          className="flex-1 px-5 pt-2 bg-neutral-50" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Results Count */}
          <View className="flex-row justify-between items-center my-4">
            <Text className="text-neutral-900 font-extrabold text-base tracking-tight">Search Result</Text>
            <Text style={{ color: Colors.common.BRAND }} className="text-xs font-extrabold">28 Results</Text>
          </View>

          {/* Job Listings */}
          <View className="gap-4">
            {MOCK_JOBS.map((job) => (
              <View 
                key={job.id} 
                className="bg-white rounded-2xl p-5 border border-neutral-100/85 shadow-sm"
              >
                {/* Job Header */}
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

                {/* Specs */}
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

                {/* Footer and Buttons */}
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
      ) : (
        /* MAP VIEW */
        <View className="flex-1 bg-neutral-100 relative overflow-hidden">
          {/* Custom vector layout mockup map */}
          <View className="absolute inset-0">
            {/* Street Grid Lines */}
            <View className="absolute top-[15%] left-0 w-full h-[3px] bg-white rotate-6" />
            <View className="absolute top-[35%] left-0 w-full h-[3.5px] bg-white -rotate-12" />
            <View className="absolute top-[60%] left-0 w-full h-[3px] bg-white rotate-3" />
            <View className="absolute bottom-[20%] left-0 w-full h-[4px] bg-white -rotate-6" />
            <View className="absolute left-[30%] top-0 w-[3px] h-full bg-white rotate-[35deg]" />
            <View className="absolute left-[65%] top-0 w-[3.5px] h-full bg-white -rotate-[25deg]" />
            <View className="absolute left-[85%] top-0 w-[3px] h-full bg-white rotate-[40deg]" />

            {/* Street labels */}
            <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-6 top-[13%] left-[10%]">Weston Dr</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-12 top-[32%] left-[45%]">Kenton Ln</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold rotate-3 top-[58%] right-[15%]">Newton Ln</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-6 bottom-[22%] left-[30%] font-medium">Culver Grove</Text>
            <Text className="absolute text-[8px] text-neutral-400 font-bold -rotate-[25deg] top-[75%] left-[78%]">Stratford</Text>

            {/* Random orange map pin markers */}
            <View className="absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
            <View className="absolute top-[50%] left-[75%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />
            <View className="absolute bottom-[35%] left-[25%] w-3 h-3 rounded-full bg-orange-500 border border-white shadow-sm" />

            {/* Pin 1 (Active/Selected Marker in mock) */}
            <View className="absolute top-[30%] left-[55%] items-center">
              {/* Map Popover Card */}
              <View className="bg-white/95 rounded-xl p-3 border border-neutral-100 shadow-lg mb-2 items-center flex-row gap-2.5">
                <View className="w-8 h-8 bg-blue-600 rounded-lg items-center justify-center">
                  <Briefcase size={14} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-neutral-900 font-extrabold text-[10px]">Labourer</Text>
                  <Text className="text-neutral-500 text-[8px] font-semibold">London builder limited</Text>
                  <Text className="text-neutral-900 font-bold text-[8px] mt-0.5">$100 - $120/hour</Text>
                </View>
                <View 
                  style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                  className="px-1.5 py-0.5 rounded"
                >
                  <Text 
                    style={{ color: Colors.common.BRAND }} 
                    className="text-[7px] font-extrabold"
                  >
                    Market
                  </Text>
                </View>
              </View>
              {/* Pulsing ring */}
              <View className="w-8 h-8 rounded-full bg-blue-600/20 absolute -bottom-4 justify-center items-center">
                <View className="w-4 h-4 rounded-full bg-blue-600 border border-white shadow" />
              </View>
            </View>
          </View>

          {/* Floating Card at the Bottom */}
          <View className="absolute bottom-6 left-5 right-5">
            {MOCK_MAP_JOBS.map((job) => (
              <View 
                key={job.id} 
                className="bg-white rounded-3xl p-5 border border-neutral-100/90 shadow-xl"
              >
                {/* Header */}
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

                {/* Specs */}
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

                {/* Footer and Buttons */}
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
      )}

      {/* FILTERS MODAL (Bottom Sheet style) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilters}
        onRequestClose={() => setShowFilters(false)}
      >
        {/* Backdrop */}
        <View className="flex-1 bg-black/50 justify-end">
          {/* Bottom Sheet Panel */}
          <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
            {/* Header row */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">FILTERS</Text>
              <TouchableOpacity 
                onPress={() => setShowFilters(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
              >
                <X size={16} color="#333333" />
              </TouchableOpacity>
            </View>

            {/* Filter Forms */}
            <View className="gap-5 mb-8">
              {/* Rate input */}
              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Rate</Text>
                <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row items-center">
                  <TextInput
                    className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                    placeholder="Enter Your Email"
                    placeholderTextColor="#A3A3A3"
                    value={rateEmail}
                    onChangeText={setRateEmail}
                  />
                </View>
              </View>

              {/* Trade / Skill Dropdown Selection */}
              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Trade / Skill</Text>
                <TouchableOpacity 
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                >
                  <Text className="text-neutral-800 text-sm font-semibold">{tradeSkill}</Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
              </View>

              {/* Radius Dropdown Selection */}
              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Radius</Text>
                <TouchableOpacity 
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                >
                  <Text className="text-neutral-800 text-sm font-semibold">{radius}</Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Action buttons */}
            <TouchableOpacity 
              onPress={() => setShowFilters(false)}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
            >
              <Text className="text-white font-extrabold text-sm">Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
