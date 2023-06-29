import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { colors, sizes, spacing } from "./../../../constants/theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import TourDetailsCard from "./../../../components/TourDetailsCard"
import * as Animatable from "react-native-animatable"
import TourDetailsCarousel from "../../../components/TourDetailsCarousel"
import { AntDesign } from "@expo/vector-icons"

const RoomDetails = ({ navigation, route }) => {
  const insets = useSafeAreaInsets()
  const { trip } = route.params
  const slides = [trip.image, ...trip.gallery]
  return (
    <View style={styles.container}>
      <Animatable.View
        style={[styles.backButton, { marginTop: insets.top }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign
            name="arrowleft"
            size={32}
            color="white"
            // style={styles.backIcon}
          />
        </TouchableOpacity>
      </Animatable.View>
      <TourDetailsCarousel slides={slides} id={trip.id} />
      <TourDetailsCard trip={trip} />
    </View>
  )
}

RoomDetails.sharedElements = (route) => {
  const { trip } = route.params
  return [
    {
      id: `trip.${trip.id}.image`,
    },
  ]
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: sizes.radius,
    overflow: "hidden",
  },
  image: {
    width: sizes.width,
    height: sizes.height,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    left: spacing.l,
    zIndex: 1,
    // backgroundColor: "white",
    top: 30,
  },
  backIcon: {
    tintColor: colors.black,
    zIndex: 1,
    // backgroundColor: colors.white,
    borderWidth: 2,
  },
})

export default RoomDetails
