import React, { useState, type ComponentType } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, User, Clock, Lock, AlertCircle, Star, BellRing, FileText, HelpCircle, MessageSquare, LogOut, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

type MenuItem = {
  icon: ComponentType<{ size?: number; color?: string }>;
  label: string;
  onPress?: () => void;
  type?: 'switch';
};

export default function ProfileScreen() {
  const router = useRouter();
  const [available, setAvailable] = useState(true);

  const menuItems: { account: MenuItem[]; more: MenuItem[] } = {
    account: [
      { icon: User, label: 'Profile', onPress: () => router.push('/screens/profile/edit' as any) },
      { icon: Clock, label: 'Available time', type: 'switch' },
      { icon: Lock, label: 'Change Password', onPress: () => router.push('/screens/profile/change-password' as any) },
      { icon: AlertCircle, label: 'Dispute', onPress: () => router.push('/screens/profile/disputes' as any) },
      { icon: Star, label: 'Rating & Feedback', onPress: () => router.push('/screens/profile/rating-feedback' as any) },
      { icon: BellRing, label: 'Notification Settings', onPress: () => {} },
    ], 
    more: [    
      { icon: FileText, label: 'Terms & Conditions', onPress: () => router.push('/screens/profile/terms' as any) },
      { icon: HelpCircle, label: 'Privacy Policy', onPress: () => {} },
      { icon: MessageSquare, label: 'Contact Site Source', onPress: () => {} },
      { icon: LogOut, label: 'Log out', onPress: () => {
        return router.replace('/auth/login' as any);
      } },
    ],
  };

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View 
        style={{ backgroundColor: Colors.common.BRAND }} 
        className="pt-16 pb-8 px-6 rounded-b-[32px] shadow-lg shadow-orange-500/10"
      >
        <View className="flex-row justify-between items-center">
          {/* User Info */}
          <View className="flex-row items-center gap-3">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }} 
              className="w-12 h-12 rounded-full border-2 border-white/35" 
            />
            <View>
              <Text className="text-white text-base font-extrabold tracking-tight">Wade Warren</Text>
              <Text className="text-white/85 text-xs font-semibold">tan@gmail.com</Text>
            </View>
          </View>

          {/* Notification Button */}
          <TouchableOpacity className="w-10 h-10 rounded-full bg-white/15 items-center justify-center border border-white/10 active:opacity-75">
            <Bell color="#FFFFFF" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Account Section */}
        <View className="mt-8">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight mb-4">Account</Text>
          <View className="bg-white rounded-2xl border border-neutral-100/85 shadow-sm overflow-hidden">
            {menuItems.account.map((item, index) => (
              <TouchableOpacity
                key={index} 
                onPress={item.type === 'switch' ? () => setAvailable((value) => !value) : item.onPress}
                className="flex-row items-center justify-between px-5 py-4 border-b border-neutral-50 last:border-b-0 active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  <item.icon size={20} color="#525252" />
                  <Text className="text-neutral-900 font-semibold text-base" style={item.label === 'Log out' ? { color: Colors.common.BRAND } : {color: '#171717'}}>{item.label}</Text>
                </View>
                {item.type === 'switch' ? (
                  <Switch
                    value={available}
                    onValueChange={setAvailable}
                    trackColor={{ false: '#E5E5E5', true: Colors.common.BRAND_LIGHT }}
                    thumbColor={available ? Colors.common.BRAND : '#FFFFFF'}
                    ios_backgroundColor="#E5E5E5"
                  />
                ) : (
                  <ChevronRight size={20} color="#737373" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Section */}
        <View className="mt-8">
          <Text className="text-neutral-900 font-extrabold text-lg tracking-tight mb-4">More</Text>
          <View className="bg-white rounded-2xl border border-neutral-100/85 shadow-sm overflow-hidden">
            {menuItems.more.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={item.onPress}
                className="flex-row items-center justify-between px-5 py-4 border-b border-neutral-50 last:border-b-0 active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  <item.icon size={20} color="#525252" />
                  <Text className="text-neutral-900 font-semibold text-base">{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#737373" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
