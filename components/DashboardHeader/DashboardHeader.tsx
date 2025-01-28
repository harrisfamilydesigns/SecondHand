import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../ui/box";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Text } from "../ui/text";

export default function DashboardHeader() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-0"
    >
      <Box className="mx-3 flex flex-row items-end justify-between">
        <Text size="3xl" bold>CareSync</Text>
        <UserAvatar/>
      </Box>
    </SafeAreaView>
  )
}
