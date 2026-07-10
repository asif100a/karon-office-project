import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Star } from 'lucide-react-native';
import { Avatar, Card, RatingStars, ScreenShell } from './_components';

const reviewers = [
  { name: 'Jane Cooper', date: '20 Apr 2026', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { name: 'Esther Howard', date: '20 Apr 2026', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
];

export default function RatingFeedbackScreen() {
  const bars = [200, 40, 32, 19, 7];

  return (
    <ScreenShell title="Rating & Feedback">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <View className="flex-row items-center mb-5">
          <View className="w-24 items-center">
            <View className="flex-row items-end">
              <Text className="text-slate-900 text-4xl font-extrabold">4.1</Text>
              <Text className="text-neutral-400 text-sm font-bold mb-1">/5</Text>
            </View>
            <RatingStars size={12} />
            <Text className="text-neutral-400 text-xs mt-1">300 Reviews</Text>
          </View>

          <View className="flex-1 gap-2">
            {bars.map((value, index) => (
              <View key={value} className="flex-row items-center gap-3">
                <View className="w-16 flex-row">
                  {Array.from({ length: 5 - index }).map((_, starIndex) => (
                    <Star key={starIndex} size={8} color="#A6AEB7" fill="#A6AEB7" />
                  ))}
                </View>
                <View className="flex-1 h-1 bg-neutral-200 rounded-full">
                  <View className="h-1 bg-slate-400 rounded-full" style={{ width: `${Math.max(8, 80 - index * 13)}%` }} />
                </View>
                <Text className="w-8 text-right text-neutral-500 text-xs">{String(value).padStart(2, '0')}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={{ backgroundColor: '#1E2933' }} className="h-12 rounded-lg items-center justify-center mb-6">
          <Text className="text-white text-base font-semibold">Write Review</Text>
        </TouchableOpacity>

        <View className="gap-3">
          {reviewers.map((review, index) => (
            <Card key={`${review.name}-${index}`} className="p-4">
              <View className="flex-row items-start gap-3">
                <Avatar uri={review.image} size={32} />
                <View className="flex-1">
                  <View className="flex-row items-start justify-between">
                    <View>
                      <Text className="text-neutral-900 text-sm font-semibold">{review.name}</Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Star size={11} color="#FBC02D" fill="#FBC02D" />
                        <Text className="text-neutral-700 text-xs font-semibold">5</Text>
                      </View>
                    </View>
                    <Text className="text-neutral-400 text-xs">{review.date}</Text>
                  </View>
                  <Text className="text-neutral-700 text-sm mt-3">Very professional and always arrived on time</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
