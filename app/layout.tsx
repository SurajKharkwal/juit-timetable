import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
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
            fontSans.variable
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
