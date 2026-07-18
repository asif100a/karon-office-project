import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import ProgressImg from "@/assets/images/auth/progress.png";

interface ReviewScreenProps {
  onBackToLogin: () => void;
}

export default function ReviewScreen({ onBackToLogin }: ReviewScreenProps) {
  return (
    <View className="flex-1 bg-white justify-between px-6 pt-16 pb-10">
      {/* Centered Illustration & Text */}
      <View className="flex-1 justify-center items-center mt-10">
        <Image
          source={ProgressImg}
          style={{ width: 160, height: 160, resizeMode: "contain" }}
        />
        <Text className="text-[#1B2530] text-[26px] font-bold text-center mt-10 tracking-tight leading-8 px-4">
          Application Under Review
        </Text>
        <Text className="text-neutral-500 text-sm text-center mt-4 font-medium leading-6 px-8">
          Your account is under review by our team. You'll be notified as soon
          as it's approved, and then you can log in.
        </Text>
      </View>

      {/* Subtle Exit Link at the Bottom */}
      <View className="w-full mt-6 items-center">
        <TouchableOpacity
          onPress={onBackToLogin}
          activeOpacity={0.7}
          className="py-2"
        >
          <Text className="text-neutral-600 text-sm font-semibold underline">
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
