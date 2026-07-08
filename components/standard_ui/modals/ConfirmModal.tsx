import { Text, View } from "react-native";
import ModalContainer from "./_modalContainer/ModalContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import StandardButton from "@/components/standard_ui/buttons/StandardButton";

export default function ConfirmModal({
  isOpen,
  setOpen,
  title = "Are you sure?",
  description = "This action will not be revoked.",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm = () => {},
  onCancel = () => {},
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
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
            <View className={`mx-auto`}>
              <MaterialIcons name="info" size={48} color="#E53935" />
            </View>
            <View className={`mt-4`}>
              <Text className={`text-white text-xl font-normal text-center`}>
                {title}
              </Text>
              <Text
                className={`text-white/80 text-sm font-normal text-center mt-2`}
              >
                {description}
              </Text>
            </View>
            <View className="flex-row items-center gap-4 mt-6">
              <StandardButton
                text={cancelText}
                style={{ flex: 1 }}
                type="outline"
                onPress={() => {
                  onCancel?.();
                  setOpen(false);
                }}
              />
              <StandardButton
                text={confirmText}
                onPress={() => {
                  onConfirm?.();
                  setOpen(false);
                }}
                style={{ flex: 1, backgroundColor: "#E53935" }}
              />
            </View>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}
