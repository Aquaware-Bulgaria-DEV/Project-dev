// app/subscreens/singleRoom/index.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const SingleRoomView = ({route, navigation}) => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Single Room View</Text>
      <Text>{id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

export default SingleRoomView;