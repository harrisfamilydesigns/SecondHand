import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Alert, Pressable } from "react-native";
import { SafeAreaView } from "@/components/SafeAreaView";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPasswordPress = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      console.log('data', data);
      if (error) {
        Alert.alert(error.message);
      }
      Alert.alert('Password recovery email sent, please check your inbox.');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <FormControl className="p-4 border rounded-lg border-outline-300">
        <VStack space="xl">
          <Pressable onPress={() => router.push('/(auth)')}>
            <Icon as={ArrowLeftIcon} className="w-6 h-6" />
          </Pressable>
          <Heading size='xl' className="text-typography-900">Forgot password?</Heading>
          <Text className="text-typography-500">Enter your email address associated with your account.</Text>

          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputField
                keyboardType="email-address"
                placeholder="Enter email"
                type="text"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>
          </VStack>

          <Button
            className="w-full"
            onPress={handleForgotPasswordPress}
            disabled={loading}
          >
            <ButtonText className="text-typography-0">Send</ButtonText>
          </Button>

        </VStack>
      </FormControl>
    </SafeAreaView>
  )
}
