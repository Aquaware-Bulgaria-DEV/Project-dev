import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import {  styles  } from "./selfReportStyles.js"
import SettingsButton from '../../globalComponents/settingsButton';
import { Header } from '../../globalComponents/header.jsx';

import '../../../src/i18n/i18n.config';
import { useTranslation } from 'react-i18next';

import getIcon from '../../../utils/icons.js';

const DataComponent = ({ data }) => {

  const IconsComp = () => {
    const [ penOpacity, setPenOpacity ] = React.useState(1);
    const [trashOpacity, setTrashOpacity] = React.useState(1);

    return(
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
        <Pressable onPressIn={() => setPenOpacity(.5)} onPressOut={() => setPenOpacity(1)} style={{ /* width: 35, height: 35, borderRadius: 35/2, */ alignItems: 'center', justifyContent: 'center', opacity: penOpacity}}>{getIcon('pencil', '#131313')}</Pressable>
        <Pressable onPressIn={() => setTrashOpacity(.5)} onPressOut={() => setTrashOpacity(1)} style={{ /* width: 35, height: 35, borderRadius: 35/2, */ alignItems: 'center', justifyContent: 'center', opacity: trashOpacity}}>{getIcon('trash', '#131313')}</Pressable>
      </View>
    );
  }

  return(
    <View style={[styles.settingsBtn, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
      <Text style={{color: '#999999', fontSize: 20,}}>{data}</Text>
      <IconsComp />
    </View>
  );
}

const selfReport = () => {
  const { t, i18n } = useTranslation();

  // const { width, height } = Dimensions.get('window');
  const data = "28.07.2024";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
      <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
        <Text style={styles.title}>{t('subscreenSelfReport')}</Text>
          <SettingsButton
          title={t('subscreenAddData')}
          style={[styles.settingsBtn, {marginBottom: 20}]}
          screen={'subscreens/formSelfReport'}
          icon={'plus'}
          iconColor={"#131313"}
          />
          <View style={{borderBottomColor: '#131313', borderBottomWidth: 1,opacity: .1, marginBottom: 20}} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
          <DataComponent data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default selfReport;