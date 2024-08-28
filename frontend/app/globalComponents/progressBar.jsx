import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const CircularProgressBar = ({ progress, quantity = 0, errMsg,size = 100, imageSource }) => {
  const dotsVisible = progress < 100 ? true : false;
  const progressColor = progress >= 95 ? progress >=100 ? "#E4003A" : "#EB5B00"  : "#339DFA";
  const strokeWidthBackground = 20;
  const strokeWidthProgress = 6;
  const dotRadius = strokeWidthProgress * 1; // Outer dot radius
  const innerDotRadius = dotRadius / 2; // Inside dot radius (2x smaller)
  const radius = (size - strokeWidthBackground) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate positions for the start and end dots
  const calculateDotPosition = (progressValue) => {
    const angle = (progressValue / 100) * 360 - 90;
    const x = size / 2 + radius * Math.cos((angle * Math.PI) / 180);
    const y = size / 2 + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

  const startDotPosition = calculateDotPosition(0);
  const endDotPosition = calculateDotPosition(progress);

  return (
    <View style={[styles.container, { width: size, height: size }, ]}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(150, 150, 150, .1)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidthBackground}
        />
        <Circle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidthProgress}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
        {dotsVisible && 
        <>
          <Circle
          cx={startDotPosition.x}
          cy={startDotPosition.y}
          r={dotRadius}
          fill="#FEFEFE"
        />
        <Circle
          cx={endDotPosition.x}
          cy={endDotPosition.y}
          r={dotRadius}
          fill="#FEFEFE"
        />
        <Circle
          cx={startDotPosition.x}
          cy={startDotPosition.y}
          r={innerDotRadius}
          fill="#000000"
        />
        <Circle
          cx={endDotPosition.x}
          cy={endDotPosition.y}
          r={innerDotRadius}
          fill="#000000"
        />
      </>
      }
        
      </Svg>
      
      { errMsg ? (
        <View style={styles.textContainer}>
          <View style={styles.quantityContainer}>
            {errMsg 
            ? <Text style={styles.errorMessage}>{errMsg}</Text> 
            : <>
                <Text style={styles.textQuantity}>{quantity} m</Text>
                <Text style={styles.superScript}>3</Text>
              </>
            }
            
          </View>
            <Text style={styles.textLabel}>Дневен разход</Text>
        </View>
      )
      :(
        <Image
          source={imageSource}
          style={[styles.image, { width: size - strokeWidthBackground - 12, height: size - strokeWidthBackground - 12 }]}
          resizeMode="cover"
        />
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
    borderRadius: (width / 2) * 1, 
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    gap: 1
  },
  quantityContainer: {
    flexDirection: 'row'
  },
  textQuantity: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
  superScript: {
    fontSize: 14,
    position: 'relative',
    fontWeight: 'bold',
    top: 0,
    left: 0,
  },
  textLabel: {
    // position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#339DFA',
  },
});

export default CircularProgressBar;
