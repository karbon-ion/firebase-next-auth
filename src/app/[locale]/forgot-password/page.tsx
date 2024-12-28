"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/lib/firebase/auth";

const ForgotPasswordPage = () => {
  const t = useTranslations("ForgotPasswordPage");
  const locale = useLocale();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await resetPassword(email);
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {t("title")}
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="mb-4 text-sm text-green-600 bg-green-100 border border-green-400 rounded-md p-2">
              {t("successMessage")}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("fields.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t("loading") : t("submit")}
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          <a
            href={`/${locale}/sign-in`}
            className="text-blue-600 hover:underline"
          >
            {t("backToLogin")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
