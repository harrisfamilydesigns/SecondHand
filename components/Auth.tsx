import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';

import { supabase } from '../lib/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
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
  }

  return (
    <View className="flex-1 flex flex-col justify-center">
      <View className="bg-green-100">
        <Input
          placeholder="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', size: 20 }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View className="mb-4">
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock', size: 20 }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View className="mt-5 mb-3">
        <Button
          title="Sign In"
          loading={loading}
          containerStyle={{ borderRadius: 8 }}
          onPress={signInWithEmail}
        />
      </View>
      <View>
        <Button
          title="Sign Up"
          loading={loading}
          containerStyle={{ borderRadius: 8 }}
          onPress={signUpWithEmail}
        />
      </View>
    </View>
  );
}
