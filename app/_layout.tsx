import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Slot } from "expo-router";
import { AuthProvider } from '../providers/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";

const queryClient = new QueryClient()

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ComponentProps<typeof GluestackUIProvider>['mode']>('system');

  return (
    <GluestackUIProvider mode={colorMode}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
