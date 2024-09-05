import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../globalComponents/header'
import { useLocalSearchParams } from 'expo-router'

import { styles } from './doubleProgressBarStyles'
import CircularProgressBar from '../../globalComponents/progressBar';

import FishTank from "../../../assets/Fish.png"
import BathTub from "../../../assets/Bathtub.png"
import { useTranslation } from 'react-i18next'

const DoubleProgressBar = () => {
  const { t } = useTranslation();
  const { progressPercent, currentQuantity, errMsg } = useLocalSearchParams();
  const litersQuantity = currentQuantity * 1000;

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
                <Text style={styles.tip}>колкото един аквариум в хотел</Text>
              </View>
            )}
            <CircularProgressBar
              progress={effectiveProgressPercent}
              size={300}
              quantity={currentQuantity}
              errMsg={errMsg}
              imageSource={FishTank}
            />
          </View>

          <Text style={styles.quantity}>{t("doubleProgressBarOr")}</Text>

          <View style={styles.subContainer}>
            {/* Conditionally render textContainer only if there is no error message */}
            {!errMsg && (
              <View style={styles.textContainer}>
                <Text style={styles.quantity}>{litersQuantity} {t("doubleProgressBarLiters")}</Text>
                <Text style={styles.tip}>колкото една почти пълна вана</Text>
              </View>
            )}
            <CircularProgressBar
              progress={effectiveProgressPercent}
              size={300}
              quantity={currentQuantity}
              errMsg={errMsg}
              imageSource={BathTub}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DoubleProgressBar;
