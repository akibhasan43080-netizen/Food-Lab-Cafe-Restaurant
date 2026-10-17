import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্ট | Food Lab Cafe & Restaurant, Kulaura",
  description: "কুলাউড়ার স্টেশন চৌমুহনীর শিশির মার্কেটে (১ম তলা) অবস্থিত ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্টের মেন্যু দেখুন। পিৎজা, বার্গার, পাস্তা, চাউমিন, কফি ও অন্যান্য খাবার সরাসরি অর্ডার করুন।",
  openGraph: {
    title: "ফুড ল্যাব ক্যাফে অ্যান্ড রেস্টুরেন্ট | Food Lab Kulaura",
    description: "দারুণ খাবার। সেরা মুহূর্ত। Food Lab Cafe & Restaurant, Shishir Market (1st floor), Station Chowmuhoni, Kulaura.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.pinimg.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history){history.scrollRestoration='manual';}if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}window.scrollTo(0,0);}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
