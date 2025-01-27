import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <SafeAreaView>
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
