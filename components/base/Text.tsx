import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export interface CustomTextProps extends RNTextProps {
  font?: 'light' | 'regular' | 'medium' | 'bold' | 'extraBold';
  className?: string;
}

const fontFamilies = {
  light: 'InterLight',
  regular: 'InterRegular',
  medium: 'InterMedium',
  bold: 'InterBold',
  extraBold: 'InterExtraBold',
};

export const Text: React.FC<CustomTextProps> = ({
  font = 'regular',
  className,
  style,
  children,
  ...props
}) => {
  const fontFamily = fontFamilies[font];

  return (
    <RNText
      className={twMerge(`font-${font}`, className)}
      style={[{ fontFamily }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};
