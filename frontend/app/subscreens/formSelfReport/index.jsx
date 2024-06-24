import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import {  styles  } from "./formSelfReportStyles.js"
import { Header } from '../../globalComponents/header.jsx';

import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';


const selfReport = () => {
    const [value, setValue] = React.useState('');
    const testData = ["Имот 1", "Имот 2", "Имот 3", "Имот 4", "Имот 5"]

    const pickerItems = testData.map((key) => ({
        label: key,
        value: key
    }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
      <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
        <Text style={styles.title}>Добавяне на данни</Text>
            <Text style={styles.labels}>Имот</Text>
            <View style={styles.pickerContainer}>
                {/* <Picker
                    selectedValue={value}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue, itemIndex) => {
                        // formValues.issue = itemValue;
                        setValue(itemValue);
                        
                        // if (
                        //   formValues.issue !== '' &&
                        //   formValues.address !== '' &&
                        //   formValues.content !== ''
                        // ) {
                        //   setError('');
                        // }
                    }}
                    >
                    {value === '' && (
                        <Picker.Item label='Избери имот' value='' />
                    )}
                    {testData.map((key) => <Picker.Item  key={key} label={key} value={key} />)}
                </Picker> */}
                 <RNPickerSelect
                            onValueChange={(value) => setValue(value)}
                            items={pickerItems}
                            style={{
                                inputIOS: styles.pickerItem,
                                inputAndroid: styles.pickerItem,
                            }}
                            placeholder={{
                                label: 'Избери имот',
                                value: '',
                            }}
                            value={value}
                        />
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default selfReport;