import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./formSelfReportStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import RNPickerSelect from "react-native-picker-select";
import WaterMeter from "../../globalComponents/waterMeter.jsx";
import getIcon from "../../../utils/icons.js";
import CustomButton from "../../globalComponents/customButton.jsx";

const selfReport = () => {
  const [value, setValue] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [meterCount, setMeterCount] = useState(2);
  const [meters, setMeters] = useState([]);
  const [formData, setFormData] = useState({});

  const dataHouses = ["Имот 1", "Имот 2", "Имот 3", "Имот 4", "Имот 5"];
  const dataWaterMeter = ["Водомер 1", "Водомер 2"];

  const houseItems = dataHouses.map((key) => ({
    label: key,
    value: key,
  }));

  const waterItems = dataWaterMeter.map((key) => ({
    label: key,
    value: key,
  }));

  useEffect(() => {
    if (value) {
      const meterKey = `meter1`;
      setMeters([
        <WaterMeter
          key={meterKey}
          waterMeters={waterItems}
          setFormData={setFormData}
          formData={formData}
          houseKey={value}
          meterKey={meterKey}
        />,
      ]);
      setFormData({
        ...formData,
        [value]: {
          [meterKey]: {},
        },
      });
      setMeterCount(2);
    }
  }, [value]);

  const handleValueChange = (value) => {
    setValue(value);
  };

  const addWaterMeter = () => {
    if (meterCount <= 5 && value) {
      const meterKey = `meter${meterCount}`;
      setMeters([
        ...meters,
        <WaterMeter
          key={meterKey}
          waterMeters={waterItems}
          setFormData={setFormData}
          formData={formData}
          houseKey={value}
          meterKey={meterKey}
        />,
      ]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [value]: {
          ...prevFormData[value],
          [meterKey]: {},
        },
      }));
      setMeterCount(meterCount + 1);
    }
    // console.log(formData);
  };

  const handlePress = () => {
    console.log(formData)
  }

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
                onValueChange={handleValueChange}
                items={houseItems}
                style={{
                  inputIOS: styles.pickerItem,
                  inputAndroid: styles.pickerItem,
                }}
                placeholder={{
                  label: "Избери имот",
                  value: "",
                }}
                value={value}
                
              />
            </View>
          </View>
          <View style={styles.waterMeterContainer}>{meters}</View>
          <Pressable
            onPress={addWaterMeter}
            onPressIn={() => setOpacity(0.5)}
            onPressOut={() => setOpacity(1)}
          >
            <Text style={[styles.addWaterMeter, { opacity }]}>
              {getIcon("plus", "#3CA5D8", 15)}Добави водомер
            </Text>
          </Pressable>
          <CustomButton
            handlePress={handlePress}
            color={"#388FED"}
            secondColor={"#205187"}
            title={"Добави"}
            additionalStyles={{ width: "100%", height: 68, borderRadius: 20, padding: 0 }}
            additionalTextStyle={{ fontSize: 20, textAlign: "center" }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default selfReport;
