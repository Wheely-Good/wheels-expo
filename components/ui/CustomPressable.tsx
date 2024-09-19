import React, { useRef } from 'react';
import { Pressable, Animated } from 'react-native';

interface CustomPressableProps {
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  activeOpacity?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

const CustomPressable: React.FC<CustomPressableProps> = ({
  onPress,
  children,
  disabled = false,
  className = '',
  activeOpacity = 0.2,
  fadeInDuration = 0,
  fadeOutDuration = 200,
}) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const animateOpacity = (toValue: number, duration: number) => {
    Animated.timing(opacityAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ opacity: disabled ? activeOpacity : opacityAnim }}>
      <Pressable
        disabled={disabled}
        onPressIn={() => !disabled && animateOpacity(activeOpacity, fadeInDuration)}
        onPressOut={() => !disabled && animateOpacity(1, fadeOutDuration)}
        onPress={onPress}
        className={`${className} ${disabled ? 'opacity-50' : ''}`}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default CustomPressable;