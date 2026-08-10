import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react-native";
import LogoWhite from "@/assets/icons/LogoWhite";
import { Text as UiText } from "@/components/ui/text";
import StandardInputField from "@/components/standard_ui/form_fields/StandardInputField";
import {
  getDashboardRouteForRole,
  normalizeUserRole,
  type UserRole,
} from "@/constants/Routes";
import AuthWebShell from "./_web-shell";

interface LoginScreenProps {
  role?: UserRole;
  onRegisterPress?: () => void;
  onLoginPress?: (email: string) => void;
}

export default function LoginScreenWeb({
  role,
  onRegisterPress,
  onLoginPress,
}: LoginScreenProps) {
  const router = useRouter();
  const activeRole = normalizeUserRole(role);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    if (onLoginPress) {
      onLoginPress(data.email);
    } else {
      router.replace(getDashboardRouteForRole(activeRole));
    }
  };

  const handleSsoLogin = () => {
    if (onLoginPress) {
      onLoginPress("");
    } else {
      router.replace(getDashboardRouteForRole(activeRole));
    }
  };

  const handleRegister = () => {
    if (onRegisterPress) {
      onRegisterPress();
    } else {
      router.push({
        pathname: "/auth",
        params: {
          step: activeRole === "employer" ? "register_employer" : "register_sso",
          role: activeRole,
        },
      });
    }
  };

  return (
    <AuthWebShell
      eyebrow="Welcome back"
      title="Login to your account"
      subtitle="Sign in to continue your journey with Site Source."
      footer={
        <View className="flex-row items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3">
          <View className="flex-row items-center gap-2">
            <ShieldCheck size={16} color="#16A34A" />
            <Text className="text-xs font-semibold text-neutral-600">
              Secure session
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Sparkles size={16} color="#FF5500" />
            <Text className="text-xs font-semibold text-neutral-600">
              Fast access on web
            </Text>
          </View>
        </View>
      }
    >
      <View className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <View className="rounded-[28px] border border-neutral-200 bg-white p-5 md:p-6">
          <View className="mb-6 items-center rounded-[24px] bg-[#FF5500] px-6 py-8">
            <LogoWhite />
            <Text className="mt-6 text-center text-white text-2xl font-black tracking-tight">
              Login to your account
            </Text>
            <Text className="mt-2 max-w-md text-center text-sm leading-6 text-white/85">
              Sign in to continue your journey with Site Source.
            </Text>
          </View>

          <View className="gap-5">
            <StandardInputField
              label="Email Address"
              id="email"
              type="email"
              control={control}
              required
              placeholder="Enter your email"
            />

            <StandardInputField
              label="Password"
              id="password"
              type="password"
              control={control}
              required
              placeholder="Enter your password"
            />
          </View>

          <View className="mt-6 gap-4">
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.9}
              className="flex-row items-center justify-center gap-2 rounded-2xl bg-[#1B2530] py-4"
            >
              <UiText className="text-base font-semibold text-white">Login</UiText>
              <ArrowRight size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-neutral-200" />
              <Text className="text-xs font-semibold uppercase text-neutral-400">
                Or
              </Text>
              <View className="h-px flex-1 bg-neutral-200" />
            </View>

            <View className="grid gap-3 md:grid-cols-2">
              <TouchableOpacity
                onPress={handleSsoLogin}
                activeOpacity={0.9}
                className="items-center justify-center rounded-2xl border border-neutral-200 bg-white py-4"
              >
                <UiText className="text-base font-semibold text-[#1B2530]">
                  Sign in with Google
                </UiText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSsoLogin}
                activeOpacity={0.9}
                className="items-center justify-center rounded-2xl bg-[#1B2530] py-4"
              >
                <UiText className="text-base font-semibold text-white">
                  Sign in with Apple
                </UiText>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-center">
              <Text className="text-sm font-medium text-neutral-700">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                <Text className="text-sm font-bold text-[#1B2530] underline">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="hidden rounded-[28px] border border-neutral-200 bg-neutral-950 p-6 lg:flex lg:justify-between">
          <View className="gap-5">
            <View className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <View className="h-12 w-12 rounded-2xl bg-[#FF5500]" />
              <Text className="mt-5 text-xl font-black tracking-tight text-white">
                Secure access for workers and employers.
              </Text>
              <Text className="mt-2 text-sm leading-6 text-white/70">
                Keep your account, applications, and messages together in one
                web experience.
              </Text>
            </View>

            <View className="gap-3">
              <View className="h-3 w-5/6 rounded-full bg-white/10" />
              <View className="h-3 w-4/6 rounded-full bg-white/10" />
              <View className="h-3 w-3/6 rounded-full bg-white/10" />
            </View>
          </View>
        </View>
      </View>
    </AuthWebShell>
  );
}
