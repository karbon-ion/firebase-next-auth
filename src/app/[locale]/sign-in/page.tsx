// src/app/[locale]/login/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SignIn, getCurrentUser } from "@/lib/firebase/auth"; // Assume you have a Firebase auth helper
import { withPublicRoute } from "@/components/hoc/withPublicRoute";
import { Link, useRouter } from "@/i18n/routing";

const LoginPage = () => {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call Firebase signin
      await SignIn(formData.email, formData.password);
      const currentUser = await getCurrentUser();
      if (currentUser?.emailVerified){
        router.push('/dashboard');
      } else {
        router.push('/verify-email');
      }

    } catch (err: any) {
      setError(err.message || t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">{t("title")}</h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t("fields.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t("fields.password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? t("loading") : t("submit")}
          </button>
        </form>
        <div className="flex flex-col space-y-4 mt-4 text-sm text-center text-gray-600">
          <Link
            href='/auth/forgot-password'
            className="text-blue-600 hover:underline"
          >
            {t("forgotPassword")}
          </Link>
          <p>
            {t("noAccount")}{" "}
            <Link href='/sign-up' className="text-blue-600 hover:underline">
              {t("signupLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withPublicRoute(LoginPage);
