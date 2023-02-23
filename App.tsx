import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {
  AboutScreen,
  HomeScreen,
  SearchScreen,
  IndividualContactScreen
} from "./src/components";

export default function App() {
  return (
    <NavigationContainer>

        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={SearchScreen}/>
            <Tab.Screen name="About" component={AboutScreen}/>
        </Tab.Navigator>

    </NavigationContainer>
  );
}

