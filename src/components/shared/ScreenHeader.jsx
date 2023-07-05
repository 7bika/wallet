import React from "react"
import { Text, View, StyleSheet, Image } from "react-native"
import { sizes, spacing } from "./../../constants/theme"

const ScreenHeader = ({ mainTitle, secondTitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>{mainTitle}</Text>
          <Text style={styles.secondTitle}>{secondTitle}</Text>
        </View>
        <Image
          style={styles.image}
          source={require("../../../assets/user-profile-4255.png")}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "column",
    marginRight: spacing.s,
  },
  mainTitle: {
    fontSize: sizes.title,
    fontWeight: "bold",
  },
  secondTitle: {
    fontSize: sizes.title,
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 140,
  },
})

export default ScreenHeader
