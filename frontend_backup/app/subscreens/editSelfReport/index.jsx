import {useEffect, useState, useContext} from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable
} from "react-native";
import { useLocalSearchParams } from 'expo-router'
import { Header } from "../../globalComponents/header.jsx";

import {styles} from "./editSelfReportStyles.js";
import { editSelfReport, getSingleSelfReport } from "../../services/fetch.js";
import AuthContext from "../../Context/AuthContext.jsx";
import CustomButton from "../../globalComponents/customButton.jsx";
import { useTranslation } from "react-i18next";



const EditSelfReport = () => {
  const { t } = useTranslation();
    const { id } = useLocalSearchParams();
    const [ selfReport, setSelfReport ] = useState();
    const [ quantity, setQuantity ] = useState(0);
    const [ prevQuantity, setPrevQuantity ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ disableFetch, setDisableFetch ] = useState(true);
    const [ buttonText, setButtonText ] = useState('Запази');
    const [errorMessage, setErrorMessage] = useState('');


    const { token } = useContext(AuthContext);

    useEffect(() => {
        getSingleSelfReport(token, id)
        .then(res => {
          setSelfReport(res);
          setPrevQuantity(res.value);
          setErrorMessage("");
        })
        .catch((err) => setErrorMessage(err));
    }, [id]);
    

    useEffect(() => {
      if (selfReport?.value) {
        setQuantity(selfReport.value.toString()); // Ensure the quantity is a string
        setPrevQuantity(selfReport.value.toString()); // Ensure the quantity is a string
        // console.log("Water Meter Number", selfReport.water_meter_number)
        // console.log(selfReport)
      }
    }, [selfReport]);

    useEffect(() => {
      // console.log("Quantity", quantity);
      quantityChangeCheck(quantity, prevQuantity);
    }, [quantity, prevQuantity]);

    const quantityChangeCheck = (quantity, prevQuantity) => {
      if(quantity == prevQuantity || quantity == 0 || quantity == ""){
        setIsLoading(true)
      }else{
        setIsLoading(false)
      }
    }

    const handleTextInputChange = (text) => {
      // Clean the input and format it to only allow one decimal point and up to 3 digits after it
      let numericText = text
        .replace(/[^0-9.]/g, "")    // Remove any non-numeric characters except for "."
        .replace(/(\..*)\./g, "$1") // Allow only the first decimal point, remove subsequent ones
        .replace(/(\.\d{3})\d+/g, "$1"); // Limit to 3 digits after the decimal point
    
      // Update the quantity state with the cleaned input
      setQuantity(numericText);
    };
    
    

    const handlePress = async () => {
      const quantityNumber = Number(quantity);
      const payload = {
        "value": quantityNumber
      };
      
      try {
        const res = await editSelfReport(token, quantityNumber, id);
        // console.log("Response from editSelfReport:", res);  // Log the response for debugging
        setButtonText(`${t('settingsEditSelfReportButtonSave')}`);
        setDisableFetch(false);
        setIsLoading(true);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e);
      }
    };

    function transformDate(dateString) {
      const dateObj = new Date(dateString);
      
      const day = String(dateObj.getUTCDate()).padStart(2, '0');
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
      const year = dateObj.getUTCFullYear();
      
      return `${day}.${month}.${year}`;
    }
    
  return (
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('settingsEditSelfReportEditData')}</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>{t('settingsSelfReportDelailsProperty')}</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>Кухня</Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>{t('settingsSelfReportDelailsWaterMeterNum')}</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>{selfReport?.water_meter_number}</Text>
            </View>
          </View>
          <Text style={[styles.dataLabel, {marginBottom: 10}]}>{t('settingsSelfReportDelailsValue')}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginLeft: 10,
              marginBottom: 20
            }}
          >
            
          <TextInput
            style={{
              width: "80%",
              fontSize: 18,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              height: 68,
              paddingLeft: 15,
              alignItems: "center",
            }}
            keyboardType="numeric"
            editable={disableFetch}
            onChangeText={handleTextInputChange}
            value={quantity}
            placeholder={t('settingsEditSelfReportAddValue')}
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
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>{t('settingsSelfReportDelailsAddedOn')}</Text>
            <Text style={styles.date}>{transformDate(selfReport?.date)}</Text>
          </View>
        </View>
        <CustomButton handlePress={handlePress}
            isLoading={isLoading}
            color={"#388FED"}
            secondColor={"#205187"}
            title={buttonText}
            additionalStyles={{ width: "80%", height: 68, borderRadius: 20, padding: 0, alignSelf: 'center' }}
            additionalTextStyle={{ fontSize: 20, textAlign: "center" }}
            disabled={isLoading}/>
      </ScrollView>
  );
};

export default EditSelfReport;
