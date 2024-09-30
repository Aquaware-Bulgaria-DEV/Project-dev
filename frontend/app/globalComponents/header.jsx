import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import AntDesignI from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import AuthContext from '../Context/AuthContext.jsx';
import { styles } from './headerStyles.js';
import { useRouter } from 'expo-router';

import PROFILE_PIC from '../../assets/blank-profile.png';
import LOGO_COVER from '../../assets/AquawareLogo.svg';

export const Header = ({ showProfilePic, resetRouter = false }) => {
  const { userInfo } = React.useContext(AuthContext);

  const isLogged = userInfo && Object.keys(userInfo).length > 0;

  const router = useRouter();

  const onArrowPress = () => {
    if (resetRouter) {
      router.replace('/');
    } else {
      router.back();
    }
  };

  const onProfilePress = () => {
    router.push('subscreens/myProfile');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={showProfilePic ? onProfilePress : onArrowPress}>
        {showProfilePic ? (
          <View>
            {isLogged && (
              <Image
                style={styles.pics}
                source={{ uri: userInfo?.profile_picture }}
              />
            )}
            {!isLogged && <Image style={styles.pics} source={PROFILE_PIC} />}
          </View>
        ) : (
          <AntDesignI name='arrowleft' size={30} style={styles.icon} />
        )}
      </Pressable>
      <Image style={styles.logo} source={LOGO_COVER} />
    </View>
  );
};
