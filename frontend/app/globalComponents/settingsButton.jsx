import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../(tabs)/settings/settingsStyles.js';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import getIcon from '../../utils/icons.js';

const SettingsButton = ({ style, title, screen, icon, iconColor }) => {
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
          {icon ? getIcon(icon, iconColor) : null}
        </LinearGradient>
      ) : (
        <View style={{justifyContent: 'space-between',  flexDirection: 'row',}}>
          <Text style={styles.text}>{title}</Text>
          {icon ? getIcon(icon, iconColor) : null}
        </View>
      )}
    </Pressable>
  );
};

export default SettingsButton;
