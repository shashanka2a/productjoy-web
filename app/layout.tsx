import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://productjoy.studio"),
  title: "ProductJoy – Curious Fullservice Product Agency",
  description:
    "ProductJoy is a curious fullservice product agency based in Gainesville. We take care of the entire process from concept to joy.",
  keywords: [
    "ProductJoy",
    "product agency",
    "digital product",
    "UX design",
    "UI design",
    "branding",
    "motion design",
    "Gainesville"
  ],
  openGraph: {
    title: "ProductJoy – Curious Fullservice Product Agency",
    description:
      "From idea to done. A full-service partner for ambitious brands that care about joyful products.",
    url: "https://productjoy.studio",
    siteName: "ProductJoy",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductJoy – Curious Fullservice Product Agency",
    description:
      "From idea to done. A full-service partner for ambitious brands that care about joyful products."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


