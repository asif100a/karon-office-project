import { Alert, Text } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import StandardButton from "./StandardButton";

// ─── Types ────────────────────────────────────────────────────────────────────
type UploadedFile = {
  uri: string;
  name: string;
  type: string;
  size?: number;
};

export default function ButtonFileUpload({
  setFile,
  maxFileSize = 10,
  style = ''
}: {
  setFile: Dispatch<SetStateAction<UploadedFile | null>>;
  maxFileSize?: number;
  style?: string
}) {
  const MAX_FILE_SIZE_BYTES = maxFileSize * 1024 * 1024;

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library.",
        [{ text: "OK" }],
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE_BYTES) {
      Alert.alert(
        "File Too Large",
        `Please select a file under ${maxFileSize}MB.`,
        [{ text: "OK" }],
      );
      return;
    }

    const uriParts = asset.uri.split(".");
    const extension = uriParts[uriParts.length - 1].toLowerCase();
    const mimeType = extension === "png" ? "image/png" : "image/jpeg";
    const fileName = asset.fileName ?? `upload_${Date.now()}.${extension}`;

    setFile({
      uri: asset.uri,
      name: fileName,
      type: mimeType,
      size: asset.fileSize,
    });
  };

  return (
    <StandardButton
      onPress={handlePickImage}
    >
      <Ionicons name="cloud-upload-outline" size={20} color="white" />
      <Text className={`text-white text-sm font-semibold`}>Gallery</Text>
    </StandardButton>
  );
}
