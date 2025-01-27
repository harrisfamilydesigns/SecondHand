import { supabase } from '@/lib/supabase'
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchGlutenFreeProducts, fetchSession, queryKeys } from '@/api';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Pressable } from 'react-native';
import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function Home() {
  const { data: glutenFreeProducts, isLoading: isLoadingGfProducts, error: errorGfProducts } = useQuery({
    queryKey: [queryKeys.GLUTEN_FREE_PRODUCTS],
    queryFn: fetchGlutenFreeProducts
  });
  const { data: session, isLoading: isLoadingSession, error: errorSession } = useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchSession
  });
  const userInitial = session && session.user && session.user.email && session.user.email[0];
  const isLoading = isLoadingGfProducts || isLoadingSession;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>

      <Box className="flex items-end">
        <UserAvatar />
      </Box>

      <Box className="flex flex-col h-full">
        <Text>Welcome to the home screen</Text>
        {session && session.user && <Text>{session.user.id}</Text>}
        {/* Logout */}
        <Button onPress={() => supabase.auth.signOut()}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}
