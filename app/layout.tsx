import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Lab Cafe & Restaurant | Kulaura",
  description: "Explore the menu at Food Lab Cafe & Restaurant on Hospital Road, Kulaura. Browse pizzas, burgers, pasta, chow mein, coffee and more.",
  openGraph: {
    title: "Food Lab Cafe & Restaurant | Kulaura",
    description: "Good food. Great moments. Explore the menu and contact Food Lab in Kulaura.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
