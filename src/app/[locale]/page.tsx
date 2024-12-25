import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LoginPage from './sign-in/page'

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <div>
        <LoginPage />
      </div>
    </>
  );
}
