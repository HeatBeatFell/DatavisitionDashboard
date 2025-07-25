

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SWRConfig } from "swr";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomagChina",
  description: "HomagChina Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`overflow-hidden ${inter.className}`} >
        <SWRConfig
          value={{
            // fetcher: (url: string) => fetch(url).then(res => res.json()),
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            refreshInterval: 30000, // 30秒自动刷新
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
