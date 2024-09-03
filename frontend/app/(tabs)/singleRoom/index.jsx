import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { getAverageConsumption, getRoomDetails } from '../../services/fetch.js'

import { styles } from './singleRoomStyles'

import { Header } from '../../globalComponents/header.jsx'
import AuthContext from '../../Context/AuthContext.jsx';
import ProgressBar from '../../globalComponents/progressBar.jsx';
import CustomButton from '../../globalComponents/customButton.jsx';

const SingleRoom = () => {
  const [ roomData, setRoomData ] = React.useState('');
  const [ consumptionDetails, setConsumptionDetails ] = React.useState('');
  const [ currentQuantity, setCurrentQuantity ] = React.useState('');
  const [ errMsg, setErrMsg ] = React.useState(null);
  const [ progressPercent, setProgressPercent ] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const { propertyId, roomId } = useLocalSearchParams();
  const {token} = React.useContext(AuthContext)

  React.useEffect(() => {
    // Fetch room details and average consumption data
    getRoomDetails(propertyId, roomId, token)
      .then(data => setRoomData(data))
      .catch(e => console.log("Get room details first err", e));
  
    getAverageConsumption(propertyId, token)
      .then(data => setConsumptionDetails(data))
      .catch(e => {
        console.log("Get average consumption first err", e);
        setErrMsg(e)
      });

  }, [roomId]);
  
  React.useEffect(() => {

    // Ensure roomData and consumptionDetails are properly defined before accessing
    if (roomData && roomData.name && consumptionDetails && consumptionDetails['average_usage_per_room']) {
      const roomName = roomData.name;
      const avgUsageRoom = consumptionDetails['average_usage_per_room'][roomName] / 1000;

      //In case of negative quantity, fix later from backend
      const absUsage = Math.abs(avgUsageRoom)

  
      setCurrentQuantity(absUsage.toFixed(3));
  
      const currentUsage = avgUsageRoom;
      const numberOfRooms = Object.keys(consumptionDetails["average_usage_per_room"]).length;
      const maxUsage = (consumptionDetails["max_water_usage_for_property_per_month"] / 1000) /  numberOfRooms;
      // console.log("MaxUsage",maxUsage)
      // console.log("length",numberOfRooms)
      // console.log("Current Usage",currentUsage)
      if (maxUsage > 0) {
        // Remove math abs later(when backend logic is fixed and there wont be a negative values)
        const percent = Math.abs((currentUsage / maxUsage) * 100);

        if(percent > 100){
          setProgressPercent(100);
        }else{
          const percentToShow = Math.round(percent)
          setProgressPercent(percentToShow)
          // console.log("Percent", percentToShow);
        }

      }
    }
  }, [roomData, consumptionDetails]);

  const onRefresh = () => {
    setRefreshing(true);
    setConsumptionDetails('');
    setErrMsg('');
    setProgressPercent(0);

    getRoomDetails(propertyId, roomId, token)
      .then(data => setRoomData(data))
      .catch(e => console.error(e));
  
    getAverageConsumption(propertyId, token)
      .then(data => setConsumptionDetails(data))
      .catch(e => {
        console.log("Get average consumption second err", e);
        setErrMsg(e)
      })
      .finally(() => setRefreshing(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, [])
  );


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
            <ProgressBar progress={progressPercent} size={300} quantity={currentQuantity} errMsg={errMsg} />
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