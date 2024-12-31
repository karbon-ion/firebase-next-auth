"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import  auth  from "@/lib/firebase/auth";
import React from "react";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("VerifyPage");
  const locale = useLocale();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [oobCode, setOobCode] = useState<string | null>(null);

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");
    
    setMode(mode);
    setOobCode(oobCode);

    const handleVerification = async () => {
      if (!oobCode) {
        setError("Invalid verification code");
        setLoading(false);
        return;
      }

      try {
        if (mode === "verifyEmail") {
          await applyActionCode(auth, oobCode);
          setSuccess(true);
        } else if (mode === "resetPassword") {
          // Just verify the code for now, actual reset happens on form submit
          await verifyPasswordResetCode(auth, oobCode);
          setSuccess(true);
        }
      } catch (err) {
        console.error(err);
        setError(t("errors.generic"));
      } finally {
        setLoading(false);
      }
    };

    handleVerification();
  }, [searchParams, t]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode || !newPassword) return;

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      router.push(`/${locale}/sign-in`);
    } catch (err) {
      console.error(err);
      setError(t("errors.resetFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <div className="text-red-600 text-center">
            <p>{error}</p>
            <button
              onClick={() => router.push(`/${locale}/sign-in`)}
              className="mt-4 text-blue-600 hover:underline"
            >
              {t("backToLogin")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "resetPassword" && success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-center mb-6">{t("resetPassword")}</h2>
          <form onSubmit={handlePasswordReset}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                {t("newPassword")}
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t("processing") : t("resetPassword")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md text-center">
          <p className="text-green-600 mb-4">{t("success")}</p>
          <button
            onClick={() => router.push(`/${locale}/sign-in`)}
            className="text-blue-600 hover:underline"
          >
            {t("backToLogin")}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default VerifyPage; 