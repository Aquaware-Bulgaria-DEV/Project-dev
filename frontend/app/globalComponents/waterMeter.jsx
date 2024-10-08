import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";

import { styles } from "./waterMeterStyles.js";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [meterId, setMeterId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (waterMeters.length === 1) {
      setMeterId(waterMeters[0].value);
    }
  }, [waterMeters]);

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
      // Clean the input and format it to only allow one decimal point and up to 3 digits after it
      let numericText = text
        .replace(/[^0-9.]/g, "")    // Remove any non-numeric characters except for "."
        .replace(/(\..*)\./g, "$1") // Allow only the first decimal point, remove subsequent ones
        .replace(/(\.\d{3})\d+/g, "$1"); // Limit to 3 digits after the decimal point
    
      // Update the quantity state with the cleaned input
      setQuantity(numericText);
    };

  const handlePickerChange = (value) => {
    setMeterId(value);
    if (value) {
      setIsDisabled(true);
      const item = availableMeters.find(item => item.value == value);
      setSelectedMeters(prev => [...prev, item])
    }
  };

  const availableMeters = waterMeters.filter(
  (meter) => !selectedMeters.some(selected => selected.label === meter.label)
  );

  return (
    <View style={styles.waterMeterContainer}>
      <View>
        <Text style={styles.labels}>{t('waterMeterNumber')}</Text>
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
              label: `${t('waterMeterPicker')}`,
              value: "",
            }}
            value={meterId}
          />
        </View>
      </View>
      <View>
        <Text style={styles.labels}>{t('settingsSelfReportDelailsValue')}</Text>
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
            placeholder={t('waterMeterAddValue')}
          />
          <Text
            style={{
              width: "20%",
              fontSize: 20,
              color: "#999999",
              paddingLeft: 15,
            }}
          >
            {t('waterMeterCubicM')}
          </Text>
        </View>
      </View>
      <View style={styles.hr} />
    </View>
  );
};

export default WaterMeter;
