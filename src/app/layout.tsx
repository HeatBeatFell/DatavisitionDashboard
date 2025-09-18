import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SWRConfig } from "swr";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getMessages, getLocale, getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conflux",
  description: "Conflux Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const t = await getTranslations("index");
  metadata.title = t("title");
  metadata.description = t("desc");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`overflow-hidden ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" >
          <Theme>
            <SWRConfig
              value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: true,
                refreshInterval: 30000, // 30秒自动刷新
              }}>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </SWRConfig>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
