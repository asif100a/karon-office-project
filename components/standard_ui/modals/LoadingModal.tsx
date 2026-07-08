import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import React from "react";
import ModalContainer from "./_modalContainer/ModalContainer";

export default function LoadingModal({
  isOpen,
  setOpen,
  title = "Loading",
  description = "Loading the action...",
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
}) {
  return (
    <View>
      <ModalContainer
        visible={isOpen}
        setVisible={() => setOpen(false)}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#fff" />
          <View style={styles.textWrapper}>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </ModalContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 288,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  textWrapper: {
    marginTop: 24,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
});
