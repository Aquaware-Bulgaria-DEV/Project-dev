// app/subscreens/singleRoom/index.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

const SingleRoomView = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Single Room View</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

export default SingleRoomView;