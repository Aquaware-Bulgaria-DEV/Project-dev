import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../(tabs)/settings/settingsStyles.js';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const SettingsButton = ({ style, title, screen }) => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={style}
      onPress={() => router.push(screen)}
    >
      {isPressed ? (
        <LinearGradient colors={['#388FED', '#4C62C7']} style={styles.gradient}>
          <Text style={styles.textGradient}>{title}</Text>
        </LinearGradient>
      ) : (
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default SettingsButton;
