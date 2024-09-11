import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../globalComponents/header'
import { useLocalSearchParams } from 'expo-router'

import { styles } from './doubleProgressBarStyles'
import CircularProgressBar from '../../globalComponents/progressBar';

import FishTank from "../../../assets/Fish.png"
import BathTub from "../../../assets/Bathtub.png"
import { useTranslation } from 'react-i18next'
import {  getRandomAdviceAndImage } from '../../services/fetch'
import { useAuth } from '../../Context/AuthContext'

const DoubleProgressBar = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { progressPercent, currentQuantity, errMsg } = useLocalSearchParams();
  const litersQuantity = currentQuantity * 1000;
  const [ data, setData ] = useState('');
  const [payload, setPayload] = useState({});

  useEffect(() => {
    setPayload({
      "water_usage": litersQuantity,
    });
  }, [currentQuantity, progressPercent]);

  useEffect(() => {
    getRandomAdviceAndImage(token, payload)
    .then(res => setData(res))
    .catch(err => console.log(err))
  }, []);
  


  // If there is an error message, set progressPercent to 0
  const effectiveProgressPercent = errMsg ? 0 : progressPercent;

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
            {/* Conditionally render textContainer only if there is no error message */}
            {!errMsg && (
              <View style={styles.textContainer}>
                <Text style={styles.quantity}>{litersQuantity} {t("doubleProgressBarLiters")}</Text>
                <Text style={styles.tip}>{data[0]?.title}</Text>
              </View>
            )}
            <CircularProgressBar
              progress={effectiveProgressPercent}
              size={300}
              quantity={currentQuantity}
              errMsg={errMsg}
              imageSource={data[0]?.image}
            />
          </View>

          <Text style={styles.quantity}>{t("doubleProgressBarOr")}</Text>

          <View style={styles.subContainer}>
            {/* Conditionally render textContainer only if there is no error message */}
            {!errMsg && (
              <View style={styles.textContainer}>
                <Text style={styles.quantity}>{litersQuantity} {t("doubleProgressBarLiters")}</Text>
                <Text style={styles.tip}>{data[1]?.title}</Text>
              </View>
            )}
            <CircularProgressBar
              progress={effectiveProgressPercent}
              size={300}
              quantity={currentQuantity}
              errMsg={errMsg}
              imageSource={data[1]?.image}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DoubleProgressBar;
