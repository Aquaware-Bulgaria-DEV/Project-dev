import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./formSelfReportStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import RNPickerSelect from "react-native-picker-select";
import WaterMeter from "../../globalComponents/waterMeter.jsx";
import getIcon from "../../../utils/icons.js";
import CustomButton from "../../globalComponents/customButton.jsx";
import AuthContext from "../../Context/AuthContext.jsx";

const SelfReport = () => {
  const [value, setValue] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [meterCount, setMeterCount] = useState(2);
  const [meters, setMeters] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [waterItems, setWaterItems] = useState([]);

  const { token, removeToken, removeUserInfo } = useContext(AuthContext);

  const dataHouses = ["Имот 1", "Имот 2", "Имот 3", "Имот 4", "Имот 5"];

  const houseItems = dataHouses.map((key) => ({
    label: key,
    value: key,
  }));

  useEffect(() => {
    const fetchWaterMeters = async () => {
      try {
        const response = await fetch('http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/', {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await response.json();
        const metterArray = data[0]["water_meters"].map((item) => ({
          label: item["meter_number"],
          value: item["meter_number"],
        }));
        
        setWaterItems(metterArray);
        setIsLoading(false);
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`);
        setIsLoading(false);
      }
    };

    fetchWaterMeters();
  }, [token]);

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
          setIsLoading={setIsLoading}
          selectedMeters={Object.values(formData[value] || {}).map((m) => Object.keys(m)[0])}
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
  }, [value, waterItems]);

  const handleValueChange = (value) => {
    setValue(value);
  };

  const addWaterMeter = () => {
    if (meterCount <= waterItems.length && value) {
      const meterKey = `meter${meterCount}`;
      setMeters([
        ...meters,
        <WaterMeter
          key={meterKey}
          waterMeters={waterItems}
          setFormData={setFormData}
          formData={formData}
          houseKey={value}
          setIsLoading={setIsLoading}
          meterKey={meterKey}
          selectedMeters={Object.values(formData[value] || {}).map((m) => Object.keys(m)[0])}
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
  };

  function getCleanData(data) {
    let cleanData = {};
    for (let property in data) {
      let cleanMeters = {};
      for (let meter in data[property]) {
        Object.assign(cleanMeters, data[property][meter]);
      }
      cleanData[property] = cleanMeters;
    }
    return cleanData;
  }

  const handlePress = async () => {
      try {
        const response = await fetch('http://ec2-18-234-44-48.compute-1.amazonaws.com/water-management/properties/', {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await response.json();
        console.log(data)        
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err)}`);
      };
    const data = getCleanData(formData);
    console.log(data);
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
            isLoading={isLoading}
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

export default SelfReport;
