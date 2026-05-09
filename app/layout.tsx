import type { Metadata, Viewport } from "next";
import { DM_Serif_Text } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ServiceWorkerRegister from "@/components/serviceWorker/serviceWorkerRegister";
import { UserProviderWrapper } from "../context/userProviderWrapper";
const dmSerifText = DM_Serif_Text({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trackfi-umber.vercel.app/"),
  title: {
    default: "Trackfi",
    template: "%s | Trackfi",
  },
  description:
    "Real-time crypto and personal finance tracker. Monitor your portfolio, track prices, and manage your finances in one place.",
  keywords: [
    "crypto tracker",
    "portfolio tracker",
    "personal finance",
    "bitcoin",
    "cryptocurrency",
    "Trackfi",
  ],
  authors: [{ name: "Akerele Raymond" }],
  openGraph: {
    title: "Trackfi - Track Your Crypto Portfolio",
    description:
      "Real-time crypto and personal finance tracker. Monitor your portfolio, track prices, and manage your finances in one place.",
    url: "https://trackfi-umber.vercel.app/",
    siteName: "Trackfi",
    images: [
      {
        url: "/images/trackfi-preview.png",
        width: 1200,
        height: 630,
        alt: "Trackfi Restaurant Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: "Trackfi - Track Your Crypto Portfolio",
    description: "Gourmet meals delivered fast.",
    images: ["/images/trackfi-preview.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${dmSerifText.variable} ${dmSerifText.className}`}>
          <ServiceWorkerRegister />
          <UserProviderWrapper>
          {children}
        </UserProviderWrapper>
        
        <Toaster
          position="top-right"
          richColors
          duration={4000}
          toastOptions={{
            className: "toast-with-progress",
          }}
        />
      </body>
    </html>
  );
}
