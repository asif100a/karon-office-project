import { Tabs } from "expo-router";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";

export default function WorkerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Worker",
          tabBarIcon: ({ color, size }) => (
            <Center>
              <Text style={{ color, fontSize: size }}>👷‍♂️</Text>
            </Center>
          ),
        }}
      />
    </Tabs>
  );
}
