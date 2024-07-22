import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import ReactQueryProvider from "@/utils/ReactQueryProvider";
export const metadata: Metadata = {
  title: {
    default: "JUIT Timetable",
    template: "%s - College Timetable",
  },
  description:
    "A simple and elegant way to view your college timetable online.",
  icons: {
    icon: "/timetable.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
