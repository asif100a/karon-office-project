import { Modal, Pressable, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { GlassView } from "expo-glass-effect";
import { Colors } from "@/constants/Colors";
import { ChevronDown, X } from "lucide-react-native";

const TRADE_SKILL_OPTIONS = [
  "Groundworker",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Bricklayer",
  "Painter",
];

const RATE_OPTIONS = [
  "£0 to £100",
  "£100 to £200",
  "£200 to £300",
  "£300 to £400",
  "£400 to £500",
  "£500+",
];

const RADIUS_OPTIONS = [
  "1 - 10 miles",
  "10 - 25 miles",
  "25 - 50 miles",
  "50 - 100 miles",
  "100+ miles",
];

export default function SearchEmployerFilterModal({
  showFilters,
  setShowFilters,
  rateRange,
  setRateRange,
  tradeSkill,
  setTradeSkill,
  radius,
  setRadius,
}: {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  rateRange: string;
  setRateRange: Dispatch<SetStateAction<string>>;
  tradeSkill: string;
  setTradeSkill: Dispatch<SetStateAction<string>>;
  radius: string;
  setRadius: Dispatch<SetStateAction<string>>;
}) {
  const [openDropdown, setOpenDropdown] = useState<"rate" | "trade" | "radius" | null>(
    null
  );

  if (!showFilters) return null;

  const handleSelect = (
    value: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(value);
    setOpenDropdown(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <View className="flex-1">
        <Pressable
          onPress={() => {
            setOpenDropdown(null);
            setShowFilters(false);
          }}
          style={StyleSheet.absoluteFill}
        >
          <GlassView
            glassEffectStyle="regular"
            tintColor="rgba(148, 163, 184, 0.42)"
            style={StyleSheet.absoluteFill}
          />
          <View style={StyleSheet.absoluteFill} className="bg-neutral-500/10" />
        </Pressable>

        {/* Bottom Sheet Panel */}
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-4xl p-6 pb-12 shadow-2xl border-t border-neutral-100">
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
              <TouchableOpacity
                onPress={() =>
                  setOpenDropdown(openDropdown === "rate" ? null : "rate")
                }
                className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
              >
                <Text className="text-neutral-800 text-sm font-semibold">
                  {rateRange || "Select rate"}
                </Text>
                <ChevronDown size={18} color="#737373" />
              </TouchableOpacity>
              {openDropdown === "rate" ? (
                <View className="mt-2 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                  {RATE_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleSelect(option, setRateRange)}
                      className={`px-4 py-3.5 active:bg-neutral-50 ${
                        rateRange === option ? "bg-neutral-100" : "bg-white"
                      }`}
                    >
                      <Text className="text-neutral-800 text-sm font-semibold">
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
              </View>

              {/* Trade / Skill Dropdown Selection */}
              <View className="relative z-20">
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Trade / Skill
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setOpenDropdown(openDropdown === "trade" ? null : "trade")
                  }
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                >
                  <Text className="text-neutral-800 text-sm font-semibold">
                    {tradeSkill || "Select trade / skill"}
                  </Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
                {openDropdown === "trade" ? (
                  <View className="mt-2 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                    {TRADE_SKILL_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleSelect(option, setTradeSkill)}
                        className={`px-4 py-3.5 active:bg-neutral-50 ${
                          tradeSkill === option ? "bg-neutral-100" : "bg-white"
                        }`}
                      >
                        <Text className="text-neutral-800 text-sm font-semibold">
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </View>

              {/* Radius Dropdown Selection */}
              <View className="relative z-10">
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Radius
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setOpenDropdown(openDropdown === "radius" ? null : "radius")
                  }
                  className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
                >
                  <Text className="text-neutral-800 text-sm font-semibold">
                    {radius || "Select radius"}
                  </Text>
                  <ChevronDown size={18} color="#737373" />
                </TouchableOpacity>
                {openDropdown === "radius" ? (
                  <View className="mt-2 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                    {RADIUS_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => handleSelect(option, setRadius)}
                        className={`px-4 py-3.5 active:bg-neutral-50 ${
                          radius === option ? "bg-neutral-100" : "bg-white"
                        }`}
                      >
                        <Text className="text-neutral-800 text-sm font-semibold">
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>

            {/* Action buttons */}
            <TouchableOpacity
              onPress={() => setShowFilters(false)}
              style={{ backgroundColor: Colors.common.GRAY_DARK }}
              className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 mb-3"
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
