import { View, Text, TextInput } from "react-native";
import React from "react";
import RNPickerSelect from 'react-native-picker-select';

import { styles } from "./waterMeter.js";

const WaterMeter = ({ waterMeters, setValue, value }) => {
  return (
    <View style={styles.waterMeterContainer}>
      <View>
        <Text style={styles.labels}>Номер на водомер</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={value => setValue(value)}
            items={waterMeters}
            style={{
              inputIOS: styles.pickerItem,
              inputAndroid: styles.pickerItem
            }}
            placeholder={{
              label: "Избери водомер",
              value: ""
            }}
            value={value}
          />
        </View>
      </View>
      <View>
        <Text style={styles.labels}>Стойност</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <TextInput
            style={{
              width: "80%",
              fontSize: 18,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              height: 68,
              paddingLeft: 10,
              alignItems: "center"
            }}
          />
          <Text
            style={{
              width: "20%",
              fontSize: 20,
              color: "#999999",
              paddingLeft: 15
            }}
          >
            куб. м
          </Text>
        </View>
      </View>
      <View style={styles.hr} />
    </View>
  );
};

export default WaterMeter;
