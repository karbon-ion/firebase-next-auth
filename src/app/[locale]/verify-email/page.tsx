"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { sendVerificationEmail } from "@/lib/firebase/auth";
import { useAppContext } from "@/components/context/AppContext";
import { LoadingScreen } from "@/components/utilities/Loader";

const VerifyEmailPage = () => {
  const t = useTranslations("VerifyPage");
  const locale = useLocale();
  const router = useRouter();
  
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!user) {
          router.push(`/sign-in`);
          return;
        }
        
        if (user.emailVerified) {
          router.push(`/dashboard`);
          return;
        }
        
      } catch (err) {
        console.error(err);
        router.push(`/sign-in`);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, locale]);

  const handleResendVerification = async () => {
    if (!user) return;

    try {
      setResendLoading(true);
      setError(null);
      await sendVerificationEmail(user);
      setResendSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || t("errors.generic"));
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) {
    return (
      // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p><LoadingScreen/></p>
      // </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {t("title")}
        </h1>

        <div className="mb-6 text-center">
          <p className="text-gray-600">{t("instructions", { email: user?.email })}</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="mb-4 text-sm text-green-600 bg-green-100 border border-green-400 rounded-md p-2">
            {t("resendSuccess")}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={resendLoading}
            className={`w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              resendLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendLoading ? t("resending") : t("resend")}
          </button>

          <button
            onClick={() => router.push(`/sign-in`)}
            className="text-blue-600 hover:underline"
          >
            {t("backToLogin")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 