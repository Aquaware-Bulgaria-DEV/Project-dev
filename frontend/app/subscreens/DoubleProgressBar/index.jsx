import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../globalComponents/header'
import { useLocalSearchParams } from 'expo-router'

import {styles}  from './doubleProgressBarStyles'
import CircularProgressBar from '../../globalComponents/progressBar';

import FishTank from "../../../assets/Fish.png"
import BathTub from "../../../assets/Bathtub.png"

const DoubleProgressBar = () => {
  const { progressPercent, currentQuantity } = useLocalSearchParams();
  const litersQuantity = currentQuantity * 1000;
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Header showProfilePic={false} />
      <View style={styles.progressContainer}>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.quantity}>{litersQuantity} литра</Text>
            <Text style={styles.tip}>колкото един аквариум в хотел</Text>
          </View>
          <CircularProgressBar progress={progressPercent} size={300} imageSource={FishTank}/>
        </View>
        <Text style={styles.quantity}>или</Text>
        <View style={styles.subContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.quantity}>{litersQuantity} литра</Text>
            <Text style={styles.tip}>колкото една почти пълна вана</Text>
          </View>
          <CircularProgressBar progress={progressPercent} size={300} imageSource={BathTub}/>
        </View>
      </View>
  </ScrollView>
  </SafeAreaView>
  )
}

export default DoubleProgressBar