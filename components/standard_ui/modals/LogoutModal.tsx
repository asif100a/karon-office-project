import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ModalContainer from "./_modalContainer/ModalContainer";
import StandardButton from "../buttons/StandardButton";

export default function LogoutModal({
  isOpen,
  setOpen,
  onLogout,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onLogout?: () => void;
}) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setOpen(false);
  };

  return (
    <View>
      <ModalContainer visible={isOpen} setVisible={setOpen}>
        <View style={styles.card}>
          <View style={styles.inner}>
            <View style={styles.iconCircle}>
              <AntDesign name="logout" size={28} color="#E53935" />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.message}>
                You will be signed out of your account.
              </Text>
              <Text style={styles.message}>
                Your data will remain safely stored.
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <StandardButton
                  text="Cancel"
                  onPress={() => setOpen(false)}
                  variant="outline"
                />
              </View>
              <View style={styles.buttonWrapper}>
                <StandardButton
                  text="Log Out"
                  onPress={handleLogout}
                  style={{ backgroundColor: "#E53935" }}
                />
              </View>
            </View>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },
  inner: {
    padding: 20,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
  },
  iconCircle: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 999,
    alignSelf: "center",
  },
  textWrapper: {
    marginTop: 24,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});
