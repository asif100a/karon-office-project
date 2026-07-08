import { Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import StandardButton from "@/components/standard_ui/buttons/StandardButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ModalContainer from "./_modalContainer/ModalContainer";

export default function DeleteProfileModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <View>
      <ModalContainer visible={isOpen} setVisible={setOpen}>
        <View
          className={`bg-black/50 border border-[${Colors.common.GRAY_LIGHT}] rounded-lg`}
        >
          <View
            className="p-5 w-full"
            style={{ backgroundColor: Colors.common.GRAY_NORMAL, borderRadius: 8 }}
          >
            <View className="p-4 bg-white rounded-full mx-auto">
              <MaterialIcons name="delete-outline" size={28} color="#E53935" />
            </View>
            <View className="mt-6">
              <Text className="text-white text-[16px] font-normal text-center">
                This action will permanently delete your Myne profile, including
                your collection, Wishlist and saved data. This cannot be undone.
              </Text>
            </View>
            <View className="flex-row items-center gap-4 mt-4">
              <StandardButton
                text="Keep Profile"
                style={{ flex: 1 }}
                type="outline"
                onPress={() => setOpen(false)}
              />
              <StandardButton
                text="Delete Profile"
                style={{ flex: 1, backgroundColor: "#E53935" }}
              />
            </View>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}
