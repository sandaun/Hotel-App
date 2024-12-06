import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HeaderProvider} from './contexts/HotelContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <HeaderProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </HeaderProvider>
  );
};

export default App;
