import { SafeAreaView } from '@/components/SafeAreaView';
import { Box } from "../ui/box";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Text } from "../ui/text";

export default function DashboardHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-background-0 flex-0"
    >
      <Box className="m-3 flex flex-row items-center justify-between">
        <Text size="3xl" bold>CareSync</Text>
        <UserAvatar/>
      </Box>
    </SafeAreaView>
  )
}
