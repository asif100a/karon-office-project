import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import LogoWhite from '@/assets/icons/LogoWhite';
import { useForm } from 'react-hook-form';
import StandardInputField from '@/components/standard_ui/form_fields/StandardInputField';
import StandardSelectField from '@/components/standard_ui/form_fields/StandardSelectField';

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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      trade: 'Groundworker',
      experience: '6 years',
      availableTime: '8 am - 5 pm',
      address: '2972 Westheimer Rd. Santa A...',
    }
  });

  const trades = [
    { label: 'Groundworker', value: 'Groundworker' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Bricklayer', value: 'Bricklayer' },
    { label: 'Painter', value: 'Painter' },
    { label: 'Scaffolder', value: 'Scaffolder' }
  ];

  const experiences = [
    { label: '1 year', value: '1 year' },
    { label: '2 years', value: '2 years' },
    { label: '3 years', value: '3 years' },
    { label: '4 years', value: '4 years' },
    { label: '5 years', value: '5 years' },
    { label: '6 years', value: '6 years' },
    { label: '7+ years', value: '7+ years' }
  ];

  const times = [
    { label: '8 am - 5 pm', value: '8 am - 5 pm' },
    { label: '7 am - 4 pm', value: '7 am - 4 pm' },
    { label: '9 am - 6 pm', value: '9 am - 6 pm' },
    { label: 'Night shift', value: 'Night shift' },
    { label: 'Flexible', value: 'Flexible' }
  ];

  const onSubmit = (data: any) => {
    if (onContinue) {
      onContinue(data);
    } else {
      router.push({ pathname: '/auth', params: { step: 'register_documents' } });
    }
  };

  return (
    <View className="flex-1 bg-white" style={{flex: 1}}>
      <ScrollView 
        className="flex-1" 
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* Orange Header Section */}
        <View className="bg-[#FF5500] pb-10 px-6 items-start justify-end min-h-[220px]">
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
        <View className="px-6 pt-6 pb-20 gap-1">
          {/* Full Name */}
          <StandardInputField
            label="Full Name"
            id="fullName"
            control={control}
            required={true}
            placeholder="Enter Your Full Name"
          />

          {/* Email Address */}
          <StandardInputField
            label="Email Address"
            id="email"
            type="email"
            control={control}
            required={true}
            placeholder="Enter Your Email"
          />

          {/* Trade / Skill Dropdown */}
          <StandardSelectField
            label="Trade / Skill"
            id="trade"
            control={control}
            options={trades}
            placeholder="Select Trade / Skill"
            required={true}
          />

          {/* Experience Dropdown */}
          <StandardSelectField
            label="Experience"
            id="experience"
            control={control}
            options={experiences}
            placeholder="Select Experience"
            required={true}
          />

          {/* Available Time Dropdown */}
          <StandardSelectField
            label="Available time"
            id="availableTime"
            control={control}
            options={times}
            placeholder="Select Available time"
            required={true}
          />

          {/* Address */}
          <StandardInputField
            label="Address"
            id="address"
            control={control}
            required={true}
            placeholder="Enter Address"
          />

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.9}
            className="w-full bg-[#1B2530] py-4 rounded-xl items-center justify-center shadow-sm mt-4"
          >
            <Text className="text-white text-base font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
