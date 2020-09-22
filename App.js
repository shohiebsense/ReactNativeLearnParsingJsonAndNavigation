'use strict'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import SearchPage from './SearchPage'
import SearchResults from './SearchResults'

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Property Finder" component={SearchPage} />
      <Stack.Screen name="Results" component={SearchResults} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch',
  },
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
})
