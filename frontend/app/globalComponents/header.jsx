import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';

import AntDesignI from 'react-native-vector-icons/AntDesign';

import React from 'react';
import AuthContext from '../Context/AuthContext.jsx';

import { styles } from './headerStyles.js';
import { useRouter } from 'expo-router';

import PROFILE_PIC from '../../assets/blank-profile.png';
import LOGO_COVER from '../../assets/AquawareLogo.svg';

export const Header = ({ showProfilePic }) => {
  const { userInfo } = React.useContext(AuthContext);

  const isLogged = userInfo != {} ? true : false

  const router = useRouter();
  const onArrowPress = () => {
    router.back();
  };
  const onProfilePress = () => {
    console.log('TODO: redirect to profile screen');
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={showProfilePic ? onProfilePress : onArrowPress}>
        {showProfilePic ? (
          <View>
            {isLogged && (
              <Image style={styles.pics} source={userInfo?.profile_picture} />
              )}
              {!isLogged &&
                  (
              <Image style={styles.pics} source={PROFILE_PIC} />
            )}
          </View>
        ) : (
          <AntDesignI name={'arrowleft'} size={30} style={styles.icon} />
        )}
      </Pressable>
      <Image style={styles.logo} source={LOGO_COVER} />
    </View>
  );
};
