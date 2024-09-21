import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import { styles } from "./customButtonStyles"

const CustomButton = ({title, handlePress, isLoading, additionalStyles, imagePath, additionalTextStyle, color, secondColor}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    style={[styles.container, isLoading ? {opacity : .5} : null, additionalStyles]}
    disabled={isLoading}
    >
      
      { imagePath ? <Image source={imagePath} /> : secondColor ? (<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient} colors={[color, secondColor]}><Text style={[styles.btn, additionalTextStyle]}>{title}</Text></LinearGradient>) : (<Text style={[styles.btn, additionalTextStyle]}>{title}</Text>)}
    </TouchableOpacity>
  )
}

export default CustomButton;

