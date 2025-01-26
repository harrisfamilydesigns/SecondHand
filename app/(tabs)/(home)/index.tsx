import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase'
import Auth from '../../../components/Auth'
import { Session } from '@supabase/supabase-js'
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

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
    <Box className="flex flex-col h-full">
      <Auth />
      <Text>Hello, world! my friend</Text>
      {session && session.user && <Text>{session.user.id}</Text>}
    </Box>
  );
}
