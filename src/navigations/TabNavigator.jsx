import { View, Text, Image } from "react-native"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Rooms,
  Tours,
  Shop,
  Cart,
  Wishlist,
  Profile,
} from "../screens/home/index"
import Icon from "../components/icon"
import DrawerNavigator from './DrawerNavigator'

const Tab = createBottomTabNavigator()

// ! not working replaced with HOME in screens/home/Home
const TabNavigator = () => {
  return (
    
    <Tab.Navigator
      initialRouteName="Rooms"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{s
          headerShown: false,
          tabBarIcon: () => {
            return <Icon icon="Rooms" size={40} />
          },
        }}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Tours"
        component={Tours}
        tabBarIcon={() => (
          // <AntDesign name="leftcircleo" size={24} color="grey" />
          <Image
            source={require("./../../assets/icons/Rooms.png")}
            resizeMode="cover"
            style={{ width: 40, height: 40 }}
          />
        )}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Rooms"
        component={Rooms}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Shop"
        component={Shop}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Wishlist"
        component={Wishlist}
      />
    </Tab.Navigator>
     <Tab.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
