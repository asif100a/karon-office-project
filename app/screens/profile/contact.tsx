import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ScreenShell } from "./_components";

export default function Contact() {
  return (
    <ScreenShell title="Contact Us">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 34 }}
      >
        <View>
          <Text className="text-neutral-950 text-xl font-extrabold mb-4">
            Contact Us
          </Text>
          <Text className="text-slate-600 text-sm leading-5">
            Lorem ipsum dolor sit amet consectetur. In faucibus ante sit nisl
            justo. Vehicula urna urna vitae magnis. Pellentesque et felis eget
            mattis enim vel mauris fermentum. Aenean morbi sit vitae commodo
            nunc mattis quis bibendum.
          </Text>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
