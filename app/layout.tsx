import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্ট | Food Lab Cafe & Restaurant, Kulaura",
  description: "কুলাউড়ার হসপিটাল রোডে অবস্থিত ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্টের মেন্যু দেখুন। পিৎজা, বার্গার, পাস্তা, চাউমিন, কফি ও অন্যান্য খাবার সরাসরি অর্ডার করুন।",
  openGraph: {
    title: "ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্ট | Food Lab Kulaura",
    description: "দারুণ খাবার। সেরা মুহূর্ত। Food Lab Cafe & Restaurant, Hospital Road, Kulaura.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
