import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { styles } from "./formSelfReportStyles.js";
import { Header } from "../../globalComponents/header.jsx";
import RNPickerSelect from "react-native-picker-select";
import WaterMeter from "../../globalComponents/waterMeter.jsx";
import getIcon from "../../../utils/icons.js";
import CustomButton from "../../globalComponents/customButton.jsx";
import AuthContext from "../../Context/AuthContext.jsx";
import { addSelfReport, getWaterMetters } from "../../services/fetch.js";
import { useTranslation } from "react-i18next";

const SelfReport = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [opacity, setOpacity] = useState(1);
  const [meterCount, setMeterCount] = useState(2);
  const [meters, setMeters] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [waterItems, setWaterItems] = useState([]);
  const [propertyItems, setPropertyItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [ selectedMeters, setSelectedMeters ] = useState([]);

  const [ buttonText, setButtonText ] = useState(`${t('settingsFormSelfReportAddButton')}`);
  // const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
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

        const properties = data.map((obj) => (
          {
            label: obj["type"]["type"],
            value: obj["id"],
          }
        ));

        setPropertyItems(properties);
      } catch (err) {
        console.log(`Error: ${JSON.stringify(err.message)}`);
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchWaterMeters = () => {
      getWaterMetters(token, value)
        .then(metterAray => {
          setWaterItems(metterAray);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(`Error: ${JSON.stringify(err.message)}`);
          setIsLoading(false);
        });
    };
    if (value) {
      fetchWaterMeters();
    }
  }, [value]);

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
          setSelectedMeters = {setSelectedMeters}
          selectedMeters={selectedMeters}
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

  useEffect(() => {
    // Check if the button should be enabled
    const checkButtonState = () => {
      if (!value) {
        // setIsButtonEnabled(false);
        setIsLoading(true);
        return;
      }

      const selectedProperty = formData[value];
      if (!selectedProperty) {
        // setIsButtonEnabled(false);
        setIsLoading(true);
        return;
      }

      for (let meterKey in selectedProperty) {
        const meterData = selectedProperty[meterKey];
        const meterId = Object.keys(meterData)[0];
        const quantity = meterData[meterId];

        if (!meterId || !quantity) {
          // setIsButtonEnabled(false);
          setIsLoading(true);
          return;
        }
      }

      // setIsButtonEnabled(true);
      setIsLoading(false);
    };

    checkButtonState();
  }, [formData, value]);

  const handleValueChange = (value) => {
    setValue(value);
  };

  const addWaterMeter = () => {
    if (meterCount <= waterItems.length && value && meterCount < 6) {
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
          setSelectedMeters = {setSelectedMeters}
          selectedMeters={selectedMeters}
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

  const handlePress = async () => {
    const data = flattenData(formData);
    const payload = {
        readings: data
    };

    // console.log(payload)

    addSelfReport(payload)
    .then(res => {
      setButtonText(`${t('settingsFormSelfReportAddedButton')}`);
      setIsLoading(true);
      setErrorMessage('');
    })
    .catch(e => setErrorMessage(e))
};

  const flattenData = (cleanData) => {
    const data = getCleanData(cleanData);
    let flattenedData = [];
    data.forEach(item => {
        for (let meter in item.meters) {
            flattenedData.push({ "water_meter_id": meter, "value": Number(item.meters[meter]) });
        }
    });
    return flattenedData;
  };

  const getCleanData = (data) => {
    let cleanData = [];
    for (let property in data) {
        let cleanMeters = {};
        for (let meter in data[property]) {
            Object.assign(cleanMeters, data[property][meter]);
        }
        cleanData.push({ property, meters: cleanMeters });
    }
    return cleanData;
  };


  return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('settingsFormSelfReportAddData')}</Text>
          <View>
            <Text style={styles.labels}>{t('settingsSelfReportDelailsProperty')}</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={handleValueChange}
                items={propertyItems}
                style={{
                  inputIOS: styles.pickerItem,
                  inputAndroid: styles.pickerItem,
                }}
                placeholder={{
                  label: `${t('addPropertyChoose')}`,
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
            disabled={isLoading}
          >
            <Text style={[styles.addWaterMeter, { opacity: isLoading ? 0.5 : 1 }]}>
              {getIcon("plus", "#3CA5D8", 15)}{t('settingsFormSelfReportAddWaterMeter')}
            </Text>
          </Pressable>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <CustomButton
            handlePress={handlePress}
            isLoading={isLoading}
            color={"#388FED"}
            secondColor={"#205187"}
            title={buttonText}
            additionalStyles={{ width: "100%", height: 68, borderRadius: 20, padding: 0 }}
            additionalTextStyle={{ fontSize: 20, textAlign: "center" }}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
  );
};

export default SelfReport;
