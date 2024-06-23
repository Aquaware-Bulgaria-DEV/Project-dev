import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react';

import { styles } from "./customButtonStyles"

const CustomButton = ({title, handlePress, isLoading, additionalStyles, imagePath, additionalTextStyle}) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    style={[styles.container, isLoading ? {opacity : .5} : null, additionalStyles]}
    disabled={isLoading}
    >
      
      { imagePath ? <Image source={imagePath} /> :<Text style={[styles.btn, additionalTextStyle]}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton;

