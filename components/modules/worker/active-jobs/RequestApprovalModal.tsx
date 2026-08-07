import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useMemo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, X } from "lucide-react-native";
import { Colors } from "@/constants/Colors";

type DatePickerTarget = "start" | "end" | null;

const MAX_RANGE_DAYS = 7;

const startOfDay = (date: Date) => {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
};

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatDayLabel = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const getRangeDates = (startDate: Date | null, endDate: Date | null) => {
  if (!startDate || !endDate) return [];

  const normalizedStartDate = startOfDay(startDate);
  const normalizedEndDate = startOfDay(endDate);

  if (normalizedEndDate < normalizedStartDate) return [];

  const dates: Date[] = [];
  let currentDate = normalizedStartDate;

  while (currentDate <= normalizedEndDate && dates.length < MAX_RANGE_DAYS) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

export default function RequestApprovalModal({
  showApprovalModal,
  setShowApprovalModal,
}: {
  showApprovalModal: boolean;
  setShowApprovalModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [datePickerTarget, setDatePickerTarget] =
    useState<DatePickerTarget>(null);
  const [hoursByDate, setHoursByDate] = useState<Record<string, string>>({});

  const selectedDates = useMemo(
    () => getRangeDates(startDate, endDate),
    [startDate, endDate],
  );

  const rangeLabel =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Select date range";

  const pickerValue =
    datePickerTarget === "end"
      ? endDate || startDate || new Date()
      : startDate || new Date();

  const handleDateChange = (_event: unknown, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setDatePickerTarget(null);
    }

    if (!selectedDate || !datePickerTarget) return;

    const normalizedDate = startOfDay(selectedDate);

    if (datePickerTarget === "start") {
      setStartDate(normalizedDate);

      if (!endDate || startOfDay(endDate) < normalizedDate) {
        setEndDate(normalizedDate);
        return;
      }

      const maxEndDate = addDays(normalizedDate, MAX_RANGE_DAYS - 1);
      if (startOfDay(endDate) > maxEndDate) {
        setEndDate(maxEndDate);
      }

      return;
    }

    if (!startDate) {
      setStartDate(normalizedDate);
      setEndDate(normalizedDate);
      return;
    }

    if (normalizedDate < startOfDay(startDate)) {
      setStartDate(normalizedDate);
      setEndDate(normalizedDate);
      return;
    }

    const maxEndDate = addDays(startOfDay(startDate), MAX_RANGE_DAYS - 1);
    setEndDate(normalizedDate > maxEndDate ? maxEndDate : normalizedDate);
  };

  const handleHoursChange = (date: Date, value: string) => {
    const dateKey = getDateKey(date);
    setHoursByDate((currentHours) => ({
      ...currentHours,
      [dateKey]: value,
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showApprovalModal}
      onRequestClose={() => setShowApprovalModal(false)}
    >
      <View className="flex-1 bg-neutral-500/50 justify-end">
        <View className="bg-white rounded-t-4xl p-6 pb-12 shadow-2xl border-t border-neutral-100">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-neutral-900 font-extrabold text-lg tracking-tight">
              Submit Timesheet
            </Text>
            <TouchableOpacity
              onPress={() => setShowApprovalModal(false)}
              className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:opacity-75"
            >
              <X size={16} color="#333333" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="max-h-100 mb-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="gap-4.5 pr-1">
              <View>
                <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                  Week
                </Text>
                <View className="rounded-2xl border border-neutral-200/60 bg-neutral-50 px-4 py-3.5">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-neutral-800 text-sm font-semibold">
                        {rangeLabel}
                      </Text>
                      <Text className="text-neutral-400 text-[11px] font-medium mt-1">
                        Select 1 to {MAX_RANGE_DAYS} days
                      </Text>
                    </View>
                    <Calendar size={18} color="#737373" />
                  </View>

                  <View className="flex-row gap-3 mt-4">
                    <TouchableOpacity
                      onPress={() => setDatePickerTarget("start")}
                      className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-3 active:opacity-85"
                    >
                      <Text className="text-neutral-400 text-[10px] font-bold uppercase mb-1">
                        Start
                      </Text>
                      <Text className="text-neutral-800 text-xs font-semibold">
                        {formatDate(startDate) || "Choose date"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setDatePickerTarget("end")}
                      className="flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-3 active:opacity-85"
                    >
                      <Text className="text-neutral-400 text-[10px] font-bold uppercase mb-1">
                        End
                      </Text>
                      <Text className="text-neutral-800 text-xs font-semibold">
                        {formatDate(endDate) || "Choose date"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {datePickerTarget ? (
                    <DateTimePicker
                      value={pickerValue}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={handleDateChange}
                    />
                  ) : null}
                </View>
              </View>

              {selectedDates.length ? (
                selectedDates.map((date) => {
                  const dateKey = getDateKey(date);

                  return (
                    <View key={dateKey}>
                      <Text className="text-neutral-400 text-xs font-bold uppercase mb-2 tracking-wider">
                        {formatDayLabel(date)}
                      </Text>
                      <View className="bg-neutral-50 border border-neutral-200/60 rounded-2xl px-4 py-3 flex-row items-center">
                        <TextInput
                          className="flex-1 text-neutral-800 text-sm font-semibold py-0"
                          placeholder="Enter total working hours"
                          placeholderTextColor="#A3A3A3"
                          keyboardType="numeric"
                          value={hoursByDate[dateKey] || ""}
                          onChangeText={(value) =>
                            handleHoursChange(date, value)
                          }
                        />
                      </View>
                    </View>
                  );
                })
              ) : (
                <View className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-4 py-5">
                  <Text className="text-center text-neutral-400 text-xs font-semibold leading-5">
                    Select a date range to add daily working hours.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={() => setShowApprovalModal(false)}
            style={{ backgroundColor: Colors.common.GRAY_DARK }}
            className="w-full py-4 rounded-2xl items-center justify-center active:opacity-90 mb-3"
          >
            <Text className="text-white font-extrabold text-sm">Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
