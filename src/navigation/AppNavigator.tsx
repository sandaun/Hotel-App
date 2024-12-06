import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HotelListScreen from '../screens/HotelListScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen';
import Header from '../components/Header';
import {useHeader} from '../contexts/HotelContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {headerConfig} = useHeader();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HotelList"
        component={HotelListScreen}
        options={{
          header: () => (
            <Header
              title={headerConfig.title}
              showBackButton={headerConfig.showBackButton}
              onFilterPress={headerConfig.onFilterPress}
              selectedFilter={headerConfig.selectedFilter}
            />
          ),
        }}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetailsScreen}
        options={{
          header: () => (
            <Header
              title={headerConfig.title}
              showBackButton={headerConfig.showBackButton}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
