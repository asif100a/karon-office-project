import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FileText } from "lucide-react-native";

export default function WorkerDetailsDocuments({ worker }: { worker: any }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="-mx-4 px-4 mt-4"
      contentContainerStyle={{ gap: 10 }}
    >
      {worker.documents.map((document: any) => (
        <View
          key={document.id}
          className="w-40 bg-white rounded-2xl p-4 border border-neutral-200/80"
        >
          <View className="w-9 h-9 rounded-xl bg-red-50 items-center justify-center mb-3">
            <FileText size={18} color="#FB7185" />
          </View>
          <Text
            className="text-neutral-900 font-bold text-sm"
            numberOfLines={1}
          >
            {document.name}
          </Text>
          <Text className="text-neutral-400 text-[11px] mt-1">
            {document.size}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
