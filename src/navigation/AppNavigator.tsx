import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import InvestmentScreen from '../screens/InvestmentScreen';
import AlgorithmScreen from '../screens/AlgorithmScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho padrão
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Investment" component={InvestmentScreen} />
      <Stack.Screen name="Algorithm" component={AlgorithmScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;