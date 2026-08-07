import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronDown, Star, X } from "lucide-react-native";

type CompletedJobOption = {
  id: string;
  title: string;
  company: string;
  statusBadge: string;
  location: string;
  duration: string;
};

const DEMO_COMPLETED_JOBS: CompletedJobOption[] = [
  {
    id: "job-completed-1",
    title: "Labourer",
    company: "Tech Innovators Inc.",
    statusBadge: "Day 20 of 20",
    location: "Shoreditch - 1.2 mi away",
    duration: "12 Jun - 1 month",
  },
  {
    id: "job-completed-2",
    title: "Groundworker",
    company: "BuildRight Group",
    statusBadge: "Day 18 of 18",
    location: "Hackney - 2.4 mi away",
    duration: "3 May - 3 weeks",
  },
  {
    id: "job-completed-3",
    title: "Carpenter",
    company: "Northside Construction",
    statusBadge: "Day 15 of 15",
    location: "Camden - 3.1 mi away",
    duration: "21 Apr - 2 weeks",
  },
];

export default function ReviewModal({
  isReviewModalOpen,
  closeReviewModal,
  reviewRating,
  setReviewRating,
  reviewFeedback,
  setReviewFeedback,
  submitReview
}: {
  isReviewModalOpen: boolean;
  closeReviewModal: () => void;
  reviewRating: number;
  setReviewRating: React.Dispatch<React.SetStateAction<number>>;
  reviewFeedback: string;
  setReviewFeedback: React.Dispatch<React.SetStateAction<string>>;
  submitReview: (selectedJob?: CompletedJobOption) => void;
}) {
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CompletedJobOption | null>(
    null,
  );

  useEffect(() => {
    if (!isReviewModalOpen) {
      setIsJobDropdownOpen(false);
    }
  }, [isReviewModalOpen]);

  const handleClose = () => {
    setIsJobDropdownOpen(false);
    closeReviewModal();
  };

  const handleSelectJob = (job: CompletedJobOption) => {
    setSelectedJob(job);
    setIsJobDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedJob || !reviewRating || !reviewFeedback.trim()) return;

    submitReview(selectedJob);
  };

  return (
    <Modal
      visible={isReviewModalOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <Pressable
          onPress={handleClose}
          className="flex-1 bg-neutral-500/50 justify-center px-5"
        >
          <View
            className="bg-white rounded-2xl p-5"
            onStartShouldSetResponder={() => true}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-950 text-lg font-extrabold">
                Write Review
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
              >
                <X size={16} color="#333333" />
              </TouchableOpacity>
            </View>

            <Text className="text-neutral-500 text-xs font-bold uppercase mb-2 tracking-wider">
              Completed Job
            </Text>
            <View className="relative z-20 mb-5">
              <TouchableOpacity
                onPress={() => setIsJobDropdownOpen((current) => !current)}
                className="bg-white border border-neutral-200/80 rounded-2xl px-4 py-3.5 flex-row justify-between items-center active:opacity-85"
              >
                <View className="flex-1 pr-3">
                  <Text
                    className={`text-sm font-semibold ${
                      selectedJob ? "text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {selectedJob
                      ? `${selectedJob.title} - ${selectedJob.company}`
                      : "Select a completed job"}
                  </Text>
                  {selectedJob ? (
                    <Text className="text-neutral-500 text-[11px] font-medium mt-1">
                      {selectedJob.location}
                    </Text>
                  ) : null}
                </View>
                <ChevronDown size={18} color="#737373" />
              </TouchableOpacity>

              {isJobDropdownOpen ? (
                <View className="mt-2 rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden max-h-56">
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {DEMO_COMPLETED_JOBS.map((job) => {
                      const isSelected = selectedJob?.id === job.id;

                      return (
                        <TouchableOpacity
                          key={job.id}
                          onPress={() => handleSelectJob(job)}
                          className={`px-4 py-3.5 active:bg-neutral-50 ${
                            isSelected ? "bg-neutral-100" : "bg-white"
                          }`}
                        >
                          <Text className="text-neutral-900 text-sm font-semibold">
                            {job.title}
                          </Text>
                          <Text className="text-neutral-500 text-xs font-medium mt-1">
                            {job.company} - {job.statusBadge}
                          </Text>
                          <Text className="text-neutral-400 text-[11px] mt-1">
                            {job.location} - {job.duration}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : null}
            </View>

            <Text className="text-neutral-500 text-xs font-bold uppercase mb-2 tracking-wider">
              Your Rating
            </Text>
            {!selectedJob ? (
              <Text className="text-neutral-400 text-xs font-medium mb-3">
                Pick a completed job first, then choose your stars.
              </Text>
            ) : null}

            <View className="flex-row items-center justify-center gap-2 mb-5">
              {[1, 2, 3, 4, 5].map((rating) => {
                const isActive = selectedJob ? rating <= reviewRating : false;

                return (
                  <TouchableOpacity
                    key={rating}
                    disabled={!selectedJob}
                    onPress={() => setReviewRating(rating)}
                    className={`p-1 ${selectedJob ? "active:opacity-75" : "opacity-40"}`}
                  >
                    <Star
                      size={38}
                      color={isActive ? "#FBC02D" : "#D1D5DB"}
                      fill={isActive ? "#FBC02D" : "transparent"}
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
                editable={Boolean(selectedJob)}
                className={`flex-1 text-neutral-900 text-sm leading-5 ${
                  selectedJob ? "" : "opacity-40"
                }`}
              />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={handleClose}
                className="flex-1 h-12 rounded-lg border border-neutral-200 items-center justify-center active:opacity-80"
              >
                <Text className="text-neutral-800 text-sm font-extrabold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!selectedJob || !reviewRating || !reviewFeedback.trim()}
                style={{
                  backgroundColor:
                    selectedJob && reviewRating && reviewFeedback.trim()
                      ? "#1E2933"
                      : "#CBD5E1",
                }}
                className="flex-1 h-12 rounded-lg items-center justify-center active:opacity-90"
              >
                <Text className="text-white text-sm font-extrabold">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
