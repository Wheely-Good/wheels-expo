import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuthStore } from '@/hooks/useAuthStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: { email: string; password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    await signUp(data.email, data.password);
    if (!error) {
      router.replace('/(auth)');
    }
  };

  return (
    <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        className="flex-1"
      >
    <View className="flex-1 justify-center items-center p-6">
      <View className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>
        <Controller
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              keyboardType="email-address"
            />
          )}
          name="email"
        />
        {errors.email && <Text className="text-red-500 mb-2">{errors.email.message}</Text>}

        <Controller
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text className="text-red-500 mb-2">{errors.password.message}</Text>}

        <Controller
          control={control}
          rules={{ required: 'Confirm Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
              secureTextEntry
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && <Text className="text-red-500 mb-2">{errors.confirmPassword.message}</Text>}
        {passwordMismatch && (
          <Text className="text-red-500 mb-2 text-center">Passwords do not match</Text>
        )}

        <TouchableOpacity
          className="w-full bg-blue-500 p-2 rounded"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-white text-center">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}
      </View>
    </View>
    </LinearGradient>

  );
}