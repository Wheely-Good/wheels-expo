import React from 'react';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Home, TestTube2, Book, Dumbbell, User } from 'lucide-react-native';

export default function DesktopNavigation() {
  return (
    <View style={{ width: 64, backgroundColor: '#2563eb', height: '100%', position: 'absolute', left: 0, top: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
      <View style={{ gap: 32 }}>
        <Link href="/">
          <Home color="white" size={24} />
        </Link>
        <Link href="/tests">
          <TestTube2 color="white" size={24} />
        </Link>
        <Link href="/lessons">
          <Book color="white" size={24} />
        </Link>
        <Link href="/training">
          <Dumbbell color="white" size={24} />
        </Link>
      </View>
      <Link href="/account">
        <User color="white" size={24} />
      </Link>
    </View>
  );
}