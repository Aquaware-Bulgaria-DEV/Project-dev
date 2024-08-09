import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";

import { styles } from "./waterMeterStyles.js";

const WaterMeter = ({
  waterMeters,
  setFormData,
  formData,
  houseKey,
  meterKey,
  setIsLoading,
  setSelectedMeters,
  selectedMeters,
}) => {
  const [meterId, setMeterId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (waterMeters.length === 1) {
      setMeterId(waterMeters[0].value);
    }
  }, [waterMeters]);

  useEffect(() => {
    console.log("Selected Meters", selectedMeters);
  }, [selectedMeters]);

  useEffect(() => {
    const updatedFormData = {
      ...formData,
      [houseKey]: {
        ...formData[houseKey],
        [meterKey]: {
          [meterId]: quantity,
        },
      },
    };
    setFormData(updatedFormData);
  }, [meterId, quantity, houseKey, meterKey, setFormData]);

  const handleTextInputChange = (text) => {
    let numericText = text.replace(/[^0-9.]/g, "");

    let result = "";
    let dotAdded = false;

    for (let i = 0; i < numericText.length; i++) {
      if (numericText[i] === ".") {
        if (!dotAdded && result.length > 0 && /\d/.test(result[result.length - 1])) {
          result += numericText[i];
          dotAdded = true;
        }
      } else {
        result += numericText[i];
      }
    }

    setQuantity(result);
    return result;
  };

  const handlePickerChange = (value) => {
    setMeterId(value);
    if (value) {
      setIsDisabled(true);
      const item = availableMeters.find(item => item.value == value);
      setSelectedMeters(prev => [...prev, item])
    }
  };

  // Modify the filtering logic to filter by label instead of value
  const availableMeters = waterMeters.filter(
  (meter) => !selectedMeters.some(selected => selected.label === meter.label)
  );

  return (
    <View style={styles.waterMeterContainer}>
      <View>
        <Text style={styles.labels}>Номер на водомер</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            disabled={isDisabled ? true : false}
            onValueChange={(value) => handlePickerChange(value)}
            items={availableMeters}
            style={{
              inputIOS: [styles.pickerItem, { opacity: isDisabled ? 0.4 : 1 }],
              inputAndroid: [styles.pickerItem, { opacity: isDisabled ? 0.4 : 1 }],
            }}
            placeholder={{
              label: "Избери водомер",
              value: "",
            }}
            value={meterId}
          />
        </View>
      </View>
      <View>
        <Text style={styles.labels}>Стойност</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
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
              alignItems: "center",
            }}
            keyboardType="numeric"
            onChangeText={handleTextInputChange}
            value={quantity}
            placeholder="Въведи стойност"
          />
          <Text
            style={{
              width: "20%",
              fontSize: 20,
              color: "#999999",
              paddingLeft: 15,
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
