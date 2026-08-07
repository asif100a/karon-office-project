import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Star } from "lucide-react-native";
import { RatingStars, ScreenShell } from "./_components";
import ReviewModal from "@/components/modules/common/ReviewModal";

const reviewers = [
  {
    name: "Jane Cooper",
    date: "20 Apr 2026",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  },
  {
    name: "Esther Howard",
    date: "20 Apr 2026",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
  },
  {
    name: "Brooklyn Simmons",
    date: "20 Apr 2025",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  },
  {
    name: "Brooklyn Simmons",
    date: "20 Apr 2025",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  },
  {
    name: "Brooklyn Simmons",
    date: "20 Apr 2025",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  },
  {
    name: "Brooklyn Simmons",
    date: "20 Apr 2025",
    rating: 5,
    feedback: "Very professional and always arrived on time",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  },
];

export default function RatingFeedbackScreen() {
  const bars = [200, 40, 32, 19, 7];
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<typeof reviewers>(
    [],
  );

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const submitReview = () => {
    if (!reviewRating || !reviewFeedback.trim()) return;

    setSubmittedReviews((currentReviews) => [
      {
        name: "You",
        date: "Just now",
        rating: reviewRating,
        feedback: reviewFeedback.trim(),
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
      },
      ...currentReviews,
    ]);
    setReviewRating(0);
    setReviewFeedback("");
    setIsReviewModalOpen(false);
  };

  const visibleReviews = [...submittedReviews, ...reviewers];

  return (
    <ScreenShell title="Rating & Feedback">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 52 }}
      >
        <View className="flex-row items-center mb-5">
          <View className="w-24 items-center">
            <View className="flex-row items-end">
              <Text className="text-slate-900 text-4xl font-extrabold">
                4.1
              </Text>
              <Text className="text-neutral-400 text-sm font-bold mb-1">
                /5
              </Text>
            </View>
            <RatingStars size={12} />
            <Text className="text-neutral-400 text-xs mt-1">300 Reviews</Text>
          </View>

          <View className="flex-1 gap-2">
            {bars.map((value, index) => (
              <View key={value} className="flex-row items-center gap-3">
                <View className="w-16 flex-row">
                  {Array.from({ length: 5 - index }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={8}
                      color="#A6AEB7"
                      fill="#A6AEB7"
                    />
                  ))}
                </View>
                <View className="flex-1 h-1 bg-neutral-200 rounded-full">
                  <View
                    className="h-1 bg-slate-400 rounded-full"
                    style={{ width: `${Math.max(8, 80 - index * 13)}%` }}
                  />
                </View>
                <Text className="w-8 text-right text-neutral-500 text-xs">
                  {String(value).padStart(2, "0")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setIsReviewModalOpen(true)}
          style={{ backgroundColor: "#1E2933" }}
          className="h-12 rounded-lg items-center justify-center mb-6"
        >
          <Text className="min-w-28 text-white text-base font-semibold">
            Write Review
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Review Modal */}
      <ReviewModal
        isReviewModalOpen={isReviewModalOpen}
        closeReviewModal={closeReviewModal}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        reviewFeedback={reviewFeedback}
        setReviewFeedback={setReviewFeedback}
        submitReview={submitReview}
      />
    </ScreenShell>
  );
}
