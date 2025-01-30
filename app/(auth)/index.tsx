import React, { useContext, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { supabase } from '@/lib/supabase';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { router } from 'expo-router';
import { SafeAreaView } from '@/components/SafeAreaView';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';
import { Link } from '@/components/ui/link';
import KeyboardAwareScrollView from '@/components/KeyboardAwareScrollView';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Either signing in or signing up
  const [signingIn, setSigningIn] = useState(true);

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
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView className="flex-1" behavior='padding'>
        <Box className="flex-1 flex flex-col justify-center">
          <FormControl className="p-4 border rounded-lg border-outline-300">
            <VStack space="xl">
              <Heading size='xl' className="text-typography-900">
                {signingIn ? 'Log In' : 'Create your account'}
              </Heading>

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


              <VStack space="xs">
                <Text className="text-typography-500">Password</Text>
                <Input className="text-center">
                  <InputField
                    placeholder="Enter password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <InputSlot className="pr-3" onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              </VStack>


              <Button
                className="w-full"
                onPress={() => signingIn ? signInWithEmail() : signUpWithEmail()}
                disabled={loading}
              >
                <ButtonText className="text-typography-0">
                  {signingIn ? 'Sign In' : 'Sign Up'}
                </ButtonText>
              </Button>


              <Box className="w-full flex items-end">
                <Link href='/(auth)/forgot-password'>
                  <Text className="underline">Forgot password?</Text>
                </Link>
              </Box>

              <Box className="flex flex-row justify-center items-center mt-5">
                <Text className="text-typography-500">
                  { signingIn ? `Don't have an account?` : `Already have an account?` }
                </Text>

                <Pressable onPress={() => setSigningIn(signingIn => !signingIn)}>
                  <Text underline className="ml-2">
                    { signingIn ? `Sign Up` : `Sign In` }
                  </Text>
                </Pressable>
              </Box>

            </VStack>
          </FormControl>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
