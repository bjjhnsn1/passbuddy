import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PassBuddy - Free Practice Exams for CDL, DMV, Motorcycle & ServSafe",
  description:
    "Free practice exams with instant feedback. Prepare for your CDL, DMV, motorcycle permit, or ServSafe certification exam.",
  metadataBase: new URL("https://passbuddy.app"),
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  openGraph: {
    type: "website",
    siteName: "PassBuddy",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
