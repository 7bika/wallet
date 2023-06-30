import { View, Button } from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Cart, Rooms, Shop, Tours, User } from "../screens/home"

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Rooms" component={Rooms} />
        <Drawer.Screen name="Tours" component={Tours} />
        <Drawer.Screen name="Shop" component={Shop} />
        <Drawer.Screen name="User" component={User} />
        <Drawer.Screen name="Cart" component={Cart} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator
