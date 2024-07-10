import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../(tabs)/settings/settingsStyles.js';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import getIcon from '../../utils/icons.js';

const SettingsButton = ({
  style,
  title,
  screen,
  icon,
  iconColor,
  secondIcon,
  secondIconColor,
  params,
  onIconPress, // New prop for icon press handler
  onSecondIconPress, // New prop for second icon press handler
}) => {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    router.push({ pathname: screen, params });
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={style}
      onPress={handlePress}
    >
      {isPressed ? (
        <LinearGradient colors={['#388FED', '#4C62C7']} style={styles.gradient}>
          <Text style={styles.textGradient}>{title}</Text>
          <View style={styles.icons}>
            {icon && (
              <Pressable onPress={onIconPress}>
                {getIcon(icon, iconColor)}
              </Pressable>
            )}
            {secondIcon && (
              <Pressable onPress={onSecondIconPress}>
                {getIcon(secondIcon, secondIconColor)}
              </Pressable>
            )}
          </View>
        </LinearGradient>
      ) : (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.icons}>
            {icon && (
              <Pressable onPress={onIconPress}>
                {getIcon(icon, iconColor)}
              </Pressable>
            )}
            {secondIcon && (
              <Pressable onPress={onSecondIconPress}>
                {getIcon(secondIcon, secondIconColor)}
              </Pressable>
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SettingsButton;
