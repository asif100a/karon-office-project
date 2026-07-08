import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Bell, MapPin, Users, Calendar, Briefcase, Mail, Phone, Clock, Headphones, X, ChevronDown, Check, Info } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActiveJobDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Tab selector State
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'summary' | 'policy'>('schedule');
  
  // Modal State
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  
  // Modal inputs
  const [selectedWeek, setSelectedWeek] = useState('Select Week');
  const [mondayHrs, setMondayHrs] = useState('');
  const [tuesdayHrs, setTuesdayHrs] = useState('');
  const [wednesdayHrs, setWednesdayHrs] = useState('');
  const [thursdayHrs, setThursdayHrs] = useState('');

  // Support Modal States
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalState, setSupportModalState] = useState<'form' | 'submitted'>('form');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportDescription, setSupportDescription] = useState('');

  // Mock static data for the active job details (using sample parameters)
  const jobDetails = {
    title: 'Labourer',
    company: 'Tech Innovators Inc.',
    statusBadge: 'Day 3 of 20',
    location: 'Shoreditch • 1.2 mi away',
    team: '2 developers, 1 designer',
    duration: '12 Jun • 1 month',
    contactName: 'James Hartley',
    contactTitle: 'Director • Hartley Construction',
    contactEmail: 'olivia@untitledui.com',
    contactPhone: '+44 723 456 7891',
    startDate: '3 Jun 2026',
    endDate: '28 Jun 2026',
    hours: '07:30 - 17:00',
    daysPerWeek: '5 Days',
    nextInvoice: 'Friday 7 Jun',
  };

  const mockWeeklyWork = [
    { week: 'Week 1', dates: '12th - 16th July', status: 'Completed', color: 'bg-neutral-100 text-neutral-500' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved', color: 'bg-green-50 text-green-600' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved', color: 'bg-green-50 text-green-600' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved', color: 'bg-green-50 text-green-600' },
    { week: 'Week 1', dates: '12th - 16th July', status: 'Approved', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      {/* Brand Header */}
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
        <View className="px-5 pt-4 pb-20">
          
          {/* Active Job Card */}
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
                <View 
                  style={{ backgroundColor: Colors.common.BRAND_LIGHT }} 
                  className="px-2.5 py-1 rounded-full"
                >
                  <Text 
                    style={{ color: Colors.common.BRAND }} 
                    className="text-[10px] font-extrabold"
                  >
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

          {/* Employer Contact Card */}
          <View className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm mb-6">
            <Text className="text-neutral-900 font-extrabold text-base mb-4">Employer Contact</Text>
            
            <View className="flex-row items-center gap-3 mb-4">
              {/* Profile initials */}
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

          {/* Subnavigation chips */}
          <View className="flex-row gap-2 mb-6">
            <TouchableOpacity 
              onPress={() => setActiveSubTab('schedule')}
              style={activeSubTab === 'schedule' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === 'schedule' ? '' : 'border border-neutral-200/60'}`}
            >
              <Text className={`text-xs font-bold ${activeSubTab === 'schedule' ? 'text-white' : 'text-neutral-500'}`}>
                Schedule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveSubTab('summary')}
              style={activeSubTab === 'summary' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === 'summary' ? '' : 'border border-neutral-200/60'}`}
            >
              <Text className={`text-xs font-bold ${activeSubTab === 'summary' ? 'text-white' : 'text-neutral-500'}`}>
                Work Summary
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveSubTab('policy')}
              style={activeSubTab === 'policy' ? { backgroundColor: Colors.common.GRAY_DARK } : { backgroundColor: '#E5E5E52B' }}
              className={`px-4 py-2 rounded-xl shadow-sm ${activeSubTab === 'policy' ? '' : 'border border-neutral-200/60'}`}
            >
              <Text className={`text-xs font-bold ${activeSubTab === 'policy' ? 'text-white' : 'text-neutral-500'}`}>
                Worker Policy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Sub-content grids */}
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
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-neutral-900 font-extrabold text-base">Work Summary</Text>
                <TouchableOpacity 
                  onPress={() => setShowApprovalModal(true)}
                  style={{ borderColor: Colors.common.BRAND }}
                  className="border px-3 py-1.5 rounded-xl active:opacity-75 bg-white"
                >
                  <Text style={{ color: Colors.common.BRAND }} className="text-xs font-bold">Request Approval</Text>
                </TouchableOpacity>
              </View>

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

          {activeSubTab === 'policy' && (
            <View>
              <Text className="text-neutral-900 font-extrabold text-base mb-3.5">Work Summary</Text>
              
              <View className="gap-3.5">
                {/* Free cancellation */}
                <View className="bg-emerald-50/60 border border-emerald-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5" />
                  <View>
                    <Text className="text-emerald-850 font-extrabold text-sm">Free cancellation</Text>
                    <Text className="text-emerald-600 text-xs font-semibold mt-0.5">More than 48 hours before start</Text>
                  </View>
                </View>

                {/* 50% charge */}
                <View className="bg-amber-50/60 border border-amber-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5" />
                  <View>
                    <Text className="text-amber-850 font-extrabold text-sm">50% charge</Text>
                    <Text className="text-amber-600 text-xs font-semibold mt-0.5">Between 48-24 hours before start</Text>
                  </View>
                </View>

                {/* Full charge */}
                <View className="bg-red-50/60 border border-red-100/55 rounded-2xl p-4 flex-row items-start gap-3">
                  <View className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5" />
                  <View>
                    <Text className="text-red-855 font-extrabold text-sm">Full charge</Text>
                    <Text className="text-red-600 text-xs font-semibold mt-0.5">Within 24 hours of start</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Floating Orange Headset Button (FAB) */}
      <TouchableOpacity 
        onPress={() => {
          setSupportModalState('form');
          setShowSupportModal(true);
        }}
        style={{ backgroundColor: Colors.common.BRAND }}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-orange-500/25 active:opacity-90 z-20"
      >
        <Headphones size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* MESSAGE SUPPORT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSupportModal}
        onRequestClose={() => setShowSupportModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          {supportModalState === 'form' ? (
            /* Support Form View */
            <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">Message Support</Text>
                <TouchableOpacity 
                  onPress={() => setShowSupportModal(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
                >
                  <X size={16} color="#333333" />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-[450px] mb-6" showsVerticalScrollIndicator={false}>
                <View className="gap-5 pr-1">
                  {/* Upload PDF Box */}
                  <View className="border border-dashed border-neutral-300 rounded-3xl p-6 bg-neutral-50/50 items-center justify-center">
                    <Text className="text-neutral-400 text-[10px] font-extrabold tracking-wider uppercase mb-1">Upload PDF or Photo</Text>
                    <Text className="text-neutral-400 text-[9px] font-semibold mb-4">JPG • PNG • PDF • MAX 10MB</Text>
                    <TouchableOpacity className="bg-neutral-950 px-5 py-2.5 rounded-full active:opacity-85 shadow-sm">
                      <Text className="text-neutral-700 text-xs font-extrabold">Upload</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Subject input */}
                  <View>
                    <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Subject</Text>
                    <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3">
                      <TextInput
                        className="text-neutral-800 text-sm font-semibold py-0"
                        placeholder="Enter Your Email"
                        placeholderTextColor="#A3A3A3"
                        value={supportSubject}
                        onChangeText={setSupportSubject}
                      />
                    </View>
                  </View>

                  {/* Description input */}
                  <View>
                    <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Description</Text>
                    <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3">
                      <TextInput
                        className="text-neutral-800 text-sm font-semibold py-0"
                        placeholder="Enter Your Email"
                        placeholderTextColor="#A3A3A3"
                        value={supportDescription}
                        onChangeText={setSupportDescription}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity 
                onPress={() => setSupportModalState('submitted')}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
              >
                <Text className="text-white font-extrabold text-sm">Submit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Support Submitted View */
            <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100 items-center">
              {/* Checkmark circle badge */}
              <View className="w-20 h-20 bg-green-50 rounded-full items-center justify-center mb-6 border border-green-100">
                <View className="w-14 h-14 bg-green-500 rounded-full items-center justify-center shadow-lg shadow-green-500/25">
                  <Check size={28} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>

              <Text className="text-neutral-950 font-extrabold text-xl tracking-tight mb-1.5">Submitted</Text>
              <Text className="text-neutral-400 text-xs font-semibold mb-6">Ticket ID: #SUP-2045</Text>

              {/* Banner */}
              <View className="bg-orange-50/80 border border-orange-100/50 rounded-2xl p-4 flex-row items-center gap-3 w-full mb-8">
                <View className="w-7 h-7 bg-orange-500/10 rounded-full justify-center items-center">
                  <Info size={14} color="#F97316" />
                </View>
                <Text className="flex-1 text-orange-800 text-xs font-semibold leading-relaxed">
                  Our admin team will review your issue and respond shortly.
                </Text>
              </View>

              <TouchableOpacity 
                onPress={() => setShowSupportModal(false)}
                style={{ backgroundColor: Colors.common.GRAY_DARK }}
                className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md"
              >
                <Text className="text-white font-extrabold text-sm">Go to dashboard</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {/* REQUEST APPROVAL MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showApprovalModal}
        onRequestClose={() => setShowApprovalModal(false)}
      >
        {/* Backdrop */}
        <View className="flex-1 bg-black/50 justify-end">
          {/* Bottom sheet */}
          <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">Request approval</Text>
              <TouchableOpacity 
                onPress={() => setShowApprovalModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
              >
                <X size={16} color="#333333" />
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <ScrollView className="max-h-[400px] mb-6" showsVerticalScrollIndicator={false}>
              <View className="gap-4.5 pr-1">
                {/* Select Week Dropdown */}
                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Week</Text>
                  <TouchableOpacity 
                    className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                  >
                    <Text className="text-neutral-800 text-sm font-semibold">{selectedWeek}</Text>
                    <ChevronDown size={18} color="#737373" />
                  </TouchableOpacity>
                </View>

                {/* Day Hours inputs */}
                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Monday</Text>
                  <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                    <TextInput
                      className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                      placeholder="Enter total working hours"
                      placeholderTextColor="#A3A3A3"
                      keyboardType="numeric"
                      value={mondayHrs}
                      onChangeText={setMondayHrs}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Tuesday</Text>
                  <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                    <TextInput
                      className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                      placeholder="Enter total working hours"
                      placeholderTextColor="#A3A3A3"
                      keyboardType="numeric"
                      value={tuesdayHrs}
                      onChangeText={setTuesdayHrs}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Wednesday</Text>
                  <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                    <TextInput
                      className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                      placeholder="Enter total working hours"
                      placeholderTextColor="#A3A3A3"
                      keyboardType="numeric"
                      value={wednesdayHrs}
                      onChangeText={setWednesdayHrs}
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">Thursday</Text>
                  <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                    <TextInput
                      className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                      placeholder="Enter total working hours"
                      placeholderTextColor="#A3A3A3"
                      keyboardType="numeric"
                      value={thursdayHrs}
                      onChangeText={setThursdayHrs}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Submit */}
            <TouchableOpacity 
              onPress={() => setShowApprovalModal(false)}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 shadow-md shadow-neutral-900/10"
            >
              <Text className="text-white font-extrabold text-sm">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
