import { SafeAreaView } from '@/components/SafeAreaView';
import { Box } from "../ui/box";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Text } from "../ui/text";
import { Image } from '../ui/image';

export default function DashboardHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-background-0 flex-0"
    >
      <Box className="m-3 flex flex-row items-center justify-between">
        <Box className="flex flex-row items-center">
          <Image source={require('@/assets/images/icon.png')} alt='logo' style={{ width: 40, height: 40 }} />
          <Text size="xl" bold>2ndHandFix</Text>
        </Box>
        <UserAvatar/>
      </Box>
    </SafeAreaView>
  )
}
