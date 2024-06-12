import { TouchableOpacity, Image } from 'react-native';
import React from 'react';

import { styles } from './customButtonStyles';
import { CustomText } from './CustomText/customText.jsx';

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  additionalStyles,
  imagePath,
  additionalTextStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isLoading ? { opacity: 50 } : null,
        additionalStyles,
      ]}
      disabled={isLoading}
    >
      {imagePath ? (
        <Image source={imagePath} />
      ) : (
        <CustomText style={[styles.btn, additionalTextStyle]}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
