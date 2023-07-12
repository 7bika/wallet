import React, { useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"
import { colors } from "./../../../constants/theme"
import MainHeader from "../../../components/shared/MainHeader"
import ScreenHeader from "../../../components/shared/ScreenHeader"
import TopPlacesCarousel from "./../../../components/TopPlacesCarousel"
import { PLACES, TOP_PLACES } from "./../../../data/index"
import SectionHeader from "./../../../components/shared/SectionHeader"
import TripsList from "./../../../components/TripsList"
import { Ionicons } from "@expo/vector-icons"

import { useNavigation } from "@react-navigation/native"

const Rooms = () => {
  const [minimized, setMinimized] = useState(false)

  const navigation = useNavigation()

  const handleToggleMinimize = () => {
    setMinimized((prevState) => !prevState)
  }
  return (
    <View style={styles.container}>
      <MainHeader title="Booking App" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Tour" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Tours"
          buttonTitle="See All"
          onPress={() => {
            alert("clicked")
          }}
        />
        <TripsList list={PLACES} />
      </ScrollView>

      {!minimized && (
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate("ChatBot")}
        >
          <Ionicons
            name="close-circle-sharp"
            size={20}
            color="black"
            style={styles.closeButton}
            onPress={handleToggleMinimize}
          />
          <Image
            style={styles.chatLogo}
            source={require("./../../../../assets/chatbot.png")}
          />
        </TouchableOpacity>
      )}
      {minimized && (
        <TouchableOpacity
          style={styles.minimizedChatButton}
          onPress={handleToggleMinimize}
        >
          <Image
            source={require("./../../../../assets/closedchat.png")}
            style={styles.minimizedChatIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#036bfc",
  },
  chatLogo: {
    width: 33,
    height: 34,
    top: 1,
  },
  closeButton: {
    zIndex: 1,
    position: "absolute",
    top: -5,
    left: 35,
  },
  minimizedChatButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    width: 30,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  minimizedChatIcon: {
    width: 36,
    height: 36,
  },
})

export default Rooms
