import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/config/providers";
import * as api from "@/lib/api";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Toaster } from "sonner";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "이프런 - 라이프타임 커리어 플랫폼",
  description: "이프런은 라이프타임 커리어 플랫폼입니다.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, categories] = await Promise.all([
    auth(),
    api.getAllCategories(),
  ]);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <SiteHeader session={session} categories={categories.data ?? []} />
          <div className=" max-w-8xl mx-auto">
            <main>{children}</main>
          </div>
          <SiteFooter />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
