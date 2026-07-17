import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import {
  Clock3,
  Headphones,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Send,
  ShieldCheck,
} from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import StandardInputField from "@/components/standard_ui/form_fields/StandardInputField";
import StandardTextAreaField from "@/components/standard_ui/form_fields/StandardTextAreaField";
import { Card, ScreenShell, StatusPill } from "./_components";

type ContactFormValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const HELP_TOPICS = [
  "Account access and login support",
  "Payments, invoices, and billing questions",
  "Job disputes, cancellations, and policy guidance",
];

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: "Email support",
    value: "support@sitesource.app",
    note: "Best for account, billing, and document issues.",
  },
  {
    icon: PhoneCall,
    title: "Phone line",
    value: "+44 20 5555 0198",
    note: "Available Monday to Friday, 9:00 AM to 6:00 PM.",
  },
  {
    icon: MessageSquareMore,
    title: "Priority assistance",
    value: "Live response in under 2 hours",
    note: "For active-job or urgent worker and employer issues.",
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { control, handleSubmit, reset } = useForm<ContactFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitContactForm = handleSubmit(() => {
    setIsSubmitted(true);
    reset();
  });

  return (
    <ScreenShell title="Contact Us">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        <Card className="p-5 mb-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-neutral-950 text-2xl font-extrabold">
                Support That Keeps Work Moving
              </Text>
              <Text className="text-slate-600 text-sm leading-6 mt-3">
                Reach the SiteSource team for account help, job support, policy
                questions, or urgent platform issues. Share a few details and
                we will route your request to the right team.
              </Text>
            </View>
            <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center">
              <Headphones size={22} color={Colors.common.BRAND} />
            </View>
          </View>

          <View className="flex-row items-center gap-2 mt-4">
            <StatusPill label="Support Team Online" tone="approved" />
            <View className="flex-row items-center gap-1">
              <Clock3 size={14} color="#64748B" />
              <Text className="text-slate-500 text-xs font-semibold">
                Average response under 24 hours
              </Text>
            </View>
          </View>
        </Card>

        <Card className="p-5 mb-5">
          <Text className="text-neutral-950 text-lg font-extrabold mb-4">
            How We Can Help
          </Text>
          <View className="gap-3">
            {HELP_TOPICS.map((topic) => (
              <View
                key={topic}
                className="flex-row items-start gap-3 rounded-2xl bg-neutral-50 px-4 py-3"
              >
                <View className="w-8 h-8 rounded-full bg-white items-center justify-center border border-neutral-200">
                  <ShieldCheck size={16} color="#12365A" />
                </View>
                <Text className="flex-1 text-slate-700 text-sm font-medium leading-5">
                  {topic}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        <Card className="p-5 mb-5">
          <Text className="text-neutral-950 text-lg font-extrabold mb-4">
            Contact Channels
          </Text>
          <View className="gap-3">
            {CONTACT_CHANNELS.map((channel) => (
              <View
                key={channel.title}
                className="rounded-2xl border border-neutral-100 bg-white px-4 py-4"
              >
                <View className="flex-row items-start gap-3">
                  <View className="w-10 h-10 rounded-2xl bg-neutral-100 items-center justify-center">
                    <channel.icon size={18} color="#0F172A" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-950 text-sm font-extrabold">
                      {channel.title}
                    </Text>
                    <Text className="text-slate-700 text-sm font-semibold mt-1">
                      {channel.value}
                    </Text>
                    <Text className="text-slate-500 text-xs leading-5 mt-1.5">
                      {channel.note}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card className="p-5">
          <Text className="text-neutral-950 text-lg font-extrabold mb-1">
            Send a Message
          </Text>
          <Text className="text-slate-500 text-sm leading-5 mb-5">
            Include as much context as possible so our support team can help
            you faster.
          </Text>

          {isSubmitted && (
            <View className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-4">
              <Text className="text-emerald-700 text-sm font-bold">
                Your support request has been prepared successfully.
              </Text>
              <Text className="text-emerald-700/80 text-xs mt-1 leading-5">
                A support specialist will review it and follow up through your
                registered contact details.
              </Text>
            </View>
          )}

          <StandardInputField<ContactFormValues>
            label="Full Name"
            id="fullName"
            control={control}
            placeholder="Enter your full name"
          />

          <StandardInputField<ContactFormValues>
            label="Email Address"
            id="email"
            type="email"
            control={control}
            placeholder="Enter your email address"
          />

          <StandardInputField<ContactFormValues>
            label="Subject"
            id="subject"
            control={control}
            placeholder="Briefly describe your issue"
          />

          <StandardTextAreaField<ContactFormValues>
            label="Message"
            id="message"
            control={control}
            placeholder="Tell us what happened, what you need, and any relevant job or account details."
            numberOfLines={7}
          />

          <TouchableOpacity
            onPress={submitContactForm}
            style={{ backgroundColor: Colors.common.GRAY_DARK }}
            className="mt-2 w-full rounded-2xl py-4 flex-row items-center justify-center gap-2 active:opacity-90"
          >
            <Send size={16} color="#FFFFFF" />
            <Text className="text-white text-sm font-extrabold">
              Submit Request
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </ScreenShell>
  );
}
