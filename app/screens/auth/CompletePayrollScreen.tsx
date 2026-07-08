import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { Text } from '@/components/ui/text';

interface CompletePayrollScreenProps {
  onComplete: () => void;
}

export default function CompletePayrollScreen({ onComplete }: CompletePayrollScreenProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <View className="flex-1 bg-white justify-between px-6 pt-16 pb-10">
      {/* Centered Illustration & Text */}
      <View className="flex-1 justify-center items-center mt-10">
        <Image
          source={require('@/assets/images/orange_wallet.png')}
          style={{ width: 160, height: 160, resizeMode: 'contain' }}
        />
        <Text className="text-[#1B2530] text-[26px] font-bold text-center mt-10 tracking-tight leading-8 px-4">
          Complete Employment Partner Profile
        </Text>
        <Text className="text-neutral-500 text-sm text-center mt-3 font-medium leading-5 px-6">
          Connect your payroll partner to continue
        </Text>
      </View>

      {/* Action Button at the Bottom */}
      <View className="w-full mt-6">
        <TouchableOpacity
          onPress={handleConnect}
          disabled={isConnecting}
          activeOpacity={0.9}
          className="w-full bg-[#1B2530] py-4 rounded-xl items-center justify-center shadow-sm"
        >
          {isConnecting ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text className="text-white text-base font-semibold">
              {showModal ? 'Connect Payroll' : 'Complete Employment Partner Profile'}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Modal Overlay */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="w-full bg-white rounded-[32px] p-8 items-center shadow-xl">
            {/* Glossy Green Checkmark Badge */}
            <Image
              source={require('@/assets/images/green_checkmark.png')}
              style={{ width: 90, height: 90, resizeMode: 'contain' }}
            />
            
            <Text className="text-[#1B2530] text-2xl font-bold text-center mt-6 tracking-tight">
              Profile Completed
            </Text>
            
            <Text className="text-neutral-500 text-sm text-center mt-3 font-medium leading-relaxed px-4">
              Congratulations, your profile is complete. You can now start searching for jobs!
            </Text>

            {/* Dashboard Redirect Action */}
            <TouchableOpacity
              onPress={onComplete}
              activeOpacity={0.9}
              className="w-full bg-[#1B2530] py-4 rounded-xl mt-8 items-center justify-center shadow-sm"
            >
              <Text className="text-white text-base font-semibold">
                Go to dashboard
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
