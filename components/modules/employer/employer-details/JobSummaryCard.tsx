import { Colors } from "@/constants/Colors";
import { Briefcase, Calendar, MapPin, Users } from "lucide-react-native";
import { Text, View } from "react-native";
import DetailRow from "./_ui/DetailRow";
import { EmployerJobDetails } from "@/types";

export default function JobSummaryCard({
  jobDetails,
}: {
  jobDetails: EmployerJobDetails;
}) {
  return (
    <View className="mb-6 mt-8">
      <View className="mb-4 flex-row items-start justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Briefcase size={22} color="#FFFFFF" />
          </View>

          <View>
            <Text className="text-base font-extrabold text-neutral-950">
              {jobDetails.title}
            </Text>
            <Text className="text-xs font-semibold text-neutral-500">
              {jobDetails.company}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text
            className="min-w-20 text-sm font-extrabold text-neutral-900"
            style={{ textAlign: "right" }}
          >
            £{jobDetails.payRate}/hour
          </Text>
        </View>
      </View>

      <View className="gap-2.5 border-t border-neutral-50 pt-3">
        <DetailRow
          icon={<MapPin size={15} color="#858585" />}
          value={jobDetails.location}
        />
        <DetailRow
          icon={<Users size={15} color="#858585" />}
          value={jobDetails.team}
        />
        <DetailRow
          icon={<Calendar size={15} color="#858585" />}
          value={jobDetails.duration}
        />
      </View>
    </View>
  );
}
