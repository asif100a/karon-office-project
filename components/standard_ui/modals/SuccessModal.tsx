import { Image, Text, View } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";
import check_box_icon from "@/assets/images/icons/check_box.png";
import { Colors } from "@/constants/Colors";

export default function SuccessModal({
  isOpen,
  setOpen,
  title = "Verified",
  description = "Your code is verified",
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
}) {
  return (
    <ModalContainer
      visible={isOpen}
      setVisible={setOpen}
      style={{
        maxWidth: "80%",
        width: "80%",
        backgroundColor: Colors.common.BRAND,
        borderRadius: 24,
      }}
    >
      <View className="px-6 py-8 items-center shadow-lg">
        <Image
          source={check_box_icon}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <View className="mt-6">
          <Text
            className="text-white text-2xl font-semibold text-center mb-2"
          >
            {title}
          </Text>

          {description ? (
            <Text
              className="text-center text-gray-600"
              style={{ color: "#fff" }}
            >
              {description}
            </Text>
          ) : null}
        </View>
      </View>
    </ModalContainer>
  );
}
