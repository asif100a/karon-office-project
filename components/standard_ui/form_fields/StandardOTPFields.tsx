import { Colors } from "@/constants/Colors";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import React from "react";
import { Controller } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import { OtpInput } from "react-native-otp-entry";

const HORIZONTAL_SCREEN_PADDING = 24; // px-6 = 24px each side
const CELL_GAP = 8; // marginHorizontal: 4 = 8px total per cell

export default function StandardOTPFields({
  control,
  otpLength = 6,
}: {
  control: any;
  otpLength?: number;
}) {
  const { width: screenWidth } = useWindowDimensions();

  // Total horizontal space consumed by padding + gaps between cells
  const totalPadding = HORIZONTAL_SCREEN_PADDING * 2;
  const totalGaps = CELL_GAP * otpLength;
  const cellSize = Math.floor(
    (screenWidth - totalPadding - totalGaps) / otpLength,
  );

  return (
    <Controller
      control={control}
      name="otp"
      rules={{
        validate: (value) =>
          value.length === otpLength ||
          `Please enter the full ${otpLength}-digit code.`,
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={Boolean(error)} className="mb-8 w-full">
          <FormControlLabel className="mb-4">
            <FormControlLabelText className="text-[#333] text-sm font-semibold">
              Enter OTP
            </FormControlLabelText>
          </FormControlLabel>

          <OtpInput
            numberOfDigits={otpLength}
            type="numeric"
            onFilled={onChange}
            onTextChange={onChange}
            onBlur={onBlur}
            autoFocus
            focusColor={Colors.common.BRAND}
            textInputProps={{ value }}
            theme={{
              // Override the row container so it spans full width
              containerStyle: {
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              },
              pinCodeTextStyle: {
                color: "#111",
                fontSize: 20,
                fontWeight: "600",
              },
              // Override the default fixed width/height with computed values
              pinCodeContainerStyle: {
                width: cellSize,
                height: cellSize,
                borderColor: "#D0D5DD",
                borderWidth: 1.5,
                borderRadius: cellSize / 2, // circle
                marginHorizontal: CELL_GAP / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              },
              focusedPinCodeContainerStyle: {
                borderColor: Colors.common.BRAND,
                borderWidth: 2,
                backgroundColor: "#fff",
              },
              filledPinCodeContainerStyle: {
                borderColor: Colors.common.BRAND,
                backgroundColor: "#fff",
              },
            }}
          />

          {error?.message ? (
            <FormControlError>
              <FormControlErrorText className="text-xs text-[#d92d20] mt-2">
                {error.message}
              </FormControlErrorText>
            </FormControlError>
          ) : null}
        </FormControl>
      )}
    />
  );
}