import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '../../globalComponents/header.jsx'

import { getAverageConsumption, getRoomDetails } from '../../services/fetch.js'

import { styles } from './singleRoomStyles'

import AuthContext from '../../Context/AuthContext.jsx';
import ProgressBar from '../../globalComponents/progressBar.jsx';

import ProgressBarImage from '../../../assets/CatyProfile.png'
import CustomButton from '../../globalComponents/customButton.jsx';


////////////////////////// TODO: when you get the data from the server and calculate the percentage of the progressbar make if percentage is above 100 to equal 100;

const SingleRoom = () => {
  const [ roomData, setRoomData ] = React.useState('');
  const [ consumptionDetails, setConsumptionDetails ] = React.useState('');
  const [ currentQuantity, setCurrentQuantity ] = React.useState('');
  const [ errMsg, setErrMsg ] = React.useState('');
  const [ progressPercent, setProgressPercent ] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const { propertyId, roomId } = useLocalSearchParams();
  const {token} = React.useContext(AuthContext)

  React.useEffect(() => {
    // Fetch room details and average consumption data
    getRoomDetails(propertyId, roomId, token)
      .then(data => setRoomData(data))
      .catch(e => console.error(e));
  
    getAverageConsumption(propertyId, token)
      .then(data => setConsumptionDetails(data))
      .catch(e => setErrMsg(e));

      // console.log("RoomID", errMsg)
  }, [roomId]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or any async task
    getRoomDetails(propertyId, roomId, token)
      .then(data => setRoomData(data))
      .catch(e => console.error(e));
  
    getAverageConsumption(propertyId, token)
      .then(data => setConsumptionDetails(data))
      .catch(e => {
        const msg = e;
        setErrMsg(msg)
        console.log("Message ", msg);
      })
      .finally(() => setRefreshing(false));
  };

  React.useEffect(() =>{
    console.log("ConsumtionDetails: " , consumptionDetails)
    console.log("RoomData: ", roomData)
  }, [roomData, consumptionDetails])
  
  React.useEffect(() => {

    // Ensure roomData and consumptionDetails are properly defined before accessing
    if (roomData && roomData.name && consumptionDetails && consumptionDetails['average_usage_per_room']) {
      const roomName = roomData.name;
      const avgUsageRoom = consumptionDetails['average_usage_per_room'][roomName] / 1000;

      //In case of negative quantity, fix later from backend
      const absUsage = Math.abs(avgUsageRoom)

  
      setCurrentQuantity(absUsage.toFixed(3));
  
      const currentUsage = avgUsageRoom;
      const maxUsage = consumptionDetails["max_water_usage_for_property_per_month"] / 1000;
      console.log("Current Usage",currentUsage)
      if (maxUsage > 0) {
        // Remove math abs later(when backend logic is fixed and there wont be a negative values)
        const percent = Math.abs((currentUsage / maxUsage) * 100);

        if(percent > 100){
          setProgressPercent(100);
        }else{
          const percentToShow = Math.round(percent)
          setProgressPercent(percentToShow)
          console.log("Percent", percentToShow);
        }

      }
    }
  }, [roomData, consumptionDetails]);


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header showProfilePic={false} />
      <View style={styles.dataContainer}>
        <View style={styles.wrapper}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{roomData.name}</Text>
            <Text style={styles.activeDevices}>4 активни уреда</Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar progress={progressPercent} size={300} quantity={currentQuantity} errMsg={errMsg}/* imageSource={ProgressBarImage} */ />
          </View>
            <CustomButton title={"Разбери какво значи"} 
            handlePress={() => router.push({
              pathname: '../../subscreens/DoubleProgressBar',
              params: {
                progressPercent: progressPercent,
                currentQuantity: currentQuantity,
                errMsg: errMsg,
              }
            })}
            color={"#388FED"}
            secondColor={"#205187"}
            additionalStyles={{ width: "80%", height: 68, borderRadius: 20, padding: 0, alignSelf: 'center' }}
            additionalTextStyle={{ fontSize: 20, textAlign: "center" }} />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default SingleRoom;