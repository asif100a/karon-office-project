import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import JobOfferHorizontalCarousel from '@/components/modules/worker/home/JobOfferHorizontalCarousel';
import RecommendedVerticalList from '@/components/modules/worker/home/RecommendedVerticalList';

export default function WorkerHomeScreen() {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/screens/employer-details/${id}` as any);
  };

  return (
    <ScreenWrapper>
      {/* Screen Header */}
      <ScreenHeader />

      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Job Offer Horizontal Carousel */}
        <JobOfferHorizontalCarousel handleViewDetails={handleViewDetails} />

        {/* Recommended Vertical List */}
        <RecommendedVerticalList handleViewDetails={handleViewDetails} />
      </ScrollView>
    </ScreenWrapper>
  );
}