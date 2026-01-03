import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "@/components/provider";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "Juit Timetable",
  description: "Get Juit timetable as per your batch and course.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
