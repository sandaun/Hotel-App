import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HotelListScreen from '../screens/HotelListScreen';
import HotelDetailsScreen from '../screens/HotelDetailsScreen';
import Header from '../components/Header';
import {useHeader} from '../contexts/HotelContext';
import {Hotel} from '../types/types';

export type RootStackParamList = {
  HotelList: undefined;
  HotelDetails: {hotel: Hotel};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {headerConfig} = useHeader();

  const listScreenHeader = useMemo(() => {
    return () => (
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
        onFilterPress={headerConfig.onFilterPress}
        selectedFilter={headerConfig.selectedFilter}
      />
    );
  }, [headerConfig]);

  const detailsScreenHeader = useMemo(() => {
    return () => (
      <Header
        title={headerConfig.title}
        showBackButton={headerConfig.showBackButton}
      />
    );
  }, [headerConfig]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HotelList"
        component={HotelListScreen}
        options={{
          header: listScreenHeader,
        }}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetailsScreen}
        options={{
          header: detailsScreenHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
