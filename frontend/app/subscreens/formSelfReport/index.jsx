import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./formSelfReportStyles.js";
import { Header } from '../../globalComponents/header.jsx';
import RNPickerSelect from 'react-native-picker-select';
import WaterMeter from '../../globalComponents/waterMeter.jsx';
import getIcon from '../../../utils/icons.js';

const selfReport = () => {
    const [value, setValue] = useState('');
    const [opacity, setOpacity] = useState(1);
    const [meterCount, setMeterCount] = useState(1);
    const [meters, setMeters] = useState([]);

    const dataHouses = ["Имот 1", "Имот 2", "Имот 3", "Имот 4", "Имот 5"];
    const dataWaterMeter = ["Водомер 1", "Водомер 2"];

    const houseItems = dataHouses.map((key) => ({
        label: key,
        value: key
    }));

    const waterItems = dataWaterMeter.map((key) => ({
        label: key,
        value: key
    }));

    const addWaterMeter = () => {
        if (meterCount < 5) {
            setMeters([...meters, <WaterMeter key={meterCount} waterMeters={waterItems} setValue={setValue} value={value} />]);
            setMeterCount(meterCount + 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Header showProfilePic={false} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Добавяне на данни</Text>
                    <View>
                        <Text style={styles.labels}>Имот</Text>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setValue(value)}
                                items={houseItems}
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
                    <View style={styles.waterMeterContainer}>
                        <WaterMeter key={meterCount} waterMeters={waterItems} setValue={setValue} value={value} />
                        {meters}
                    </View>
                    <Pressable
                        onPress={addWaterMeter}
                        onPressIn={() => setOpacity(0.5)}
                        onPressOut={() => setOpacity(1)}
                    >
                        <Text style={[styles.addWaterMeter, { opacity }]}>
                            {getIcon('plus', '#3CA5D8', 15)}Добави водомер
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default selfReport;
