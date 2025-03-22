import FloatingBottomNavBar from "@/components/FloatingBottomNavBar";
import { GlobalContextProvider } from "@/context/GlobalContextProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shakib Khan | Web & Android Developer",
  description: "I am a web developer and android developer",
  icons: {
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`antialiased`}>
        <GlobalContextProvider>
          {children}
          <FloatingBottomNavBar />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
