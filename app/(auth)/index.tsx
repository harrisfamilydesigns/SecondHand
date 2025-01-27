import React, { useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '@/lib/supabase';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);

    if (!error && session) router.replace('/(app)');
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);

    if (!error && session) router.replace('/(app)');
  }

  return (
    <SafeAreaView>
      <FormControl className="p-4 border rounded-lg border-outline-300">
        <VStack space="xl">
          <Heading className="text-typography-900">Login</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputField type="text" value={email} onChangeText={(text) => setEmail(text)} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </Input>
          </VStack>
          <Button
            className="w-full"
            onPress={signInWithEmail}
            disabled={loading}
          >
            <ButtonText className="text-typography-0">Sign In</ButtonText>
          </Button>

          <Button
            className="w-full"
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <ButtonText className="text-typography-0">Sign Up</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
