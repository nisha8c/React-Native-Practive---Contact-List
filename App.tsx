import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack  = createNativeStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// import { createDrawerNavigator } from '@react-navigation/drawer';
// const Drawer = createDrawerNavigator();

import {
  AboutScreen,
  HomeScreen,
  SearchScreen
} from "./src/components";

export default function App() {
  return (
    <NavigationContainer>
      {/*
        <Stack.Navigator>
        <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{title: 'Contact List'}}
        />
        <Stack.Screen name='Search' component={SearchScreen}/>
        <Stack.Screen name='About' component={AboutScreen}/>
      </Stack.Navigator>
      */}

        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={SearchScreen}/>
            <Tab.Screen name="About" component={AboutScreen}/>
        </Tab.Navigator>

    </NavigationContainer>
  );
}

