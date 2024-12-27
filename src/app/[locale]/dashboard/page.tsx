// src/app/[locale]/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { getCurrentUser, logout as signOutUser } from "@/lib/firebase/auth"; // Firebase helpers
import { withAuth } from "@/components/hoc/withAuth";
import { LoadingScreen } from "@/components/utilities/Loader";

const DashboardPage = () => {
  const t = useTranslations("DashboardPage");
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          try {
              const currentUser = await getCurrentUser();
              if (currentUser) {
                setLoading(false);
                setUser(currentUser);
              }
          } catch (err) {
              console.error(err);
              router.push('/sign-in'); // Redirect on error
          } 
          finally {
              setLoading(false);
          }
        };

        fetchUser();
    }, [router, locale]);

  const handleSignOut = async () => {
    await signOutUser();
    router.push('/sign-in'); // Redirect after logout
  };

  if (loading) {
    return (
      // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingScreen />
      // </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
          >
            {t("logout")}
          </button>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <h2 className="text-2xl font-semibold mb-4">{t("welcome", { name: user?.displayName || user?.email })}</h2>
        <p>{t("instructions")}</p>

        {/* Example dynamic content */}
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Replace these with your dynamic dashboard widgets */}
          <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-medium">{t("widget1.title")}</h3>
            <p>{t("widget1.description")}</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-medium">{t("widget2.title")}</h3>
            <p>{t("widget2.description")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(DashboardPage);
