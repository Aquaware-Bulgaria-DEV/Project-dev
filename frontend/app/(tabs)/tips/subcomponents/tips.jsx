import {
  ScrollView,
  Text,
  Pressable,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';
import { styles } from './subcompStyles.js';
import { useState, useEffect, useContext } from 'react';
import * as tipsServices from '../../../services/fetch.js';
import { useRouter } from 'expo-router';
import React from 'react';

import '../../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../../Context/AuthContext.jsx';

export const TipsByCategory = () => {
  const router = useRouter();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = React.useContext(AuthContext);

  const { t, i18n } = useTranslation();

  const getTips = async () => {
    try {
      const response = await tipsServices.getTips(token);

      setTips(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tips:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTips();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='black' />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.categories}>{t('categories')}</Text>

      {tips.length ? (
        tips.map((tip) => (
          <View key={tip.id}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: 'subscreens/tip',
                  params: { tipId: tip.id },
                })
              }
            >
              <ImageBackground
                style={styles.background}
                source={{ uri: tip.background_image }}
              >
                <Text style={styles.tipText}>{tip.title}</Text>
              </ImageBackground>
            </Pressable>
          </View>
        ))
      ) : (
        <Text style={styles.noTips}>В момента няма налични съвети</Text>
      )}
    </ScrollView>
  );
};
