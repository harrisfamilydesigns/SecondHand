import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Slot } from "expo-router";
import { AuthProvider } from '../provider/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
