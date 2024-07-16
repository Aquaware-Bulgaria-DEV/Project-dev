import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CircularProgressBar = ({ progress, size = 100, imageSource }) => {
  const strokeWidthBackground = 15;
  const strokeWidthInside = 6;
  const radius = (size - strokeWidthBackground) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidthBackground}
        />
        <Circle
          stroke="#339DFA"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidthInside}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {imageSource ? (
        <Image
          source={imageSource}
          style={[styles.image, { width: size - strokeWidthBackground -18, height: size - strokeWidthBackground - 18}]}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.textContainer}>
        <Text style={styles.textQuantity}>0,28 m3</Text>
        <Text style={styles.textLabel}>Дневен разход</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    borderRadius: (width / 2) * 1, // adjust based on your image size
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  textQuantity: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  textLabel: {
    // position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#339DFA',
  },
});

export default CircularProgressBar;
