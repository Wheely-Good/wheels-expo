import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

interface CustomPressableProps {
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CustomPressable: React.FC<CustomPressableProps> = ({
  onPress,
  children,
  disabled = false,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      className={`${className} ${disabled ? 'opacity-50' : isPressed ? 'opacity-50' : 'opacity-100'}`}
    >
      {children}
    </Pressable>
  );
};

export default CustomPressable;
