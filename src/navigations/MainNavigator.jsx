import React, { useState, useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { Login, Signup, OnBoardingScreen } from "../screens/index"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen"
import Weclome from "../screens/Welcome/Weclome"
import { AntDesign } from "@expo/vector-icons"
import TabNavigator from "./TabNavigator"

const Stack = createNativeStackNavigator()

const MainNavigator = ({ navigation }) => {
  const [firstLaunched, setFirstLaunched] = useState(false)

  // * event if the app is reloaded it will only shows the onBoardScreens the first time
  useEffect(() => {
    AsyncStorage.getItem("firstLaunched").then((value) => {
      if (value === null) {
        // * changing the value to true inside the asyncStorage or else it wont work
        AsyncStorage.setItem("firstLaunched", "true")
        setFirstLaunched(true)
      } else {
        setFirstLaunched(false)
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Navigator initialRouteName="onBoardingScreens" /> */}
        {/* remove the ! to make it work */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="onBoardingScreen"
          component={OnBoardingScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Weclome"
          component={Weclome}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />

        <Stack.Screen
          options={({ route, navigation }) => ({
            headerShown: true,
            headerBackVisible: false,
            title: "Reset Password",
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <AntDesign name="leftcircleo" size={24} color="grey" />
              </TouchableOpacity>
            ),
          })}
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />

        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
