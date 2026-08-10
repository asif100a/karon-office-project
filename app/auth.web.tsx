import { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getDashboardRouteForRole,
  normalizeUserRole,
  type UserRole,
} from "@/constants/Routes";

import LoginScreen from "./screens/auth/LoginScreen";
import RegisterGeneralScreen from "./screens/auth/RegisterGeneralScreen";
import RegisterDocumentsScreen from "./screens/auth/RegisterDocumentsScreen";
import RegisterPasswordScreen from "./screens/auth/RegisterPasswordScreen";
import CompletePayrollScreen from "./screens/auth/CompletePayrollScreen";
import ReviewScreen from "./screens/auth/ReviewScreen";
import RegisterEmployerScreen from "./screens/auth/RegisterEmployerScreen";
import RegisterSsoScreen from "./screens/auth/RegisterSsoScreen";

const WEB_ROLE_STORAGE_KEY = "site-source.active-role";

type AuthStep =
  | "login"
  | "register_sso"
  | "register_general"
  | "register_employer"
  | "register_documents"
  | "register_password"
  | "complete_payroll"
  | "review";

export default function AuthFlowWeb() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialStep = (params.step as AuthStep) || "login";

  const [step, setStep] = useState<AuthStep>(initialStep);
  const [role, setRole] = useState<UserRole>(normalizeUserRole(params.role));

  const currentStep = params?.currentStep as AuthStep;

  useEffect(() => {
    if (currentStep) {
      setStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    setRole(normalizeUserRole(params.role));
  }, [params.role]);

  useEffect(() => {
    if (params.step) {
      setStep(params.step as AuthStep);
    }
  }, [params.step]);

  const goToRoleDashboard = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WEB_ROLE_STORAGE_KEY, role);
    }
    router.replace(getDashboardRouteForRole(role));
  };

  const goToPostRegistrationRoute = () => {
    const returnTo = Array.isArray(params.returnTo)
      ? params.returnTo[0]
      : params.returnTo;

    if (returnTo) {
      router.replace(returnTo as any);
      return;
    }

    goToRoleDashboard();
  };

  const goToRegisterForCurrentRole = () => {
    const currentRole = params.role ? normalizeUserRole(params.role) : role;
    setRole(currentRole);
    setStep(
      currentRole === "employer" ? "register_employer" : "register_sso",
    );
  };

  const renderActiveScreen = () => {
    if (
      role === "employer" &&
      (step === "register_general" || step === "register_employer")
    ) {
      return (
        <RegisterEmployerScreen
          onContinue={(data) => {
            console.log("Employer register data:", data);
            setStep("complete_payroll");
          }}
          onLoginPress={() => setStep("login")}
        />
      );
    }

    switch (step) {
      case "login":
        return (
          <LoginScreen
            role={role}
            onRegisterPress={goToRegisterForCurrentRole}
            onLoginPress={goToRoleDashboard}
          />
        );
      case "register_sso":
        return (
          <RegisterSsoScreen
            onContinue={(data) => {
              console.log("Worker registration data:", data);
              setStep("register_general");
            }}
            onLoginPress={() => setStep("login")}
          />
        );
      case "register_general":
        return (
          <RegisterGeneralScreen
            role={role}
            onContinue={(data) => {
              console.log("General register data:", data);
              setStep("register_documents");
            }}
            onLoginPress={() => setStep("login")}
          />
        );
      case "register_documents":
        return (
          <RegisterDocumentsScreen
            role={role}
            onContinue={(docs) => {
              console.log("Uploaded documents:", docs);
              setStep("register_password");
            }}
          />
        );
      case "register_password":
        return (
          <RegisterPasswordScreen
            role={role}
            onComplete={() => {
              if (role === "employer") {
                setStep("review");
              } else {
                setStep("complete_payroll");
              }
            }}
          />
        );
      case "complete_payroll":
        return (
          <CompletePayrollScreen
            onComplete={() => {
              if (role === "employer") {
                setStep("review");
              } else {
                goToPostRegistrationRoute();
              }
            }}
          />
        );
      case "review":
        return <ReviewScreen onBackToLogin={() => setStep("login")} />;
      default:
        return (
          <LoginScreen
            role={role}
            onRegisterPress={goToRegisterForCurrentRole}
            onLoginPress={goToRoleDashboard}
          />
        );
    }
  };

  return (
    <View className="flex-1 bg-neutral-50 lg:flex-row">
      <View className="hidden lg:flex lg:w-[420px] xl:w-[480px] bg-neutral-950 px-10 py-10 justify-between">
        <View className="gap-6">
          <View className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <View className="h-12 w-12 rounded-2xl bg-[#FF5500]" />
            <View className="mt-6 gap-3">
              <View className="self-start rounded-full bg-white/10 px-3 py-1.5">
                <View className="h-2 w-2 rounded-full bg-emerald-400" />
              </View>
              <View className="gap-2">
                <View className="h-4 w-36 rounded-full bg-white/15" />
                <View className="h-4 w-56 rounded-full bg-white/10" />
              </View>
            </View>
          </View>

          <View className="max-w-sm gap-4">
            <View className="h-10 w-36 rounded-full bg-white/10" />
            <View className="gap-3">
              <View className="h-3 w-full rounded-full bg-white/10" />
              <View className="h-3 w-5/6 rounded-full bg-white/10" />
              <View className="h-3 w-4/6 rounded-full bg-white/10" />
            </View>
          </View>
        </View>

        <View className="gap-3">
          <View className="h-3 w-24 rounded-full bg-white/10" />
          <View className="h-3 w-40 rounded-full bg-white/10" />
        </View>
      </View>

      <View className="flex-1 min-w-0 min-h-0">
        <View className="flex-1 min-h-0 px-4 py-6 md:px-10 md:py-10 xl:px-14">
          <View className="mx-auto flex-1 min-h-0 w-full max-w-3xl">
            <View className="flex-1 min-h-0 overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm">
              {renderActiveScreen()}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
