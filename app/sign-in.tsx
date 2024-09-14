import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuthStore();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    await signIn(data.email, data.password);
    if (!error) {
      router.replace('/(auth)');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-6">Sign In</Text>
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
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

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
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

      <TouchableOpacity
        className="w-full bg-blue-500 p-2 rounded"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        <Text className="text-white text-center">
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
}