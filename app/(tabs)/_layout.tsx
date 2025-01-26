import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return <Tabs>
    <Tabs.Screen
      name="(home)"
      options={{
        headerTitle: () => <Text>Home</Text>,
        tabBarIcon: () => <Text>🏠</Text>,
        tabBarLabel: 'Home',
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        headerTitle: () => <Text>Settings</Text>,
        tabBarIcon: () => <Text>⚙️</Text>,
        tabBarLabel: 'Settings',
      }}
    />
  </Tabs>;
}
