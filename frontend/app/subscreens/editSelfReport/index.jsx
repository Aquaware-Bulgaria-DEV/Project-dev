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
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router'
import { Header } from "../../globalComponents/header.jsx";

import {styles} from "./editSelfReportStyles.js";
import { editSelfReport, getSingleSelfReport } from "../../services/fetch.js";
import AuthContext from "../../Context/AuthContext.jsx";
import CustomButton from "../../globalComponents/customButton.jsx";



const EditSelfReport = () => {
    const { id } = useLocalSearchParams();
    const [ selfReport, setSelfReport ] = useState();
    const [ quantity, setQuantity ] = useState(0);
    const [ prevQuantity, setPrevQuantity ] = useState(0);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ disableFetch, setDisableFetch ] = useState(true);
    const [ buttonText, setButtonText ] = useState('Запази');

    const { token } = useContext(AuthContext);

    useEffect(() => {
        getSingleSelfReport(token, id)
        .then(res => {
          setSelfReport(res);
          setPrevQuantity(res.value);
        })
        .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
      if (selfReport?.value) {
        setQuantity(selfReport.value.toString()); // Ensure the quantity is a string
        setPrevQuantity(selfReport.value.toString()); // Ensure the quantity is a string
      }
    }, [selfReport]);

    useEffect(() => {
      console.log("Quantity", quantity);
      quantityChangeCheck(quantity, prevQuantity);
    }, [quantity, prevQuantity]);

    const quantityChangeCheck = (quantity, prevQuantity) => {
      if(quantity == prevQuantity || quantity == 0 || quantity == ""){
        setIsLoading(true)
      }else{
        setIsLoading(false)
      }
    }



    useEffect(()=>{
      console.log("Quantity", quantity)
    }, [quantity])

    const handleTextInputChange = (text) => {
      // Clean the input and format it to only allow one decimal point
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
  
      // Update the quantity state with the cleaned input
      setQuantity(result);
      
    };

    const handlePress = async () => {
      const payload = {
        "value": quantity
      }
      editSelfReport(token, quantity, id)
      .then(res => {
        setButtonText("Запазено");
        setDisableFetch(false);
      })
      .catch(e => console.log(e))
      // setButtonText("Запазено");
      // setIsLoading(true);
      // setDisableFetch(false);
  };

    function transformDate(dateString) {
      const dateObj = new Date(dateString);
      
      const day = String(dateObj.getUTCDate()).padStart(2, '0');
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
      const year = dateObj.getUTCFullYear();
      
      return `${day}.${month}.${year}`;
    }
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header showProfilePic={false} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Редактиране на данни</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Имот</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>Кухня</Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Номер на водомер</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>{selfReport?.water_meter_id}</Text>
            </View>
          </View>
          <Text style={[styles.dataLabel, {marginBottom: 10}]}>Стойност</Text>
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
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Добавен на:</Text>
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
    </SafeAreaView>
  );
};

export default EditSelfReport;
