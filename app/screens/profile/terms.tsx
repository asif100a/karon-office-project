import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, ScreenShell, VersionBanner } from './_components';

const sections = Array.from({ length: 4 }, (_, index) => ({
  id: index,
  title: 'About Sitesource',
  body:
    'Lorem ipsum dolor sit amet consectetur. In faucibus ante sit nisl justo. Vehicula urna urna vitae magnis. Pellentesque et felis eget mattis enim vel mauris fermentum. Aenean morbi sit vitae commodo nunc mattis quis bibendum.',
}));

export default function TermsScreen() {
  return (
    <ScreenShell title="Terms & Conditions">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 34 }}>
        <VersionBanner />
        <Text className="text-neutral-950 text-xl font-extrabold mb-4">Contents</Text>
        <View className="gap-4">
          {sections.map((section) => (
            <Card key={section.id} className="p-5">
              <Text className="text-slate-700 text-base font-extrabold mb-3">{section.title}</Text>
              <Text className="text-slate-600 text-sm leading-5">{section.body}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
