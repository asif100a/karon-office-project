import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import LogoWhite from '@/assets/icons/LogoWhite';
import { ChevronDown, X } from 'lucide-react-native';

interface RegisterGeneralScreenProps {
  onContinue?: (data: {
    fullName: string;
    email: string;
    trade: string;
    experience: string;
    availableTime: string;
    address: string;
  }) => void;
}

export default function RegisterGeneralScreen({ onContinue }: RegisterGeneralScreenProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('Groundworker');
  const [experience, setExperience] = useState('6 years');
  const [availableTime, setAvailableTime] = useState('8 am - 5 pm');
  const [address, setAddress] = useState('2972 Westheimer Rd. Santa A...');

  // State for active dropdown modals
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<'trade' | 'experience' | 'availableTime' | null>(null);

  // Selector Options
  const trades = ['Groundworker', 'Carpenter', 'Electrician', 'Plumber', 'Bricklayer', 'Painter', 'Scaffolder'];
  const experiences = ['1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7+ years'];
  const times = ['8 am - 5 pm', '7 am - 4 pm', '9 am - 6 pm', 'Night shift', 'Flexible'];

  const getOptions = () => {
    if (pickerType === 'trade') return trades;
    if (pickerType === 'experience') return experiences;
    if (pickerType === 'availableTime') return times;
    return [];
  };

  const getTitle = () => {
    if (pickerType === 'trade') return 'Select Trade / Skill';
    if (pickerType === 'experience') return 'Select Experience';
    if (pickerType === 'availableTime') return 'Select Available Time';
    return '';
  };

  const handleSelectOption = (option: string) => {
    if (pickerType === 'trade') setTrade(option);
    if (pickerType === 'experience') setExperience(option);
    if (pickerType === 'availableTime') setAvailableTime(option);
    setPickerVisible(false);
    setPickerType(null);
  };

  const openPicker = (type: 'trade' | 'experience' | 'availableTime') => {
    setPickerType(type);
    setPickerVisible(true);
  };

  const handleContinue = () => {
    const data = { fullName, email, trade, experience, availableTime, address };
    if (onContinue) {
      onContinue(data);
    } else {
      router.push({ pathname: '/auth', params: { step: 'register_documents' } });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        className="flex-1" 
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* Orange Header Section */}
        <View className="bg-[#FF5500] pt-14 pb-10 px-6 items-start justify-end min-h-[220px]">
          <View className="mb-4">
            <LogoWhite />
          </View>
          <Text className="text-white text-3xl font-bold tracking-tight">
            Create Your Account
          </Text>
          <Text className="text-white/85 text-sm mt-1.5 font-medium">
            Register to continue your journey with Sitesource
          </Text>
        </View>

        {/* Form Fields Section */}
        <View className="px-6 pt-6 pb-20 gap-5">
          {/* Full Name */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Full Name
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center">
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter Your Full Name"
                placeholderTextColor="#A3A3A3"
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
            </View>
          </View>

          {/* Email Address */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Email Address
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter Your Email"
                placeholderTextColor="#A3A3A3"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
            </View>
          </View>

          {/* Trade / Skill Dropdown */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Trade / Skill
            </Text>
            <TouchableOpacity
              onPress={() => openPicker('trade')}
              activeOpacity={0.7}
              className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between"
            >
              <Text className={`text-sm font-medium ${trade ? 'text-neutral-850' : 'text-neutral-400'}`}>
                {trade || 'Select your trade'}
              </Text>
              <ChevronDown size={18} color="#737373" />
            </TouchableOpacity>
          </View>

          {/* Experience Dropdown */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Experience
            </Text>
            <TouchableOpacity
              onPress={() => openPicker('experience')}
              activeOpacity={0.7}
              className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between"
            >
              <Text className={`text-sm font-medium ${experience ? 'text-neutral-850' : 'text-neutral-400'}`}>
                {experience || 'Select experience'}
              </Text>
              <ChevronDown size={18} color="#737373" />
            </TouchableOpacity>
          </View>

          {/* Available Time Dropdown */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Available time
            </Text>
            <TouchableOpacity
              onPress={() => openPicker('availableTime')}
              activeOpacity={0.7}
              className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center justify-between"
            >
              <Text className={`text-sm font-medium ${availableTime ? 'text-neutral-850' : 'text-neutral-400'}`}>
                {availableTime || 'Select timing'}
              </Text>
              <ChevronDown size={18} color="#737373" />
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View className="gap-2">
            <Text className="text-neutral-500 text-xs font-semibold uppercase tracking-wider">
              Address
            </Text>
            <View className="w-full bg-[#FCFCFC] border border-neutral-200 rounded-xl px-4 py-3.5 flex-row items-center">
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Enter Address"
                placeholderTextColor="#A3A3A3"
                className="flex-1 text-neutral-800 text-sm font-medium p-0"
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            activeOpacity={0.9}
            className="w-full bg-[#1B2530] py-4 rounded-xl items-center justify-center shadow-sm mt-6"
          >
            <Text className="text-white text-base font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reusable Bottom Sheet / Modal Selector */}
      <Modal
        visible={pickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable 
          onPress={() => setPickerVisible(false)} 
          className="flex-1 bg-black/45 justify-end"
        >
          <View className="bg-white rounded-t-3xl pt-5 pb-8 max-h-[400px]">
            <View className="flex-row justify-between items-center px-6 pb-4 border-b border-neutral-100">
              <Text className="text-neutral-800 text-lg font-bold">
                {getTitle()}
              </Text>
              <TouchableOpacity onPress={() => setPickerVisible(false)} className="p-1">
                <X size={20} color="#737373" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={getOptions()}
              keyExtractor={(item) => item}
              contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelectOption(item)}
                  className="py-4 border-b border-neutral-50"
                  activeOpacity={0.7}
                >
                  <Text className="text-neutral-700 text-base font-medium">
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
