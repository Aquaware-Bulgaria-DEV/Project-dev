import {useEffect, useState, useContext} from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router'
import { Header } from "../../globalComponents/header.jsx";

import {styles} from "./selfReportDetailsStyles.js";
import { getSingleSelfReport } from "../../services/fetch.js";
import AuthContext from "../../Context/AuthContext.jsx";

const SelfReportDetails = () => {
    const { id } = useLocalSearchParams();
    const [ selfReport, setSelfReport ] = useState();
    const [ quantity, setQuantity ] = useState(0);


    const { token } = useContext(AuthContext);

    useEffect(() => {
        getSingleSelfReport(token, id)
        .then(res => {
          setSelfReport(res);
        })
        .catch(err => console.log("getSingleSelfReport error on details: ", err));
    }, [id]);
    
    useEffect(() => {
      console.log(selfReport);
      if (selfReport?.value) {
        setQuantity(selfReport.value.toString()); // Ensure the quantity is a string
      }
    }, [selfReport]);

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
          <Text style={styles.title}>Данни на самоотчет</Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Имот</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>{selfReport?.property_type}</Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Номер на водомер</Text>
            <View style={styles.dataNameWrapper}>
                <Text style={styles.dataName}>{selfReport?.water_meter_number}</Text>
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
            editable={false}
            value={quantity}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelfReportDetails;
