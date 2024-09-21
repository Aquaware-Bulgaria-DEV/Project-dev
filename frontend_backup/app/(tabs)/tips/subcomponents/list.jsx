import React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import AntDesignI from 'react-native-vector-icons/AntDesign';
import { styles } from './subcompStyles.js';

import { TipsByCategory } from './tips.jsx';

import '../../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

// const categoryKeys = ['categoryKitchenSink', 'categoryWasher', 'categoryBathroomShower', 'categoryToilet'];

export const List = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  // const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  // const pressHandler = (categoryKey) => {
  //   setSelectedCategory(categoryKey);
  //   //TODO: onPress to scroll to the selected section
  //   console.log('Selected category:', categoryKey);
  // };

  return (
    <ScrollView>
      {/* <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('highestConsumption')}</Text>
      </View> */}
      {/* <View style={styles.listContainer}>
        {categoryKeys.map((categoryKey, index) => (
          <Pressable
            key={index}
            onPress={() => pressHandler(categoryKey)}
            style={styles.item}
          >
            <Text
              style={[
                styles.itemText,
                selectedCategory === categoryKey && styles.selectedItemText,
              ]}
            >
              {t(categoryKey)}
            </Text>
          </Pressable>
        ))}
      </View> */}

      {/* <Pressable
        style={styles.accountContainer}
        onPress={() => router.push('subscreens/myProfile')}
      >
        <View style={styles.account}>
          <AntDesignI name={'user'} size={25} style={styles.userIcon} />
          <View>
            <Text style={styles.accountTitle}>{t('myAccount')}</Text>
            <Text style={styles.accountSubtitle}>{t('compare')}</Text>
          </View>
        </View>
        <AntDesignI name={'arrowright'} size={35} style={styles.arrow} />
      </Pressable> */}

      <TipsByCategory></TipsByCategory>
    </ScrollView>
  );
};
