"use client"
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";

export default function Services({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <NextUIProvider>
      <NextTopLoader />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NextUIProvider>
  )
}
