import { Modal, Pressable, StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { GlassView } from "expo-glass-effect";
import { Colors } from "@/constants/Colors";
import { ChevronDown, X } from "lucide-react-native";

export default function SearchEmployerFilterModal({
  showFilters,
  setShowFilters,
  rateEmail,
  setRateEmail,
  tradeSkill,
  setTradeSkill,
  radius,
  setRadius,
}: {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  rateEmail: string;
  setRateEmail: Dispatch<SetStateAction<string>>;
  tradeSkill: string;
  setTradeSkill: Dispatch<SetStateAction<string>>;
  radius: string;
  setRadius: Dispatch<SetStateAction<string>>;
}) {
  if(!showFilters) return null

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <View className="flex-1">
        <Pressable
          onPress={() => setShowFilters(false)}
          style={StyleSheet.absoluteFill}
        >
          <GlassView
            glassEffectStyle="regular"
            tintColor="rgba(148, 163, 184, 0.42)"
            style={StyleSheet.absoluteFill}
          />
          <View style={StyleSheet.absoluteFillObject} className="bg-neutral-500/10" />
        </Pressable>

        {/* Bottom Sheet Panel */}
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-neutral-100">
            {/* Header row */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
                FILTERS
              </Text>
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
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Rate
                </Text>
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
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Trade / Skill
                </Text>
                <TouchableOpacity className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85">
                  <Text className="text-neutral-800 text-sm font-semibold">
                    {tradeSkill}
                  </Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
              </View>

              {/* Radius Dropdown Selection */}
              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Radius
                </Text>
                <TouchableOpacity className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85">
                  <Text className="text-neutral-800 text-sm font-semibold">
                    {radius}
                  </Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Action buttons */}
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90"
            >
              <Text className="text-white font-extrabold text-sm">
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
