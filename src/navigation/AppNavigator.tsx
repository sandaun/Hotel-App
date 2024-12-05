import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HotelListScreen from '../screens/HotelListScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HotelList">
      <Stack.Screen
        name="HotelList"
        component={HotelListScreen}
        options={{title: 'Hotels'}}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetailsScreen}
        options={{title: 'Hotel Details'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
