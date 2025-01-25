import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Services from "@/lib/service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JUIT Timetable",
    template: "%s - College Timetable",
  },
  description: "A simple and elegant way to view your college timetable online.",
  icons: {
    icon: "/timetable.ico",
  },
  keywords:
    "JUIT, timetable, college, schedule, classes, university, Juit TimeTable, juit timetable, juit time table, juit time-table, juit-time-table, JUIT Timetable",
  openGraph: {
    title: "JUIT Timetable",
    description: "A simple and elegant way to view your college timetable online.",
    url: "https://juit-timetable.vercel.app",
    type: "website",
    images: [
      {
        url: "/timetable.png",
        width: 500,
        height: 500,
        alt: "JUIT Timetable",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google AdSense Script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2058203127983865"
       crossorigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-white antialiased min-h-dvh w-full bg-black`}
      >
        <Services>{children}</Services>
      </body>
    </html>
  );
}
