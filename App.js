import { StatusBar } from "expo-status-bar"
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, OnBoardingScreen } from "./src/screens"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ResetPasswordScreen from "./src/screens/auth/ResetPasswordScreen"
import Weclome from "./src/screens/Welcome/Weclome"
import Home from "./src/screens/home/Home"
import { AntDesign } from "@expo/vector-icons"
import { GestureHandlerRootView } from "react-native-gesture-handler"
// import MainNavigator from "./src/navigations/MainNavigator"
// import TabNavigator from "./src/navigations/TabNavigator"
import RoomDetails from "./src/screens/home/rooms/RoomDetails"
import TourDetails from "./src/screens/home/tours/TourDetails"
import ProductDetails from "./src/screens/home/Shop/ProductDetails"
import CalendarPick from "./src/screens/home/CalendarPick"
import Camera from "./src/screens/home/Shop/Camera"
import ChatBot from "./src/screens/ChatBot"
import Picture from "./src/screens/home/Picture"
// import { createSharedElementStackNavigator } from "react-navigation-shared-element"

// routing :
const Stack = createNativeStackNavigator()

export default function App({ navigation }) {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar hidden />
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

          {/* //* calendar pick  */}

          <Stack.Screen
            options={{ headerShown: false }}
            name="CalendarPick"
            component={CalendarPick}
          />

          {/* //* home screen  */}

          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />

          <Stack.Screen
            name="RoomDetails"
            component={RoomDetails}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />

          <Stack.Screen
            name="TourDetails"
            component={TourDetails}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />

          <Stack.Screen
            name="Camera"
            component={Camera}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />

          <Stack.Screen
            name="ChatBot"
            component={ChatBot}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />

          <Stack.Screen
            name="Picture"
            component={Picture}
            options={{
              headerShown: false,
              useNativeDriver: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress,
                },
              }),
            }}
          />

          {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
