import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Text, View } from "react-native";

type StandardTextAreaFieldProps<T extends FieldValues> = {
  label?: string;
  id: FieldPath<T>;
  control: Control<T>;
  placeholder?: string;
  numberOfLines?: number;
  required?: boolean;
  readOnly?: boolean;
  asterisk?: boolean;
  optional?: boolean;
};

export default function StandardTextAreaField<T extends FieldValues>({
  label = "",
  id,
  control,
  placeholder,
  numberOfLines = 5,
  required = true,
  readOnly = false,
  asterisk = false,
  optional = false,
}: StandardTextAreaFieldProps<T>) {
  const [isFocused, setIsFocused] = useState(false);

  const resolvedPlaceholder =
    placeholder ?? `Enter your ${label.toLowerCase()}`;

  return (
    <View className="flex-1 mb-4" style={{ backgroundColor: "white" }}>
      <Controller
        control={control}
        name={id}
        rules={{ required: required ? `${label} is required.` : undefined }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <FormControl isInvalid={Boolean(error)} className="mb-5">
            <FormControlLabel className="mb-2">
              <FormControlLabelText
                className="text-sm font-semibold"
                style={{
                  color: "#333",
                }}
                accessibilityLabel={label}
              >
                {label} {optional && `(Optional)`}
                {asterisk && <Text style={{ color: "#ef4444" }}>*</Text>}
              </FormControlLabelText>
            </FormControlLabel>

            <Textarea
              size="md"
              variant="default"
              className={`min-h-[120px] rounded-xl bg-transparent px-0`}
              style={{
                borderWidth: 1,
                borderColor: error
                  ? "#d92d20"
                  : isFocused
                    ? "#afa9aa"
                    : "#e8e8e8",
              }}
            >
              <TextareaInput
                value={value == null ? "" : String(value)}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  onBlur();
                }}
                placeholder={resolvedPlaceholder}
                placeholderTextColor="#bbb"
                multiline
                numberOfLines={numberOfLines}
                readOnly={readOnly}
                className="px-4 py-3 text-sm text-[#222]"
                style={{ color: "#222" }}
              />
            </Textarea>

            {error?.message ? (
              <FormControlError>
                <FormControlErrorText className="text-xs text-[#d92d20]">
                  {error.message}
                </FormControlErrorText>
              </FormControlError>
            ) : null}
          </FormControl>
        )}
      />
    </View>
  );
}
