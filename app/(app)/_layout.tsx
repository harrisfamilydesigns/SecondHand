import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { AuthContext } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';

export default function AppLayout() {
  const { user } = useContext(AuthContext);
  const isLoading = user === null;

  if (isLoading) {
    return <Box className="flex items-center justify-center h-full">
      <Text>Loading...</Text>
    </Box>
  }

  if (!user) {
    return <Redirect href='/(auth)' />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        header: () => <DashboardHeader />
      }}/>
    </Stack>
  );
}
