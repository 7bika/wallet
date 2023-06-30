import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Icon from "./../icon"
import { sizes, spacing } from "./../../constants/theme"
import DrawerNavigator from "../../navigations/DrawerNavigator"
import { NavigationContainer } from "@react-navigation/native"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import { useNavigation } from "@react-navigation/native"

const MainHeader = ({ title }) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Icon icon="Hamburger" onPress={<DrawerNavigator />} />
      <Text style={styles.title}>{title}</Text>
      <Icon
        icon="Notification"
        onPress={() => {
          alert("clicked")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: "bold",
  },
})

export default MainHeader
