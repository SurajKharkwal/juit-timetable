import { type NavigateOptions, type ToOptions } from '@tanstack/react-router';
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

import { useRouter } from '@tanstack/react-router';
import { HeroUIProvider } from "@heroui/system";

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions['to'];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

export function Provider({ children, themeProps }: ProvidersProps) {
  let router = useRouter();

  return (
    <HeroUIProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}>
      <ThemeProvider {...themeProps}> {children} </ThemeProvider>
    </HeroUIProvider>
  );
}
