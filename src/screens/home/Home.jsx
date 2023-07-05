import { View, Text, Image, StyleSheet, Animated } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Rooms,
  Tours,
  Shop,
  Cart,
  Favorite,
  User,
  SearchScreen,
} from "./../home/index"
import Icon from "../../components/icon"
import { colors, sizes } from "./../../constants/theme"
import SearchNavigator from "./../../navigations/SearchNavigator"
import Profile from "./Profile"
// import Home from "./../../../assets/icons/Home.png"
// import icons from "./../../constants/icons"

const tabs = [
  {
    name: "Rooms",
    screen: Rooms,
  },
  {
    name: "Tours",
    screen: Tours,
  },
  {
    name: "Search",
    screen: SearchNavigator,
  },
  {
    name: "Favorite",
    screen: Favorite,
  },
  {
    name: "Shop",
    screen: Shop,
  },
  {
    name: "Cart",
    screen: Cart,
  },

  {
    name: "User",
    screen: User,
  },
]

const Tab = createBottomTabNavigator()

const Home = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current
  return (
    <>
      <Tab.Navigator
        initialRouteName="Rooms"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        {tabs.map(({ name, screen }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon
                      icon={name}
                      size={40}
                      style={{
                        tintColor: focused ? colors.primary : colors.gray,
                      }}
                    />
                  )
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true,
                  }).start()
                },
              }}
            />
          )
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    width: 35,
    height: 3,
    left: sizes.width / tabs.length / 3.6 - 5,
    bottom: 30,
    backgroundColor: colors.primary,
    zIndex: 100,
    bottom: 45,
  },
})

export default Home
