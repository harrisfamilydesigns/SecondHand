import { fetchSession, queryKeys } from '@/api';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from '@/components/ui/actionsheet';
import { Text } from '@/components/ui/text';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { Pressable } from 'react-native';
import { supabase } from '@/lib/supabase';
import { ArrowRightIcon, Icon, RemoveIcon } from '@/components/ui/icon';
import { Box } from '../ui/box';

export default function UserAvatar() {
  const { data: session } = useQuery({
    queryKey: [queryKeys.SESSION],
    queryFn: fetchSession
  });
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleCloseActionSheet = () => {
    setActionSheetVisible(false);
  }

  const handleSignOut = () => {
    setActionSheetVisible(false);
    supabase.auth.signOut();
  }

  const userInitial = session && session.user && session.user.email && session.user.email[0] || '🤷‍♂️';

  return (
    <Fragment>
      <Pressable onPress={() => setActionSheetVisible(true)}>
        <Avatar size="md" className="mr-3">
          <AvatarFallbackText>
            {userInitial}
          </AvatarFallbackText>
          <AvatarImage
            source={{
              uri: session && session.user && session.user.user_metadata?.avatar_url
            }}
          />
          <AvatarBadge />
        </Avatar>
      </Pressable>

      <Actionsheet
        isOpen={actionSheetVisible}
        onClose={handleCloseActionSheet}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box className="w-full flex flex-row justify-center my-5">
            <Text>{session && session.user && session.user.email}</Text>
          </Box>
          <ActionsheetItem onPress={handleSignOut}>
            <Box className="w-full flex flex-row items-center justify-between border rounded-lg p-4">
              <Text size='xl'>
                Sign out
              </Text>
              <Icon as={ArrowRightIcon} />
            </Box>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Fragment>
  )
}

