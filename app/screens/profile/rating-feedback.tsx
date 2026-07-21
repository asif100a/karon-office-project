import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Star, X } from 'lucide-react-native';
import { Avatar, Card, RatingStars, ScreenShell } from './_components';

const reviewers = [
  { name: 'Jane Cooper', date: '20 Apr 2026', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { name: 'Esther Howard', date: '20 Apr 2026', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { name: 'Brooklyn Simmons', date: '20 Apr 2025', rating: 5, feedback: 'Very professional and always arrived on time', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
];

export default function RatingFeedbackScreen() {
  const bars = [200, 40, 32, 19, 7];
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState<typeof reviewers>([]);

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const submitReview = () => {
    if (!reviewRating || !reviewFeedback.trim()) return;

    setSubmittedReviews((currentReviews) => [
      {
        name: 'You',
        date: 'Just now',
        rating: reviewRating,
        feedback: reviewFeedback.trim(),
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
      },
      ...currentReviews,
    ]);
    setReviewRating(0);
    setReviewFeedback('');
    setIsReviewModalOpen(false);
  };

  const visibleReviews = [...submittedReviews, ...reviewers];

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

        <TouchableOpacity
          onPress={() => setIsReviewModalOpen(true)}
          style={{ backgroundColor: '#1E2933' }}
          className="h-12 rounded-lg items-center justify-center mb-6"
        >
          <Text className="text-white text-base font-semibold">Write Review</Text>
        </TouchableOpacity>

        <View className="gap-3">
          {visibleReviews.map((review, index) => (
            <Card key={`${review.name}-${index}`} className="p-4">
              <View className="flex-row items-start gap-3">
                <Avatar uri={review.image} size={32} />
                <View className="flex-1">
                  <View className="flex-row items-start justify-between">
                    <View>
                      <Text className="text-neutral-900 text-sm font-semibold">{review.name}</Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <Star size={11} color="#FBC02D" fill="#FBC02D" />
                        <Text className="text-neutral-700 text-xs font-semibold">{review.rating}</Text>
                      </View>
                    </View>
                    <Text className="text-neutral-400 text-xs">{review.date}</Text>
                  </View>
                  <Text className="text-neutral-700 text-sm mt-3">{review.feedback}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={isReviewModalOpen}
        transparent
        animationType="fade"
        onRequestClose={closeReviewModal}
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <Pressable
            onPress={closeReviewModal}
            className="flex-1 bg-neutral-500/50 justify-center px-5"
          >
            <View
              className="bg-white rounded-2xl p-5"
              onStartShouldSetResponder={() => true}
            >
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-neutral-950 text-lg font-extrabold">Write Review</Text>
                <TouchableOpacity
                  onPress={closeReviewModal}
                  className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
                >
                  <X size={16} color="#333333" />
                </TouchableOpacity>
              </View>

              <Text className="text-neutral-500 text-xs font-bold uppercase mb-2 tracking-wider">
                Your Rating
              </Text>
              <View className="flex-row items-center justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const isActive = rating <= reviewRating;

                  return (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => setReviewRating(rating)}
                      className="p-1 active:opacity-75"
                    >
                      <Star
                        size={38}
                        color={isActive ? '#FBC02D' : '#D1D5DB'}
                        fill={isActive ? '#FBC02D' : 'transparent'}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text className="text-neutral-500 text-xs font-bold uppercase mb-2 tracking-wider">
                Feedback
              </Text>
              <View className="bg-white border border-neutral-200/80 rounded-2xl px-4 py-3 min-h-[130px] mb-5">
                <TextInput
                  value={reviewFeedback}
                  onChangeText={setReviewFeedback}
                  placeholder="Write your feedback..."
                  placeholderTextColor="#A3A3A3"
                  multiline
                  textAlignVertical="top"
                  className="flex-1 text-neutral-900 text-sm leading-5"
                />
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={closeReviewModal}
                  className="flex-1 h-12 rounded-lg border border-neutral-200 items-center justify-center active:opacity-80"
                >
                  <Text className="text-neutral-800 text-sm font-extrabold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={submitReview}
                  disabled={!reviewRating || !reviewFeedback.trim()}
                  style={{
                    backgroundColor:
                      reviewRating && reviewFeedback.trim() ? '#1E2933' : '#CBD5E1',
                  }}
                  className="flex-1 h-12 rounded-lg items-center justify-center active:opacity-90"
                >
                  <Text className="text-white text-sm font-extrabold">Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenShell>
  );
}
