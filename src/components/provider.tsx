"use client";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <ToastProvider />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
