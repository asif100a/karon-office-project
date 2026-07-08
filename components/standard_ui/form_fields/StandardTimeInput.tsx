import { View, TextInput, StyleSheet, Platform, Pressable, TextStyle, ViewStyle, Text } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";

export default function StandardTimeInput({
  label = "Text",
  time,
  onTimeChange,
  placeholder = "Enter Your Text",
  errorMessage = "",
  inputStyle = {},
  inputContainerStyle = {}
}: {
  label?: string;
  time: Date | null;
  onTimeChange: (value: Date) => void;
  placeholder?: string;
  errorMessage?: string;
  inputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle
}) {
  const [show, setShow] = useState<boolean>(false);

  const styles = createStyles();
  const pickerValue =
    time && time instanceof Date && !isNaN(time.getTime()) ? time : new Date();

  return (
    <View style={[styles.inputContainer, {...inputContainerStyle}]}>
      <Text style={[styles.label, styles.primaryFontSize]}>{label}</Text>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          style={[styles.inputField, {...inputStyle}]}
          placeholder={placeholder}
          value={time?.toLocaleTimeString()}
          keyboardType="default"
          editable={false}
          pointerEvents="none"
          placeholderTextColor={"#999"}
        />
      </Pressable>
      {errorMessage && (
        <Text className={`text-red-500 text-xs mt-1`}>{errorMessage}</Text>
      )}

      {show && (
        <DateTimePicker
          value={pickerValue}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedTime) => {
            if (Platform.OS === "android") setShow(false);
            if (selectedTime) onTimeChange(selectedTime);
          }}
        />
      )}
    </View>
  );
}

function createStyles() {
  return StyleSheet.create({
    primaryFontSize: {
      fontSize: 14,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontWeight: "500",
      marginBottom: 6,
      color: 'black'
    },
    inputField: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      backgroundColor: "transparent",
      borderColor: Colors.common.BORDER,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
  });
}
