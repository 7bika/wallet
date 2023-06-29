import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { colors } from "./../../../constants/theme"
import MainHeader from "../../../components/shared/MainHeader"
import ScreenHeader from "../../../components/shared/ScreenHeader"
import TopPlacesCarousel from "./../../../components/TopPlacesCarousel"
import { PLACES, TOP_PLACES } from "./../../../data/index"
import SectionHeader from "./../../../components/shared/SectionHeader"
import TripsList from "./../../../components/TripsList"

const Rooms = () => {
  return (
    <View style={styles.container}>
      <MainHeader title="Travel App" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Room" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          title="Popular Rooms"
          buttonTitle="See All"
          onPress={() => {
            alert("clicked")
          }}
        />
        <TripsList list={PLACES} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
})

export default Rooms
