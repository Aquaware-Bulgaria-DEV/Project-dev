import { Text } from 'react-native';

import { styles } from './customTextStyles.js';

export const CustomText = ({
  style,
  fontType = 'regular',
  children,
  ...props
}) => {
  const getFontStyle = () => {
    switch (fontType) {
      case 'regular':
        return styles.defaultFont;
      case 'bold':
        return styles.boldFont;
      /**
       * Example: How to add more font styles
       * case 'semibold':
       * return semibold style
       */
      default:
        return styles.defaultFont;
    }
  };
  return (
    <Text style={[getFontStyle(), style]} {...props}>
      {children}
    </Text>
  );
};
